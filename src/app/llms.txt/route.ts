import { site } from "@/content/site";
import * as home from "@/content/pages/home";

/**
 * llms.txt — a concise, plain-markdown product summary for AI crawlers
 * and answer engines. Composed from content modules so it can never
 * drift from the site copy (or survive a product rename stale).
 */
export const dynamic = "force-static";

export async function GET() {
  const features = home.featureGrid.features
    .map((f) => `- **${f.title}**: ${f.body}`)
    .join("\n");

  const clients = home.logoCloud.logos.map((l) => `- ${l.name}`).join("\n");

  const body = `# ${site.productName}

> ${site.description}

${site.productName} is built by ${site.companyName} ("${site.tagline}"). Primary audience: organizations and coordinators running media contests — film festivals, photo competitions, and scholastic media events.

## What it does

${features}

## How a contest works

1. **Collect**: organizers create a contest with divisions and categories, set deadlines, and distribute access codes (or QR codes). Participants enter with a contest link + participant code; no accounts or emails are required.
2. **Evaluate**: judges review anonymized entries (letter labels, never names) on a guided 1–10 scale with named achievement tiers, write feedback for each participant, and rank the top entries per category.
3. **Activate**: organizers review and publish winner showcases (1st/2nd/3rd per category), participants receive judge feedback, and originals can be bulk-downloaded into the organization's archive.

## Used by

${clients}

## Pages

- [How it works](${site.url}/how-it-works): the full workflow for organizers, participants, and judges
- [Buy](${site.url}/buy): purchase a Teacher or Coordinator Portal and add-ons online
- [Contact](${site.url}/contact): talk to the team about running your contest
- [Become a judge](${site.url}/judges): join the judge network — how judging works, and the volunteer or freelance interest forms

## Company

${site.companyName}: ${site.mission}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
