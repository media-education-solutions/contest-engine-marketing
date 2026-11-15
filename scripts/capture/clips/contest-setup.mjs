// Clip 5: an organizer creates a contest, then sets up a division and a category.
//
// Admin session. Data effect: creates "Bayside Student Media Awards" (named in
// CAPTURE_CONTEST_NAMES in scripts/demo/demo-data.mjs, so `npm run demo:seed` removes it).
// Re-shooting needs a reseed first, or the list would already show the contest.
//
// A new contest comes with an empty "General" division, so the beats rename it to
// "High School", add a category with a deadline, then add a second division.

import { APP_URL, VIEWPORTS } from "../lib/config.mjs";

const CONTEST = "Bayside Student Media Awards";
const CATEGORY = "Documentary";
// Faster typing than the default: this clip has a lot of fields and a 25 s budget.
const FAST = { delay: 28 };

/** Click `day` of next month in the open date picker (a safe middle-of-month day). */
async function pickNextMonthDay(page, h, day) {
  // The trigger is a combobox-style button, so it is not found by role "button".
  await h.click(page.getByRole("dialog").locator("button").filter({ hasText: "Pick a date" }), { settle: 350 });
  await h.click(page.getByRole("button", { name: /next month/i }), { settle: 250 });
  // Day cells are <td data-day="2026-12-15"> wrapping a button; a middle-of-month day has no
  // greyed-out twin from the adjacent months.
  await h.click(page.locator(`td[data-day$="-${day}"] button`).first(), { settle: 350 });
}

export const clip = {
  id: 5,
  name: "admin_contest_setup",
  role: "admin",
  ...VIEWPORTS["4/3"],
  output: "public/assets/video/admin/admin_contest_setup.mp4",
  poster: "public/assets/video/admin/admin_contest_setup_poster.jpg",

  /** Start on the contests list (not recorded). */
  async setup(page) {
    await page.goto(`${APP_URL}/admin/contests`);
    await page.getByRole("button", { name: "Create Contest" }).first().waitFor();
    await page.getByText("Riverbend Youth Media Awards").first().waitFor();
    // Keep the soft-deleted June contests off camera.
    await page.evaluate(() => {
      for (const el of document.querySelectorAll("button, div")) {
        if (el.textContent?.trim().startsWith("Recently Deleted") && el.children.length < 6) {
          (el.closest("div") ?? el).style.display = "none";
          break;
        }
      }
    });
  },

  async run(page, h) {
    await h.park(640, 400);
    await h.pause(1000);

    await h.click(page.getByRole("button", { name: "Create Contest" }).first(), { settle: 600 });
    const sheet = page.getByRole("dialog");
    await h.click(sheet.getByLabel("Contest Name *"), { settle: 300 });
    await h.typeSlow(CONTEST, FAST);
    await h.pause(350);
    await h.click(sheet.getByRole("button", { name: "Create Contest" }), { settle: 200 });

    // Contest detail. The load is dead air, so cut it.
    await h.skipWhile(() => page.getByRole("heading", { name: CONTEST }).waitFor());
    await h.pause(900);
    await h.scrollTo(page.getByRole("heading", { name: "Divisions & Categories" }), { align: 0.12, ms: 800 });
    await h.pause(300);

    // Rename the default "General" division.
    await h.click(page.getByRole("button", { name: "Edit General" }), { settle: 600 });
    const division = page.getByRole("dialog").getByLabel("Division Name *");
    await h.click(division, { settle: 200 });
    await page.keyboard.press("ControlOrMeta+A");
    await h.typeSlow("High School", FAST);
    await h.pause(300);
    await h.click(page.getByRole("dialog").getByRole("button", { name: "Save Changes" }), { settle: 200 });
    await page.getByRole("dialog").waitFor({ state: "hidden" });
    await h.pause(600);

    // Add a category with a deadline.
    await h.click(page.getByRole("button", { name: "Add", exact: true }), { settle: 600 });
    const form = page.getByRole("dialog");
    await h.click(form.getByLabel("Category Name *"), { settle: 200 });
    await h.typeSlow(CATEGORY, FAST);
    await h.pause(300);
    await pickNextMonthDay(page, h, 15);
    await h.pause(300);
    const create = form.getByRole("button", { name: "Create Category" });
    await h.scrollTo(create, { align: 0.8 });
    await h.click(create, { settle: 300 });
    await form.waitFor({ state: "hidden" });
    await h.pause(700);

    // A second division.
    await h.click(page.getByRole("button", { name: "Add Division" }), { settle: 600 });
    await h.click(page.getByRole("dialog").getByLabel("Division Name *"), { settle: 200 });
    await h.typeSlow("Middle School", FAST);
    await h.pause(300);
    await h.click(page.getByRole("dialog").getByRole("button", { name: "Create Division" }), { settle: 300 });
    await page.getByRole("dialog").waitFor({ state: "hidden" });

    // Payoff: both divisions listed with the new category.
    await h.scrollTo(page.getByRole("heading", { name: "Divisions & Categories" }), { align: 0.05, ms: 900 });
    await h.pause(1800);
  },
};
