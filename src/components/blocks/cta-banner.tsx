import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/layout/section";

export type CtaBannerProps = {
  title: string;
  subtitle?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

/** Deep-maroon anchor section with an oversized ghost play-mark. */
export function CtaBanner({ title, subtitle, cta, secondaryCta }: CtaBannerProps) {
  return (
    <div className="relative isolate overflow-hidden bg-brand-deep py-20 sm:py-28">
      <svg
        viewBox="0 0 12 12"
        aria-hidden
        className="absolute -right-16 -bottom-24 -z-10 size-96 rotate-12 fill-brand/15"
      >
        <path d="M1.5 1.2a1 1 0 0 1 1.52-.85l8 4.8a1 1 0 0 1 0 1.7l-8 4.8a1 1 0 0 1-1.52-.85V1.2Z" />
      </svg>

      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="max-w-2xl text-3xl text-balance text-background sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={100}>
            <p className="max-w-xl text-lg leading-relaxed text-background/70">
              {subtitle}
            </p>
          </Reveal>
        )}
        <Reveal delay={180}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
