import Link from "next/link";
import { BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Kicker, PlayMark } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

export type PricingTier = {
  name: string;
  audience: string;
  price?: string;
  /** e.g. "per year" or "one contest" */
  priceNote?: string;
  features: string[];
  featured?: boolean;
};

export type PricingTiersProps = {
  kicker?: string;
  title: string;
  intro?: string;
  /** Banner above the cards. */
  notice?: { title: string; body: string };
  tiers: PricingTier[];
  /** Wider cards in a second row (program/org suites). */
  suites?: { title: string; tiers: PricingTier[] };
  cta: { label: string; href: string };
};

function TierCard({
  tier,
  cta,
}: {
  tier: PricingTier;
  cta: { label: string; href: string };
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border bg-card p-7",
        tier.featured
          ? "border-brand shadow-[0_24px_60px_-28px_rgb(173_10_42/0.4)]"
          : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.14em]">
          {tier.name}
        </h3>
        {tier.featured && <Badge>Most popular</Badge>}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {tier.audience}
      </p>
      {tier.price && (
        <div className="mt-5">
          <span className="font-heading text-4xl font-bold">{tier.price}</span>
          {tier.priceNote && (
            <span className="ml-2 text-sm text-muted-foreground">{tier.priceNote}</span>
          )}
        </div>
      )}
      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
            <PlayMark className="mt-1 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        asChild
        className="mt-7"
        variant={tier.featured ? "default" : "outline"}
      >
        <Link href={cta.href}>{cta.label}</Link>
      </Button>
    </div>
  );
}

export function PricingTiers({
  kicker,
  title,
  intro,
  notice,
  tiers,
  suites,
  cta,
}: PricingTiersProps) {
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

      {notice && (
        <Reveal delay={200}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-1 rounded-xl border border-brand/25 bg-brand/5 px-6 py-5 text-center sm:flex-row sm:gap-4 sm:text-left">
            <BadgePercent className="size-8 shrink-0 text-brand" aria-hidden />
            <div>
              <p className="font-heading font-semibold">{notice.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                {notice.body}
              </p>
            </div>
          </div>
        </Reveal>
      )}

      <div className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-2">
        {tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 80} className="h-full">
            <TierCard tier={tier} cta={cta} />
          </Reveal>
        ))}
      </div>

      {suites && (
        <>
          <Reveal>
            <h3 className="mt-16 text-center font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {suites.title}
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {suites.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 80} className="h-full">
                <TierCard tier={tier} cta={cta} />
              </Reveal>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
