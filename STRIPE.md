# Stripe integration — quick reference

`/buy` sells Portals and add-ons via Stripe-hosted Checkout Sessions (MED-32).
No Stripe JavaScript ships to the browser — checkout is a redirect, so the only
secrets involved are server-side. Full design rationale lives in
`.claude/plans/med-32/plan.md` and the `stripe-commerce-architecture` memory
(both local-only, not in this file).

## Env vars

Server-only, both in `.env.local` for dev and in Vercel per-environment for
deployed:

```
STRIPE_SECRET_KEY=       # sk_test_… locally / for the test-mode POC
STRIPE_WEBHOOK_SECRET=   # see "Webhook setup" below — different per endpoint
```

`STRIPE_PUBLISHABLE_KEY` is **not used anywhere** in this integration and
should never be added to `.env.example` or prefixed `NEXT_PUBLIC_`. If a
future change needs it, someone switched to embedded checkout — a different
design than what's here.

Without `STRIPE_SECRET_KEY` set, `/buy` renders a "contact us instead"
fallback rather than the form — `next build` also succeeds with it unset
(the Stripe client is constructed lazily).

## Webhook setup

The route only ever needs three events — nothing else is handled, so don't
add more when creating the endpoint:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

**Local dev:**
```bash
npm run dev                                                  # terminal 1
stripe listen --forward-to localhost:3010/api/stripe/webhook # terminal 2
```
Paste the `whsec_…` it prints into `.env.local` as `STRIPE_WEBHOOK_SECRET`,
restart `npm run dev`. `stripe listen` must stay running the whole time you're
testing — no forwarding, no webhook.

**Deployed (any environment — Preview, Production, a proof-of-concept):**
Stripe Dashboard → Developers → Webhooks → Add endpoint → URL
`https://<your-domain>/api/stripe/webhook` → select the three events above.
Stripe reveals a signing secret **for that specific endpoint** — copy it into
the matching Vercel environment's `STRIPE_WEBHOOK_SECRET`. This secret is
**not the same as the `stripe listen` one** and not reusable across
endpoints — each registered endpoint gets its own.

Webhook endpoints (and their secrets) are scoped per **Stripe account** and
per **mode** (test vs. live). Test mode and live mode each keep an entirely
separate endpoint list even within the same account.

## Test-mode credentials

No Stripe dashboard access needed — these are Stripe's published test values,
safe to hand to anyone testing the flow.

**Cards** (any future expiry, any 3-digit CVC, any ZIP):

| Number | Result |
|---|---|
| `4242 4242 4242 4242` | Succeeds |
| `4000 0000 0000 0002` | Generic decline |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0025 0000 3155` | Requires 3D Secure |

**US bank account (ACH)** — select "US bank account" at checkout, then
"Manually verify instead" (not the Financial Connections institution list):

| Routing | Account | Result |
|---|---|---|
| `110000000` | `000123456789` | Succeeds |
| `110000000` | `000111111116` | Fails |

**The ACH fixtures don't auto-settle.** After submitting the routing/account
number, Stripe puts the payment into a microdeposit-verification state and
shows a "Verify bank account" link. Open it and enter descriptor code
**`SM11AA`** (the UI masks it as `SMXXXX`, but this fixed value always works
in test mode) — only then does the async success/failure event fire, usually
within about a minute. Skipping this step leaves the order stuck in
`processing` indefinitely.

## Order status lifecycle

`purchase_orders.status`: `pending` (session created, not yet paid) →
`processing` (ACH initiated, money not here yet) → `paid` | `failed`.
Idempotent by construction — replay a webhook event and it's a no-op.

```sql
-- Paid but nobody was emailed. Should always be empty.
select * from purchase_orders where status = 'paid' and not notified;
-- ACH stuck past a week: neither cleared nor bounced.
select * from purchase_orders
 where status = 'processing' and created_at < now() - interval '7 days';
-- Abandoned carts: warm leads with full school details already captured.
select * from purchase_orders where status = 'pending' order by created_at desc;
```

## Switching to a different Stripe account (e.g. Brunt's)

Tracked in [MED-41](https://linear.app/media-education-solutions/issue/MED-41).
Short version: new `STRIPE_SECRET_KEY` from the new account, a new webhook
endpoint registered under that account (same three events), its secret into
`STRIPE_WEBHOOK_SECRET`. No code changes — everything reads from env vars.
