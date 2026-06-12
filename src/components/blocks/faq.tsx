import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqProps = {
  kicker?: string;
  title: string;
  items: FaqItem[];
};

/** Accordion FAQ — pairs with FAQPage JSON-LD (Phase 3). */
export function Faq({ kicker, title, items }: FaqProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          {kicker && (
            <Reveal>
              <Kicker>{kicker}</Kicker>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl text-balance sm:text-4xl">{title}</h2>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <Accordion type="single" collapsible className="mt-10">
            {items.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-left text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
