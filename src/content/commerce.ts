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

export type PortalSku = Sku & { priceNote: string };
export type AddOnSku = Sku & { appliesTo: readonly string[] };

export const portals = [
  {
    id: "teacher-portal",
    name: "Teacher Portal",
    blurb: "Professional media contests for classrooms and small creative programs.",
    amountCents: 30_000,
    priceNote: "per year",
  },
  {
    id: "coordinator-portal",
    name: "Coordinator Portal",
    blurb: "Built for schools, nonprofit coordinators, and growing media programs.",
    amountCents: 120_000,
    priceNote: "per year",
  },
] as const satisfies readonly PortalSku[];

export const addOns = [
  {
    id: "extra-storage",
    name: "Additional 25 GB storage",
    blurb: "More room in your media library for high-resolution photo and video entries.",
    amountCents: 25_000,
    appliesTo: ["teacher-portal", "coordinator-portal"],
  },
  {
    id: "extra-codes",
    name: "25 more participant access codes",
    blurb: "Open your contest to another 25 students or creators.",
    amountCents: 25_000,
    appliesTo: ["teacher-portal", "coordinator-portal"],
  },
  {
    id: "qr-access",
    name: "QR code participant access",
    blurb: "Let participants join by scanning a code — no logins to distribute.",
    amountCents: 10_000,
    appliesTo: ["teacher-portal"], // Coordinator Portal already includes it
  },
  {
    id: "training",
    name: "One-hour Google Meet training",
    blurb: "A live walkthrough with our team before your contest opens.",
    amountCents: 15_000,
    appliesTo: ["teacher-portal", "coordinator-portal"],
  },
] as const satisfies readonly AddOnSku[];

/** "$300", "$1,200" — the exact strings the pricing cards used to hardcode. */
export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
