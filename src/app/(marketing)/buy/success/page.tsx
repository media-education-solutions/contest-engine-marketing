import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import * as content from "@/content/pages/buy";

export const metadata = pageMetadata({
  title: "Payment received",
  description: `Thank you for your ${site.productName} purchase.`,
  path: "/buy/success",
  noindex: true,
});

/**
 * Display only — this page reads `session_id` to show a confirmation
 * reference but never fulfils an order. Fulfillment is the webhook's job
 * (see /api/stripe/webhook); a visitor may close this tab before it loads.
 */
export default async function BuySuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  return (
    <Container className="py-16 sm:py-24">
      <div
        role="status"
        className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center"
      >
        <CheckCircle2 className="size-12 text-brand" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {content.success.kicker}
        </p>
        <h1 className="text-3xl sm:text-4xl">{content.success.title}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {content.success.subtitle}
        </p>
        {sessionId && (
          <p className="text-xs text-muted-foreground">Confirmation: {sessionId}</p>
        )}
        <Button asChild className="mt-4">
          <Link href={content.success.cta.href}>{content.success.cta.label}</Link>
        </Button>
      </div>
    </Container>
  );
}
