import type Stripe from "stripe";
import { stripeClient } from "@/lib/stripe";
import {
  markOrderPaid,
  markOrderStatus,
  notifyPurchase,
  markOrderNotified,
} from "@/lib/purchase-delivery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Mark paid and notify, exactly once. Safe to call twice — see markOrderPaid. */
async function fulfil(session: Stripe.Checkout.Session) {
  const orderId = Number(session.metadata?.order_id);
  // `stripe trigger` sends synthetic sessions with no metadata — ignore, don't throw.
  if (!Number.isFinite(orderId) || orderId <= 0) {
    console.warn("[stripe] session without order_id — ignoring", session.id);
    return;
  }
  const order = await markOrderPaid(orderId, session.id, session.amount_total ?? 0);
  // Already 'paid' (a retry, or completed+async both firing) returns null — no second email.
  if (!order) return;
  if (await notifyPurchase(order)) await markOrderNotified(order.id);
  else console.error("[stripe] paid but NOT notified — order", order.id);
}

export async function POST(req: Request) {
  const stripe = stripeClient();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return new Response("not configured", { status: 503 });

  // Raw body — reading req.json() first destroys the bytes the signature covers.
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, secret);
  } catch (err) {
    console.error("[stripe] signature verification failed", err);
    return new Response("bad signature", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        await fulfil(session); // card — money is here
      } else {
        // ACH initiated. Funds are days out; async_payment_succeeded will follow.
        const orderId = Number(session.metadata?.order_id);
        if (Number.isFinite(orderId) && orderId > 0) {
          await markOrderStatus(orderId, "processing", session.id);
        }
      }
      break;
    }
    case "checkout.session.async_payment_succeeded":
      await fulfil(event.data.object); // ACH cleared
      break;
    case "checkout.session.async_payment_failed": {
      const session = event.data.object;
      const orderId = Number(session.metadata?.order_id);
      if (Number.isFinite(orderId) && orderId > 0) {
        await markOrderStatus(orderId, "failed", session.id);
        console.error("[stripe] ACH payment failed — order", orderId);
      }
      break;
    }
    default:
      break; // ignore everything else
  }

  return new Response(null, { status: 200 });
}
