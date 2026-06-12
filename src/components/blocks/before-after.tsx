import { X } from "lucide-react";
import { Kicker, PlayMark } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";

export type BeforeAfterProps = {
  kicker?: string;
  title: string;
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
};

/** Problem → solution strip: the old way crossed out, the new way played in. */
export function BeforeAfter({ kicker, title, before, after }: BeforeAfterProps) {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        {kicker && (
          <Reveal>
            <Kicker>{kicker}</Kicker>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h2 className="mt-4 text-3xl text-balance sm:text-4xl">{title}</h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        <Reveal delay={120}>
          <div className="h-full rounded-xl border border-dashed border-border bg-secondary/60 p-7">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {before.label}
            </p>
            <ul className="mt-5 space-y-3.5">
              {before.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="h-full rounded-xl border border-brand/25 bg-card p-7 shadow-[0_16px_40px_-24px_rgb(173_10_42/0.3)]">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {after.label}
            </p>
            <ul className="mt-5 space-y-3.5">
              {after.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                >
                  <PlayMark className="mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
