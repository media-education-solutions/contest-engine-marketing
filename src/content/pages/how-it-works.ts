import type { FeatureSplitProps } from "@/components/blocks/feature-split";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";

export const intro = {
  kicker: "How it works",
  title: "One platform.\nFour simple steps.",
  subtitle: `Create your contest, collect entries, manage judging, and recognize great work. ${site.productName} keeps everything moving from start to finish.`,
};

/** Media slots are wired up in the page component (MediaPlaceholder until Phase 5). */
export const roles: Array<Omit<FeatureSplitProps, "media">> = [
  {
    id: "organizers",
    kicker: "For organizers and coordinators",
    title: "Build your contest in an afternoon",
    body: "Create categories, organize divisions, control deadlines, and give participants instant access using a URL link or QR code.",
  },
  {
    id: "students",
    kicker: "For media events",
    title: "One code and they're in",
    body: "Students simply enter a participant code or use the QR code provided. No accounts to create, no emails required, and no barriers to submitting an entry.",
    bullets: [
      "No participant accounts or personal information required",
      "Participants track their submission status and see feedback when results publish",
      "Uploads may come from any device, and progress is saved if the connection drops",
      "Built for real-world uploads, even when the Wi-Fi is not",
    ],
    reverse: true,
    tone: "muted",
  },
  {
    id: "judges",
    kicker: "For judges",
    title: "Fair, focused judging, flexible remote access",
    body: "Judges evaluate anonymized entries, not participant names. A guided 1–10 scoring rubric, written feedback, and a simple drag-and-drop podium for selecting winners make judging fair, consistent, and easy.",
    bullets: [
      "Anonymous entry capabilities, so judge bias is not a problem",
      "Standard performance rubric using a 1–10 scale, from Developing Skills to Master Creator",
      "Written feedback fields, auto-saved as judges progress",
      "Rank the top entries, drag-n-drop them to the winner's podium",
      "Automatic email notifications to judges when entries are ready, and to organizers when judging is completed",
    ],
  },
  {
    id: "results",
    kicker: "Results & recognition",
    title: "Awards night,\nminus the all-nighter",
    body: "When judging closes, you review, then publish. Now you can plan award ceremonies, share winner showcases, push feedback to students, and the originals are yours to download.",
    bullets: [
      "Winner galleries may be showcased on a password-protected webpage with downloading and sharing tools",
      "Winning entries may be downloaded for presentation, shared with a URL link, or posted with an embed code",
      "Entire categories may be downloaded in bulk for broadcast and social media deployment, or for your library archive",
      "All participants see where they landed on the rubric, and may receive their own private judging feedback",
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
