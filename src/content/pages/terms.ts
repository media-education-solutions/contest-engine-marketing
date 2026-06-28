import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { LegalDocProps } from "@/components/blocks/legal-doc";
import { site } from "@/content/site";

export const intro: PageIntroProps = {
  kicker: "Legal",
  title: "Terms of Service",
};

export const doc: LegalDocProps = {
  lastUpdated: "Last updated June 28, 2026",
  preamble: [
    {
      kind: "p",
      text: `These Terms of Service ("Terms") govern access to and use of ${site.productName}, a platform operated by ${site.companyName}.`,
    },
    {
      kind: "p",
      text: `By accessing or using ${site.productName}, you agree to these Terms.`,
    },
  ],
  sections: [
    {
      heading: "PLATFORM PURPOSE",
      body: [
        {
          kind: "p",
          text: `${site.productName} provides software tools that enable organizations to collect, evaluate, manage, organize, judge, recognize, publish, and activate participant submissions.`,
        },
        {
          kind: "p",
          text: `${site.productName} serves as a technology platform and service provider. ${site.productName} is not the sponsor, organizer, administrator, or operator of any contest unless expressly agreed in writing.`,
        },
      ],
    },
    {
      heading: "CLIENT RESPONSIBILITIES",
      body: [
        {
          kind: "p",
          text: `Organizations using ${site.productName} are solely responsible for:`,
        },
        {
          kind: "list",
          items: [
            "Contest rules",
            "Eligibility requirements",
            "Participant communications",
            "Privacy compliance",
            "Consent and release collection",
            "Awards and recognition decisions",
            "Intellectual property permissions",
            "Publication and distribution decisions",
          ],
        },
      ],
    },
    {
      heading: "CONTENT OWNERSHIP",
      body: [
        {
          kind: "p",
          text: "Participants and sponsoring organizations retain ownership of content they submit or upload.",
        },
        {
          kind: "p",
          text: `By submitting content through ${site.productName}, users grant ${site.productName} a limited, non-exclusive license to host, store, process, display, transmit, evaluate, and administer content solely for platform operation and contracted services.`,
        },
      ],
    },
    {
      heading: "ACCEPTABLE USE",
      body: [
        { kind: "p", text: "Users may not:" },
        {
          kind: "list",
          items: [
            "Violate applicable laws",
            "Upload unlawful content",
            "Upload malicious software",
            "Interfere with platform operations",
            "Attempt unauthorized access",
            "Circumvent security controls",
            "Misrepresent identity or eligibility",
          ],
        },
        {
          kind: "p",
          text: `${site.productName} may suspend access for violations of these Terms.`,
        },
      ],
    },
    {
      heading: "INTELLECTUAL PROPERTY",
      body: [
        {
          kind: "p",
          text: `${site.productName} software, branding, platform design, workflows, source code, documentation, graphics, and related materials are owned by ${site.companyName} and protected by applicable intellectual property laws.`,
        },
        {
          kind: "p",
          text: "No ownership rights are transferred to users.",
        },
      ],
    },
    {
      heading: "AI AND TRAINING RESTRICTIONS",
      body: [
        {
          kind: "p",
          text: `${site.productName} does not use participant submissions, uploaded files, videos, images, documents, metadata, or participant information to train artificial intelligence systems, machine learning models, large language models, or similar automated learning technologies.`,
        },
      ],
    },
    {
      heading: "SERVICE AVAILABILITY",
      body: [
        {
          kind: "p",
          text: `${site.productName} strives to maintain reliable service but does not guarantee uninterrupted availability.`,
        },
        {
          kind: "p",
          text: "Platform maintenance, upgrades, outages, security events, or third-party service interruptions may affect availability.",
        },
      ],
    },
    {
      heading: "DISCLAIMER OF WARRANTIES",
      body: [
        {
          kind: "p",
          text: `${site.productName} is provided on an "as-is" and "as-available" basis.`,
        },
        {
          kind: "p",
          text: `To the maximum extent permitted by law, ${site.companyName} disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.`,
        },
      ],
    },
    {
      heading: "LIMITATION OF LIABILITY",
      body: [
        {
          kind: "p",
          text: `To the fullest extent permitted by law, ${site.companyName}, its officers, directors, employees, contractors, and affiliates shall not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages arising from use of the platform.`,
        },
        {
          kind: "p",
          text: `Total liability shall not exceed amounts paid to ${site.productName} for services during the twelve months preceding the claim.`,
        },
      ],
    },
    {
      heading: "INDEMNIFICATION",
      body: [
        {
          kind: "p",
          text: `Clients agree to defend, indemnify, and hold harmless ${site.companyName} from claims arising from:`,
        },
        {
          kind: "list",
          items: [
            "Contest administration",
            "Eligibility decisions",
            "Participant disputes",
            "Intellectual property disputes involving submitted content",
            "Privacy compliance failures",
            "Failure to obtain required permissions or releases",
            "Violation of applicable laws",
          ],
        },
      ],
    },
    {
      heading: "TERMINATION",
      body: [
        {
          kind: "p",
          text: `${site.productName} may suspend or terminate access for:`,
        },
        {
          kind: "list",
          items: [
            "Violation of these Terms",
            "Non-payment",
            "Fraudulent activity",
            "Security concerns",
            "Unlawful use",
          ],
        },
      ],
    },
    {
      heading: "GOVERNING LAW",
      body: [
        {
          kind: "p",
          text: "These Terms shall be governed by the laws of the State of Florida without regard to conflict-of-law principles.",
        },
      ],
    },
    {
      heading: "CHANGES TO TERMS",
      body: [
        {
          kind: "p",
          text: `${site.productName} may update these Terms periodically. Continued use of the platform constitutes acceptance of updated Terms.`,
        },
      ],
    },
    {
      heading: "CONTACT",
      body: [
        { kind: "p", text: site.companyName },
        {
          kind: "p",
          text: `Questions regarding these Terms should be directed through the contact information provided on the ${site.productName} website.`,
        },
      ],
    },
  ],
};
