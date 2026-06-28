import { Layers, Library, Sparkles, Trophy, Users, Compass, Heart, Target } from "lucide-react";
import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { NarrativeProps } from "@/components/blocks/narrative";
import type { FeatureGridProps } from "@/components/blocks/feature-grid";
import type { TestimonialsProps } from "@/components/blocks/testimonials";
import type { FaqProps } from "@/components/blocks/faq";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";

export const intro: PageIntroProps = {
  kicker: "Why we do it",
  title: "Built by an educator who lived the spreadsheet chaos",
  subtitle:
    "Most contest software was designed in an office. This one was designed in a classroom, a convention hall, and a statewide summit that outgrew every tool it was running on.",
};

export const story: NarrativeProps = {
  kicker: "The origin story",
  title: "From the Shoots Summit to a platform",
  paragraphs: [
    "For nearly two decades, our founder ran large-scale student media contests for organizations like the Student Television Network, and most recently the Shoots Summit Hawai'i, a statewide media competition organized by the Hawaii Creative Media Foundation in partnership with the Hawaii Department of Education.",
    "After four successful years, the Shoots Summit had become too large to manage with forms feeding spreadsheets, judges coordinated across multiple email chains, and entries scattered through third-party tools. It was a lot to handle. And if the event kept growing, hiring more people wasn't going to scale.",
    `So we built ${site.productName}: a purpose-built platform that handles the entire lifecycle of a media competition, from submission collection through judging, recognition, and results publishing.`,
    "What started as a fix for one festival now runs statewide and regional contests across the country. Every feature in it exists because a real contest needed it.",
  ],
  pullQuote: "People want their work to matter.",
};

export const valueProps: FeatureGridProps = {
  kicker: "What you get",
  title: "Five reasons organizations make the switch",
  tone: "muted",
  features: [
    {
      icon: Layers,
      title: "Everything in one place",
      body: "Collection, evaluation, recognition, and publishing in a single platform, instead of forms, spreadsheets, cloud drives, email chains, and broken links stitched together.",
    },
    {
      icon: Sparkles,
      title: "Fairness by design",
      body: "Anonymous entries, guided scoring tiers, and admin review before anything goes public. The process is defensible if anyone asks how winners were chosen.",
    },
    {
      icon: Trophy,
      title: "Recognition that motivates",
      body: "Winner showcases, named achievement tiers, and written feedback for every participant. Recognition drives participation, and participation builds programs.",
    },
    {
      icon: Library,
      title: "Own your assets",
      body: "Every contest builds a rights-cleared library of your participants' best work, yours to download, archive, and showcase long after the awards night ends.",
    },
    {
      icon: Users,
      title: "Built for school reality",
      body: "No student accounts or emails. Resumable uploads that survive school Wi-Fi. Judges who can work evenings from home. The details only an educator would think of.",
    },
  ],
};

export const psychology: FeatureGridProps = {
  kicker: "The psychology",
  title: "Contests turn passive groups into creators",
  intro:
    "Structured competition activates three core human drives, and a well-run contest channels all of them into better work.",
  features: [
    {
      icon: Target,
      title: "Competence",
      body: "Challenges and clear goals inspire people to push their limits. Competing to a standard, not just against each other, elevates the quality of every entry.",
    },
    {
      icon: Compass,
      title: "Autonomy",
      body: "Participants get a prompt and a deadline, but the story is theirs to tell. Freedom to create on their own terms is what makes the work worth judging.",
    },
    {
      icon: Heart,
      title: "Relatedness",
      body: "Being part of something bigger (a summit, a showcase, a community of creators) builds pride, loyalty, and the desire to contribute again next year.",
    },
  ],
};

/** Empty until real quotes arrive — block renders nothing meanwhile. */
export const testimonials: TestimonialsProps = {
  kicker: "From the field",
  title: "What organizers say",
  items: [],
};

export const faq: FaqProps = {
  kicker: "Questions",
  title: "Frequently asked questions",
  items: [
    {
      question: `What makes ${site.productName} different from generic contest software?`,
      answer:
        "It was purpose-built for student media competitions by a 29-year media educator. Anonymous judging, achievement tiers, code-based entry, and written feedback aren't add-ons, they're the core design.",
    },
    {
      question: "Do participants need accounts or email addresses?",
      answer:
        "No. Participants access a contest using a link and a code provided by their group leader. The platform does not require any personal accounts or private information to participate, which meets privacy requirements for minors.",
    },
    {
      question: "How does judging stay fair?",
      answer:
        "Judges see anonymized entries labeled A, B, C, never participant names. Scoring uses a guided 1–10 scale with named tiers so different judges score consistently, and administrators review everything before results are published.",
    },
    {
      question: "Can it handle our event's structure?",
      answer:
        "Contests support divisions (like elementary, middle, high school, or expert and beginner) and categories (like animation, documentary, or photography) in any combination, each with its own deadlines, rules, and judges.",
    },
    {
      question: "What does it cost?",
      answer:
        "Pricing is configured to your event's size and structure, with flexible suite deployments. See the pricing page, or talk to us to scope a plan.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Your event deserves better than a spreadsheet",
  subtitle: "Talk to us. We've run contests at every scale and we'll be straight about whether this fits yours.",
  cta: { label: "Talk to Us", href: "/contact" },
  secondaryCta: { label: "See pricing", href: "/pricing" },
};
