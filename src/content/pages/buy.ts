import type { PageIntroProps } from "@/components/blocks/page-intro";

export const intro: PageIntroProps = {
  kicker: "Buy",
  title: "Purchase your Engine",
  subtitle: `Pick your Engine, add any extras, and check out securely. We'll follow up by email to get your account activated.`,
};

export const form = {
  engineLabel: "Engine",
  addOnsLabel: "Add-ons",
  summaryLabel: "Order total",
  fields: {
    teacherName: "Your name",
    email: "Email",
    phone: "Phone",
    schoolName: "School or organization",
    schoolAddress: "School or organization address",
    schoolPhone: "School or organization phone",
  },
  submitLabel: "Continue to payment",
  submitPendingLabel: "Redirecting to checkout…",
  poNote: {
    text: "Need to pay by purchase order or check?",
    linkLabel: "Talk to us",
    href: "/contact",
  },
  errors: {
    generic: "Something went wrong. Please try again in a moment.",
    notHuman: "We couldn't verify you're human. Please try again.",
    unavailable: "Purchasing is temporarily unavailable — please contact us instead.",
    invalidSelection: "That selection isn't valid. Please refresh the page and try again.",
    invalidPhone: "Enter a valid 10-digit phone number.",
  },
};

export const disabled = {
  title: "Purchasing is temporarily unavailable",
  body: "We're not able to process payments online right now. Contact us and we'll get your Engine set up.",
  cta: { label: "Contact us", href: "/contact" },
};

export const success = {
  kicker: "Thank you",
  title: "Payment received",
  subtitle:
    "We'll follow up by email within one business day to activate your Engine and get your contest started.",
  cta: { label: "Back to pricing", href: "/pricing" },
};
