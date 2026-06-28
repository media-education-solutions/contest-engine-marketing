import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { LegalDoc } from "@/components/blocks/legal-doc";
import { site } from "@/content/site";
import * as content from "@/content/pages/student-privacy";

export const metadata = pageMetadata({
  title: "Student & Minor Data Privacy Notice",
  description: `How ${site.productName} handles student and minor data, content retention, and privacy obligations on behalf of sponsoring organizations.`,
  path: "/student-privacy",
  noindex: true,
});

export default function StudentPrivacyPage() {
  return (
    <>
      <PageIntro {...content.intro} />
      <LegalDoc {...content.doc} />
    </>
  );
}
