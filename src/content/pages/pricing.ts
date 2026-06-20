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
    title: "Founder Legacy Pricing — 50% off, locked in",
    body: "Early customers get half off, honored for continuous renewal up to 3 years. The prices below show both.",
  },
  tiers: [
    {
      name: "Trial",
      audience: "Try the full workflow with one small contest.",
      price: "$49",
      priceNote: "one category contest",
      legacyPrice: "Free",
      features: [
        "One contest with multiple categories",
        "Up to 25 participant codes",
        "Basic judging workflow",
        "Results publishing & winner recognition",
      ],
    },
    {
      name: "Teacher Suite",
      audience: "Individual educators and classroom programs.",
      price: "$399",
      priceNote: "per year",
      legacyPrice: "$149/yr",
      features: [
        "Multiple contests with configurable categories & divisions",
        "Up to 100 submissions (100 participant codes), files up to 500MB",
        "Judging with standard & ranking tools",
        "Judge feedback & participant levels",
        "Winner showcase pages, entries downloadable",
      ],
      featured: true,
    },
    {
      name: "Coordinator Suite",
      audience: "Coordinators running larger events and competitions.",
      price: "$1,500",
      priceNote: "per year",
      legacyPrice: "$600/yr",
      features: [
        "Everything in Teacher Suite",
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
      price: "$5,000",
      priceNote: "per year",
      legacyPrice: "$2,500/yr",
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
        price: "$10,000",
        priceNote: "per year",
        legacyPrice: "$4,000/yr",
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
        price: "$10,000",
        priceNote: "per year",
        legacyPrice: "$4,000/yr",
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
        price: "$20,000",
        priceNote: "per year",
        legacyPrice: "$8,000/yr",
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
      question: "What is Founder Legacy Pricing exactly?",
      answer:
        "A 50% discount for early customers, honored for continuous renewal for up to 3 years. Lock it in now and your price stays put while the program grows.",
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
      question: "Is there a free way to evaluate it first?",
      answer:
        "Yes. The Trial tier is free under Founder Legacy Pricing and runs one real contest with multiple categories and up to 25 participants, so you can take the full workflow for a spin before committing.",
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
