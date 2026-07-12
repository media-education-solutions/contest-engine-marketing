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
  title: "Built from experience, not assumptions.",
  subtitle: `${site.productName} was shaped by years of running real media competitions with real students, real judges, and real deadlines. Not by guessing how contests should work.`,
};

export const story: NarrativeProps = {
  kicker: "The origin story",
  title: "From the founder",
  paragraphs: [
    "I never planned to build software. I just got tired of wishing it existed.",
    "For nearly 20 years, I've run some of the nation's largest student media competitions through organizations like the Student Television Network and, more recently, Shoots Summit Hawaiʻi. Every year the events grew, but the technology rarely kept up.",
    `I wanted a platform that made running a contest feel almost invisible, leaving the focus where it belongs: on the work itself. So I built ${site.productName}.`,
    "If the software does its job well, nobody notices it. They remember the stories, the creativity, and the experience of being part of something meaningful.",
    `I don't believe growth and opportunity should be limited by budget, staffing, or legacy systems. If you have a community, a mission, and people creating great work, you should have the tools to recognize it. ${site.productName} is my contribution toward making that possible.`,
    `Today, organizations across the country use ${site.productName} to run media competitions of every size. Every feature was earned by solving a real problem for a real contest.`,
  ],
  pullQuote: "People want their work to matter.",
  pullQuoteIndex: 2,
  signature: { name: "Jeb Brunt", role: `Founder, ${site.companyShortName}` },
};

export const valueProps: FeatureGridProps = {
  kicker: "What you get",
  title: `Why organizations choose ${site.productName}`,
  tone: "muted",
  features: [
    {
      icon: Layers,
      title: "One platform. One workflow.",
      body: "From submissions and judging to feedback, results, and winner showcases, everything happens in one place. No patchwork of spreadsheets, cloud drives, forms, and email threads.",
    },
    {
      icon: Sparkles,
      title: "Fairness by design",
      body: "Anonymous entries, guided scoring, and built-in oversight create a fair, consistent process you can confidently explain to participants, educators, parents, and stakeholders.",
    },
    {
      icon: Trophy,
      title: "Recognition that motivates",
      body: "Every media contest is an opportunity to celebrate great work. Winner showcases, written feedback, achievement awards, and participant recognition help build stronger programs year after year.",
    },
    {
      icon: Library,
      title: "Own your assets",
      body: "Build a library of rights-cleared video, photo, and creative work that belongs to your organization, ready to download, archive, and showcase long after the event is over.",
    },
    {
      icon: Users,
      title: "Built for school reality",
      body: "No student accounts. No unnecessary barriers. Reliable uploads on school Wi-Fi. Remote judging. Thoughtful details shaped by years of running real media competitions.",
    },
  ],
};

export const psychology: FeatureGridProps = {
  kicker: "The psychology",
  title: "Why contests work",
  intro:
    "The best contests do more than recognize great work. They give people a reason to create, improve, and come back ready to do it again.",
  features: [
    {
      icon: Target,
      title: "Competence",
      body: "Challenges and clear goals inspire people to push their limits. Competing to a standard, not just against each other, elevates the quality of every entry.",
    },
    {
      icon: Compass,
      title: "Autonomy",
      body: "Participants receive the prompt and the deadline, but the story is still theirs to tell. That creative freedom is what makes the work authentic.",
    },
    {
      icon: Heart,
      title: "Relatedness",
      body: "Being part of something bigger and meaningful builds pride, loyalty, and the desire to contribute again next time.",
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
      question: `What makes ${site.productName} different?`,
      answer: `${site.productName} wasn't adapted from generic contest software. It was built from the ground up by a media educator who spent nearly 20 years running some of the nation's largest media competitions. Every feature exists because a real contest needed it.`,
    },
    {
      question: `Can ${site.productName} support the way we already run our event?`,
      answer: `Yes. Create divisions, categories, deadlines, judging panels, award levels, and custom rules that fit your event, not the other way around. Whether you're running a classroom challenge or a national convention, ${site.productName} scales with you.`,
    },
    {
      question: "How does judging stay fair?",
      answer: "Judges evaluate anonymized entries, not participant names. Guided scoring, written feedback, and administrator review create a consistent, transparent judging process you can stand behind.",
    },
    {
      question: "Do participants need accounts or email addresses?",
      answer: "No. Participants submit using a contest link and access code provided by your organization. No personal accounts, passwords, or student email addresses are required.",
    },
    {
      question: "Who owns the submitted media?",
      answer: `Your organization does. ${site.productName} gives you the tools to collect, judge, recognize, and manage submissions, while you maintain control over your media and how it's used.`,
    },
    {
      question: "How is pricing determined?",
      answer: "Every organization is different. Pricing is based on the size and structure of your event, with flexible suite configurations for schools, nonprofits, associations, brands, and media organizations. Visit our pricing page or contact us for a customized quote.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "If you run media contests,\nyou deserve better than a spreadsheet.",
  subtitle: "Tell us what you're building. We'll show you what's possible.",
  cta: { label: "Talk to Us", href: "/contact" },
};
