import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { LegalDoc } from "@/components/blocks/legal-doc";
import { site } from "@/content/site";
import * as content from "@/content/pages/terms";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms governing access to and use of ${site.productName}, a contest management and content evaluation platform operated by ${site.companyName}.`,
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <>
      <PageIntro {...content.intro} />
      <LegalDoc {...content.doc} />
    </>
  );
}
