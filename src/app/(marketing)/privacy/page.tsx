import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { LegalDoc } from "@/components/blocks/legal-doc";
import { site } from "@/content/site";
import * as content from "@/content/pages/privacy";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.productName} collects, uses, stores, and protects information on behalf of the organizations that run contests on the platform.`,
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro {...content.intro} />
      <LegalDoc {...content.doc} />
    </>
  );
}
