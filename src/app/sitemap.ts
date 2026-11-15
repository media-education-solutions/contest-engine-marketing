import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Indexable pages only — privacy/terms stay out while they're noindexed
 * stubs. Phase 4 pages get added as they ship.
 */
const routes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/how-it-works", priority: 0.9 },
  { path: "/why-contest-engine", priority: 0.8 },
  { path: "/who-we-help", priority: 0.8 },
  { path: "/pricing", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  // Nothing in the nav or footer links to /judges (MED-35) — this line is the
  // only crawl path to it. Deleting it doesn't demote the page, it hides it.
  { path: "/judges", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: new URL(path, site.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
