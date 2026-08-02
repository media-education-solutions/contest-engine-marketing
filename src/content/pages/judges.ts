import { MessageSquareText, Scale } from "lucide-react";
import type { HeroProps } from "@/components/blocks/hero";
import type { NarrativeProps } from "@/components/blocks/narrative";
import type { FeatureSplitProps } from "@/components/blocks/feature-split";
import type { TagListProps } from "@/components/blocks/tag-list";
import type { ProcessStepsProps } from "@/components/blocks/process-steps";
import type { FeatureGridProps } from "@/components/blocks/feature-grid";
import type { FaqProps } from "@/components/blocks/faq";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";

export const hero: Omit<HeroProps, "media"> = {
  kicker: "For media professionals",
  title: `Become a ${site.productName} Judge`,
  subtitle:
    "Help recognize the next generation of storytellers. Every great contest depends on great judges, and " +
    `${site.productName} makes evaluation simple, fair, and meaningful for any media professional.`,
  primaryCta: { label: "Become a Judge", href: "#apply" },
};

export const whyJudge: NarrativeProps = {
  title: "Why Judge?",
  paragraphs: [
    "Judging isn't just about selecting winners. It's about encouraging creativity, recognizing excellence, and helping creators improve. Whether you're volunteering a few hours a year or looking for freelance judging opportunities, " +
      `${site.productName} makes the entire experience simple and flexible.`,
  ],
  pullQuote: "Every submission deserves more than just a score.",
  pullQuoteIndex: 0,
};

export const anywhere: Omit<FeatureSplitProps, "media"> = {
  kicker: "Flexible by design",
  title: "Judge From Anywhere",
  body: "No software to install, no media to download, no spreadsheets, no flash drives. Everything happens securely inside your web browser. Judge from:",
  bullets: ["Home", "Office", "Classroom", "Laptop", "Tablet", "Desktop computer"],
};

export const whatYoullJudge: TagListProps = {
  kicker: "What you'll judge",
  title: "What You'll Judge",
  intro: `${site.productName} supports virtually any creative media competition. Examples include:`,
  items: [
    "Broadcast Journalism",
    "Multimedia Storytelling",
    "Photography",
    "Short Films",
    "Documentaries",
    "Sports Features",
    "Podcasts",
    "Social Media Campaigns",
    "Brand Ambassador Content",
    "Marketing Campaigns",
    "Fan Content",
    "Scholarship Portfolios",
  ],
};

export const steps: ProcessStepsProps = {
  kicker: "How judging works",
  title: "How Judging Works",
  intro: "Four simple steps.",
  columns: 4,
  steps: [
    {
      name: "Log In",
      title: "Sign in with your invite",
      body: "You'll receive a secure email invitation. Sign in and immediately see the categories assigned to you.",
    },
    {
      name: "Review Entries",
      title: "Watch every submission",
      body: "All media plays directly in your browser, no downloads required. Anonymous participant judging keeps every evaluation fair and focused on the work.",
    },
    {
      name: "Evaluate",
      title: "Score and leave feedback",
      body: "Every entry receives a Universal Performance Rubric score (1–10 rating) and written comments. Your feedback helps participants improve long after the contest ends.",
    },
    {
      name: "Rank Winners",
      title: "Fill the winner's podium",
      body: "Once every entry in a category has been evaluated, drag your top entries onto the podium: first, second, third, or however many recognition slots the organizer has configured. Click Mark Judging Complete and you're finished.",
    },
  ],
};

export const features: TagListProps = {
  kicker: "Why judges love Contest Engine",
  title: "Built specifically for judging creative media.",
  tone: "muted",
  items: [
    "Anonymous participant judging",
    "Universal Performance Rubric",
    "Full-screen video playback",
    "Full-screen photo viewing",
    "No media downloads required",
    "Browser-based judging",
    "Desktop or tablet compatible",
    "Remote judging from anywhere",
    "Drag-and-drop Winner Podium",
    "One-click judging completion",
    "Auto-save while judging",
    "Category-specific assignments",
    "Written feedback tools",
    "Secure login",
    "Modern, distraction-free interface",
  ],
};

export const whyItWorks: FeatureGridProps = {
  title: "Why It Works",
  tone: "default",
  features: [
    {
      icon: Scale,
      title: "Fair Evaluation Matters",
      body: "Contest Engine separates scoring from ranking. First, evaluate every submission against the same standard, then rank the strongest work. This two-step process creates more consistent judging while letting you focus on one decision at a time.",
    },
    {
      icon: MessageSquareText,
      title: "Your Feedback Matters",
      body: "Winning is exciting. Feedback is valuable forever. Every comment you leave helps participants become stronger storytellers, filmmakers, photographers, journalists, marketers, and creators. Many say the written feedback is the most valuable part of the experience.",
    },
  ],
};

export const faq: FaqProps = {
  kicker: "Questions",
  title: "Frequently Asked Questions",
  items: [
    {
      question: "Do I need special software?",
      answer: "No. Everything works inside your browser.",
    },
    {
      question: "Can I judge remotely?",
      answer: "Yes, anywhere with an internet connection.",
    },
    {
      question: "Can I judge on a tablet?",
      answer: `Yes, ${site.productName} works on desktop and tablet devices.`,
    },
    {
      question: "Are submissions anonymous?",
      answer: `Yes, ${site.productName} defaults to anonymous participant judging. Participant identities may remain hidden throughout evaluation. Ultimately, the organizer chooses what information a judge sees.`,
    },
    {
      question: "Can multiple judges review the same category?",
      answer:
        `Yes. While ${site.productName} works best with single-judge evaluation, the Jury Style review option offers multiple judges depending on an organization's evaluation workflow. This allows flexibility for marketing teams and large organizations that want to utilize multiple judges, or are in an on-site convention or conference setting.`,
    },
    {
      question: "How long does judging take?",
      answer:
        "Every contest event is different. Organizers determine the nature and number of submissions assigned to each judge, usually 2-4 hours per category under normal circumstances. Freelance paid judges are an option when entries are in bigger numbers or require extensive written feedback per entry.",
    },
    {
      question: "Will I receive training?",
      answer: `Yes. ${site.productName} is so simple, you won't need much training at all. Every judge has access to onboarding materials, walkthrough videos, and platform documentation before judging begins, and the ${site.companyShortName} staff is always available to help troubleshoot or solve judging questions.`,
    },
  ],
};

export const greatJudge: TagListProps = {
  title: "Who Makes a Great Judge?",
  intro:
    "A lot of media professionals think, \"I'm probably not qualified.\" But that's not true. You don't have to be in a media leadership role, famous, or connected to be valuable. Are you one of these?",
  items: [
    "Legacy Media Manager",
    "Independent Journalist",
    "Content Creator",
    "College or University Media Faculty",
    "Professional Photographer",
    "Professional Videographer",
    "Television Crew or Producer",
    "Video or Film Editor",
    "Graphic Designer",
    "Marketing Professional",
    "Public Relations Specialist",
    "Creative Director",
    "Media Degree Seeking College Students & Grad Assistants",
    "Retired Media Industry",
    "Media Organization Alumni",
    "Community Media Production Staff",
    "Communications Liaison",
    "Media Business Owner",
    "Media Nonprofit Leader",
  ],
  note: "If you've created, edited, evaluated, or managed creative work in any way, you may already have exactly the experience we're looking for. Emerging storytellers need meaningful evaluation by real people with real experience.",
};

export type ApplyContent = {
  kicker?: string;
  title: string;
  subtitle: string;
  volunteer: { label: string; intro: string; bullets: string[] };
  freelance: { label: string; body: string };
};

export const apply: ApplyContent = {
  kicker: "Apply now",
  title: "Ready to Judge?",
  subtitle:
    "Whether you're volunteering your expertise or looking for freelance judging opportunities, we'd love to hear from you.",
  volunteer: {
    label: "Volunteer Judge Interest Form",
    intro: "Perfect for:",
    bullets: [
      "Current Industry Professionals",
      "Retired Media Professionals",
      "Organization Alumni & Leadership",
      "Public Figures & Community Leaders",
    ],
  },
  freelance: {
    label: "Freelance Judge Interest Form",
    body: "Interested in paid judging opportunities? Do you have experience judging or evaluating media? Are you a hybrid media professional and educator? Join our evaluator network and we'll contact you when organizations are hiring judges.",
  },
};

export const ctaBanner: CtaBannerProps = {
  title: "Great competitions deserve great judges.",
  subtitle:
    "Help recognize outstanding work. Help emerging creators improve. Help shape the next generation of storytellers.",
  cta: { label: "Become a Judge", href: "#apply" },
};

export const form = {
  errors: {
    fields: "Please fix the highlighted fields.",
    notHuman: "We couldn't verify you're human. Please try again.",
    delivery:
      "Something went wrong sending your application. Please try again in a moment.",
    invalidPhone: "Enter a valid 10-digit phone number.",
  },
  success: "Thanks for stepping up to judge! We'll be in touch soon.",
};
