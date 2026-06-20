import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Per-page metadata with canonical URL. Title flows through the root
 * layout's template (`%s | <product>`); pass absolute=true to bypass it.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title?: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const canonical = new URL(path, site.url).toString();

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: title ?? `${site.productName} — Media Contest & Festival Platform`,
      description,
      url: canonical,
      siteName: site.productName,
      type: "website",
      images: ["/og-default.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? site.productName,
      description,
      images: ["/og-default.png"],
    },
  };
}
