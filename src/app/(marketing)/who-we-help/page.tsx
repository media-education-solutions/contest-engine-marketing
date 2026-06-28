import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { FeatureSplit } from "@/components/blocks/feature-split";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { ScreenshotShowcase } from "@/components/blocks/screenshot-showcase";
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
          <ScreenshotShowcase
            src={content.leadMedia.src}
            alt={content.leadMedia.alt}
            aspect="4/3"
            fit="cover"
            priority
          />
        }
      />
      <FeatureGrid {...content.segments} />
      <CtaBanner {...content.ctaBanner} />
    </>
  );
}
