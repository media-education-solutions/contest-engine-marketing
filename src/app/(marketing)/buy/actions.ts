"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { resolveSelection, totalCents, buildLineItems } from "@/lib/commerce";
import { stripeClient } from "@/lib/stripe";
import { verifyTurnstile } from "@/lib/turnstile";
import { createPendingOrder } from "@/lib/purchase-delivery";
import { site } from "@/content/site";
import { form as copy } from "@/content/pages/buy";
import { US_PHONE_PATTERN } from "@/lib/utils";

/** Optional field, but if present must be a complete 10-digit US number. */
const optionalPhone = z
  .string()
  .trim()
  .optional()
  .default("")
  .refine((v) => v === "" || US_PHONE_PATTERN.test(v), copy.errors.invalidPhone);

const buySchema = z.object({
  plan: z.string().min(1),
  addOns: z.array(z.string()),
  teacherName: z.string().trim().min(1, "Please tell us your name.").max(200),
  email: z.email("Please enter a valid email address."),
  phone: optionalPhone,
  schoolName: z.string().trim().min(1, "Please tell us your school or organization.").max(300),
  schoolAddress: z.string().trim().max(500).optional().default(""),
  schoolPhone: optionalPhone,
  /** Honeypot — humans never fill this. */
  website: z.literal("").optional(),
});

export type BuyFormValues = {
  plan: string;
  addOns: string[];
  teacherName: string;
  email: string;
  phone: string;
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
};

export type BuyFormState = {
  status: "idle" | "redirect" | "error";
  message?: string;
  url?: string;
  fieldErrors?: Partial<
    Record<"teacherName" | "email" | "schoolName" | "phone" | "schoolPhone", string>
  >;
  /** Echoed back on error so the form re-renders with input intact. */
  values?: BuyFormValues;
};

/** Prod uses the canonical domain; dev derives from the request so localhost works. */
async function resolveOrigin(): Promise<string> {
  if (process.env.NODE_ENV === "production") return site.url;
  const h = await headers();
  const host = h.get("host") ?? "localhost:3010";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function submitBuy(
  _prev: BuyFormState,
  formData: FormData,
): Promise<BuyFormState> {
  const values: BuyFormValues = {
    plan: String(formData.get("plan") ?? ""),
    addOns: formData.getAll("addon").map(String),
    teacherName: String(formData.get("teacherName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    schoolName: String(formData.get("schoolName") ?? ""),
    schoolAddress: String(formData.get("schoolAddress") ?? ""),
    schoolPhone: String(formData.get("schoolPhone") ?? ""),
  };

  const parsed = buySchema.safeParse({
    ...values,
    website: formData.get("website"),
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    return {
      status: "error",
      message: copy.errors.generic,
      fieldErrors: {
        teacherName: flat.teacherName?.[0],
        email: flat.email?.[0],
        schoolName: flat.schoolName?.[0],
        phone: flat.phone?.[0],
        schoolPhone: flat.schoolPhone?.[0],
      },
      values,
    };
  }

  const human = await verifyTurnstile(
    formData.get("cf-turnstile-response") as string | null,
  );
  if (!human) {
    return { status: "error", message: copy.errors.notHuman, values };
  }

  // Amounts NEVER come from the form — only ids, resolved against the catalog.
  const items = resolveSelection({ plan: parsed.data.plan, addOns: parsed.data.addOns });
  if (!items) {
    return { status: "error", message: copy.errors.invalidSelection, values };
  }

  const stripe = stripeClient();
  if (!stripe) {
    return { status: "error", message: copy.errors.unavailable, values };
  }

  // Order row written BEFORE the Checkout Session — the abandoned-cart /
  // Stripe-outage safety net (see stripe-commerce-architecture memory).
  const orderId = await createPendingOrder({
    plan: parsed.data.plan,
    addOns: parsed.data.addOns,
    amountCents: totalCents(items),
    teacherName: parsed.data.teacherName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    schoolName: parsed.data.schoolName,
    schoolAddress: parsed.data.schoolAddress,
    schoolPhone: parsed.data.schoolPhone,
  });
  if (orderId === null) {
    return { status: "error", message: copy.errors.generic, values };
  }

  const origin = await resolveOrigin();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: buildLineItems(items),
    customer_email: parsed.data.email,
    client_reference_id: String(orderId),
    metadata: { order_id: String(orderId) },
    payment_intent_data: { metadata: { order_id: String(orderId) } },
    billing_address_collection: "required",
    success_url: `${origin}/buy/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/buy?canceled=1`,
  });

  if (!session.url) {
    return { status: "error", message: copy.errors.generic, values };
  }

  return { status: "redirect", url: session.url };
}
