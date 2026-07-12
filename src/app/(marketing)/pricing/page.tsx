import { pageMetadata } from "@/lib/seo";
import { JsonLd, faqSchema } from "@/lib/jsonld";
import { PageIntro } from "@/components/blocks/page-intro";
import { PricingTiers } from "@/components/blocks/pricing-tiers";
import { Faq } from "@/components/blocks/faq";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";
import * as content from "@/content/pages/pricing";

export const metadata = pageMetadata({
  title: "Pricing",
  description: `${site.productName} offers Teacher and Coordinator Portals with simple annual pricing starting at $300 per year, plus custom-configured Suites for scholastic and corporate media programs. Talk to us to scope your deployment.`,
  path: "/pricing",
});

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: site.productName,
  description: site.description,
  brand: { "@id": `${site.url}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "300",
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[productSchema, faqSchema(content.faq.items)]} />
      <PageIntro {...content.intro} />
      <PricingTiers {...content.pricing} />
      <Faq {...content.faq} />
      <CtaBanner {...content.ctaBanner} />
    </>
  );
}
