import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { PricingTiersProps } from "@/components/blocks/pricing-tiers";
import type { FaqProps } from "@/components/blocks/faq";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";
import { engines, quotedEngines, addOns as addOnCatalog, formatUsd } from "@/content/commerce";

const [single, classroom] = engines;
const [professional, convention, scholastic] = quotedEngines;

export const intro: PageIntroProps = {
  kicker: "Pricing",
  title: "Simple pricing. Flexible deployments.",
  subtitle: `Whether you're running a classroom challenge or a nationwide media competition, there's a ${site.productName} built for you.`,
};

export const pricing: PricingTiersProps = {
  title: "Start running contests today",
  // No per-card `cta`: online checkout is dormant (MED-41), so every card falls
  // through to the shared "Talk to Us" below. To re-enable Buy Now, add
  // `cta: { label: "Buy Now", href: `/buy?plan=${x.id}` }` to these two cards.
  tiers: [
    {
      name: single.name,
      audience: single.blurb,
      price: formatUsd(single.amountCents),
      priceNote: single.priceNote,
      features: [
        "One branded contest with unlimited categories and divisions",
        "One entry per category permitted",
        "Three-place winners podium: 1st, 2nd, and 3rd",
        "Accepts any media file up to 500 MB",
        "Up to 10 participant codes (teams or individuals)",
        "10 GB total media capacity",
      ],
    },
    {
      name: classroom.name,
      audience: classroom.blurb,
      price: formatUsd(classroom.amountCents),
      priceNote: classroom.priceNote,
      features: [
        "Up to four branded contests with unlimited categories and divisions",
        "One entry per category in each contest",
        "Three-place winners podium: 1st, 2nd, and 3rd",
        "Accepts any media file up to 500 MB",
        "Up to 40 participant codes over four contests (teams or individuals)",
        "Up to 40 GB media capacity over four contests",
      ],
    },
  ],
  suites: {
    title: "Configured for your organization",
    tiers: [
      {
        name: professional.name,
        audience: professional.blurb,
        pricePrefix: "Starting at",
        price: formatUsd(professional.startingCents),
        priceNote: professional.priceNote,
        features: [
          "One branded contest with unlimited categories and divisions",
          "Configurable entries per category with portfolio entry options",
          "Configurable file types and upload size limits",
          "Configurable winners podium",
          "Configurable participant access",
          "Configurable media capacity",
        ],
      },
      {
        name: convention.name,
        audience: convention.blurb,
        pricePrefix: "Starting at",
        price: formatUsd(convention.startingCents),
        priceNote: convention.priceNote,
        features: [
          "One branded contest with unlimited categories and divisions",
          "Configurable submissions per category with portfolio entry options",
          "Configurable file types and upload size limits",
          "Configurable winners podium",
          "Configurable participant access",
          "Configurable media capacity",
        ],
      },
      {
        name: scholastic.name,
        audience: scholastic.blurb,
        pricePrefix: "Starting at",
        price: formatUsd(scholastic.startingCents),
        priceNote: scholastic.priceNote,
        featured: true,
        badge: "Organizational Suite",
        features: [
          "Unlimited branded contests with unlimited divisions and categories",
          "Configurable file types, size limits, and entries per category",
          "Organizational Control: Contest Manager assignment system",
          "Advanced results publishing, winner showcases, and CSV reporting",
          "Configurable participant access",
          "Configurable media capacity",
        ],
      },
    ],
  },
  included: {
    title: "Every Engine includes",
    items: [
      "Secure cloud hosting",
      "Software updates",
      "Onboarding and training",
      "Technical support",
      "Anonymous judging",
      "Results publishing",
      "Winner showcases",
      "Participant feedback tools",
    ],
  },
  addOns: {
    title: "Add-ons",
    intro: "Extend a Single or Classroom Engine. Ask us about add-ons when you get in touch.",
    items: addOnCatalog.map((a) => ({
      name: a.name,
      description: a.blurb,
      price: formatUsd(a.amountCents),
    })),
  },
  cta: { label: "Talk to Us", href: "/contact" },
};

export const faq: FaqProps = {
  kicker: "Pricing FAQs",
  title: "A few questions we hear all the time",
  items: [
    {
      question: "How is pricing determined?",
      answer: "Single and Classroom Engines have fixed prices. Professional, Convention, and Scholastic Engines start at the listed price and are configured to the size, structure, and goals of your program.",
    },
    {
      question: "Can we upgrade later?",
      answer: "Absolutely. Start with a Single or Classroom Engine and add capacity as you grow. More participant codes and extra storage are available as add-ons. When you're ready for more, move up to a Professional, Convention, or Scholastic Engine.",
    },
    {
      question: `Can we try ${site.productName} before committing?`,
      answer: `Yes. We'd be happy to schedule a live demonstration and talk through your event to make sure ${site.productName} is the right fit.`,
    },
    {
      question: "What's included with my subscription?",
      answer: "Every subscription includes software updates, secure hosting, onboarding, technical support, and access to the features included with your Engine. White Glove coordinator and operator services are also available and can be purchased as add-ons.",
    },
    {
      question: "Do you offer nonprofit or educational pricing?",
      answer: "Yes. Education and nonprofit organizations are at the heart of what we do. If your program has unique needs, let's talk.",
    },
    {
      question: "What if our contest doesn't fit neatly into one of these options?",
      answer: "That's exactly why we offer configurable Engines. Tell us about your event, and we'll recommend the best fit.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Not sure which deployment is right for your organization?",
  subtitle: `Every organization runs contests differently. Tell us what you're building, and we'll recommend the ${site.productName} that's right for your workflow.`,
  cta: { label: "Talk to Us", href: "/contact" },
};
