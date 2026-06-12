import { pageMetadata } from "@/lib/seo";
import { JsonLd, organizationSchema } from "@/lib/jsonld";
import { PageIntro } from "@/components/blocks/page-intro";
import { Narrative } from "@/components/blocks/narrative";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";
import * as content from "@/content/pages/about";

export const metadata = pageMetadata({
  title: `About ${site.companyShortName}`,
  description: `${site.companyName} builds ${site.productName} — founded by a 24-year media educator to ${site.mission.charAt(0).toLowerCase()}${site.mission.slice(1).replace(/\.$/, "")}.`,
  path: "/about",
});

const aboutPage = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${site.url}/about`,
  name: `About ${site.companyShortName}`,
  about: { "@id": `${site.url}/#organization` },
  mainEntity: {
    "@type": "Person",
    name: "Jeb Brunt",
    jobTitle: "Founder & President",
    worksFor: { "@id": `${site.url}/#organization` },
    description:
      "Retired educator with 24 years teaching broadcast journalism and media production; founder of Media Education Solutions and creator of its contest platform.",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), aboutPage]} />
      <PageIntro {...content.intro} />
      <Narrative {...content.founderStory} />
      <FeatureGrid {...content.beliefs} />
      <CtaBanner {...content.ctaBanner} />
    </>
  );
}
