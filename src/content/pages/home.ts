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
  kicker: "Video and photo competitions",
  title: "Run your entire media competition",
  titleAccent: "from one platform.",
  subtitle:
    "Built for submissions, judging, feedback, and results. We make collecting and managing media submissions an easy process, so you can focus on celebrating and showcasing the great work.",
  primaryCta: { label: "How It Works", href: "/how-it-works" },
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
    label: "Print-era contest platforms: the old way",
    items: [
      "Collection forms feeding an endless matrix of spreadsheets",
      "Private or broken YouTube/Google links",
      "Organizers, coordinators, and judges buried in email chains",
      "Judging often ends at the selection of winners, and feedback is often lacking",
      "Results exported to spreadsheets, then compiled and published manually",
    ],
  },
  after: {
    label: site.productName,
    items: [
      "One portal where every entry lands, organized by category",
      "Uploads stream immediately to the judges' portal for review",
      "Judges review and write feedback directly in the platform",
      "Winners are showcased and private participant feedback is published with a couple of clicks",
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
      body: "Create categories and divisions, set deadlines, and post a QR code. Participants upload video or photo entries from any device. No account creation needed.",
    },
    {
      name: "Evaluate",
      title: "Judge fairly, from anywhere",
      body: "Judges log in and review anonymous entries, write feedback, and rank the top submissions on the winner's podium. Organizers can verify judges' selections before publishing.",
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
  title: "Everything a media competition needs,\nnothing it doesn't",
  intro:
    "Built by people who've spent a couple decades running some of the nation's largest media competitions.",
  tone: "muted",
  features: [
    {
      icon: Film,
      title: "Video & photo entry",
      body: "Reliable uploads that survive poor Wi-Fi conditions at hotels, schools, and convention centers. Wi-Fi starts to buffer? Your work is safe, your upload won't fail, and it will resume when the connection strengthens. Entries are transcoded and stream instantly to the judges.",
    },
    {
      icon: QrCode,
      title: "Frictionless submission",
      body: "Participants join with a contest URL and a participant code, or use the QR code provided. No accounts to create, no email addresses required. Submissions work from any device or editing app, including smartphone and tablet camera rolls.",
    },
    {
      icon: ShieldCheck,
      title: "Anonymous judging",
      body: "Judges are blind to participant information. They see Entry A, B, C, never the names of individual participants. Judges apply the same standard rubric to all entries in a category and provide written feedback for clarity. Fairness is built into the workflow, not bolted on.",
    },
    {
      icon: MessageSquareText,
      title: "Participant feedback",
      body: `Judges apply a standard rubric, leaving written feedback to justify their scoring. Comments can be made optional by the organizer, but they provide recognition and strong opportunities for growth. ${site.productName} is not just a scoreboard.`,
    },
    {
      icon: Award,
      title: "Winners showcase",
      body: "Publish password-protected winner galleries with one click. Share winning submissions by URL with participants, the community, or specific donors and partners. Embed winners on your organization's website, or in a digital newsletter, PDF, email, or landing page.",
    },
    {
      icon: Download,
      title: "Own your archive",
      body: "Every upload belongs to you. Download the original files in bulk. Create programming and content for your socials. Use submissions to build curriculum, your brand, or your community of creators. Every contest or campaign grows your rights-cleared library.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Ready for a better system than your print-era contest platform?",
  subtitle: `Tell us about your media contest and we'll show you what it looks like running on ${site.productName}.`,
  cta: { label: "Talk to Us", href: "/contact" },
  secondaryCta: { label: "How It Works", href: "/how-it-works" },
};
