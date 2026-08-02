import Stripe from "stripe";

/**
 * Lazily constructed: `new Stripe(...)` at module scope throws during
 * `next build` on any machine without STRIPE_SECRET_KEY set. Returns null
 * when unconfigured so callers can degrade instead of crashing.
 *
 * No apiVersion pin — the SDK defaults to the version its types were
 * generated against, and hardcoding a string the types don't know is a
 * guaranteed typecheck failure on the next SDK bump.
 */
export function stripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  return key ? new Stripe(key) : null;
}

export function commerceEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
