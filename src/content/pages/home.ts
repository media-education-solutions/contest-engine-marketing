import {
  Award,
  Film,
  MessageSquareText,
  QrCode,
  ShieldCheck,
  Download,
} from "lucide-react";
import type { HeroProps } from "@/components/blocks/hero";
import type { LogoCloudProps } from "@/components/blocks/logo-cloud";
import type { BeforeAfterProps } from "@/components/blocks/before-after";
import type { ProcessStepsProps } from "@/components/blocks/process-steps";
import type { FeatureGridProps } from "@/components/blocks/feature-grid";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";

export const hero: Omit<HeroProps, "media"> = {
  kicker: "Student film & photo festivals",
  title: "Run your media contest on one platform —",
  titleAccent: "from submission to celebration.",
  subtitle: `${site.productName} replaces the maze of forms, spreadsheets, and email chains. Collect student video and photo entries, run fair anonymous judging, and celebrate every winner, all in one place.`,
  primaryCta: { label: "See how it works", href: "/how-it-works" },
  secondaryCta: { label: "Talk to Us", href: "/contact" },
};

export const logoCloud: LogoCloudProps = {
  title: "Trusted by student media programs",
  logos: [
    { name: "Shoots Summit Hawai'i" },
    { name: "ASB 4-State" },
    { name: "ʻŌlelo Youth Xchange" },
  ],
};

export const beforeAfter: BeforeAfterProps = {
  kicker: "Why we built this",
  title: "Festival season shouldn't run on spreadsheets",
  before: {
    label: "The old way",
    items: [
      "Google Forms feeding an endless matrix of spreadsheets",
      "Private or broken YouTube links the night judging starts",
      "Judges buried in reply-all email chains",
      "Results assembled by hand, hours before the awards ceremony",
    ],
  },
  after: {
    label: `With ${site.productName}`,
    items: [
      "One portal where every entry lands, organized by category",
      "Uploads stream straight to judges the moment deadlines pass",
      "Judges score and give feedback on their own schedule",
      "Winner showcases published in a couple of clicks",
    ],
  },
};

export const processSteps: ProcessStepsProps = {
  kicker: "How it works",
  title: site.tagline,
  intro:
    "Three steps take your festival from open call to awards night, without the administrative chaos.",
  steps: [
    {
      name: "Collect",
      title: "Open your contest",
      body: "Create categories, set deadlines, and hand out access codes. Students upload video or photo entries from any device. No student accounts needed.",
    },
    {
      name: "Evaluate",
      title: "Judge fairly, anywhere",
      body: "Judges score anonymous entries on a guided 1–10 scale, write feedback, and rank their top three, on their own schedule.",
    },
    {
      name: "Activate",
      title: "Celebrate the winners",
      body: "Publish winner showcases in a click. Students get their feedback, and your program builds a library of its best work.",
    },
  ],
};

export const featureGrid: FeatureGridProps = {
  kicker: `Why ${site.productName}`,
  title: "Everything a festival needs, nothing it doesn't",
  intro:
    "Purpose-built by a 24-year media educator who ran national-scale student competitions, not adapted from generic contest software.",
  tone: "muted",
  features: [
    {
      icon: Film,
      title: "Video & photo entries",
      body: "Resumable uploads that survive school Wi-Fi. Entries are transcoded and stream instantly when judging opens.",
    },
    {
      icon: QrCode,
      title: "Code-based student entry",
      body: "Students join with a contest code and participant code. No accounts to create, no student emails collected.",
    },
    {
      icon: ShieldCheck,
      title: "Anonymous judging",
      body: "Judges see Entry A, B, C, never names. Fairness is built into the workflow, not bolted on.",
    },
    {
      icon: MessageSquareText,
      title: "Feedback for every student",
      body: "Judges leave written feedback alongside scores: recognition and growth, not just a scoreboard.",
    },
    {
      icon: Award,
      title: "Winner showcases",
      body: "Publish top-three galleries with one click. Share by URL or embed them on your school's site.",
    },
    {
      icon: Download,
      title: "Own your archive",
      body: "Download original files in bulk. Every contest grows your program's rights-cleared media library.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Ready to retire the spreadsheets?",
  subtitle:
    "Tell us about your festival and we'll show you what it looks like running on one platform.",
  cta: { label: "Talk to Us", href: "/contact" },
  secondaryCta: { label: "See how it works", href: "/how-it-works" },
};
