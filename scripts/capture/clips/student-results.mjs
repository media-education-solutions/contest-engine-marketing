// Clip 4: a student opens their results: their entry, the judge's feedback, then the
// category podium with their entry highlighted.
//
// Student session (participant code 71000001, Lakeside). View-only: changes nothing, but
// the session holds a participant id that changes on every `npm run demo:seed`, so the
// student login must be saved AFTER the last seed and used within 120 idle minutes.

import { APP_URL, VIEWPORTS } from "../lib/config.mjs";

export const clip = {
  id: 4,
  name: "participant_results",
  role: "student",
  ...VIEWPORTS["4/3"],
  output: "public/assets/video/participant/participant_results.mp4",
  poster: "public/assets/video/participant/participant_results_poster.jpg",

  /** Start on the results page (not recorded). */
  async setup(page) {
    await page.goto(`${APP_URL}/participant/results`);
    await page.getByRole("heading", { name: "Your Submissions" }).waitFor();
    await page.getByRole("heading", { name: "Winners" }).waitFor();
  },

  async run(page, h) {
    await h.park(512, 420);
    await h.pause(3200); // their entry, rubric level and the judge's feedback

    const winners = page.getByRole("heading", { name: "Winners" });
    await h.scrollTo(winners, { align: 0.08, ms: 1800 });
    await h.pause(1200);

    // The category where this student placed first.
    const placed = page.getByRole("button").filter({ hasText: "You placed 1st" }).first();
    await h.click(placed, { settle: 1200 });

    // Payoff: the podium, their entry marked "Your Entry".
    await h.scrollTo(page.getByText("Your Entry").first(), { align: 0.5, ms: 1400 });
    await h.pause(3500);
  },
};
