import type { Metadata } from "next";
import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/layout/section";
import { FeatureSplit } from "@/components/blocks/feature-split";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import * as content from "@/content/pages/how-it-works";

export const metadata: Metadata = {
  title: "How It Works",
  description: content.intro.subtitle,
};

const mediaLabels: Record<string, string> = {
  organizers: "Contest setup — screenshot slot",
  students: "Student upload flow — screenshot slot",
  judges: "Judging room — interactive demo slot",
  results: "Winner showcase — screenshot slot",
};

export default function HowItWorksPage() {
  return (
    <>
      <div className="border-b border-border bg-secondary/50">
        <Container className="py-16 text-center sm:py-20">
          <Reveal>
            <Kicker>{content.intro.kicker}</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl text-balance sm:text-5xl">
              {content.intro.title}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {content.intro.subtitle}
            </p>
          </Reveal>
        </Container>
      </div>

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
