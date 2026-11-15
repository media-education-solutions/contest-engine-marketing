# Demo contest data (MED-42)

Tooling for recording product demo videos from the **local** product app
(`media-education-solutions`, run at `localhost:5173`) against the Supabase **test**
project `contest-engine-test`. It never touches production. The 4-State Video
Competition lives in production and is view-only.

## What it creates

Four fictional contests, each at a different stage, so every flow can be filmed:

| Contest | Code | Stage | Use it for |
|---|---|---|---|
| Lakeside Student Film Festival | `LKSF26` | Finished, results published | Results, winners, admin overview |
| Riverbend Youth Media Awards | `RVMA26` | Judging in progress | Judge rating (hero), drag-to-rank |
| Harbor City Student Showcase | `HCSS27` | Open, QR registration on | Code entry, self-registration |
| Tri-County Student Media Festival | `TCSM26` | Reviewed: 16 categories judged and approved, results not published | Owner dashboard (owner code `74121504`) |

In Riverbend, judge3 has three categories:
- **Documentary:** half reviewed. *Behind the Lens* is left for the hero clip.
- **Music Video:** fully reviewed but not ranked. Use it for the ranking clip.
- **Sports Highlights:** not started.

Entries play approved Mixkit stock clips (`stock.json`), served locally. The test
project has no Bunny, so nothing is uploaded.

## Usage

```bash
npm run demo:fetch   # once: download clips + posters into scripts/demo/.media/ (gitignored)
npm run demo:serve   # keep running while you use or record the app (port 8787)
npm run demo:seed    # wipe and re-create the three demo contests
npm run demo:reset   # remove them
```

`demo:seed -- --dry-run` prints the SQL without running it.

## How it works

- `seed.mjs` runs SQL with the Supabase CLI **from the app repo**, using that repo's
  existing `supabase link`. It refuses to run unless the linked project is
  `contest-engine-test` (override with `DEMO_SUPABASE_PROJECT`).
- CLI is pinned to `supabase@2.106.0`. Newer versions reject the app's `config.toml`.
- Video entries point at `/embed/<id>.html`, a tiny player page. The app shows video
  in an `<iframe src={media_url}>`, and a bare mp4 or YouTube watch link won't embed
  cleanly.
- Reset first clears category completion (completed categories block review
  deletes), then deletes the contests by code. Everything else cascades. Contests
  with other codes are never touched.

Env overrides: `APP_REPO`, `DEMO_MEDIA_BASE`, `DEMO_MEDIA_PORT`, `DEMO_SUPABASE_PROJECT`.
