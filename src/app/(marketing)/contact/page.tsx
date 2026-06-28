import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, contactPageSchema } from "@/lib/jsonld";
import { Kicker } from "@/components/ui/play-mark";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/layout/section";
import { site } from "@/content/site";
import { ContactForm } from "./contact-form";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Talk to the ${site.productName} team about running your film or photo competition on one platform.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <JsonLd data={contactPageSchema()} />
      <div>
        <Reveal>
          <Kicker>Talk to us</Kicker>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 text-4xl text-balance sm:text-5xl">
            Tell us about your contest
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Whether you run a single classroom contest or a nationwide media
            event, we&apos;d love to show you what it looks like on{" "}
            {site.productName}. Real humans read every message, usually the
            founder.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 border-t border-border pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Operated by
            </p>
            <Image
              src="/brand/mes-lockup-inline.png"
              alt={`${site.companyName} logo`}
              width={622}
              height={100}
              className="mt-3 h-14 w-auto sm:h-16"
            />
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <ContactForm />
      </Reveal>
    </Container>
  );
}
