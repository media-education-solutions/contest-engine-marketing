// Clip 3: a student registers by QR link with just a name, then lands in the contest.
//
// Logged out (fresh context, no saved session). Data effect: adds one participant to
// Harbor City (HCSS27). Run `npm run demo:seed` before re-shooting.
//
// The form needs a Cloudflare token (test keys auto-pass in about a second) and does not
// disable Register while waiting, so setup loads the page early and the beats leave time.

import { VIEWPORTS } from "../lib/config.mjs";
import { APP_URL } from "../lib/config.mjs";

const CONTEST_CODE = "HCSS27";
const NAME = "Maya R.";

export const clip = {
  id: 3,
  name: "participant_registration",
  role: null,
  ...VIEWPORTS["4/3"],
  output: "public/assets/video/participant/participant_registration.mp4",
  poster: "public/assets/video/participant/participant_registration_poster.jpg",

  async setup(page) {
    await page.goto(`${APP_URL}/register/${CONTEST_CODE}`);
    await page.getByLabel("Participant Name").waitFor();
    await page.waitForTimeout(4000); // let Turnstile issue its token before we record
  },

  async run(page, h) {
    await h.park(512, 620);
    await h.pause(1500);

    await h.click(page.getByLabel("Participant Name"), { settle: 300 });
    await h.typeSlow(NAME);
    await h.pause(700);
    await h.click(page.getByRole("button", { name: "Register" }), { settle: 300 });

    await page.getByText("You're registered").waitFor();
    await h.pause(2200); // hold on the participant code

    await h.click(page.getByRole("button", { name: "Continue" }), { settle: 300 });
    await page.waitForURL(/\/participant/);
    // The contest home takes a few seconds to load; cut the skeleton out of the clip.
    await h.skipWhile(() => page.getByText("Choose Your Division").waitFor());
    await h.pause(2800); // payoff: cover banner and division picker
  },
};
