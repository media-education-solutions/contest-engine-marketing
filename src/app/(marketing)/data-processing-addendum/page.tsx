import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { LegalDoc } from "@/components/blocks/legal-doc";
import { site } from "@/content/site";
import * as content from "@/content/pages/data-processing-addendum";

export const metadata = pageMetadata({
  title: "Data Processing & Student Privacy Addendum",
  description: `${site.productName}'s data processing obligations, student privacy commitments, and AI restrictions that apply to all Client agreements.`,
  path: "/data-processing-addendum",
  noindex: true,
});

export default function DataProcessingAddendumPage() {
  return (
    <>
      <PageIntro {...content.intro} />
      <LegalDoc {...content.doc} />
    </>
  );
}
