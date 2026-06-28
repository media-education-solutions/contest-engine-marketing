import Image from "next/image";
import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/layout/section";

export type PageIntroProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  /** Optional brand mark shown centered in the hero. */
  logo?: { src: string; alt: string; width: number; height: number };
  /** "sm" (default) suits a small mark; "lg" suits a wide lockup. */
  logoSize?: "sm" | "lg";
  /** Where the logo renders relative to the kicker. Default "before-kicker". */
  logoPosition?: "before-kicker" | "after-kicker";
  /** When true, the h1 is visually hidden (sr-only) — use when the logo already shows the name. */
  hideTitle?: boolean;
};

/** Standard subpage header — centered kicker/title/subtitle on a muted band. */
export function PageIntro({
  kicker,
  title,
  subtitle,
  logo,
  logoSize = "sm",
  logoPosition = "before-kicker",
  hideTitle = false,
}: PageIntroProps) {
  const mb = logoPosition === "after-kicker" ? "mb-0" : "mb-6";
  const h = logoSize === "lg" ? "h-16 sm:h-24" : "h-12 sm:h-14";
  const logoClass = `mx-auto w-auto max-w-full ${mb} ${h}`;

  const logoEl = logo && (
    <Reveal>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={logoClass}
      />
    </Reveal>
  );

  return (
    <div className="border-b border-border bg-secondary/50">
      <Container className="py-16 text-center sm:py-20">
        {logoPosition === "before-kicker" && logoEl}
        {kicker && (
          <Reveal delay={logo && logoPosition === "before-kicker" ? 80 : 0}>
            <Kicker>{kicker}</Kicker>
          </Reveal>
        )}
        {logoPosition === "after-kicker" && logoEl}
        {hideTitle ? (
          <h1 className="sr-only">{title}</h1>
        ) : (
          <Reveal delay={logo ? 160 : 80}>
            <h1 className="mx-auto mt-4 max-w-4xl text-4xl text-balance whitespace-pre-line sm:text-5xl">
              {title}
            </h1>
          </Reveal>
        )}
        {subtitle && (
          <Reveal delay={logo ? 160 : 80}>
            <p className={`mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty ${logoPosition === "after-kicker" ? "mt-3" : "mt-5"}`}>
              {subtitle}
            </p>
          </Reveal>
        )}
      </Container>
    </div>
  );
}
