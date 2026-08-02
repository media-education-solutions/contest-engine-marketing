import Stripe from "stripe";
import { portals, addOns, type Sku } from "@/content/commerce";

export type Selection = { plan: string; addOns: string[] };

/**
 * Resolve ids to catalog rows. Returns null on an unknown id or an add-on that
 * doesn't apply to the chosen plan — the caller must treat that as a rejected
 * submission, NOT as an empty cart.
 */
export function resolveSelection(sel: Selection): Sku[] | null {
  const portal = portals.find((p) => p.id === sel.plan);
  if (!portal) return null;

  const picked: Sku[] = [portal];
  for (const id of sel.addOns) {
    const addOn = addOns.find((a) => a.id === id);
    if (!addOn || !(addOn.appliesTo as readonly string[]).includes(portal.id)) return null;
    picked.push(addOn);
  }
  return picked;
}

export function totalCents(items: Sku[]): number {
  return items.reduce((sum, i) => sum + i.amountCents, 0);
}

export function buildLineItems(items: Sku[]): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return items.map((i) => ({
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: i.amountCents,
      product_data: { name: i.name, description: i.blurb },
    },
  }));
}
