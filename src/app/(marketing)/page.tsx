import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/blocks/hero";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { BeforeAfter } from "@/components/blocks/before-after";
import { ProcessSteps } from "@/components/blocks/process-steps";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { VideoEmbed } from "@/components/blocks/video-embed";
import * as content from "@/content/pages/home";

export const metadata = pageMetadata({
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero
        {...content.hero}
        media={
          <VideoEmbed
            src="/assets/video/judge/judge_judging_process.mp4"
            poster="/assets/video/judge/judge_judging_process_poster.jpg"
            title="Judging anonymized entries on a guided rating scale"
            aspect="4/3"
            autoPlay
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
