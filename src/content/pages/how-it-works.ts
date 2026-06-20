import type { FeatureSplitProps } from "@/components/blocks/feature-split";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";

export const intro = {
  kicker: "How it works",
  title: "One workflow. From submission, to recognition.",
  subtitle: `We help contests move through four stages: create, collect, judge, celebrate. Here's how it works for your whole organization.`,
};

/** Media slots are wired up in the page component (MediaPlaceholder until Phase 5). */
export const roles: Array<Omit<FeatureSplitProps, "media">> = [
  {
    id: "organizers",
    kicker: "For organizers",
    title: "Build your contest in an afternoon",
    body: "Set up divisions and categories, write the rules once, and control every deadline from a single dashboard. Distribution is as easy as sharing a code or QR poster.",
    bullets: [
      "Divisions and categories for any contest structure: video, photo, or both",
      "Access codes and QR distribution: no rosters to upload, no accounts to provision",
      "Real-time monitoring of who's submitted and which categories need attention",
      "You approve everything before results ever go public",
    ],
  },
  {
    id: "students",
    kicker: "For media events",
    title: "Two codes and they're in",
    body: "Students enter with a link and a participant code from their teacher. No accounts to create, no emails required, nothing to remember after festival season. Uploads are resumable, so school Wi-Fi can't eat anyone's entry.",
    bullets: [
      "No student accounts or personal information required to participate",
      "Video and photo uploads from any device, with progress that survives drops",
      "Students track their submission status and see feedback when results publish",
    ],
    reverse: true,
    tone: "muted",
  },
  {
    id: "judges",
    kicker: "For judges",
    title: "Fair, focused judging, flexible remote access",
    body: "Judges see anonymized entries: Entry A, B, C, never participant names. A guided 1–10 scale with named achievement tiers keeps scoring consistent across judges, and written feedback flows back to every participant.",
    bullets: [
      "Anonymous entries with letter labels, so bias never gets a foothold",
      "Guided 1–10 scale, from Developing Skills to Master Creator",
      "Written feedback fields, auto-saved as judges progress",
      "Rank the top entries, drag-n-drop them to the winner's podium",
      "Automatic email notifications to judges when entries are ready",
    ],
  },
  {
    id: "results",
    kicker: "Results & recognition",
    title: "Awards night, minus the all-nighter",
    body: "When judging closes, you review, then publish. Now you can plan award ceremonies, share winner showcases, push feedback to students, and the originals are yours to download.",
    bullets: [
      "Winner galleries shareable by URL or embedded on your organization's site",
      "Every participant sees their judge feedback, not just the winners",
      "Bulk-download original files into your program's archive",
    ],
    reverse: true,
    tone: "muted",
  },
];

export const ctaBanner: CtaBannerProps = {
  title: "See it with your event structure",
  subtitle:
    "Bring us your categories and divisions. We'll walk you through a contest set up exactly like yours.",
  cta: { label: "Talk to Us", href: "/contact" },
};
