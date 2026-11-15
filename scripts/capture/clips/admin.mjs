// Stills S3 and S4: admin views of Riverbend, banked for the Coordinator (MED-37) and
// Features (MED-30) pages. Read-only: they change nothing, so no reseed is needed, but
// they look best after clips 1 and 2 have advanced judging.

import { APP_URL, VIEWPORTS } from "../lib/config.mjs";
import { hideCursor } from "../lib/overlay.mjs";

const CONTEST = "Riverbend Youth Media Awards";
// S3 lists every category; S4 opens one that already has a ranked podium (Short Film is
// complete). Documentary is mid-judging, so its rankings panel would read "now empty".
const DETAIL_CATEGORY = "Short Film";

/** Contests list → Riverbend detail. Not the dashboard: its "Active Contests" rows hardcode "Submissions: 0". */
async function openRiverbend(page) {
  await page.goto(`${APP_URL}/admin/contests`);
  await page.getByText(CONTEST).first().click();
  await page.getByRole("heading", { name: CONTEST }).waitFor();
  await page.getByRole("heading", { name: "Divisions & Categories" }).waitFor();
  await page.getByRole("row", { name: new RegExp(DETAIL_CATEGORY) }).first().waitFor();
}

export const stills = [
  {
    id: "S3",
    name: "admin_category_progress",
    role: "admin",
    ...VIEWPORTS["4/3"],
    output: "public/assets/photo/admin/admin_category_progress.png",

    /** Per-category judge / reviewed / status table. */
    async run(page, h) {
      await openRiverbend(page);
      await hideCursor(page);
      // Everything above the table (cover, stat cards, storage, people) is not part of this
      // shot. Hide the earlier siblings at each level so the table fills the frame.
      await page.getByRole("heading", { name: "Divisions & Categories" }).evaluate((heading) => {
        for (let el = heading; el && el.tagName !== "MAIN"; el = el.parentElement) {
          for (let n = el.previousElementSibling; n; n = n.previousElementSibling) n.style.display = "none";
        }
      });
      await h.scrollTo(page.getByRole("heading", { name: "Divisions & Categories" }), { ms: 1, align: 0.03 });
      await page.mouse.move(1000, 760); // off the table: no row hover state in the still
      await h.pause(600);
    },
  },
  {
    id: "S4",
    name: "admin_category_detail",
    role: "admin",
    ...VIEWPORTS["4/3"],
    output: "public/assets/photo/admin/admin_category_detail.png",

    /** One finished category: progress, entries and the judge's podium. */
    async run(page, h) {
      await openRiverbend(page);
      await page.getByRole("row", { name: new RegExp(DETAIL_CATEGORY) }).first().click();
      await page.getByRole("heading", { name: "Category Detail" }).waitFor();
      await page.waitForLoadState("networkidle").catch(() => {});
      await hideCursor(page);
      await h.pause(1500);
    },
  },
];
