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
          kicker="Student media festivals"
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
          title="Trusted by student media programs"
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
              body: "Create categories, set deadlines, and hand out access codes. Students upload video or photo entries from any device — no accounts needed.",
            },
            {
              name: "Evaluate",
              title: "Judge fairly, anywhere",
              body: "Judges score anonymous entries on a guided 1–10 scale, leave written feedback, and rank their top three — on their own schedule.",
            },
            {
              name: "Activate",
              title: "Celebrate the winners",
              body: "Publish winner showcases in a click. Students get their feedback, and you get a rights-cleared library of their best work.",
            },
          ]}
        />

        <BlockLabel>FeatureGrid</BlockLabel>
        <FeatureGrid
          kicker="Why it wins"
          title="Everything a festival needs, nothing it doesn't"
          intro="Purpose-built by a 24-year media educator who ran national-scale student competitions."
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
              body: "Students join with a contest code and participant code. No student accounts, no emails collected.",
            },
            {
              icon: ShieldCheck,
              title: "Anonymous judging",
              body: "Judges see Entry A, B, C — never names. Fairness is built into the workflow, not bolted on.",
            },
            {
              icon: MessageSquareText,
              title: "Real feedback",
              body: "Every student can receive written feedback from judges — recognition and growth, not just a scoreboard.",
            },
            {
              icon: Award,
              title: "Winner showcases",
              body: "Publish top-three galleries with one click. Share by URL or embed them on your school site.",
            },
            {
              icon: Upload,
              title: "Own the archive",
              body: "Download original files in bulk. Every contest builds your program's media library.",
            },
          ]}
        />

        <BlockLabel>Faq</BlockLabel>
        <Faq
          kicker="Questions"
          title="Frequently asked questions"
          items={[
            {
              question: "Do students need to create accounts?",
              answer:
                "No. Students enter with a contest code and a participant code provided by their teacher. We never collect student emails or personal accounts.",
            },
            {
              question: "What file types can students submit?",
              answer:
                "Video and photo categories are supported today, with audio on the roadmap. Uploads are resumable, so a dropped connection never loses work.",
            },
            {
              question: "How does judging stay fair?",
              answer:
                "Judges see anonymized entries labeled A, B, C — never student names. Scores use a guided 1–10 scale with named tiers, and admins review everything before results go public.",
            },
          ]}
        />

        <BlockLabel>CtaBanner</BlockLabel>
        <CtaBanner
          title="Ready to retire the spreadsheets?"
          subtitle="Tell us about your festival and we'll show you what it looks like running on one platform."
          cta={{ label: "Talk to Us", href: "/contact" }}
          secondaryCta={{ label: "See how it works", href: "/how-it-works" }}
        />
      </main>
      <Footer />
    </>
  );
}
