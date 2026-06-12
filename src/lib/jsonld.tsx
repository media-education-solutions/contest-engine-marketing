import { site } from "@/content/site";

/**
 * JSON-LD builders + renderer. Schemas:
 * - Organization + SoftwareApplication: sitewide (marketing layout)
 * - ContactPage / FAQPage / AboutPage: per page
 */

type JsonLdObject = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.companyName,
    url: site.url,
    logo: `${site.url}/brand/ce-mark.png`,
    description: site.mission,
  };
}

export function softwareApplicationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${site.url}/#software`,
    name: site.productName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: site.url,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "teacher",
    },
  };
}

export function contactPageSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${site.url}/contact`,
    name: `Contact ${site.productName}`,
    about: { "@id": `${site.url}/#organization` },
  };
}

export function faqSchema(
  items: Array<{ question: string; answer: string }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
