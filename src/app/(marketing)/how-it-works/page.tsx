import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { FeatureSplit } from "@/components/blocks/feature-split";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { VideoEmbed } from "@/components/blocks/video-embed";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import * as content from "@/content/pages/how-it-works";
import {
  contestSetupClip,
  rankingClip,
  registrationClip,
  studentResultsClip,
} from "@/content/product-media";

export const metadata = pageMetadata({
  title: "How It Works",
  description: content.intro.subtitle,
  path: "/how-it-works",
});

const mediaByRole: Record<string, ReactNode> = {
  organizers: <VideoEmbed {...contestSetupClip} />,
  students: <VideoEmbed {...registrationClip} />,
  judges: <VideoEmbed {...rankingClip} />,
  results: <VideoEmbed {...studentResultsClip} />,
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
