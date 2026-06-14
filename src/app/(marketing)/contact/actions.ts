"use server";

import { z } from "zod";
import { site } from "@/content/site";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name.").max(200),
  email: z.email("Please enter a valid email address."),
  organization: z.string().trim().max(300).optional().default(""),
  role: z.enum(["educator", "coordinator", "other"]),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about your festival or question.")
    .max(5000),
  /** Honeypot — humans never fill this. */
  website: z.literal("").optional(),
});

export type ContactFormValues = {
  name: string;
  email: string;
  organization: string;
  role: string;
  message: string;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Echoed back on error so the form re-renders with input intact. */
  values?: ContactFormValues;
};

async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet — honeypot still applies
  if (!token) return false;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    },
  );
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

async function deliver(input: z.infer<typeof contactSchema>): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const inbox = process.env.CONTACT_INBOX;

  if (!apiKey || !inbox) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] email not configured — inquiry:", input);
      return true;
    }
    console.error("[contact] BREVO_API_KEY / CONTACT_INBOX missing in production");
    return false;
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: `${site.productName} Website`,
        email: process.env.CONTACT_FROM_EMAIL ?? inbox,
      },
      to: [{ email: inbox }],
      replyTo: { email: input.email, name: input.name },
      subject: `New inquiry from ${input.name}${input.organization ? ` (${input.organization})` : ""}`,
      textContent: [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Organization: ${input.organization || "—"}`,
        `Role: ${input.role}`,
        "",
        input.message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[contact] Brevo error", res.status, await res.text());
    return false;
  }
  return true;
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values: ContactFormValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    organization: String(formData.get("organization") ?? ""),
    role: String(formData.get("role") ?? "educator"),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse({
    ...values,
    website: formData.get("website"),
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: {
        name: flat.name?.[0],
        email: flat.email?.[0],
        message: flat.message?.[0],
      },
      values,
    };
  }

  const human = await verifyTurnstile(
    formData.get("cf-turnstile-response") as string | null,
  );
  if (!human) {
    return {
      status: "error",
      message: "We couldn't verify you're human. Please try again.",
      values,
    };
  }

  const delivered = await deliver(parsed.data);
  if (!delivered) {
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again in a moment.",
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks! We read every message and we'll get back to you soon.",
  };
}
