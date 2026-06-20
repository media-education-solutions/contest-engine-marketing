import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/layout/section";

export type PageIntroProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
};

/** Standard subpage header — centered kicker/title/subtitle on a muted band. */
export function PageIntro({ kicker, title, subtitle }: PageIntroProps) {
  return (
    <div className="border-b border-border bg-secondary/50">
      <Container className="py-16 text-center sm:py-20">
        {kicker && (
          <Reveal>
            <Kicker>{kicker}</Kicker>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl text-balance whitespace-pre-line sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {subtitle}
            </p>
          </Reveal>
        )}
      </Container>
    </div>
  );
}
