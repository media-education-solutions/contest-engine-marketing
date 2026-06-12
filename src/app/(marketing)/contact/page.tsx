import type { Metadata } from "next";
import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/layout/section";
import { site } from "@/content/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to the ${site.productName} team about running your student film or photo festival on one platform.`,
};

export default function ContactPage() {
  return (
    <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div>
        <Reveal>
          <Kicker>Talk to us</Kicker>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 text-4xl text-balance sm:text-5xl">
            Tell us about your festival
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Whether you run a single classroom contest or a statewide media
            festival, we&apos;d love to show you what it looks like on{" "}
            {site.productName}. Real humans read every message — usually the
            founder.
          </p>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <ContactForm />
      </Reveal>
    </Container>
  );
}
