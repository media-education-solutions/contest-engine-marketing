import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/layout/section";

export type HeroProps = {
  kicker?: string;
  title: string;
  /** Optional trailing segment of the title rendered in crimson. */
  titleAccent?: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Screenshot, video, or interactive demo. Renders right of copy on lg+. */
  media?: React.ReactNode;
};

export function Hero({
  kicker,
  title,
  titleAccent,
  subtitle,
  primaryCta,
  secondaryCta,
  media,
}: HeroProps) {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      {/* Faint dot-grid atmosphere, masked to the top */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_var(--color-border)_1px,_transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_75%)]"
      />
      {/* Crimson glow, top-left */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 -z-10 size-[480px] rounded-full bg-brand/8 blur-3xl"
      />

      <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          {kicker && (
            <Reveal>
              <Kicker>{kicker}</Kicker>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h1 className="text-4xl leading-[1.08] text-balance sm:text-5xl lg:text-[3.4rem]">
              {title}
              {titleAccent && <span className="text-brand"> {titleAccent}</span>}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {subtitle}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              {secondaryCta && (
                <Button asChild size="lg" variant="outline">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          </Reveal>
        </div>

        {media && (
          <Reveal delay={200} className="min-w-0">
            <div className="rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(50_1_10/0.25)]">
              {media}
            </div>
          </Reveal>
        )}
      </Container>
    </div>
  );
}
