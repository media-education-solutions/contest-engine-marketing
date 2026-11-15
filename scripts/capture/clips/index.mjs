// Registry of everything `npm run capture` can shoot, in shot-list order.
// Add a module under clips/ and list it here.

import * as judging from "./judging.mjs";

export const clips = [judging.clip];
export const stills = [...judging.stills];
