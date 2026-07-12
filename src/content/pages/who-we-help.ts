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
  title: "Built for student media. Ready for much more.",
  subtitle: `${site.productName} was built for scholastic media competitions, but any organization that collects creative work, evaluates submissions, and recognizes excellence can make it their own.`,
};

export const leadMedia = {
  src: "/assets/photo/founder/jeb-control-room-students.webp",
  alt: "Founder Jeb Brunt working alongside students at a broadcast control desk",
};

/** Lead segment gets the full split treatment (photo slot for deployment shots). */
export const lead: Omit<FeatureSplitProps, "media"> = {
  id: "scholastic",
  kicker: "Our home turf",
  title: "Scholastic media programs & student media events",
  body: `${site.productName} was built for journalism, broadcasting, filmmaking, photography, and multimedia competitions. Whether you're running a single classroom challenge or a national convention with thousands of entries, the workflow stays simple.`,
  bullets: [
    "Flexible divisions based on grade level, age, experience, or any criteria you choose",
    "Privacy-friendly submissions with simple access codes: no participant accounts or email addresses required",
    "Anonymous judging by educators or industry professionals from anywhere",
    "Awards-ready results with winner showcases built for ceremonies, websites, and social media",
  ],
};

export const segments: FeatureGridProps = {
  kicker: "Beyond the classroom",
  title: "Built for more than student media.",
  intro: `${site.productName} was built in scholastic media, but the same platform powers creative competitions, awards programs, and content challenges across education, nonprofits, sports, and business.`,
  tone: "muted",
  features: [
    {
      icon: Radio,
      title: "Community media organizations",
      body: "Run recurring video competitions for your public-access community station. Youth media programs and community storytelling initiatives can collect user-generated content using one platform for submissions, evaluation, recognition, and showcase.",
    },
    {
      icon: Clapperboard,
      title: "Film festivals",
      body: "Use the platform branding tools for a custom participant portal. Collect and own your festival entries, rights-cleared. Organize public event screenings. Manage your judges. Publish results without the cost and complexity of enterprise festival software.",
    },
    {
      icon: GraduationCap,
      title: "Colleges & universities",
      body: "Support student media within the school or local community. Support academic departments, campus organizations, and scholarship programs with professional competition tools. Provide a fun way to activate the creators on campus.",
    },
    {
      icon: Trophy,
      title: "Athletics & sports organizations",
      body: "Collect fan-generated and athlete-created content for sponsored challenges, NIL initiatives, season campaigns, and community engagement.",
    },
    {
      icon: Megaphone,
      title: "Brands & creator programs",
      body: "Turn your audience into storytellers with branded content challenges, ambassador programs, and user-generated media campaigns.",
    },
    {
      icon: School,
      title: "Foundations & associations",
      body: "Run scholarship competitions, recognition programs, and media awards with transparent judging, meaningful feedback, and defensible results.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "Don't see your exact contest?\nAsk anyway.",
  subtitle: `If you're collecting media, and someone needs to review it, ${site.productName} can probably do the job.`,
  cta: { label: "Talk to Us", href: "/contact" },
};
