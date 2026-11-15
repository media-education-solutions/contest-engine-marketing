// Clip 2: a judge drags the top three entries onto the podium and marks judging complete.
//
// Data effect: ranks Riverbend / Music Video and marks the category complete. Run
// `npm run demo:seed` before re-shooting.
//
// Entries are anonymous ("Participant B"), so they are picked by their rating, not title:
// 9 → 1st (Red Room), 8 → 2nd (Street Choreo), 7 → 3rd (Garage Days). The app refuses a
// lower-rated entry above a higher-rated one, so this order is also the only valid one.

import { VIEWPORTS } from "../lib/config.mjs";
import { openJudgeCategory } from "../lib/app.mjs";

const CONTEST = "Riverbend Youth Media Awards";
const CATEGORY = "Music Video";
const PODIUM = [
  { rank: 1, score: 9 },
  { rank: 2, score: 8 },
  { rank: 3, score: 7 },
];

const poolEntry = (page, score) => page.getByRole("option").filter({ hasText: `· ${score}` }).first();
const slot = (page, rank) => page.getByRole("group", { name: `Rank ${rank} position` });

export const clip = {
  id: 2,
  name: "judge_ranking",
  role: "judge",
  ...VIEWPORTS["16/9"],
  output: "public/assets/video/judge/judge_ranking.mp4",
  poster: "public/assets/video/judge/judge_ranking_poster.jpg",

  /** Navigate to the empty podium (not recorded). */
  async setup(page) {
    await openJudgeCategory(page, { contest: CONTEST, category: CATEGORY });
    await page.getByRole("button", { name: "Proceed to Ranking" }).click();
    await page.getByRole("heading", { name: /Top 3 Ranking/ }).waitFor();
    await slot(page, 1).getByText("Drop submission here").waitFor();
  },

  async run(page, h) {
    await h.park(640, 80);
    await h.pause(1800); // empty podium, four rated entries

    for (const { rank, score } of PODIUM) {
      // Grab the label text, not the thumbnail (its click opens the replay dialog).
      const grip = poolEntry(page, score).locator("p").first();
      // A dnd-kit drop occasionally fails to register (seen once in testing, which left
      // Mark as Complete disabled). Confirm the slot filled; retry the drag once.
      for (let attempt = 1; attempt <= 2; attempt++) {
        await h.drag(grip, slot(page, rank));
        const filled = await slot(page, rank)
          .getByText("Drop submission here")
          .waitFor({ state: "hidden", timeout: 2500 })
          .then(() => true, () => false);
        if (filled) break;
        if (attempt === 2) throw new Error(`Drag to rank ${rank} did not register after 2 attempts`);
      }
      await h.pause(500);
    }
    await h.pause(1200); // full podium

    const complete = page.getByRole("button", { name: "Mark as Complete" });
    await h.scrollTo(complete, { align: 0.6 });
    await h.click(complete, { settle: 900 });
    await h.click(page.getByRole("alertdialog").getByRole("button", { name: "Confirm" }), { settle: 600 });

    // Payoff: the completed banner above a locked podium.
    await page.getByText(/rankings are read-only/).waitFor();
    await h.scrollTo(page.getByRole("heading", { name: /Top 3 Ranking/ }), { align: 0.1 });
    await h.pause(1800);
  },
};
