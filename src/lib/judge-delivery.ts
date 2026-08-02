import { neon } from "@neondatabase/serverless";

export type JudgeApplication = {
  kind: "volunteer" | "freelance";
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  note: string;
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
 * Durable record of the application. Returns the row id, or null if
 * unconfigured or the insert failed. Values are interpolated through the
 * tagged template, which parameterizes them — never build this string by hand.
 */
export async function saveApplication(input: JudgeApplication): Promise<number | null> {
  const sql = db();
  if (!sql) return null;

  try {
    const rows = await sql`
      insert into judge_applications (kind, name, email, phone, job_title, note)
      values (${input.kind}, ${input.name}, ${input.email},
              ${input.phone}, ${input.jobTitle}, ${input.note})
      returning id
    `;
    return (rows[0]?.id as number) ?? null;
  } catch (err) {
    console.error("[judge] Neon insert failed", err);
    return null;
  }
}

/** Best-effort flag flip; a failure here only risks a false "unnotified" row. */
export async function markApplicationNotified(id: number): Promise<void> {
  const sql = db();
  if (!sql) return;
  try {
    await sql`update judge_applications set notified = true where id = ${id}`;
  } catch (err) {
    console.error("[judge] Neon notified-flag update failed", err);
  }
}

/**
 * Notification: the same Apps Script web app the contact form uses, with
 * `kind: "judge"` routing it to the Judges tab. No new env vars, no new
 * deployment. Script source: scripts/contact-sheet-endpoint.gs
 */
export async function notifyApplication(input: JudgeApplication): Promise<boolean> {
  const endpoint = process.env.CONTACT_SCRIPT_URL;
  const token = process.env.CONTACT_SCRIPT_TOKEN;
  if (!endpoint || !token) return false;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        kind: "judge", // Apps Script ROUTING key — must be exactly "judge"
        judgeKind: input.kind, // "volunteer" | "freelance" — NOT `kind`, that slot is taken
        name: input.name,
        email: input.email,
        phone: input.phone,
        jobTitle: input.jobTitle,
        note: input.note,
      }),
      // Apps Script answers with a 302 to script.googleusercontent.com serving the
      // already-executed result; fetch follows it and the JSON is read there.
      redirect: "follow",
    });

    if (!res.ok) {
      console.error("[judge] notify HTTP error", res.status);
      return false;
    }

    // Apps Script can return 200 with an error page, so trust the body, not the status.
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; mailed?: boolean; error?: string }
      | null;

    if (!data?.ok) {
      console.error("[judge] notify rejected", data?.error ?? "no body");
      return false;
    }
    if (data.mailed === false) {
      console.error("[judge] Sheet row written but notification email failed");
    }
    return true;
  } catch (err) {
    console.error("[judge] notify threw", err);
    return false;
  }
}
