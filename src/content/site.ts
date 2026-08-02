/**
 * Single source of truth for brand identity and global site content.
 *
 * The product name may change — NOTHING outside `src/content/` may hardcode
 * the product name, tagline, mission, company details, or domain. Pages,
 * components, metadata, and JSON-LD must all read from this module.
 */

/** A rename happens on this line and nowhere else. */
const PRODUCT_NAME = "Contest Engine";

export const site = {
  productName: PRODUCT_NAME,
  companyName: "Media Education Solutions, Inc.",
  companyShortName: "Media Education Solutions",

  /** Approved working copy (team FigJam, June 2026). */
  tagline: "Collect. Evaluate. Activate.",
  mission:
    "Empowering organizations to transform participation into content, recognition, and measurable impact.",
  description: `${PRODUCT_NAME} is a centralized platform that helps organizations run media contests: collect video and photo submissions, manage fair anonymous judging, and celebrate winners.`,

  /** Canonical host — domain being acquired; update if it changes. */
  url: "https://contest-engine.com",

  contact: {
    formEnabled: true,
  },

  links: {
    app: "https://media-education-solutions.vercel.app",
  },
} as const;

export type NavItem = { label: string; href: string };

export const nav: { items: NavItem[]; cta: NavItem } = {
  items: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Who We Help", href: "/who-we-help" },
    { label: `Why ${site.productName}`, href: "/why-contest-engine" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Talk to Us", href: "/contact" },
};

export const footer = {
  tagline: site.tagline,
  attribution: `A product of ${site.companyName}`,
  copyright: `© ${new Date().getFullYear()} ${site.companyName}`,
  groups: [
    {
      title: "Product",
      items: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "Pricing", href: "/pricing" },
        { label: "Who We Help", href: "/who-we-help" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", href: "/about" },
        { label: `Why ${site.productName}`, href: "/why-contest-engine" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Student Privacy", href: "/student-privacy" },
        { label: "Data Processing", href: "/data-processing-addendum" },
      ],
    },
  ],
} as const;
