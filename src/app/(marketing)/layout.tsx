import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  JsonLd,
  organizationSchema,
  softwareApplicationSchema,
} from "@/lib/jsonld";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={[organizationSchema(), softwareApplicationSchema()]} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
