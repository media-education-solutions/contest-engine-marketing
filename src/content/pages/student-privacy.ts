import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { LegalDocProps } from "@/components/blocks/legal-doc";
import { site } from "@/content/site";

export const intro: PageIntroProps = {
  kicker: "Legal",
  title: "Student & Minor Data Privacy Notice",
};

export const doc: LegalDocProps = {
  lastUpdated: "Last updated June 28, 2026",
  preamble: [
    {
      kind: "p",
      text: `${site.productName} serves solely as a technology platform and contest-management service provider on behalf of the sponsoring organization, school district, association, university, business, nonprofit organization, or event operator ("Client"). ${site.productName} acts as a service provider and data processor on behalf of the Client and does not serve as the contest operator, sponsor, or administrator except where expressly agreed in writing.`,
    },
    {
      kind: "p",
      text: `${site.productName} acquires no ownership interest in participant submissions, uploaded files, videos, images, documents, metadata, or other Client-provided content. ${site.productName} receives only the limited rights necessary to host, process, store, transmit, display, evaluate, and administer content through the platform in accordance with the Client's instructions and platform functionality.`,
    },
    {
      kind: "p",
      text: `${site.productName} does not sell, rent, share, monetize, commercially exploit, or use participant information, submission content, metadata, or uploaded files for advertising purposes. ${site.productName} does not use participant data, submission content, metadata, videos, images, documents, or other uploaded materials to train artificial intelligence systems, machine learning models, large language models (LLMs), or similar automated learning technologies.`,
    },
    {
      kind: "p",
      text: `${site.productName} collects only the information reasonably necessary to operate contests, challenges, campaigns, recognition programs, and related participation activities as configured by the Client. Any registration fields, submission fields, metadata fields, or participant information requests are determined and controlled by the Client. The Client is solely responsible for determining what information is collected through the platform and for ensuring that such collection complies with applicable laws, regulations, policies, and organizational requirements.`,
    },
    {
      kind: "p",
      text: `In scholastic and youth-serving environments, ${site.productName} is intended to support the collection of only the information necessary to administer participation activities. Where participant email addresses are collected, school-issued or organization-approved email addresses are recommended whenever practical. ${site.productName} does not independently determine what participant information is required for a Client's program.`,
    },
    {
      kind: "p",
      text: "Clients are solely responsible for compliance with all applicable privacy, education, youth protection, and data governance laws and regulations, including but not limited to FERPA, COPPA, applicable state student privacy laws, district policies, institutional policies, parental consent requirements, media release requirements, and participant eligibility requirements.",
    },
    {
      kind: "p",
      text: `${site.productName} personnel do not use participant contact information for marketing, solicitation, or outreach purposes. Participant information is accessible only to authorized users as determined by the Client and platform permissions. ${site.productName} does not use participant information for any purpose beyond platform operation, support, security, and fulfillment of contracted services.`,
    },
    {
      kind: "p",
      text: `${site.productName} maintains commercially reasonable administrative, technical, and organizational safeguards designed to protect information against unauthorized access, disclosure, alteration, loss, or destruction. While no system can guarantee absolute security, ${site.productName} implements reasonable measures appropriate to the nature of the services provided.`,
    },
    {
      kind: "p",
      text: `Unless otherwise specified in a written agreement, contest submissions, uploaded files, metadata, judging records, and related content are scheduled for deletion from active ${site.productName} production systems within one hundred eighty (180) days following the conclusion of the applicable contest, challenge, campaign, or participation program. Certain backup, disaster recovery, security, audit, or archival copies may be retained for limited periods consistent with operational, legal, regulatory, or security requirements. Once content has been deleted pursuant to ${site.productName} retention policies, it may no longer be recoverable.`,
    },
    {
      kind: "p",
      text: `Clients who purchase Library Storage, Streaming Services, or other extended-retention services may elect to retain content beyond standard retention periods pursuant to the terms of those services.`,
    },
    {
      kind: "p",
      text: `Participation in any contest, challenge, campaign, recognition program, or activity hosted through ${site.productName} requires that the Client obtain all necessary permissions, releases, licenses, consents, and authorizations from participants and, where applicable, parents, legal guardians, schools, institutions, employers, or other rights holders. The Client is solely responsible for securing all required permissions related to participation, content submission, judging, publication, recognition, distribution, streaming, and promotional use.`,
    },
    {
      kind: "p",
      text: `${site.productName} may disclose information when required by applicable law, court order, subpoena, legal process, governmental request, or other legal obligation.`,
    },
    {
      kind: "p",
      text: `By participating in activities hosted through ${site.productName}, participants acknowledge that ${site.productName} is acting solely as a technology service provider to the sponsoring organization and that contest administration, participant eligibility, privacy compliance, permissions management, content rights management, and program operation remain the responsibility of the sponsoring organization.`,
    },
    {
      kind: "p",
      text: "For questions regarding contest rules, participant eligibility, content ownership, privacy practices, permissions, releases, or use of submitted content, participants should contact the sponsoring organization directly.",
    },
  ],
  sections: [],
};
