import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { LegalDocProps } from "@/components/blocks/legal-doc";
import { site } from "@/content/site";

export const intro: PageIntroProps = {
  kicker: "Legal",
  title: "Data Processing & Student Privacy Addendum",
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
      text: `This Client Data Processing & Student Privacy Addendum ("Addendum") is incorporated into and forms part of any Agreement, Subscription, Statement of Work ("SOW"), Service Order, or other contract ("Agreement") between ${site.companyName} d/b/a ${site.productName} ("${site.productName}") and the subscribing organization ("Client").`,
    },
    {
      kind: "p",
      text: "In the event of a conflict between this Addendum and the Agreement, this Addendum shall control with respect to student privacy, participant data, and data processing obligations.",
    },
  ],
  sections: [
    {
      heading: "PURPOSE",
      body: [
        {
          kind: "p",
          text: `${site.productName} provides software and related services that enable organizations to collect, manage, evaluate, judge, recognize, publish, and administer participant submissions.`,
        },
        {
          kind: "p",
          text: `${site.productName} acts solely as a technology service provider and data processor on behalf of the Client. ${site.productName} does not determine participant eligibility requirements, registration requirements, privacy practices, publication decisions, or contest administration policies.`,
        },
      ],
    },
    {
      heading: "DEFINITIONS",
      body: [
        {
          kind: "p",
          text: `Client Data means all information, records, submissions, files, metadata, participant information, judging information, and other materials submitted to or stored within ${site.productName} by the Client or its authorized users.`,
        },
        {
          kind: "p",
          text: `Student Data means information directly related to an identifiable student that is provided to ${site.productName} by a school, district, educational organization, parent, guardian, student, or authorized representative.`,
        },
        {
          kind: "p",
          text: `Authorized User means any individual authorized by the Client to access the platform, including administrators, judges, staff members, volunteers, contractors, educators, participants, or students.`,
        },
      ],
    },
    {
      heading: "ROLE OF THE PARTIES",
      body: [
        {
          kind: "p",
          text: "Client shall be deemed the owner and controller of Client Data.",
        },
        {
          kind: "p",
          text: `${site.productName} shall act solely as a service provider and data processor for the limited purpose of providing contracted services.`,
        },
        {
          kind: "p",
          text: `${site.productName} shall process Client Data only:`,
        },
        {
          kind: "list",
          items: [
            "As instructed by the Client;",
            "As necessary to provide platform functionality;",
            "As necessary to maintain security and platform operations; or",
            "As required by applicable law.",
          ],
        },
      ],
    },
    {
      heading: "DATA OWNERSHIP",
      body: [
        {
          kind: "p",
          text: "All Client Data remains the property of the Client and/or the applicable participant, student, creator, rights holder, or submitting organization.",
        },
        {
          kind: "p",
          text: `Nothing in this Addendum transfers ownership of Client Data to ${site.productName}.`,
        },
        {
          kind: "p",
          text: `${site.productName} receives only a limited, non-exclusive right to host, store, process, transmit, display, evaluate, and administer Client Data as necessary to provide services.`,
        },
      ],
    },
    {
      heading: "STUDENT PRIVACY COMPLIANCE",
      body: [
        {
          kind: "p",
          text: "The Client acknowledges and agrees that it is solely responsible for:",
        },
        {
          kind: "list",
          items: [
            "Compliance with FERPA;",
            "Compliance with COPPA;",
            "Compliance with applicable state student privacy laws;",
            "Compliance with district, school, university, or organizational privacy policies;",
            "Obtaining required parental or guardian consent;",
            "Obtaining media releases;",
            "Obtaining participation permissions;",
            "Determining lawful collection and use of participant information.",
          ],
        },
        {
          kind: "p",
          text: `${site.productName} makes no independent determination regarding the legality of information collected by the Client.`,
        },
      ],
    },
    {
      heading: "DATA MINIMIZATION",
      body: [
        {
          kind: "p",
          text: `${site.productName} is designed to support collection of only information reasonably necessary to administer contests, challenges, campaigns, recognition programs, and related activities.`,
        },
        {
          kind: "p",
          text: "Clients are encouraged to limit collection of personally identifiable information to the minimum necessary for program administration.",
        },
      ],
    },
    {
      heading: "PROHIBITED USES OF DATA",
      body: [
        { kind: "p", text: `${site.productName} shall not:` },
        {
          kind: "list",
          items: [
            "Sell Client Data;",
            "Rent Client Data;",
            "License Client Data to third parties;",
            "Use Client Data for advertising purposes;",
            "Build marketing profiles from Client Data;",
            "Use Client Data for behavioral advertising;",
            "Commercially exploit Client Data outside the scope of contracted services.",
          ],
        },
      ],
    },
    {
      heading: "ARTIFICIAL INTELLIGENCE RESTRICTIONS",
      body: [
        {
          kind: "p",
          text: `${site.productName} does not use Client Data, Student Data, participant submissions, videos, images, documents, audio files, metadata, judging records, or other uploaded content to train:`,
        },
        {
          kind: "list",
          items: [
            "Artificial intelligence systems;",
            "Machine learning models;",
            "Large language models (LLMs);",
            "Generative AI systems; or",
            "Similar automated learning technologies.",
          ],
        },
      ],
    },
    {
      heading: "ACCESS CONTROLS",
      body: [
        {
          kind: "p",
          text: `${site.productName} maintains role-based access controls intended to limit access to Client Data.`,
        },
        { kind: "p", text: "Access is generally restricted to:" },
        {
          kind: "list",
          items: [
            "Authorized Client administrators;",
            "Authorized judges and evaluators;",
            "Authorized participants;",
            `${site.productName} personnel with a legitimate operational need to access data.`,
          ],
        },
      ],
    },
    {
      heading: "INFORMATION SECURITY",
      body: [
        {
          kind: "p",
          text: `${site.productName} shall maintain commercially reasonable administrative, technical, and organizational safeguards designed to protect Client Data against unauthorized access, disclosure, alteration, destruction, or loss.`,
        },
        { kind: "p", text: "Security measures may include:" },
        {
          kind: "list",
          items: [
            "Authentication controls;",
            "Encrypted transmission of data;",
            "Access restrictions;",
            "Logging and monitoring;",
            "Backup procedures;",
            "Vendor security controls.",
          ],
        },
        {
          kind: "p",
          text: `${site.productName} does not guarantee absolute security.`,
        },
      ],
    },
    {
      heading: "SUBPROCESSORS",
      body: [
        {
          kind: "p",
          text: `${site.productName} may utilize reputable third-party service providers for hosting, authentication, storage, email delivery, video processing, analytics, payment processing, infrastructure management, and related services.`,
        },
        {
          kind: "p",
          text: "Payment card details are submitted directly to our payment processor and are never stored by us.",
        },
        {
          kind: "p",
          text: "Such providers may include cloud infrastructure, content delivery, storage, communications, or software service vendors necessary to operate the platform.",
        },
        {
          kind: "p",
          text: `${site.productName} remains responsible for managing such providers in a commercially reasonable manner.`,
        },
      ],
    },
    {
      heading: "DATA RETENTION",
      body: [
        { kind: "p", text: "Unless otherwise specified in writing:" },
        {
          kind: "list",
          items: [
            "Client Data is generally retained for up to one hundred eighty (180) days following completion of the applicable program, contest, challenge, campaign, or event.",
            "Data may remain temporarily within backup or disaster recovery systems.",
            "Extended retention services may be purchased separately.",
          ],
        },
        {
          kind: "p",
          text: "After expiration of applicable retention periods, Client Data may be deleted and may become unrecoverable.",
        },
      ],
    },
    {
      heading: "DATA DELETION REQUESTS",
      body: [
        {
          kind: "p",
          text: `Subject to contractual obligations, legal requirements, backup limitations, and operational requirements, ${site.productName} will cooperate with reasonable Client requests concerning deletion of Client Data.`,
        },
        {
          kind: "p",
          text: "Deletion requests must be submitted by an authorized Client representative.",
        },
      ],
    },
    {
      heading: "DATA BREACH NOTIFICATION",
      body: [
        {
          kind: "p",
          text: `In the event ${site.productName} becomes aware of unauthorized access to Client Data resulting from a confirmed security incident affecting ${site.productName} systems, ${site.productName} will provide notice to the Client within a commercially reasonable timeframe after confirmation of the incident.`,
        },
        { kind: "p", text: "Such notice may include:" },
        {
          kind: "list",
          items: [
            "Description of the incident;",
            "Types of affected information, if known;",
            "Remediation efforts undertaken; and",
            "Recommended actions, if applicable.",
          ],
        },
      ],
    },
    {
      heading: "AUDITS AND COMPLIANCE INQUIRIES",
      body: [
        {
          kind: "p",
          text: `Upon reasonable request, ${site.productName} may provide information regarding its privacy and security practices sufficient to support Client compliance reviews.`,
        },
        {
          kind: "p",
          text: `Nothing in this section requires ${site.productName} to disclose confidential business information, proprietary technology, source code, security architecture, or trade secrets.`,
        },
      ],
    },
    {
      heading: "LEGAL DISCLOSURES",
      body: [
        {
          kind: "p",
          text: `${site.productName} may disclose Client Data when required by:`,
        },
        {
          kind: "list",
          items: [
            "Law;",
            "Court order;",
            "Subpoena;",
            "Governmental request;",
            "Regulatory obligation; or",
            "Other legally binding processes.",
          ],
        },
        {
          kind: "p",
          text: `Where legally permitted, ${site.productName} may provide reasonable notice to the Client before such disclosure.`,
        },
      ],
    },
    {
      heading: "LIMITATION OF RESPONSIBILITY",
      body: [
        {
          kind: "p",
          text: `${site.productName} shall not be responsible for:`,
        },
        {
          kind: "list",
          items: [
            "Contest administration decisions;",
            "Eligibility determinations;",
            "Publication decisions;",
            "Content ownership disputes;",
            "Release management;",
            "Consent collection;",
            "Privacy compliance failures attributable to Client practices;",
            `Information collected by the Client beyond ${site.productName}'s recommended use.`,
          ],
        },
      ],
    },
    {
      heading: "SURVIVAL",
      body: [
        {
          kind: "p",
          text: "The obligations relating to confidentiality, privacy, security, ownership, AI restrictions, and data protection shall survive termination of the Agreement to the extent applicable.",
        },
      ],
    },
  ],
  footnote: `This Addendum is incorporated into and executed as part of each Client's written agreement with ${site.companyName}.`,
};
