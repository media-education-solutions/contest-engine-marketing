import type { Metadata } from "next";
import { Container } from "@/components/layout/section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false }, // unindexed until real terms text lands
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="text-4xl">Terms of Service</h1>
      <p className="mt-6 leading-relaxed text-muted-foreground">
        Full terms coming soon. {site.productName} is offered by{" "}
        {site.companyName} — until formal terms are published here, platform
        agreements are handled directly with each organization.
      </p>
    </Container>
  );
}
