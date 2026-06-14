import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { FeatureSplit } from "@/components/blocks/feature-split";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import * as content from "@/content/pages/who-we-help";

export const metadata = pageMetadata({
  title: "Who We Help",
  description: content.intro.subtitle!,
  path: "/who-we-help",
});

export default function WhoWeHelpPage() {
  return (
    <>
      <PageIntro {...content.intro} />
      <FeatureSplit
        {...content.lead}
        media={
          <MediaPlaceholder
            aspect="4/3"
            label="Students filming at a festival (photo slot)"
          />
        }
      />
      <FeatureGrid {...content.segments} />
      <CtaBanner {...content.ctaBanner} />
    </>
  );
}
