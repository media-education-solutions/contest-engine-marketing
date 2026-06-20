import type { Metadata } from "next";
import { Container } from "@/components/layout/section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false }, // unindexed until real policy text lands
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="text-4xl">Privacy Policy</h1>
      <p className="mt-6 leading-relaxed text-muted-foreground">
        Full policy coming soon. In short: {site.productName} collects only what
        the contact form asks for, never collects participant personal information
        through this website, and never sells data. Questions in the meantime?
        Reach out via the contact page.
      </p>
    </Container>
  );
}
