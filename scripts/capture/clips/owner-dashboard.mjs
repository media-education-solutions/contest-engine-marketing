// Clip 6: the organizer's dashboard, the page owners "live in" during a contest.
// Replaces the student-results clip in the How It Works "Awards night" slot.
//
// Owner session (owner code 74121504, Tri-County). View-only. Tri-County is seeded as
// 'reviewed' (every category judged and approved, results not published), because an owner
// of a 'finished' contest is redirected to the winners page instead of this dashboard.
// The owner login holds ids that change on every `npm run demo:seed`: log in after the
// last seed, and use it within 120 idle minutes.

import { APP_URL, VIEWPORTS } from "../lib/config.mjs";

export const clip = {
  id: 6,
  name: "owner_dashboard",
  role: "owner",
  ...VIEWPORTS["4/3"],
  output: "public/assets/video/owner/owner_dashboard.mp4",
  poster: "public/assets/video/owner/owner_dashboard_poster.jpg",
  // The last frame is a dense table; the first (stat cards: 58 submissions, 16 categories,
  // 100% judged) reads on its own, and the poster is what reduced-motion visitors see.
  posterFrame: "first",

  /** Start on the dashboard (not recorded). */
  async setup(page) {
    await page.goto(`${APP_URL}/owner/dashboard`);
    await page.getByRole("heading", { name: "Categories by Division" }).waitFor();
    await page.getByRole("button", { name: "See winners" }).first().waitFor();
  },

  async run(page, h) {
    await h.park(512, 330);
    await h.pause(2500); // stat cards and the top of the table

    // Scroll down the table in two eased steps: to the second division, then the last rows.
    await h.scrollTo(page.getByRole("cell", { name: "Middle School", exact: true }), { align: 0.22, ms: 2600 });
    await h.pause(900);
    await h.scrollTo(page.getByRole("row", { name: /Spot Feature/ }).last(), { align: 0.9, ms: 2400 });
    await h.pause(500);

    // Payoff: what organizers do here, the winners and the export.
    await h.moveTo(page.getByRole("button", { name: "See winners" }).last());
    await h.pause(1200);
    await h.moveTo(page.getByRole("button", { name: "CSV" }).last());
    await h.pause(2200);
  },
};
