import { Kicker, PlayMark } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  name: string;
  title: string;
  body: string;
};

export type ProcessStepsProps = {
  kicker?: string;
  title: string;
  intro?: string;
  steps: ProcessStep[];
  /** 4 lays out 2×2 at sm and a single row at lg. Default 3 (unchanged). */
  columns?: 3 | 4;
};

/**
 * Numbered horizontal flow (vertical on mobile) — built for
 * "Collect → Evaluate → Activate" but content-agnostic.
 */
export function ProcessSteps({ kicker, title, intro, steps, columns = 3 }: ProcessStepsProps) {
  const gridClass = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  // 4-up wraps to 2×2 at sm, where a connector would point at the next ROW — lg only.
  const connectorClass = columns === 4 ? "hidden lg:block" : "hidden sm:block";

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
        {intro && (
          <Reveal delay={160}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </Reveal>
        )}
      </div>

      <ol className={cn("mt-14 grid gap-10 sm:gap-6", gridClass)}>
        {steps.map((step, i) => (
          <li key={step.name} className="relative">
            <Reveal
              delay={i * 120}
              className="flex h-full flex-col items-center text-center sm:px-4"
            >
              {/* Connector to the next step (desktop only) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className={cn(
                    "absolute top-7 left-[calc(50%+3rem)] h-px w-[calc(100%-6rem)] bg-border",
                    connectorClass,
                  )}
                >
                  <PlayMark className="absolute -top-[5px] -right-1 size-2.5 fill-border" />
                </div>
              )}
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-brand/20 bg-brand/5">
                <span className="font-heading text-xl font-bold text-brand">
                  {i + 1}
                </span>
              </div>
              <p className="mt-5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {step.name}
              </p>
              <h3 className="mt-2 text-xl">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
