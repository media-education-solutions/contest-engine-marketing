-- Contest Engine — judge interest applications (MED-35).
--
-- Canonical schema. Run once in the Neon SQL editor (or psql against NEON_DB_URL).
-- There is no migration tooling in this repo by design.
-- Written by saveApplication() in src/lib/judge-delivery.ts.

create table if not exists judge_applications (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  -- 'volunteer' => donating time; 'freelance' => wants paid judging work
  kind       text        not null,
  name       text        not null,
  email      text        not null,
  phone      text        not null default '',
  job_title  text        not null default '',
  note       text        not null default '',
  -- false => the Apps Script notification failed; nobody has been emailed about this row
  notified   boolean     not null default false
);

-- Applications stored but never notified — the query that matters if Google is down.
create index if not exists judge_applications_unnotified_idx
  on judge_applications (created_at desc) where not notified;

-- The evaluator network, by lane.
create index if not exists judge_applications_kind_idx
  on judge_applications (kind, created_at desc);
