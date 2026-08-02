import type { Metadata } from "next";
import {
  Award,
  Film,
  MessageSquareText,
  QrCode,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/blocks/hero";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { ProcessSteps } from "@/components/blocks/process-steps";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { Faq } from "@/components/blocks/faq";
import { TagList } from "@/components/blocks/tag-list";
import { VideoEmbed } from "@/components/blocks/video-embed";
import { ScreenshotShowcase } from "@/components/blocks/screenshot-showcase";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Block Playground",
  robots: { index: false, follow: false },
};

function BlockLabel({ children }: { children: string }) {
  return (
    <div className="border-y border-dashed border-brand/30 bg-brand/5 px-5 py-2 font-mono text-xs text-brand">
      {children}
    </div>
  );
}

/**
 * Living styleguide: every block rendered with realistic sample content.
 * Sample copy below is throwaway — real page copy lives in src/content/pages.
 */
export default function BlocksPlayground() {
  return (
    <>
      <Header />
      <main>
        <BlockLabel>Hero</BlockLabel>
        <Hero
          kicker="Film & photo competitions"
          title="Run your media contest on one platform —"
          titleAccent="from submission to celebration."
          subtitle={site.description}
          primaryCta={{ label: "See how it works", href: "/how-it-works" }}
          secondaryCta={{ label: "Talk to Us", href: "/contact" }}
          media={
            <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-secondary text-sm text-muted-foreground">
              product screenshot / demo slot
            </div>
          }
        />

        <BlockLabel>LogoCloud (text fallback, no logo files yet)</BlockLabel>
        <LogoCloud
          title="Trusted by media programs"
          logos={[
            { name: "Shoots Summit Hawai'i" },
            { name: "ASB 4-State" },
            { name: "ʻŌlelo Youth Xchange" },
          ]}
        />

        <BlockLabel>ProcessSteps</BlockLabel>
        <ProcessSteps
          kicker="How it works"
          title="Three steps from chaos to celebration"
          intro="Replace the maze of forms, spreadsheets, and email chains with one workflow."
          steps={[
            {
              name: "Collect",
              title: "Open your contest",
              body: "Create categories, set deadlines, and hand out access codes. Participants upload video or photo entries from any device — no account creation needed.",
            },
            {
              name: "Evaluate",
              title: "Judge fairly, anywhere",
              body: "Judges score anonymous entries on a guided 1–10 scale, leave written feedback, and rank their top three — on their own schedule.",
            },
            {
              name: "Activate",
              title: "Celebrate the winners",
              body: "Publish winner showcases in a click. Participants review their feedback, and you get a rights-cleared library of their best work.",
            },
          ]}
        />

        <BlockLabel>FeatureGrid</BlockLabel>
        <FeatureGrid
          kicker="Why it wins"
          title="Everything a media competition needs, nothing it doesn't"
          intro="Built with purpose by a media educator who spent 29 years in the classroom, and ran national-scale student competitions."
          tone="muted"
          features={[
            {
              icon: Film,
              title: "Video & photo entries",
              body: "Resumable uploads that survive school Wi-Fi. Entries stream instantly to judges when the deadline passes.",
            },
            {
              icon: QrCode,
              title: "Code-based entry",
              body: "Participants join with a contest link and participant code. No accounts to create, no email addresses required.",
            },
            {
              icon: ShieldCheck,
              title: "Anonymous judging",
              body: "Judges see Entry A, B, C — never names. Fairness is built into the workflow, not bolted on.",
            },
            {
              icon: MessageSquareText,
              title: "Real feedback",
              body: "Every participant can receive written feedback from judges — recognition and growth, not just a scoreboard.",
            },
            {
              icon: Award,
              title: "Winner showcases",
              body: "Publish winner galleries with one click. Share by URL or embed them on your organization's website.",
            },
            {
              icon: Upload,
              title: "Own the archive",
              body: "Every upload is yours. Download original files in bulk. Every contest grows your organization's rights-cleared media library.",
            },
          ]}
        />

        <BlockLabel>Faq</BlockLabel>
        <Faq
          kicker="Questions"
          title="Frequently asked questions"
          items={[
            {
              question: "Do participants need to create accounts?",
              answer:
                "No. Participants access a contest using a link and a code provided by their group leader. We never require personal accounts or private information to participate.",
            },
            {
              question: "What file types can participants submit?",
              answer:
                "Video and photo categories are supported today, with audio on the roadmap. Uploads are resumable, so a dropped connection never loses work.",
            },
            {
              question: "How does judging stay fair?",
              answer:
                "Judges see anonymized entries labeled A, B, C — never participant names. Scores use a guided 1–10 scale with named tiers, and admins review everything before results go public.",
            },
          ]}
        />

        <BlockLabel>TagList</BlockLabel>
        <TagList
          kicker="Sample section"
          title="Wrapping pill list"
          intro="For sections that are a flat set of short phrases, not cards."
          items={[
            "Home",
            "Office",
            "Classroom",
            "Laptop",
            "Tablet",
            "Desktop computer",
            "Media Degree Seeking College Students & Grad Assistants",
          ]}
          note="A closing reassurance line renders here when supplied."
        />

        <BlockLabel>
          Media slot-fillers (drop into Hero / FeatureSplit `media` props)
        </BlockLabel>
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-xs text-muted-foreground">
              ScreenshotShowcase (og-default.png stand-in)
            </p>
            <div className="rounded-xl border border-border bg-card shadow-[0_24px_60px_-28px_rgb(50_1_10/0.3)]">
              <ScreenshotShowcase
                src="/og-default.png"
                alt="Contest Engine product screenshot placeholder"
                aspect="video"
              />
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs text-muted-foreground">
              VideoEmbed (no poster → click-to-play placeholder)
            </p>
            <div className="rounded-xl border border-border bg-card shadow-[0_24px_60px_-28px_rgb(50_1_10/0.3)]">
              <VideoEmbed
                libraryId="000000"
                videoId="00000000-0000-0000-0000-000000000000"
                title="Judging flow walkthrough (sample)"
                aspect="video"
              />
            </div>
          </div>
        </div>

        <BlockLabel>CtaBanner</BlockLabel>
        <CtaBanner
          title="Ready to retire the spreadsheets?"
          subtitle="Tell us about your media contest and we'll show you what it looks like running on one platform."
          cta={{ label: "Talk to Us", href: "/contact" }}
          secondaryCta={{ label: "See how it works", href: "/how-it-works" }}
        />
      </main>
      <Footer />
    </>
  );
}
