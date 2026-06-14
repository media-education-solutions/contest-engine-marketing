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

${site.productName} is built by ${site.companyName} ("${site.tagline}"). Primary audience: educators and coordinators running student film festivals, photo contests, and scholastic media competitions.

## What it does

${features}

## How a contest works

1. **Collect**: organizers create a contest with divisions and categories, set deadlines, and distribute access codes (or QR codes). Students enter with a contest code + participant code; no student accounts or emails are required.
2. **Evaluate**: judges review anonymized entries (letter labels, never names) on a guided 1–10 scale with named achievement tiers, write feedback for each student, and rank their top three per category.
3. **Activate**: organizers review and publish winner showcases (1st/2nd/3rd per category), students receive judge feedback, and originals can be bulk-downloaded into the program's archive.

## Used by

${clients}

## Pages

- [How it works](${site.url}/how-it-works): the full workflow for organizers, students, and judges
- [Contact](${site.url}/contact): talk to the team about running your festival

## Company

${site.companyName}: ${site.mission}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
