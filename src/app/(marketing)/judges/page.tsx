import { pageMetadata } from "@/lib/seo";
import { JsonLd, faqSchema } from "@/lib/jsonld";
import { Hero } from "@/components/blocks/hero";
import { Narrative } from "@/components/blocks/narrative";
import { FeatureSplit } from "@/components/blocks/feature-split";
import { TagList } from "@/components/blocks/tag-list";
import { ProcessSteps } from "@/components/blocks/process-steps";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { Faq } from "@/components/blocks/faq";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { ScreenshotShowcase } from "@/components/blocks/screenshot-showcase";
import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";
import * as content from "@/content/pages/judges";
import { JudgeForm } from "./judge-form";

export const metadata = pageMetadata({
  title: "Become a Judge",
  description: content.hero.subtitle,
  path: "/judges",
});

export default function JudgesPage() {
  return (
    <>
      <Hero
        {...content.hero}
        media={
          <ScreenshotShowcase
            src="/assets/photo/judge/judge_rating.png"
            alt="A judge scoring an entry on the Universal Performance Rubric"
            aspect="video"
            fit="contain"
            priority
          />
        }
      />
      <JsonLd data={faqSchema(content.faq.items)} />
      <Narrative {...content.whyJudge} />
      <FeatureSplit
        {...content.anywhere}
        media={
          <ScreenshotShowcase
            src="/assets/photo/judge/judge_dashboard.png"
            alt="A judge's dashboard showing assigned categories and entries"
            aspect="4/3"
            fit="contain"
          />
        }
      />
      <TagList {...content.whatYoullJudge} />
      <ProcessSteps {...content.steps} />
      <TagList {...content.features} />
      <FeatureGrid {...content.whyItWorks} />
      <Faq {...content.faq} />
      <TagList {...content.greatJudge} />

      <Section id="apply">
        <div className="mx-auto max-w-lg text-center">
          {content.apply.kicker && (
            <Reveal>
              <Kicker>{content.apply.kicker}</Kicker>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl text-balance sm:text-4xl">
              {content.apply.title}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {content.apply.subtitle}
            </p>
          </Reveal>
        </div>
        <Reveal delay={200} className="mx-auto mt-10 max-w-lg">
          <JudgeForm />
        </Reveal>
      </Section>

      <CtaBanner {...content.ctaBanner} />
    </>
  );
}
