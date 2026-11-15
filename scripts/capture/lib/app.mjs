// Navigation helpers for the product app. Everything is found by visible text, never by
// UUID: ids change on every `npm run demo:seed`.

import { APP_URL } from "./config.mjs";

/** The button named `buttonName` inside the card whose title text is `title`. */
export function cardButton(page, title, buttonName) {
  return page
    .getByText(title, { exact: true })
    .first()
    .locator(`xpath=ancestor::*[.//button[contains(normalize-space(.), "${buttonName}")]][1]`)
    .getByRole("button", { name: buttonName });
}

/** Judge dashboard → contest → category review grid. Not recorded; sets up the start state. */
export async function openJudgeCategory(page, { contest, category }) {
  await page.goto(`${APP_URL}/judge/dashboard`);
  await cardButton(page, contest, "View Categories").click();
  await cardButton(page, category, "Start Reviewing").click();
  await page.getByRole("heading", { name: category }).waitFor();
}

/** An entry card on the category review grid, found by its submission title. */
export const entryCard = (page, title) => page.getByRole("button").filter({ hasText: title });
