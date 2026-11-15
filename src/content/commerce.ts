/**
 * The purchasable catalog. This is the ONLY place a price is written.
 * `src/content/pages/pricing.ts` renders from it, `src/lib/commerce.ts` charges
 * from it, and the two can therefore never drift.
 *
 * Amounts are integer cents — never a float, never a display string.
 */
export type Sku = {
  id: string;
  name: string;
  blurb: string;
  amountCents: number;
};

export type EngineSku = Sku & { priceNote: string };
export type AddOnSku = Sku & { appliesTo: readonly string[] };

/** Self-serve Engines: fixed price, resolvable by `resolveSelection`. */
export const engines = [
  {
    id: "single-engine",
    name: "Single Engine",
    blurb: "Run a media contest within a small group or team.",
    amountCents: 29_900,
    priceNote: "per contest",
  },
  {
    id: "classroom-engine",
    name: "Classroom Engine",
    blurb: "Run media contests in your classroom.",
    amountCents: 99_900,
    priceNote: "per school year",
  },
] as const satisfies readonly EngineSku[];

/**
 * Quote-only tiers. Shown with "Starting at" on /pricing; never sold online.
 * Deliberately NOT `Sku`s: `resolveSelection` only searches `engines`, so a
 * quoted Engine can never reach Checkout.
 */
export type QuotedEngine = {
  id: string;
  name: string;
  blurb: string;
  startingCents: number;
  priceNote: string;
};

export const quotedEngines = [
  {
    id: "professional-engine",
    name: "Professional Engine",
    blurb:
      "Run a media contest for a school district, nonprofit organization, or regional media outlet.",
    startingCents: 99_900,
    priceNote: "per contest event",
  },
  {
    id: "convention-engine",
    name: "Convention Engine",
    blurb:
      "For school districts, nonprofit organizations, and regional media programs that run their own large-scale on-site media contest event.",
    startingCents: 500_000,
    priceNote: "per contest event",
  },
  {
    id: "scholastic-engine",
    name: "Scholastic Engine",
    blurb:
      "For educational organizations running multiple large-scale media contests, including on-site and remote program events.",
    startingCents: 1_000_000,
    priceNote: "per school year",
  },
] as const satisfies readonly QuotedEngine[];

export const addOns = [
  {
    id: "extra-storage",
    name: "Additional 25 GB storage",
    blurb: "More room in your media library for high-resolution photo and video entries.",
    amountCents: 25_000,
    appliesTo: ["single-engine", "classroom-engine"],
  },
  {
    id: "extra-codes",
    name: "25 more participant access codes",
    blurb: "Open your contest to another 25 students or creators.",
    amountCents: 25_000,
    appliesTo: ["single-engine", "classroom-engine"],
  },
  {
    id: "training",
    name: "One-hour Google Meet training",
    blurb: "A live walkthrough with our team before your contest opens.",
    amountCents: 15_000,
    appliesTo: ["single-engine", "classroom-engine"],
  },
] as const satisfies readonly AddOnSku[];

/** "$299", "$10,000" — the exact strings the pricing cards display. */
export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
