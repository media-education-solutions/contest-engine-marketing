import { neon } from "@neondatabase/serverless";

export type PurchaseOrderInput = {
  plan: string;
  addOns: string[];
  amountCents: number;
  teacherName: string;
  email: string;
  phone: string;
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
};

export type PurchaseOrder = {
  id: number;
  plan: string;
  addons: string[];
  amountCents: number;
  teacherName: string;
  email: string;
  phone: string;
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  stripeSessionId: string | null;
};

/**
 * Lazily constructed: calling neon() at module scope would throw during
 * `next build` on any machine without NEON_DB_URL set.
 */
function db() {
  const url = process.env.NEON_DB_URL;
  return url ? neon(url) : null;
}

function mapRow(row: Record<string, unknown>): PurchaseOrder {
  return {
    id: row.id as number,
    plan: row.plan as string,
    addons: (row.addons as string[]) ?? [],
    amountCents: row.amount_cents as number,
    teacherName: row.teacher_name as string,
    email: row.email as string,
    phone: row.phone as string,
    schoolName: row.school_name as string,
    schoolAddress: row.school_address as string,
    schoolPhone: row.school_phone as string,
    stripeSessionId: (row.stripe_session_id as string | null) ?? null,
  };
}

/**
 * Durable record of the order, written BEFORE the Stripe Checkout Session is
 * created — the abandoned-cart / Stripe-outage safety net. Returns the row
 * id, or null if unconfigured or the insert failed.
 */
export async function createPendingOrder(input: PurchaseOrderInput): Promise<number | null> {
  const sql = db();
  if (!sql) return null;

  try {
    const rows = await sql`
      insert into purchase_orders
        (plan, addons, amount_cents, teacher_name, email, phone,
         school_name, school_address, school_phone)
      values (${input.plan}, ${JSON.stringify(input.addOns)}::jsonb, ${input.amountCents},
              ${input.teacherName}, ${input.email}, ${input.phone},
              ${input.schoolName}, ${input.schoolAddress}, ${input.schoolPhone})
      returning id
    `;
    return (rows[0]?.id as number) ?? null;
  } catch (err) {
    console.error("[purchase] Neon insert failed", err);
    return null;
  }
}

/**
 * Idempotency gate: `status <> 'paid'` means a webhook retry (or completed +
 * async_payment_succeeded both firing for the same order) updates zero rows
 * and returns null — the caller must skip the notification in that case.
 */
export async function markOrderPaid(
  orderId: number,
  sessionId: string,
  amountTotal: number,
): Promise<PurchaseOrder | null> {
  const sql = db();
  if (!sql) return null;

  try {
    const rows = await sql`
      update purchase_orders
         set status = 'paid', paid_at = now(), stripe_session_id = ${sessionId}
       where id = ${orderId} and status <> 'paid'
      returning *
    `;
    const row = rows[0];
    if (!row) return null;

    const order = mapRow(row);
    if (amountTotal && amountTotal !== order.amountCents) {
      console.error(
        "[purchase] Stripe amount_total mismatch — order",
        order.id,
        "expected",
        order.amountCents,
        "got",
        amountTotal,
      );
    }
    return order;
  } catch (err) {
    console.error("[purchase] Neon markOrderPaid failed", err);
    return null;
  }
}

/**
 * Non-terminal status transitions for the ACH path ('processing', 'failed').
 * Guarded so a late or out-of-order event can never walk a paid order
 * backwards — Stripe does not guarantee event ordering.
 */
export async function markOrderStatus(
  orderId: number,
  status: "processing" | "failed",
  sessionId: string,
): Promise<void> {
  const sql = db();
  if (!sql) return;

  try {
    await sql`
      update purchase_orders
         set status = ${status}, stripe_session_id = ${sessionId}
       where id = ${orderId} and status not in ('paid', 'failed')
    `;
  } catch (err) {
    console.error("[purchase] Neon markOrderStatus failed", err);
  }
}

/** Best-effort flag flip; a failure here only risks a false "unnotified" row. */
export async function markOrderNotified(id: number): Promise<void> {
  const sql = db();
  if (!sql) return;
  try {
    await sql`update purchase_orders set notified = true where id = ${id}`;
  } catch (err) {
    console.error("[purchase] Neon notified-flag update failed", err);
  }
}

/**
 * Notification: the same Apps Script web app the contact form uses, with
 * `kind: "purchase"` routing it to the Purchases tab and a distinct subject.
 * No new env vars, no new deployment. Script source: scripts/contact-sheet-endpoint.gs
 */
export async function notifyPurchase(order: PurchaseOrder): Promise<boolean> {
  const endpoint = process.env.CONTACT_SCRIPT_URL;
  const token = process.env.CONTACT_SCRIPT_TOKEN;
  if (!endpoint || !token) return false;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        kind: "purchase",
        teacherName: order.teacherName,
        email: order.email,
        phone: order.phone,
        schoolName: order.schoolName,
        schoolAddress: order.schoolAddress,
        schoolPhone: order.schoolPhone,
        plan: order.plan,
        addOns: order.addons,
        amount: order.amountCents,
        stripeSessionId: order.stripeSessionId,
      }),
      // Apps Script answers with a 302 to script.googleusercontent.com serving the
      // already-executed result; fetch follows it and the JSON is read there.
      redirect: "follow",
    });

    if (!res.ok) {
      console.error("[purchase] notify HTTP error", res.status);
      return false;
    }

    // Apps Script can return 200 with an error page, so trust the body, not the status.
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; mailed?: boolean; error?: string }
      | null;

    if (!data?.ok) {
      console.error("[purchase] notify rejected", data?.error ?? "no body");
      return false;
    }
    if (data.mailed === false) {
      console.error("[purchase] Sheet row written but notification email failed");
    }
    return true;
  } catch (err) {
    console.error("[purchase] notify threw", err);
    return false;
  }
}
