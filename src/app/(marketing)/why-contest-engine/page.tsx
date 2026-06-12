import { pageMetadata } from "@/lib/seo";
import { JsonLd, faqSchema } from "@/lib/jsonld";
import { PageIntro } from "@/components/blocks/page-intro";
import { Narrative } from "@/components/blocks/narrative";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { Testimonials } from "@/components/blocks/testimonials";
import { Faq } from "@/components/blocks/faq";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";
import * as content from "@/content/pages/why-contest-engine";

export const metadata = pageMetadata({
  title: `Why ${site.productName}`,
  description: content.intro.subtitle!,
  path: "/why-contest-engine",
});

export default function WhyPage() {
  return (
    <>
      <JsonLd data={faqSchema(content.faq.items)} />
      <PageIntro {...content.intro} />
      <Narrative {...content.story} />
      <FeatureGrid {...content.valueProps} />
      <FeatureGrid {...content.psychology} />
      <Testimonials {...content.testimonials} />
      <Faq {...content.faq} />
      <CtaBanner {...content.ctaBanner} />
    </>
  );
}
