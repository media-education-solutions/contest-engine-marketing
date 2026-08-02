"use server";

import { z } from "zod";
import {
  saveInquiry,
  markInquiryNotified,
  notifyInquiry,
  type ContactInquiry,
} from "@/lib/contact-delivery";
import { verifyTurnstile } from "@/lib/turnstile";
import { form as copy } from "@/content/pages/contact";

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

  // Honeypot: humans never see this field. Report success and drop it on the
  // floor — an error response just tells the bot which field to stop filling.
  if (String(formData.get("website") ?? "").trim() !== "") {
    console.warn("[contact] honeypot tripped — submission dropped");
    return { status: "success", message: copy.success };
  }

  const parsed = contactSchema.safeParse({
    ...values,
    website: formData.get("website"),
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    return {
      status: "error",
      message: copy.errors.fields,
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
      message: copy.errors.notHuman,
      values,
    };
  }

  const delivered = await deliver(parsed.data);
  if (!delivered) {
    return {
      status: "error",
      message: copy.errors.delivery,
      values,
    };
  }

  return {
    status: "success",
    message: copy.success,
  };
}
