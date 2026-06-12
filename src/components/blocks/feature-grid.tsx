import type { LucideIcon } from "lucide-react";
import { Kicker, PlayMark } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

export type Feature = {
  icon?: LucideIcon;
  title: string;
  body: string;
  /** Optional detail list — used by audience/segment cards. */
  bullets?: string[];
};

export type FeatureGridProps = {
  kicker?: string;
  title: string;
  intro?: string;
  features: Feature[];
  tone?: "default" | "muted";
};

export function FeatureGrid({
  kicker,
  title,
  intro,
  features,
  tone = "default",
}: FeatureGridProps) {
  return (
    <Section tone={tone}>
      <div className="max-w-2xl">
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
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </Reveal>
        )}
      </div>

      {/* flex-wrap (not grid) so a partial last row centers — e.g. 5 cards = 3 + 2 */}
      <div className="mt-12 flex flex-wrap justify-center gap-5">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Reveal
              key={feature.title}
              delay={i * 70}
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
            >
              <div
                className={cn(
                  "group h-full rounded-xl border border-border bg-card p-6 transition-all duration-300",
                  "hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_16px_40px_-20px_rgb(173_10_42/0.35)]",
                )}
              >
                {Icon && (
                  <div className="mb-4 inline-flex rounded-lg bg-brand/8 p-2.5 text-brand transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                )}
                <h3 className="text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
                {feature.bullets && feature.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                    {feature.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                      >
                        <PlayMark className="mt-1 size-2 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
