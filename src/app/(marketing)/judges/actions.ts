"use server";

import { z } from "zod";
import {
  saveApplication,
  markApplicationNotified,
  notifyApplication,
  type JudgeApplication,
} from "@/lib/judge-delivery";
import { verifyTurnstile } from "@/lib/turnstile";
import { US_PHONE_PATTERN } from "@/lib/utils";
import { form as copy } from "@/content/pages/judges";

/** Optional field, but if present must be a complete 10-digit US number. */
const optionalPhone = z
  .string()
  .trim()
  .optional()
  .default("")
  .refine((v) => v === "" || US_PHONE_PATTERN.test(v), copy.errors.invalidPhone);

const judgeSchema = z.object({
  judgeKind: z.enum(["volunteer", "freelance"]),
  name: z.string().trim().min(1, "Please tell us your name.").max(200),
  email: z.email("Please enter a valid email address."),
  phone: optionalPhone,
  jobTitle: z.string().trim().max(200).optional().default(""),
  note: z.string().trim().max(5000).optional().default(""),
  /** Honeypot — humans never fill this. */
  website: z.literal("").optional(),
});

export type JudgeFormValues = {
  judgeKind: "volunteer" | "freelance";
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  note: string;
};

export type JudgeFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone", string>>;
  /** Echoed back on error so the form re-renders with input intact. */
  values?: JudgeFormValues;
};

/**
 * Store the application and notify the team. These are independent paths run
 * concurrently: the submission succeeds if EITHER lands, so a Google outage
 * cannot lose a lead and a Neon outage cannot suppress the notification.
 */
async function deliver(input: z.infer<typeof judgeSchema>): Promise<boolean> {
  const application: JudgeApplication = {
    kind: input.judgeKind,
    name: input.name,
    email: input.email,
    phone: input.phone,
    jobTitle: input.jobTitle,
    note: input.note,
  };

  if (!process.env.NEON_DB_URL && !process.env.CONTACT_SCRIPT_URL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[judge] delivery not configured — application:", application);
      return true;
    }
    console.error(
      "[judge] NEON_DB_URL and CONTACT_SCRIPT_URL both missing in production",
    );
    return false;
  }

  const [id, notified] = await Promise.all([
    saveApplication(application),
    notifyApplication(application),
  ]);

  if (id !== null && notified) await markApplicationNotified(id);
  if (id !== null && !notified) {
    console.error("[judge] stored but not notified — row", id);
  }
  if (id === null && notified) {
    console.error("[judge] notified but NOT stored — Sheet is the only copy");
  }

  return id !== null || notified;
}

export async function submitJudgeApplication(
  _prev: JudgeFormState,
  formData: FormData,
): Promise<JudgeFormState> {
  const values: JudgeFormValues = {
    judgeKind: formData.get("judgeKind") === "freelance" ? "freelance" : "volunteer",
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    jobTitle: String(formData.get("jobTitle") ?? ""),
    note: String(formData.get("note") ?? ""),
  };

  // Honeypot: humans never see this field. Report success and drop it on the
  // floor — an error response just tells the bot which field to stop filling.
  if (String(formData.get("website") ?? "").trim() !== "") {
    console.warn("[judge] honeypot tripped — submission dropped");
    return { status: "success", message: copy.success };
  }

  const parsed = judgeSchema.safeParse({
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
        phone: flat.phone?.[0],
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
