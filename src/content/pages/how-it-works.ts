import type { FeatureSplitProps } from "@/components/blocks/feature-split";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";

export const intro = {
  kicker: "How it works",
  title: "One workflow, from open call to awards night",
  subtitle: `A ${site.productName} contest moves through four stages — create, collect, judge, celebrate. Here's what that looks like for everyone involved.`,
};

/** Media slots are wired up in the page component (MediaPlaceholder until Phase 5). */
export const roles: Array<Omit<FeatureSplitProps, "media">> = [
  {
    id: "organizers",
    kicker: "For organizers",
    title: "Build your contest in an afternoon",
    body: "Set up divisions and categories, write the rules once, and control every deadline from a single dashboard. Distribution is as easy as sharing a code or QR poster.",
    bullets: [
      "Divisions and categories for any festival structure — video, photo, or both",
      "Access codes and QR distribution: no rosters to upload, no accounts to provision",
      "Real-time monitoring of who's submitted and which categories need attention",
      "You approve everything before results ever go public",
    ],
  },
  {
    id: "students",
    kicker: "For students",
    title: "Two codes and they're in",
    body: "Students enter with a contest code and participant code from their teacher — no accounts, no emails, nothing to remember after festival season. Uploads are resumable, so school Wi-Fi can't eat anyone's entry.",
    bullets: [
      "No student accounts or personal information collected",
      "Video and photo uploads from any device, with progress that survives drops",
      "Students track their submission status and see feedback when results publish",
    ],
    reverse: true,
    tone: "muted",
  },
  {
    id: "judges",
    kicker: "For judges — the heart of the platform",
    title: "Fair, focused judging on their own schedule",
    body: "Judges see anonymized entries — Entry A, B, C, never student names. A guided 1–10 scale with named achievement tiers keeps scoring consistent across judges, and written feedback flows back to every student.",
    bullets: [
      "Anonymous entries with letter labels — bias never gets a foothold",
      "Guided 1–10 scale, from Developing Skills to Master Creator",
      "Written feedback fields, auto-saved as judges type",
      "Drag-and-drop top-three ranking to crown the winners",
      "Email notifications when entries are ready — judges work when it suits them",
    ],
  },
  {
    id: "results",
    kicker: "Results & recognition",
    title: "Awards night, minus the all-nighter",
    body: "When judging closes, you review, then publish. Winner showcases go live with first, second, and third place per category, students receive their feedback, and originals are yours to download.",
    bullets: [
      "Winner galleries shareable by URL or embedded on your school site",
      "Every student sees their judge feedback — not just the winners",
      "Bulk-download original files into your program's archive",
    ],
    reverse: true,
    tone: "muted",
  },
];

export const ctaBanner: CtaBannerProps = {
  title: "See it with your own festival's structure",
  subtitle:
    "Bring us your categories and divisions — we'll walk you through a contest set up exactly like yours.",
  cta: { label: "Talk to Us", href: "/contact" },
};
