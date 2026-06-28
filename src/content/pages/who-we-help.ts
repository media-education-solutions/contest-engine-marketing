import {
  Clapperboard,
  GraduationCap,
  Megaphone,
  Radio,
  School,
  Trophy,
} from "lucide-react";
import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { FeatureSplitProps } from "@/components/blocks/feature-split";
import type { FeatureGridProps } from "@/components/blocks/feature-grid";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";

export const intro: PageIntroProps = {
  kicker: "Who we help",
  title: "Made for student media. Ready for every kind of contest",
  subtitle: `${site.productName} was born in scholastic media and runs deepest there. But the engine underneath (collect, evaluate, activate) fits any organization that turns participation into creative work.`,
};

/** Lead segment gets the full split treatment (photo slot for deployment shots). */
export const lead: Omit<FeatureSplitProps, "media"> = {
  id: "scholastic",
  kicker: "Our home turf",
  title: "Scholastic media programs & student media events",
  body: "Designed for journalism, broadcasting, filmmaking, photography, and multimedia storytelling competitions, at any size, from single classroom challenges to large-scale nationwide media contest events.",
  bullets: [
    "Custom divisions that can be based on age, skill, or grade level",
    "Code-based entry that respects participant privacy: no accounts, no emails required",
    "Judges can be drawn from industry professionals, working remotely",
    "Winner showcasing tools optimized for the awards ceremony and ready for the school website",
  ],
};

export const segments: FeatureGridProps = {
  kicker: "Beyond the classroom",
  title: "One engine, many kinds of contests",
  intro:
    "These deployments share the same platform with terminology and branding tuned to each world.",
  tone: "muted",
  features: [
    {
      icon: Radio,
      title: "Community media organizations",
      body: "Public-access stations and youth media nonprofits running recurring video competitions, like statewide youth exchanges and community storytelling programs.",
    },
    {
      icon: Clapperboard,
      title: "Film festivals",
      body: "Independent and student film festivals that need submission collection, screening-ready organization, and jury workflows without enterprise complexity.",
    },
    {
      icon: GraduationCap,
      title: "Universities & colleges",
      body: "Academic departments, student orgs, and campus media programs running creative showcases, scholarship competitions, and recognition programs.",
    },
    {
      icon: Trophy,
      title: "Athletics & sports content",
      body: "Athletic departments and teams collecting fan- and athlete-created content: sponsored challenges, NIL-friendly creator programs, and community engagement campaigns.",
    },
    {
      icon: Megaphone,
      title: "Brands & creator programs",
      body: "Ambassador programs and marketing teams turning their communities into content teams through structured, rights-cleared creative challenges.",
    },
    {
      icon: School,
      title: "Scholarship nonprofits",
      body: "Foundations and associations running media-based scholarship and recognition programs with transparent, defensible evaluation.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Don't see your exact contest? Ask anyway.",
  subtitle:
    "If people create video, photo, or media for it and someone has to judge it, chances are the engine fits.",
  cta: { label: "Talk to Us", href: "/contact" },
};
