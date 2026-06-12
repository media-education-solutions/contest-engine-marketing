import { Quote } from "lucide-react";
import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  organization: string;
};

export type TestimonialsProps = {
  kicker?: string;
  title: string;
  items: Testimonial[];
};

/**
 * Quote cards. Renders nothing while `items` is empty — wired into pages
 * now so real quotes go live with a content-only change.
 */
export function Testimonials({ kicker, title, items }: TestimonialsProps) {
  if (items.length === 0) return null;

  return (
    <Section tone="muted">
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

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 90}>
            <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-7">
              <Quote className="size-6 text-brand/40" aria-hidden />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.role}, {item.organization}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
