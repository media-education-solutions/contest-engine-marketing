import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { FeatureSplit } from "@/components/blocks/feature-split";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import * as content from "@/content/pages/how-it-works";

export const metadata = pageMetadata({
  title: "How It Works",
  description: content.intro.subtitle,
  path: "/how-it-works",
});

const mediaLabels: Record<string, string> = {
  organizers: "Contest setup — screenshot slot",
  students: "Student upload flow — screenshot slot",
  judges: "Judging room — interactive demo slot",
  results: "Winner showcase — screenshot slot",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro {...content.intro} />

      {content.roles.map((role) => (
        <FeatureSplit
          key={role.id}
          {...role}
          media={
            <MediaPlaceholder label={mediaLabels[role.id ?? ""] ?? "Media slot"} />
          }
        />
      ))}

      <CtaBanner {...content.ctaBanner} />
    </>
  );
}
