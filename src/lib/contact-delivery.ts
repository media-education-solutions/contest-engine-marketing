import { neon } from "@neondatabase/serverless";

export type ContactInquiry = {
  name: string;
  email: string;
  organization: string;
  role: string;
  message: string;
};

/**
 * Lazily constructed: calling neon() at module scope would throw during
 * `next build` on any machine without NEON_DB_URL set.
 */
function db() {
  const url = process.env.NEON_DB_URL;
  return url ? neon(url) : null;
}

/**
 * Durable record of the inquiry. Returns the row id, or null if unconfigured
 * or the insert failed. Values are interpolated through the tagged template,
 * which parameterizes them — never build this string by hand.
 */
export async function saveInquiry(input: ContactInquiry): Promise<number | null> {
  const sql = db();
  if (!sql) return null;

  try {
    const rows = await sql`
      insert into contact_inquiries (name, email, organization, role, message)
      values (${input.name}, ${input.email}, ${input.organization},
              ${input.role}, ${input.message})
      returning id
    `;
    return (rows[0]?.id as number) ?? null;
  } catch (err) {
    console.error("[contact] Neon insert failed", err);
    return null;
  }
}

/** Best-effort flag flip; a failure here only risks a false "unnotified" row. */
export async function markInquiryNotified(id: number): Promise<void> {
  const sql = db();
  if (!sql) return;
  try {
    await sql`update contact_inquiries set notified = true where id = ${id}`;
  } catch (err) {
    console.error("[contact] Neon notified-flag update failed", err);
  }
}

/**
 * Notification: a Google Apps Script web app that appends the inquiry to the
 * team's Sheet and emails it (reply-to the submitter). No email vendor.
 * Script source: scripts/contact-sheet-endpoint.gs
 */
export async function notifyInquiry(input: ContactInquiry): Promise<boolean> {
  const endpoint = process.env.CONTACT_SCRIPT_URL;
  const token = process.env.CONTACT_SCRIPT_TOKEN;
  if (!endpoint || !token) return false;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, ...input }),
      // Apps Script answers with a 302 to script.googleusercontent.com serving the
      // already-executed result; fetch follows it and the JSON is read there.
      redirect: "follow",
    });

    if (!res.ok) {
      console.error("[contact] notify HTTP error", res.status);
      return false;
    }

    // Apps Script can return 200 with an error page, so trust the body, not the status.
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; mailed?: boolean; error?: string }
      | null;

    if (!data?.ok) {
      console.error("[contact] notify rejected", data?.error ?? "no body");
      return false;
    }
    if (data.mailed === false) {
      console.error("[contact] Sheet row written but notification email failed");
    }
    return true;
  } catch (err) {
    console.error("[contact] notify threw", err);
    return false;
  }
}
