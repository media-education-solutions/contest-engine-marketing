# Product media capture (MED-42)

Re-records the product demo clips and stills for the marketing site from the **local**
product app, driven by Playwright and encoded with ffmpeg. Re-run it whenever the app's
UI changes. Plan: `.claude/plans/med-42/plan.md`.

Never run against production. Capture goes through `localhost:5173`, which talks to the
Supabase **test** project `contest-engine-test` (see `scripts/demo/README.md`).

## Run order

1. **Servers.** Start the stock-footage server (leave it running) and the product app:
   ```bash
   npm run demo:serve                 # here, port 8787
   npm run dev                        # in the media-education-solutions repo, port 5173
   ```
   If the media server is down every entry shows "Video unavailable".
2. **Seed.** `npm run demo:seed` resets the three demo contests (and any contest the
   capture created) to a fresh state.
3. **Log in. This is a human step.** The script never types a password or participant
   code. Each command opens Chrome; sign in yourself and the session is saved:
   ```bash
   npm run capture:login -- admin     # admin@contest-engine.com
   npm run capture:login -- judge     # judge3@contest-engine.com
   npm run capture:login -- student   # participant code 71000001 (only the banked clip 4 needs it)
   npm run capture:login -- owner     # owner code 74121504 (clip 6, the organizer dashboard)
   ```
   Do `student` and `owner` **last**: their sessions hold ids that change on every seed, and
   they expire after 120 idle minutes.
4. **Capture.**
   ```bash
   npm run capture                    # every clip, then every still
   npm run capture -- --clip 1        # one clip
   npm run capture -- --stills        # every still
   npm run capture -- --still S1      # one still
   ```
5. **Re-shooting a clip that changes data** (1, 2, 3 and 5 do) means repeating steps 2 to 4
   for it.

Outputs land in `public/assets/video/**` and `public/assets/photo/**` (committed). Raw
frames and saved sessions stay in `.out/` and `.auth/` (gitignored).

## How it works

- `capture.mjs` runs `clips/index.mjs` in shot-list order. Each clip module exports
  `setup` (navigate to the start state, not recorded) and `run` (the recorded beats).
- Chrome runs **headed**, so a window opens on your screen while a clip records; leave it
  alone until it closes. Headless Chrome's screencast ignores the 2x scale factor and
  returns mis-sized frames (1024x681 for a 1024x768 viewport).
- Chrome is launched with `channel: "chrome"`. Playwright's bundled Chromium has no
  H.264, so the stock clips would be black tiles.
- `lib/record.mjs` records with the DevTools screencast (high-quality JPEG frames) and
  encodes H.264, silent, `+faststart`, 30 fps, at most 3 MB (CRF is raised until it fits).
  The poster JPG comes from the last frame.
- `lib/overlay.mjs` draws a cursor (headless frames have none) and collapses the
  Cloudflare test widget's red "For testing only" label without stopping the widget.
- `lib/pace.mjs` has the paced input helpers: gliding cursor, visible typing, eased scroll,
  stepped drag.
- Navigate by visible text, never by UUID: re-seeding changes every id.

## Gotchas

- Clips end on the **payoff frame** (the site's autoplay clips play once and rest on the
  last frame), and the poster is that same frame (it is what reduced-motion users see).
- Record each clip at the aspect ratio of its slot, or `object-cover` crops the UI.
- Keep the admin dashboard's "Active Contests" list off camera: the product app hardcodes
  "Submissions: 0 · No judges assigned" on every row.
- The capture tooling lives outside `tests/` on purpose: `npm run shots` runs everything
  under `tests/`.
