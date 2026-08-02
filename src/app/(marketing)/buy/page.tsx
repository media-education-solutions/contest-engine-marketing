import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/blocks/page-intro";
import { Container } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { commerceEnabled } from "@/lib/stripe";
import { portals } from "@/content/commerce";
import { site } from "@/content/site";
import * as content from "@/content/pages/buy";
import { BuyForm } from "./buy-form";

export const metadata = pageMetadata({
  title: "Buy",
  description: `Purchase a ${site.productName} Teacher or Coordinator Portal and add-ons securely online.`,
  path: "/buy",
});

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  const defaultPlan = portals.some((p) => p.id === plan) ? plan! : portals[0].id;

  return (
    <>
      <PageIntro {...content.intro} />
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          {commerceEnabled() ? (
            <BuyForm defaultPlan={defaultPlan} />
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <h2 className="text-2xl">{content.disabled.title}</h2>
              <p className="mt-3 text-muted-foreground">{content.disabled.body}</p>
              <Button asChild className="mt-6">
                <Link href={content.disabled.cta.href}>{content.disabled.cta.label}</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
