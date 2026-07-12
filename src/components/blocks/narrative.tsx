import Image from "next/image";
import { Kicker, PlayMark } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";

export type NarrativeProps = {
  kicker?: string;
  title: string;
  paragraphs: string[];
  /** Rendered large between paragraphs, crimson play-mark prefix. */
  pullQuote?: string;
  /** Paragraph index the pull quote renders before. Defaults to the midpoint. */
  pullQuoteIndex?: number;
  tone?: "default" | "muted";
  /** Optional photo rendered between title and paragraphs. */
  image?: { src: string; alt: string; width: number; height: number };
  /** Sign-off rendered after the last paragraph (e.g. a founder letter). */
  signature?: { name: string; role?: string };
};

/** Long-form story section — measure-limited prose with an optional pull quote. */
export function Narrative({
  kicker,
  title,
  paragraphs,
  pullQuote,
  pullQuoteIndex,
  tone = "default",
  image,
  signature,
}: NarrativeProps) {
  const midpoint = pullQuoteIndex ?? Math.ceil(paragraphs.length / 2);

  return (
    <Section tone={tone}>
      <div className="mx-auto max-w-3xl">
        {kicker && (
          <Reveal>
            <Kicker>{kicker}</Kicker>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h2 className="mt-4 text-3xl text-balance whitespace-pre-line sm:text-4xl">{title}</h2>
        </Reveal>
        {image && (
          <Reveal delay={100}>
            <figure className="mt-8 overflow-hidden rounded-xl">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full object-cover"
              />
            </figure>
          </Reveal>
        )}
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
        {signature && (
          <Reveal delay={120}>
            <p className="mt-10">
              <span className="block font-heading text-lg font-semibold">{signature.name}</span>
              {signature.role && (
                <span className="mt-1 block text-sm text-muted-foreground">{signature.role}</span>
              )}
            </p>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
