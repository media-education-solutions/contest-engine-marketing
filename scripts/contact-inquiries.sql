-- Contest Engine — contact form inquiries (MED-31).
--
-- Canonical schema. Run once in the Neon SQL editor (or psql against NEON_DB_URL).
-- There is no migration tooling in this repo by design — one table, created once.
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
