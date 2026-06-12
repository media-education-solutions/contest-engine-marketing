import Image from "next/image";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

/**
 * Temporary placeholder home — verifies tokens, fonts, and the
 * content→page pipeline. Replaced by the real block-composed
 * homepage in Phase 2.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <Image
        src="/brand/ce-wordmark.png"
        alt={site.productName}
        width={400}
        height={150}
        priority
      />
      <h1 className="max-w-2xl text-4xl sm:text-5xl text-balance">
        {site.tagline}
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground text-pretty">
        {site.mission}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg">Meet {site.productName}</Button>
        <Button size="lg" variant="outline">
          Talk to Us
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Site under construction — launching at contest-engine.com
      </p>
    </main>
  );
}
