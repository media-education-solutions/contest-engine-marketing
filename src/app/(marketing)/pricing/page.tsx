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
  description: `${site.productName} plans from a free trial contest to statewide festival programs, with Founder Legacy Pricing at 50% off, locked in for up to 5 years.`,
  path: "/pricing",
});

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: site.productName,
  description: site.description,
  brand: { "@id": `${site.url}/#organization` },
  offers: [...content.pricing.tiers, ...(content.pricing.suites?.tiers ?? [])].map(
    (tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price.replace(/[$,]/g, ""),
      priceCurrency: "USD",
      description: tier.audience,
    }),
  ),
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
