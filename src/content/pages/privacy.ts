import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { LegalDocProps } from "@/components/blocks/legal-doc";
import { site } from "@/content/site";

export const intro: PageIntroProps = {
  kicker: "Legal",
  title: "Privacy Policy",
  logo: {
    src: "/brand/mes-lockup.png",
    alt: `${site.companyShortName} logo`,
    width: 1384,
    height: 345,
  },
  logoSize: "lg" as const,
};

export const doc: LegalDocProps = {
  lastUpdated: "Last updated June 28, 2026",
  preamble: [
    {
      kind: "p",
      text: `${site.productName} is a contest management and content evaluation platform operated by ${site.companyName}. This Privacy Policy explains how information is collected, used, stored, and protected when organizations use the ${site.productName} platform.`,
    },
  ],
  sections: [
    {
      heading: "WHO THIS POLICY APPLIES TO",
      body: [
        { kind: "p", text: "This Privacy Policy applies to:" },
        {
          kind: "list",
          items: [
            "Contest administrators",
            "Organization staff",
            "Judges and evaluators",
            "Participants and entrants",
            `Visitors to ${site.productName} websites and applications`,
          ],
        },
        {
          kind: "p",
          text: `${site.productName} acts primarily as a technology service provider on behalf of sponsoring organizations ("Clients") that administer contests, challenges, campaigns, recognition programs, showcases, and participation initiatives.`,
        },
      ],
    },
    {
      heading: "INFORMATION WE COLLECT",
      body: [
        {
          kind: "p",
          text: `Depending on how a Client configures the platform, a private ${site.productName} account may be set up to collect personal information from a participant. The client may collect any textual information, URL links, or email addresses willingly submitted by a participant. Technically, ${site.productName} also collects:`,
        },
        { kind: "subhead", text: "Submission Content" },
        {
          kind: "list",
          items: ["Videos", "Images", "Metadata associated with uploaded content"],
        },
        { kind: "subhead", text: "Technical Information" },
        {
          kind: "list",
          items: [
            "IP addresses",
            "Browser type",
            "Device information",
            "Login activity",
            "Platform usage information",
            "Error and diagnostic logs",
          ],
        },
      ],
    },
    {
      heading: "HOW INFORMATION IS USED",
      body: [
        { kind: "p", text: `${site.productName} uses information solely to:` },
        {
          kind: "list",
          items: [
            "Operate platform services",
            "Process submissions",
            "Manage judging workflows",
            "Generate results and rankings",
            "Provide customer support",
            "Maintain platform security",
            "Improve platform reliability and performance",
            "Fulfill contractual obligations",
          ],
        },
        {
          kind: "p",
          text: `${site.productName} does not sell participant information, nor does it require any personal information to participate in a contest. Any personal information collected is done by the client and is only used for their internal contest operations.`,
        },
        {
          kind: "p",
          text: `${site.productName} does not use participant data, uploaded files, videos, images, or submission content to train artificial intelligence systems, machine learning models, large language models, or similar automated learning technologies.`,
        },
      ],
    },
    {
      heading: "CLIENT CONTROL OF DATA",
      body: [
        { kind: "p", text: "Clients determine:" },
        {
          kind: "list",
          items: [
            "What information is collected",
            "What fields are required",
            "Who may access their platform",
            "Contest eligibility requirements",
            "Publication and recognition practices",
          ],
        },
        {
          kind: "p",
          text: "Clients remain responsible for compliance with applicable laws and policies governing participant information.",
        },
      ],
    },
    {
      heading: "STUDENT DATA",
      body: [
        { kind: "p", text: "For educational and youth-serving organizations:" },
        {
          kind: "list",
          items: [
            `${site.productName} acts as a service provider to the sponsoring organization.`,
            "Schools, districts, associations, and educational organizations remain responsible for FERPA compliance.",
            "Organizations collecting information from children are responsible for COPPA compliance and parental consent requirements.",
            `${site.productName} does not knowingly collect more information than is necessary to provide platform services.`,
          ],
        },
      ],
    },
    {
      heading: "INFORMATION SHARING",
      body: [
        {
          kind: "p",
          text: `${site.productName} does not sell or rent personal information.`,
        },
        { kind: "p", text: "Information may be shared:" },
        {
          kind: "list",
          items: [
            "With authorized Client administrators",
            "With authorized judges and evaluators as configured by the Client",
            "With service providers supporting platform operations",
            "When required by law or legal process",
            "To protect platform security and integrity",
          ],
        },
      ],
    },
    {
      heading: "DATA SECURITY",
      body: [
        {
          kind: "p",
          text: `${site.productName} maintains commercially reasonable administrative, technical, and organizational safeguards designed to protect information from unauthorized access, disclosure, alteration, or destruction.`,
        },
        {
          kind: "p",
          text: "No internet-based system can guarantee absolute security.",
        },
      ],
    },
    {
      heading: "DATA RETENTION",
      body: [
        { kind: "p", text: "Unless otherwise specified by contract:" },
        {
          kind: "list",
          items: [
            "Submission content and all contest records are generally retained for up to 180 days after program completion.",
            "Certain backup and disaster recovery copies may remain for limited operational periods.",
            "Extended storage services may be purchased separately.",
          ],
        },
      ],
    },
    {
      heading: "THIRD-PARTY SERVICES",
      body: [
        {
          kind: "p",
          text: `${site.productName} may utilize third-party providers for hosting, storage, authentication, email delivery, analytics, video processing, payment processing, and related services.`,
        },
        {
          kind: "p",
          text: "Payment card details are submitted directly to our payment processor and are never stored by us.",
        },
      ],
    },
    {
      heading: "CHANGES TO THIS POLICY",
      body: [
        {
          kind: "p",
          text: `${site.productName} may update this Privacy Policy periodically. Updated versions will be posted with a revised effective date.`,
        },
      ],
    },
    {
      heading: "CONTACT",
      body: [
        { kind: "p", text: site.companyName },
        {
          kind: "p",
          text: `Questions regarding this Privacy Policy may be directed through the contact information provided on the ${site.productName} website.`,
        },
      ],
    },
  ],
};
