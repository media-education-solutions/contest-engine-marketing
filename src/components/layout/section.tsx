import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

type SectionTone = "default" | "muted" | "deep";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background",
  muted: "bg-secondary",
  deep: "bg-brand-deep text-background [&_p]:text-background/70",
};

/**
 * Vertical rhythm + background tone for every marketing section.
 * `deep` is the maroon anchor treatment (CTA banner, footer, etc.).
 */
export function Section({
  children,
  tone = "default",
  className,
  id,
}: {
  children: React.ReactNode;
  tone?: SectionTone;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", toneClasses[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}
