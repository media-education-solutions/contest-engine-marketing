import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { PricingTiersProps } from "@/components/blocks/pricing-tiers";
import type { FaqProps } from "@/components/blocks/faq";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";

export const intro: PageIntroProps = {
  kicker: "Pricing",
  title: "Plans that scale with your organization",
  subtitle:
    "From a single classroom contest to a nationwide media event. Start small, grow when your organization does.",
};

export const pricing: PricingTiersProps = {
  title: "Annual plans",
  notice: {
    title: "Pricing that scales to your event",
    body: "Flexible suite configurations and deployment options ranging from $500–$20,000. We scale to every size and shape to match your event!",
  },
  tiers: [
    {
      name: "Coordinator Suite",
      audience: "Coordinators running larger events and competitions.",
      features: [
        "Configurable categories, divisions & judging tools",
        "Up to 250 submissions",
        "125 GB stream storage",
        "QR code & unlimited participant code access",
        "Configurable entries per category & winner slots",
        "Advanced sharing: Copy URL & Copy Embed",
        "Add-on submissions & storage available",
      ],
    },
    {
      name: "Advanced Coordinator",
      audience: "Events that need registration management too.",
      features: [
        "Everything in Coordinator Suite",
        "Up to 1,000 submissions",
        "500 GB stream storage",
        "Contest, participant & advisor registration",
        "Event registration workflows",
        "Advanced administrative tools",
        "Add-on submissions & storage available",
      ],
    },
  ],
  suites: {
    title: "Program & organization suites",
    tiers: [
      {
        name: "Scholastic Media Suite",
        audience: "Educational media organizations with year-round programs.",
        features: [
          "Multiple contests with configurable categories & divisions",
          "Up to 2,000 submissions across multiple annual programs",
          "1 TB stream storage",
          "Contest registration system",
          "Advanced judging & results sharing tools",
          "Winner showcase pages",
          "Event support and training",
        ],
      },
      {
        name: "Corporate Media Suite",
        audience: "Brands activating customers, employees & ambassadors.",
        features: [
          "Up to 2,000 submissions, multiple annual campaigns",
          "1 TB stream storage",
          "Registration system",
          "Specialized evaluation workflows",
          "Content activation & asset management tools",
          "Priority support",
        ],
      },
      {
        name: "Sports Marketing Suite",
        audience: "Teams, universities & fan engagement initiatives.",
        features: [
          "Up to 5,000 submissions",
          "10 TB stream storage",
          "Fan & athlete content challenges",
          "Sponsor-supported campaigns",
          "Streaming library packages available (unlimited storage capacity)",
          "Priority support",
        ],
      },
    ],
  },
  cta: { label: "Talk to Us", href: "/contact" },
};

export const faq: FaqProps = {
  kicker: "Pricing questions",
  title: "The fine print, in plain English",
  items: [
    {
      question: "How much does Contest Engine cost?",
      answer:
        "Pricing depends on your event's size and structure. Every suite is configured per organization. Tell us what you're running and we'll scope the right setup.",
    },
    {
      question: "What counts as a submission?",
      answer:
        "One uploaded entry (video or photo) from one participant in one category. Plans are sized by total submissions across your contests for the year.",
    },
    {
      question: "Can we upgrade mid-season?",
      answer:
        `Yes. If your event outgrows its plan mid-year, you can move up a tier and we'll pro-rate the difference. Nobody's contest gets stopped at the deadline because of a plan limit.`,
    },
    {
      question: "Is there a way to evaluate it first?",
      answer:
        `Yes. Reach out and we'll set you up to run a real contest end to end so you can take the full ${site.productName} workflow for a spin before committing.`,
    },
    {
      question: "Do you offer demos?",
      answer:
        `Absolutely. Reach out through the contact page and we'll walk you through ${site.productName} with a contest structured like yours.`,
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Not sure which plan fits?",
  subtitle:
    "Tell us your event size and structure. We'll tell you honestly what you need (and what you don't).",
  cta: { label: "Talk to Us", href: "/contact" },
};
