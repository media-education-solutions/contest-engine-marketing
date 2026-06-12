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
    "Most contest software was designed in an office. This one was designed in a classroom, a convention hall, and a statewide festival that outgrew every tool it was running on.",
};

export const story: NarrativeProps = {
  kicker: "The origin story",
  title: "From the Shoots Summit to a platform",
  paragraphs: [
    "For more than two decades, our founder ran large-scale student media contests — for organizations like the Student Television Network, and most recently the Shoots Summit Hawai'i, a statewide media competition organized by the Hawaii Creative Media Foundation in partnership with the Hawaii Department of Education.",
    "After four successful years, the Shoots Summit had become too large to manage with forms feeding spreadsheets, judges coordinated across multiple email chains, and entries scattered through third-party tools. It was a lot to handle — and if the event kept growing, hiring more people wasn't going to scale.",
    `So we built ${site.productName}: a purpose-built platform that handles the entire lifecycle of a media competition, from submission collection through judging, recognition, and results publishing.`,
    "What started as a fix for one festival now runs statewide and regional contests across the country — and every feature in it exists because a real contest needed it.",
  ],
  pullQuote: "People want their work to matter.",
};

export const valueProps: FeatureGridProps = {
  kicker: "What you get",
  title: "Five reasons festivals make the switch",
  tone: "muted",
  features: [
    {
      icon: Layers,
      title: "Everything in one place",
      body: "Collection, evaluation, recognition, and publishing in a single platform — instead of forms, spreadsheets, cloud drives, email chains, and broken links stitched together.",
    },
    {
      icon: Sparkles,
      title: "Fairness by design",
      body: "Anonymous entries, guided scoring tiers, and admin review before anything goes public. The process is defensible when parents, teachers, and principals ask how winners were picked.",
    },
    {
      icon: Trophy,
      title: "Recognition that motivates",
      body: "Winner showcases, named achievement tiers, and written feedback for every student. Recognition drives participation — and participation builds programs.",
    },
    {
      icon: Library,
      title: "Own your assets",
      body: "Every contest builds a rights-cleared library of your students' best work — yours to download, archive, and showcase long after the awards night ends.",
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
  title: "Contests turn passive students into creators",
  intro:
    "Structured competition activates three core human drives — and a well-run contest channels all of them into better work.",
  features: [
    {
      icon: Target,
      title: "Competence",
      body: "Challenges and clear goals inspire students to push their limits. Competing to a standard — not just against each other — elevates the quality of every entry.",
    },
    {
      icon: Compass,
      title: "Autonomy",
      body: "Students get a prompt and a deadline, but the story is theirs to tell. Freedom to create on their own terms is what makes the work worth judging.",
    },
    {
      icon: Heart,
      title: "Relatedness",
      body: "Being part of something bigger — a festival, a showcase, a community of creators — builds pride, loyalty, and the desire to contribute again next year.",
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
        "It was purpose-built for student media competitions by a 24-year media educator — anonymous judging, achievement tiers, code-based student entry, and written feedback aren't add-ons, they're the core design. Generic platforms treat education as an afterthought.",
    },
    {
      question: "Do students need accounts or email addresses?",
      answer:
        "No. Students enter with a contest code and a participant code provided by their teacher. The platform never collects student emails or personal accounts, which keeps it friendly to school privacy requirements.",
    },
    {
      question: "How does judging stay fair?",
      answer:
        "Judges see anonymized entries labeled A, B, C — never student names. Scoring uses a guided 1–10 scale with named tiers so different judges score consistently, and administrators review everything before results are published.",
    },
    {
      question: "Can it handle our festival's structure?",
      answer:
        "Contests support divisions (like elementary, middle, and high school) and categories (like animation, documentary, or photography) in any combination, each with its own deadlines, rules, and judges.",
    },
    {
      question: "What does it cost?",
      answer:
        "Plans start free for a single small contest and scale by program size — see the pricing page. Founder Legacy Pricing currently offers 50% off, locked in for up to five years of continuous renewal.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Your festival deserves better than a spreadsheet",
  subtitle: "Talk to us — we've run contests at every scale and we'll be straight about whether this fits yours.",
  cta: { label: "Talk to Us", href: "/contact" },
  secondaryCta: { label: "See pricing", href: "/pricing" },
};
