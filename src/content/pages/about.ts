import { Hammer, Heart, Megaphone, Unlock, Users } from "lucide-react";
import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { NarrativeProps } from "@/components/blocks/narrative";
import type { FeatureGridProps } from "@/components/blocks/feature-grid";
import type { CtaBannerProps } from "@/components/blocks/cta-banner";
import { site } from "@/content/site";

export const intro: PageIntroProps = {
  kicker: "Who we are",
  title: "Media Education Solutions",
  subtitle: site.mission,
  logo: {
    src: "/brand/mes-lockup.png",
    alt: `${site.companyShortName} logo`,
    width: 1384,
    height: 345,
  },
  logoSize: "lg",
  logoPosition: "after-kicker",
  hideTitle: true,
};

export const founderStory: NarrativeProps = {
  kicker: "The founder",
  title: "An educator first.\nA software founder by necessity.",
  image: {
    src: "/assets/photo/founder/jeb-nemmys-students-awards.jpg",
    alt: "Jeb Brunt with students holding awards at a national student media ceremony",
    width: 1400,
    height: 933,
  },
  paragraphs: [
    "Jeb Brunt is a Florida native, a graduate of the University of Central Florida's Radio/Television program, and a retired educator who spent 29 years teaching broadcast journalism and media production in public schools.",
    "Long before content creation became an industry, he was helping students learn how to tell stories, produce videos, and discover the confidence that comes from sharing their work. His programs earned national recognition, and his work eventually expanded beyond the classroom to some of the nation's largest student media competitions.",
    "After nearly two decades of running large-scale media competitions, Jeb grew tired of wishing the right software existed. So he built it.",
    `${site.productName} was born from real contests, real deadlines, and real problems. Every feature was earned by solving a challenge that organizers actually face.`,
    `Today, through ${site.companyShortName}, Jeb helps schools, nonprofits, associations, festivals, brands, and media organizations create opportunities for people to share their work, receive meaningful recognition, and keep creating.`,
  ],
  pullQuote: "People want their work to matter.",
  pullQuoteIndex: 2,
};

export const beliefs: FeatureGridProps = {
  kicker: "What we believe",
  title: "The ideas that guide everything we build",
  tone: "muted",
  features: [
    {
      icon: Heart,
      title: "People want their work to matter",
      body: "When people know their work will be seen, judged fairly, and recognized, they create something they're proud of.",
    },
    {
      icon: Megaphone,
      title: "Recognition inspires growth",
      body: "A meaningful contest doesn't just recognize excellence. It encourages people to keep creating, improving, and coming back.",
    },
    {
      icon: Hammer,
      title: "Technology should get out of the way",
      body: "The best software is almost invisible. It should make participation easier, judging fairer, and recognition more meaningful.",
    },
    {
      icon: Unlock,
      title: "Opportunities shouldn't be limited by resources",
      body: "You shouldn't need a large staff, a big budget, or a patchwork of tools to run a great media competition.",
    },
    {
      icon: Users,
      title: "Communities tell the best stories",
      body: "The most authentic stories rarely come from a marketing department. They come from students, members, employees, fans, and the people who live them every day.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "We'd love to hear about your program",
  subtitle: "Every great contest starts with a conversation. We'd love to be part of yours.",
  cta: { label: "Talk to Us", href: "/contact" },
};
