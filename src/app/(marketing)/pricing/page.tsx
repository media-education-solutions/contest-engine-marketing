import { pageMetadata } from "@/lib/seo";
import { JsonLd, faqSchema } from "@/lib/jsonld";
import { PageIntro } from "@/components/blocks/page-intro";
import { PricingTiers } from "@/components/blocks/pricing-tiers";
import { Faq } from "@/components/blocks/faq";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";
import { portals, addOns, formatUsd } from "@/content/commerce";
import * as content from "@/content/pages/pricing";

export const metadata = pageMetadata({
  title: "Pricing",
  description: `${site.productName} offers Teacher and Coordinator Portals with simple annual pricing starting at ${formatUsd(portals[0].amountCents)} per year, plus individually priced add-ons and custom-configured Suites for scholastic and corporate media programs. Talk to us to scope your deployment.`,
  path: "/pricing",
});

// Derived from the catalog so this can never drift from what /buy actually charges.
const allPrices = [...portals, ...addOns].map((s) => s.amountCents);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: site.productName,
  description: site.description,
  brand: { "@id": `${site.url}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: String(Math.min(...allPrices) / 100),
    highPrice: String(Math.max(...allPrices) / 100),
    offerCount: allPrices.length,
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
