// Registry of everything `npm run capture` can shoot, in shot-list order.
// Add a module under clips/ and list it here.

import * as judging from "./judging.mjs";
import * as ranking from "./ranking.mjs";
import * as registration from "./registration.mjs";
import * as studentResults from "./student-results.mjs";
import * as contestSetup from "./contest-setup.mjs";
import * as admin from "./admin.mjs";
import * as ownerDashboard from "./owner-dashboard.mjs";

export const clips = [judging.clip, ranking.clip, registration.clip, studentResults.clip, contestSetup.clip, ownerDashboard.clip];
export const stills = [...judging.stills, ...admin.stills];
