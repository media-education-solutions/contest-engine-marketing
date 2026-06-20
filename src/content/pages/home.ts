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
  kicker: "Film & photo competitions",
  title: "Run your media contest on one platform —",
  titleAccent: "from submission to celebration.",
  subtitle: `${site.productName} replaces the maze of forms, spreadsheets, and email chains. Collect video and photo entries, run fair anonymous judging, and celebrate every winner, all in one place.`,
  primaryCta: { label: "See how it works", href: "/how-it-works" },
  secondaryCta: { label: "Talk to Us", href: "/contact" },
};

export const logoCloud: LogoCloudProps = {
  title: "Trusted by media programs",
  logos: [
    { name: "Shoots Summit Hawai'i" },
    { name: "ASB 4-State" },
    { name: "ʻŌlelo Youth Xchange" },
  ],
};

export const beforeAfter: BeforeAfterProps = {
  kicker: "Why we built this",
  title: "Media competitions shouldn't run on spreadsheets",
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
    "Three steps take your media contest event from start to finish, without the administrative chaos.",
  steps: [
    {
      name: "Collect",
      title: "Open your contest",
      body: "Create categories, set deadlines, and hand out access codes. Participants upload video or photo entries from any device. No account creation needed.",
    },
    {
      name: "Evaluate",
      title: "Judge fairly, anywhere",
      body: "Judges score anonymous entries on a guided 1–10 scale, write feedback, and rank the top submissions, on their own schedule.",
    },
    {
      name: "Activate",
      title: "Celebrate the winners",
      body: "Publish winner showcases in a click. Participants review their feedback, and your organization builds a library of its best work.",
    },
  ],
};

export const featureGrid: FeatureGridProps = {
  kicker: `Why ${site.productName}`,
  title: "Everything a media competition needs, nothing it doesn't",
  intro:
    "Built with purpose by a media educator who spent 29 years in the classroom, and ran national-scale student competitions.",
  tone: "muted",
  features: [
    {
      icon: Film,
      title: "Video & photo entries",
      body: "Reliable uploads that survive poor Wi-Fi conditions at hotels, schools, and convention halls. Wi-Fi starts to buffer? Your work is safe for up to 72 hours, and will resume uploading when the connection strengthens. Entries are transcoded and stream instantly when judging opens.",
    },
    {
      icon: QrCode,
      title: "Code-based participant entry",
      body: "Participants join with a contest link and participant code. No accounts to create, no email addresses required.",
    },
    {
      icon: ShieldCheck,
      title: "Anonymous judging",
      body: "Judges see Entry A, B, C, never names. Fairness is built into the workflow, not bolted on.",
    },
    {
      icon: MessageSquareText,
      title: "Feedback for every participant",
      body: "Judges leave written feedback alongside scores, providing recognition and opportunities for growth. It's not just a scoreboard.",
    },
    {
      icon: Award,
      title: "Winner showcases",
      body: "Publish winner galleries with one click. Share by URL or embed them on your organization's website.",
    },
    {
      icon: Download,
      title: "Own your archive",
      body: "Every upload is yours. Download original files in bulk. Every contest grows your organization's rights-cleared media library.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Ready to retire the spreadsheets?",
  subtitle:
    "Tell us about your media contest and we'll show you what it looks like running on one platform.",
  cta: { label: "Talk to Us", href: "/contact" },
  secondaryCta: { label: "See how it works", href: "/how-it-works" },
};
