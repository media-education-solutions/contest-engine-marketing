import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

export type TagListProps = {
  kicker?: string;
  title: string;
  intro?: string;
  items: string[];
  /** Closing line under the pills — e.g. the "you may already be qualified" reassurance. */
  note?: string;
  tone?: "default" | "muted";
};

/** Wrapping pill list for sections that are a set of short phrases, not cards. */
export function TagList({ kicker, title, intro, items, note, tone = "default" }: TagListProps) {
  return (
    <Section tone={tone}>
      <div className="mx-auto max-w-2xl text-center">
        {kicker && (
          <Reveal>
            <Kicker>{kicker}</Kicker>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h2 className="mt-4 text-3xl text-balance sm:text-4xl">{title}</h2>
        </Reveal>
        {intro && (
          <Reveal delay={160}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>
          </Reveal>
        )}
      </div>

      <Reveal delay={200}>
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {items.map((item) => (
            <li key={item}>
              <Badge variant="outline" className="h-auto px-3.5 py-1.5 text-sm whitespace-normal">
                {item}
              </Badge>
            </li>
          ))}
        </ul>
      </Reveal>

      {note && (
        <Reveal delay={240}>
          <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-muted-foreground">
            {note}
          </p>
        </Reveal>
      )}
    </Section>
  );
}
