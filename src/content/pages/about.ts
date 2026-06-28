import { BookOpen, Hammer, Lightbulb, Megaphone, Users } from "lucide-react";
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
  title: "A lifetime helping students find their voice",
  image: {
    src: "/assets/photo/founder/jeb-nemmys-students-awards.jpg",
    alt: "Jeb Brunt with students holding awards at a national student media ceremony",
    width: 1400,
    height: 933,
  },
  paragraphs: [
    "Jeb Brunt is a Florida native, a graduate of the University of Central Florida's Radio/Television program, and a retired educator who spent 29 years teaching broadcast journalism and media production in public schools.",
    "Long before content creation became an industry, he was helping students learn how to tell stories, produce videos, and build audiences. His student media programs earned national recognition, and his work expanded beyond the classroom to help shape some of the largest student media competitions in the country, including programs for the Student Television Network.",
    `After years of running national-scale contests on flashdrives, spreadsheets, and email threads, he founded ${site.companyShortName} and built ${site.productName}: the platform he always needed and could never buy.`,
    "Today the company serves media events and programs around the nation, with one belief at the center of everything it builds.",
  ],
  pullQuote: "People want their work to matter.",
};

export const beliefs: FeatureGridProps = {
  kicker: "What we believe",
  title: "The convictions behind the product",
  tone: "muted",
  features: [
    {
      icon: BookOpen,
      title: "Storytelling creates opportunity",
      body: "Every individual has a story worth telling, and every organization benefits when those stories are discovered and shared.",
    },
    {
      icon: Megaphone,
      title: "Recognition drives participation",
      body: "People contribute more when their work is seen, valued, and celebrated.",
    },
    {
      icon: Lightbulb,
      title: "Education and engagement belong together",
      body: "The strongest engagement systems teach participants valuable skills while creating meaningful outcomes for organizations.",
    },
    {
      icon: Hammer,
      title: "Technology should remove friction",
      body: "Software should simplify participation, evaluation, and recognition. It should never create administrative burdens.",
    },
    {
      icon: Users,
      title: "Communities create better content than marketing departments",
      body: "Students, members, fans, and supporters are an organization's most powerful untapped storytellers.",
    },
  ],
};

export const ctaBanner: CtaBannerProps = {
  title: "We'd love to hear about your program",
  subtitle:
    "Real humans read every message, usually the founder.",
  cta: { label: "Talk to Us", href: "/contact" },
};
