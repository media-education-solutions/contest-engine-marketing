import { Kicker, PlayMark } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";

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
};

/**
 * Numbered horizontal flow (vertical on mobile) — built for
 * "Collect → Evaluate → Activate" but content-agnostic.
 */
export function ProcessSteps({ kicker, title, intro, steps }: ProcessStepsProps) {
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

      <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
        {steps.map((step, i) => (
          <Reveal key={step.name} delay={i * 120}>
            <li className="relative flex h-full flex-col items-center text-center sm:px-4">
              {/* Connector to the next step (desktop only) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute top-7 left-[calc(50%+3rem)] hidden h-px w-[calc(100%-6rem)] bg-border sm:block"
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
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
