-- migrate:up

-- Baseline: purchase_orders was created by hand in the Neon console for MED-32,
-- before this repo had migration tooling. `if not exists` makes applying this to
-- the live database a no-op that only records the version.
-- Written by createPendingOrder() / markOrderPaid() in src/lib/purchase-delivery.ts.
create table if not exists purchase_orders (
  id                bigint generated always as identity primary key,
  created_at        timestamptz not null default now(),
  -- 'pending'    => session created, buyer never completed checkout (abandoned cart)
  -- 'processing' => ACH debit initiated; funds are 3-5 business days out
  -- 'paid'       => money confirmed (card at completion, or ACH async success)
  -- 'failed'     => ACH debit bounced
  status            text        not null default 'pending',
  plan              text        not null,
  -- SKU ids from src/content/commerce.ts, e.g. ["extra-storage","training"]
  addons            jsonb       not null default '[]'::jsonb,
  amount_cents      integer     not null,
  teacher_name      text        not null,
  email             text        not null,
  phone             text        not null default '',
  school_name       text        not null,
  school_address    text        not null default '',
  school_phone      text        not null default '',
  stripe_session_id text        unique,
  paid_at           timestamptz,
  -- false => the Apps Script notification failed; nobody has been emailed about this sale
  notified          boolean     not null default false
);

-- Paid orders nobody has been emailed about — the one query that matters if Google is down.
create index if not exists purchase_orders_unnotified_idx
  on purchase_orders (created_at desc) where status = 'paid' and not notified;

-- Abandoned carts: a warm lead list.
create index if not exists purchase_orders_pending_idx
  on purchase_orders (created_at desc) where status = 'pending';

-- ACH in flight. Anything sitting here past ~7 business days never resolved either way.
create index if not exists purchase_orders_processing_idx
  on purchase_orders (created_at desc) where status = 'processing';

-- migrate:down
-- WARNING: running this against production drops the table and every row in it.
-- `db:rollback` is for local iteration only.
drop index if exists purchase_orders_processing_idx;
drop index if exists purchase_orders_pending_idx;
drop index if exists purchase_orders_unnotified_idx;
drop table if exists purchase_orders;
