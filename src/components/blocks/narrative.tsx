import { Kicker, PlayMark } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";

export type NarrativeProps = {
  kicker?: string;
  title: string;
  paragraphs: string[];
  /** Rendered large between paragraphs, crimson play-mark prefix. */
  pullQuote?: string;
  tone?: "default" | "muted";
};

/** Long-form story section — measure-limited prose with an optional pull quote. */
export function Narrative({
  kicker,
  title,
  paragraphs,
  pullQuote,
  tone = "default",
}: NarrativeProps) {
  const midpoint = Math.ceil(paragraphs.length / 2);

  return (
    <Section tone={tone}>
      <div className="mx-auto max-w-3xl">
        {kicker && (
          <Reveal>
            <Kicker>{kicker}</Kicker>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h2 className="mt-4 text-3xl text-balance sm:text-4xl">{title}</h2>
        </Reveal>
        <div className="mt-8 space-y-6">
          {paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={120}>
              {pullQuote && i === midpoint && (
                <blockquote className="my-10 flex gap-4 border-l-2 border-brand pl-6">
                  <p className="font-heading text-2xl font-semibold leading-snug text-balance">
                    <PlayMark className="mr-3 inline size-3.5 -translate-y-0.5" />
                    {pullQuote}
                  </p>
                </blockquote>
              )}
              <p className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
