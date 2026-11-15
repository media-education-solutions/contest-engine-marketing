// Clip 1 (hero) and still S1: a judge scores an anonymized entry.
//
// Data effect: scores Riverbend / Documentary / "Behind the Lens" (9 + feedback). Run
// `npm run demo:seed` before re-shooting. S1 reads the state clip 1 leaves behind, so
// shoot clip 1 first.

import { VIEWPORTS } from "../lib/config.mjs";
import { entryCard, openJudgeCategory } from "../lib/app.mjs";
import { hideCursor } from "../lib/overlay.mjs";

const CONTEST = "Riverbend Youth Media Awards";
const CATEGORY = "Documentary";
const ENTRY = "Behind the Lens";
const SCORE = 9;
const STILL_ZOOM = 0.85;
const FEEDBACK = "Honest, personal premise. Showing your own setup pulls us in. Tighten the first few seconds.";

const rating = (page) => page.getByRole("radiogroup", { name: "Rating" });
const scoreButton = (page) => rating(page).getByRole("radio", { name: `Score ${SCORE}` });

export const clip = {
  id: 1,
  name: "judge_scoring",
  role: "judge",
  ...VIEWPORTS["4/3"],
  output: "public/assets/video/judge/judge_scoring.mp4",
  poster: "public/assets/video/judge/judge_scoring_poster.jpg",

  /** Navigate to the start state (not recorded): the Documentary entry grid. */
  async setup(page) {
    await openJudgeCategory(page, { contest: CONTEST, category: CATEGORY });
    await entryCard(page, ENTRY).waitFor();
  },

  /** The beats (recorded). */
  async run(page, h) {
    await h.park(512, 360);
    await h.pause(1800); // let the Pending / Reviewed grid register

    await h.click(entryCard(page, ENTRY), { settle: 900 });

    const player = page.frameLocator("iframe").locator("video");
    await player.waitFor();
    await h.click(player, { settle: 3000 }); // play ~3 s

    // Low align: the rubric sits near the top so no sliver of the player peeks in above it
    // and the whole rubric + feedback + "saved" state fits the final frame.
    await h.scrollTo(rating(page), { align: 0.08 });
    await h.pause(500);
    await h.click(scoreButton(page), { settle: 700 });

    const feedback = page.locator("#feedback");
    await h.click(feedback, { settle: 300 });
    await h.typeSlow(FEEDBACK);
    // Payoff: scored and saved. The header repeats this status, so scope to <main>.
    await page.getByRole("main").getByText("All changes saved").waitFor();
    await h.pause(1200);
  },
};

export const stills = [
  {
    id: "S1",
    name: "judge_rating",
    role: "judge",
    // 4:3, not 16:9: the review page is a narrow column that is ~1100 px tall, so a wide
    // frame is mostly empty margin. Page zoom (below) fits player + rubric in one frame.
    ...VIEWPORTS["4/3"],
    output: "public/assets/photo/judge/judge_rating.png",

    /** Open the already-scored entry; fail loudly if clip 1 has not been shot. */
    async run(page, h) {
      await openJudgeCategory(page, { contest: CONTEST, category: CATEGORY });
      await entryCard(page, ENTRY).click();
      await page.frameLocator("iframe").locator("video").waitFor();
      const checked = await scoreButton(page).getAttribute("aria-checked");
      if (checked !== "true") {
        throw new Error(`S1 needs "${ENTRY}" scored ${SCORE}. Shoot clip 1 first: npm run capture -- --clip 1`);
      }
      await hideCursor(page);
      // Zoom out a little so the player AND the full rubric fit one frame.
      await page.evaluate((z) => { document.documentElement.style.zoom = String(z); }, STILL_ZOOM);
      await h.scrollTo(page.locator("iframe"), { ms: 1, align: 0 });
      await page.evaluate((px) => window.scrollBy(0, -px), 28); // breathing room above the player
      await h.pause(600); // let the video poster paint
    },
  },
];
