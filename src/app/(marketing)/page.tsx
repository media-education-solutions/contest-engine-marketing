import { Hero } from "@/components/blocks/hero";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { BeforeAfter } from "@/components/blocks/before-after";
import { ProcessSteps } from "@/components/blocks/process-steps";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import * as content from "@/content/pages/home";

export default function HomePage() {
  return (
    <>
      <Hero
        {...content.hero}
        media={
          <MediaPlaceholder
            aspect="4/3"
            label="Judging dashboard — screenshot coming in media phase"
          />
        }
      />
      <LogoCloud {...content.logoCloud} />
      <BeforeAfter {...content.beforeAfter} />
      <ProcessSteps {...content.processSteps} />
      <FeatureGrid {...content.featureGrid} />
      <CtaBanner {...content.ctaBanner} />
    </>
  );
}
