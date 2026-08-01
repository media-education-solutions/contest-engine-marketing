"use server";

import { z } from "zod";
import {
  saveInquiry,
  markInquiryNotified,
  notifyInquiry,
  type ContactInquiry,
} from "@/lib/contact-delivery";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name.").max(200),
  email: z.email("Please enter a valid email address."),
  organization: z.string().trim().max(300).optional().default(""),
  role: z.enum(["educator", "coordinator", "other"]),
  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters.")
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

/**
 * Store the inquiry and notify the team. These are independent paths run
 * concurrently: the submission succeeds if EITHER lands, so a Google outage
 * cannot lose a lead and a Neon outage cannot suppress the notification.
 */
async function deliver(input: z.infer<typeof contactSchema>): Promise<boolean> {
  const inquiry: ContactInquiry = {
    name: input.name,
    email: input.email,
    organization: input.organization,
    role: input.role,
    message: input.message,
  };

  if (!process.env.NEON_DB_URL && !process.env.CONTACT_SCRIPT_URL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] delivery not configured — inquiry:", inquiry);
      return true;
    }
    console.error(
      "[contact] NEON_DB_URL and CONTACT_SCRIPT_URL both missing in production",
    );
    return false;
  }

  const [id, notified] = await Promise.all([
    saveInquiry(inquiry),
    notifyInquiry(inquiry),
  ]);

  if (id !== null && notified) await markInquiryNotified(id);
  if (id !== null && !notified) {
    console.error("[contact] stored but not notified — row", id);
  }
  if (id === null && notified) {
    console.error("[contact] notified but NOT stored — Sheet is the only copy");
  }

  return id !== null || notified;
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
