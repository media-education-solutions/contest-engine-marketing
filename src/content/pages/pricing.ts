import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { PricingTiersProps } from "@/components/blocks/pricing-tiers";
import type { FaqProps } from "@/components/blocks/faq";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";
import { portals, addOns as addOnCatalog, formatUsd } from "@/content/commerce";

const [teacherPortal, coordinatorPortal] = portals;

export const intro: PageIntroProps = {
  kicker: "Pricing",
  title: "Simple pricing. Flexible deployments.",
  subtitle: `Whether you're running a classroom challenge or a nationwide media competition, there's a ${site.productName} built for you.`,
};

export const pricing: PricingTiersProps = {
  title: "Annual plans",
  tiers: [
    {
      name: "Teacher Portal",
      audience: "Professional media contests for classrooms and small creative programs.",
      price: formatUsd(teacherPortal.amountCents),
      priceNote: teacherPortal.priceNote,
      features: [
        "One branded contest portal",
        "Multiple photo and video categories",
        "Anonymous judging with written feedback",
        "Three-place winners podium",
        "Results publishing and winner showcases",
        "Download, embed, and share winning work",
        "25 participant access codes",
        "25 GB media library with configurable upload limits",
      ],
      cta: { label: "Buy Now", href: "/buy?plan=teacher-portal" },
    },
    {
      name: "Coordinator Portal",
      audience: "Built for schools, nonprofit coordinators, and growing media programs.",
      price: formatUsd(coordinatorPortal.amountCents),
      priceNote: coordinatorPortal.priceNote,
      features: [
        "Everything in the Teacher Portal",
        "Configurable divisions and categories",
        "Multiple submissions and portfolio entries",
        "Up to five-place winners podium",
        "QR code participant access",
        "100 participant access codes",
        "100 GB media library",
        "180-day media hosting and streaming",
      ],
      cta: { label: "Buy Now", href: "/buy?plan=coordinator-portal" },
    },
  ],
  suites: {
    title: "Suite deployments",
    tiers: [
      {
        name: "Scholastic Media Suite",
        audience: "For organizations running large-scale media competitions year-round.",
        features: [
          "Multiple contest events",
          "Multiple divisions and categories",
          "Branded participant portals",
          "Anonymous judging workflows",
          "Contest operator management",
          "Event registration system",
          "Flexible media library options",
          "Advanced results publishing and winner showcases",
          "Everything you need to manage complex media competitions",
        ],
      },
      {
        name: "Marketing & Corporate Suite",
        audience: "Turn your community into your creative team. Built for brands and creator communities running user-generated content campaigns.",
        features: [
          "Multiple campaign events",
          "Branded participant portals",
          "Photo and video submissions",
          "Anonymous evaluation workflows",
          "Campaign operator management",
          "QR code participant access",
          "Flexible media library options",
          "Advanced publishing and showcase tools",
          "Rights-managed media collection for future marketing",
        ],
      },
    ],
  },
  included: {
    title: `Every ${site.productName} subscription includes`,
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
    intro: "Extend any Portal. Add them at checkout or any time after.",
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
      answer: "Portals have fixed annual pricing. Suite deployments are customized based on the size, structure, and goals of your program.",
    },
    {
      question: "Can we upgrade later?",
      answer: "Absolutely. Organizations can start with a Portal and add more capacity until they're ready to move into a Suite. More participants, added accessibility, and larger file capacity can all be purchased as add-ons — see the pricing above for what's available.",
    },
    {
      question: `Can we try ${site.productName} before committing?`,
      answer: `Yes. We'd be happy to schedule a live demonstration and talk through your event to make sure ${site.productName} is the right fit.`,
    },
    {
      question: "What's included with my subscription?",
      answer: "Every subscription includes software updates, secure hosting, onboarding, technical support, and access to the features included with your Portal or Suite. White Glove coordinator and operator services are also available and can be purchased as add-ons.",
    },
    {
      question: "Do you offer nonprofit or educational pricing?",
      answer: "Yes. Education and nonprofit organizations are at the heart of what we do. If your program has unique needs, let's talk.",
    },
    {
      question: "What if our contest doesn't fit neatly into one of these options?",
      answer: "That's exactly why we offer customized Portal and Suite deployments. Tell us about your event, and we'll recommend the best fit.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Not sure which deployment is right for your organization?",
  subtitle: `Every organization runs contests differently. Tell us what you're building, and we'll recommend the ${site.productName} that's right for your workflow.`,
  cta: { label: "Talk to Us", href: "/contact" },
};
