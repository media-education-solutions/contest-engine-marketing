import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { FeatureSplit } from "@/components/blocks/feature-split";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { VideoEmbed } from "@/components/blocks/video-embed";
import { ScreenshotShowcase } from "@/components/blocks/screenshot-showcase";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import * as content from "@/content/pages/how-it-works";

export const metadata = pageMetadata({
  title: "How It Works",
  description: content.intro.subtitle,
  path: "/how-it-works",
});

// Temporary demo-contest media (sample contest seed).
const mediaByRole: Record<string, ReactNode> = {
  organizers: (
    <VideoEmbed
      src="/assets/video/owner/owner_category_creation.mp4"
      poster="/assets/video/owner/owner_category_creation_poster.jpg"
      title="Setting up divisions and categories"
      aspect="4/3"
      autoPlay
    />
  ),
  students: (
    <ScreenshotShowcase
      src="/assets/photo/participant/participant_contest_results.png"
      alt="A participant's submissions, status, and judge feedback"
      aspect="4/3"
      fit="contain"
    />
  ),
  judges: (
    <ScreenshotShowcase
      src="/assets/photo/judge/judge_ranking.png"
      alt="Anonymized entries with a guided rating scale and drag-and-drop top-three ranking"
      aspect="video"
      fit="contain"
    />
  ),
  results: (
    <ScreenshotShowcase
      src="/assets/photo/owner/owner_contest_results.png"
      alt="Published winner showcase with first, second, and third place per category"
      aspect="square"
      fit="contain"
    />
  ),
};

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro {...content.intro} />

      {content.roles.map((role) => (
        <FeatureSplit
          key={role.id}
          {...role}
          media={mediaByRole[role.id ?? ""] ?? <MediaPlaceholder label="Media slot" />}
        />
      ))}

      <CtaBanner {...content.ctaBanner} />
    </>
  );
}
