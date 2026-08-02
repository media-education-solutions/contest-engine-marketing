-- migrate:up

-- Baseline: contact_inquiries was created by hand in the Neon console for MED-31,
-- before this repo had migration tooling. `if not exists` makes applying this to
-- the live database a no-op that only records the version.
-- Written by saveInquiry() in src/lib/contact-delivery.ts.
create table if not exists contact_inquiries (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  name         text        not null,
  email        text        not null,
  organization text        not null default '',
  role         text        not null,
  message      text        not null,
  -- false => the Apps Script notification failed; nobody has been emailed about this row
  notified     boolean     not null default false
);

-- Cheap lookup for inquiries that were stored but never notified.
create index if not exists contact_inquiries_unnotified_idx
  on contact_inquiries (created_at desc) where not notified;

-- migrate:down
-- WARNING: running this against production drops the table and every row in it.
-- `db:rollback` is for local iteration only.
drop index if exists contact_inquiries_unnotified_idx;
drop table if exists contact_inquiries;
