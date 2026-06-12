import { Kicker, PlayMark } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

export type FeatureSplitProps = {
  id?: string;
  kicker?: string;
  title: string;
  body: string;
  bullets?: string[];
  /** Screenshot / video / demo slot. */
  media: React.ReactNode;
  /** Media on the left instead of the right (alternate down a page). */
  reverse?: boolean;
  tone?: "default" | "muted";
};

/** Alternating copy + media section — the workhorse of explainer pages. */
export function FeatureSplit({
  id,
  kicker,
  title,
  body,
  bullets,
  media,
  reverse,
  tone = "default",
}: FeatureSplitProps) {
  return (
    <Section id={id} tone={tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn(reverse && "lg:order-2")}>
          <div>
            {kicker && <Kicker>{kicker}</Kicker>}
            <h2 className="mt-4 text-3xl text-balance sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {body}
            </p>
            {bullets && bullets.length > 0 && (
              <ul className="mt-6 space-y-3">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 leading-relaxed">
                    <PlayMark className="mt-1.5 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>

        <Reveal delay={120} className={cn("min-w-0", reverse && "lg:order-1")}>
          <div className="rounded-xl border border-border bg-card shadow-[0_24px_60px_-28px_rgb(50_1_10/0.3)]">
            {media}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
