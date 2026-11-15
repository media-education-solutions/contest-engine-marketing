// Seeds (or resets) the MED-42 demo contests in the product app's Supabase TEST project.
//
//   npm run demo:seed              reset the demo contests, then seed them fresh
//   npm run demo:reset             delete the demo contests only
//   npm run demo:seed -- --dry-run print the SQL instead of running it
//
// Runs SQL through the Supabase CLI from the product app repo (read-only use: it
// relies on that repo's `supabase link`). Refuses to run unless the linked project is
// DEMO_SUPABASE_PROJECT (default "contest-engine-test"), so it can never touch
// production. Only rows under the demo contest codes are touched; other contests
// (including the June "Spring Student Film Festival" data) are left alone.
//
// Env: APP_REPO (path to media-education-solutions), DEMO_MEDIA_BASE (default
// http://127.0.0.1:8787), DEMO_SUPABASE_PROJECT.

import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CAPTURE_CONTEST_NAMES, CATEGORY_COPY, CONTESTS, JUDGES, SCHOOLS } from "./demo-data.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const APP_REPO = process.env.APP_REPO ?? "/Users/dannysullivan/Documents/repos/media-education-solutions";
const MEDIA_BASE = (process.env.DEMO_MEDIA_BASE ?? "http://127.0.0.1:8787").replace(/\/$/, "");
const EXPECTED_PROJECT = process.env.DEMO_SUPABASE_PROJECT ?? "contest-engine-test";
const SUPABASE_CLI = ["--yes", "supabase@2.106.0"]; // latest CLI rejects the app's config.toml

const args = new Set(process.argv.slice(2));
const resetOnly = args.has("--reset-only");
const dryRun = args.has("--dry-run");

const clips = new Map(
  JSON.parse(readFileSync(join(here, "stock.json"), "utf8")).clips.map((c) => [c.id, c]),
);

// --- SQL helpers ---------------------------------------------------------------

const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replaceAll("'", "''")}'`);
const now = Date.now();
const DAY = 86_400_000;
const at = (daysFromNow, hoursOffset = 0) => q(new Date(now + daysFromNow * DAY + hoursOffset * 3_600_000).toISOString());

// Deadlines are on screen, so they land on 11:59 PM in the contest's time zone rather
// than at whatever minute the seed happened to run (DST-safe via Intl).
const TIMEZONE = "America/New_York";
function deadlineMs(daysFromNow) {
  const day = new Date(now + daysFromNow * DAY);
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(day).split("-").map(Number);
  const offset = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, timeZoneName: "shortOffset" })
    .formatToParts(day)
    .find((p) => p.type === "timeZoneName")
    .value.replace("GMT", "");
  return Date.UTC(y, m - 1, d, 23, 59) - Number(offset || 0) * 3_600_000;
}
const iso = (ms) => q(new Date(ms).toISOString());
const judgeId = (key) => `(select id from public.profiles where email = ${q(JUDGES[key])})`;
const insert = (table, row) =>
  `insert into public.${table} (${Object.keys(row).join(", ")}) values (${Object.values(row).join(", ")});`;
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const demoCodes = CONTESTS.map((c) => q(c.code)).join(", ");
// Contests the capture script creates on camera (clip 5) have no fixed code, so they are
// matched by exact name. Exact match only; never LIKE.
const captureNames = CAPTURE_CONTEST_NAMES.map(q).join(", ");
const demoContests = `(c.contest_code in (${demoCodes}) or c.name in (${captureNames}))`;

// Completed categories block review/ranking deletes, so un-complete them first; the
// contest delete then cascades through divisions, categories, participants,
// submissions, reviews, rankings and the audit log.
const resetSql = [
  `update public.categories set judging_completed_at = null, approved_for_winners = false, approved_at = null`,
  `  where division_id in (select d.id from public.divisions d join public.contests c on c.id = d.contest_id where ${demoContests});`,
  `delete from public.contests c where ${demoContests};`,
];

// --- Seed builder --------------------------------------------------------------

function buildSeed() {
  const sql = [];
  const afterReviews = []; // category completion/approval, applied once reviews exist

  for (const contest of CONTESTS) {
    const contestId = randomUUID();
    const deadline = contest.deadlineDaysFromNow;
    const finished = contest.status === "finished";
    let codeSeq = 0;
    const nextCode = () => `${contest.codePrefix}${String(++codeSeq).padStart(6, "0")}`;

    sql.push(
      insert("contests", {
        id: q(contestId),
        name: q(contest.name),
        description: q(contest.description),
        rules: q(contest.rules),
        slug: q(`${slugify(contest.name)}-${contest.code.toLowerCase()}`),
        contest_code: q(contest.code),
        owner_code: q(contest.ownerCode),
        status: q(contest.status),
        cover_image_url: q(`${MEDIA_BASE}/media/${contest.cover}.jpg`),
        timezone: q(TIMEZONE),
        submission_fields: q(JSON.stringify({ fields: [], titleLabel: "Submission Title" })),
        max_video_size_mb: 500,
        max_photo_size_mb: 10,
        max_winners: 3,
        max_submissions_per_category: 1,
        // With one entry per student this changes nothing about winners, but when it is
        // off the judge's entry list wraps each entry in its own grey band, one per
        // row, which reads as empty on camera. On, it is a plain 4-across grid.
        allow_multi_place_winner: "true",
        download_retention_days: 180,
        allow_public_registration: contest.publicRegistration ? "true" : "false",
        winners_page_enabled: finished ? "true" : "false",
        winners_page_generated_at: finished ? at(deadline + 12) : "null",
        winners_visible_to_participants: finished ? "true" : "false",
        created_at: at(-contest.createdDaysAgo),
        updated_at: at(-contest.createdDaysAgo),
      }),
    );

    contest.divisions.forEach((division, divisionIndex) => {
      const divisionId = randomUUID();
      const schools = SCHOOLS[division.name];
      let schoolSeq = divisionIndex;

      sql.push(
        insert("divisions", {
          id: q(divisionId),
          contest_id: q(contestId),
          name: q(division.name),
          display_order: divisionIndex + 1,
          created_at: at(-contest.createdDaysAgo),
        }),
      );

      const addParticipant = (used, name = null) => {
        const id = randomUUID();
        sql.push(
          insert("participants", {
            id: q(id),
            contest_id: q(contestId),
            code: q(nextCode()),
            status: q(used ? "used" : "unused"),
            name: q(name),
            organization_name: q(schools[schoolSeq++ % schools.length]),
            created_at: at(-contest.createdDaysAgo + 1),
          }),
          insert("participant_divisions", { participant_id: q(id), division_id: q(divisionId) }),
        );
        return id;
      };

      for (const category of division.categories) {
        const categoryId = randomUUID();
        const copy = CATEGORY_COPY[category.name];
        const judged = category.state !== "open";

        sql.push(
          insert("categories", {
            id: q(categoryId),
            division_id: q(divisionId),
            name: q(category.name),
            type: q("video"),
            description: q(copy.description),
            rules: q(copy.rules),
            deadline: iso(deadlineMs(deadline)),
            assigned_judge_id: judgeId(category.judge),
            invited_at: judged ? iso(deadlineMs(deadline) + 5 * 60_000) : "null",
            visible: "true",
            feedback_required: "true",
            submission_fields: q(JSON.stringify({ fields: [], titleLabel: "Submission Title" })),
            created_at: at(-contest.createdDaysAgo),
          }),
        );

        const reviewed = [];
        category.entries.forEach(([clipId, title, rating, feedback], i) => {
          const clip = clips.get(clipId);
          if (!clip) throw new Error(`Unknown clip ${clipId} in ${contest.name} / ${category.name}`);
          const submissionId = randomUUID();
          const submittedAt = at(Math.min(deadline, 0) - 2 - i, -3 * i);

          sql.push(
            insert("submissions", {
              id: q(submissionId),
              participant_id: q(addParticipant(true)),
              category_id: q(categoryId),
              media_type: q("video"),
              media_url: q(`${MEDIA_BASE}/embed/${clipId}.html`),
              thumbnail_url: q(`${MEDIA_BASE}/media/${clipId}.jpg`),
              status: q("submitted"),
              submission_title: q(title),
              custom_fields: q("{}"),
              file_size_bytes: clip.bytes,
              submitted_at: submittedAt,
              created_at: submittedAt,
              updated_at: submittedAt,
            }),
          );

          if (rating) {
            const reviewedAt = finished ? at(deadline + 2, i) : at(-2, i);
            sql.push(
              insert("reviews", {
                submission_id: q(submissionId),
                judge_id: judgeId(category.judge),
                rating,
                feedback: q(feedback),
                created_at: reviewedAt,
                updated_at: reviewedAt,
              }),
            );
            reviewed.push({ submissionId, rating, order: i });
          }
        });

        if (category.state === "completed" || category.state === "approved") {
          if (reviewed.length !== category.entries.length) {
            throw new Error(`${contest.name} / ${category.name} is ${category.state} but not every entry has a rating`);
          }
          // Top 3 by rating; ties keep the order listed in demo-data.mjs.
          reviewed
            .sort((a, b) => b.rating - a.rating || a.order - b.order)
            .slice(0, 3)
            .forEach(({ submissionId }, rankIndex) => {
              sql.push(
                insert("rankings", {
                  category_id: q(categoryId),
                  judge_id: judgeId(category.judge),
                  rank: rankIndex + 1,
                  submission_id: q(submissionId),
                }),
              );
            });

          const completedAt = finished ? at(deadline + 6) : at(-1);
          const approval =
            category.state === "approved"
              ? `, approved_for_winners = true, approved_at = ${finished ? at(deadline + 9) : at(-0.5)}`
              : "";
          afterReviews.push(
            `update public.categories set judging_completed_at = ${completedAt}${approval} where id = ${q(categoryId)};`,
          );
        }
      }

      // Codes handed out but not yet used, so "Codes Used" reads like a real contest.
      const unusedHere = Math.ceil(contest.unusedCodes / contest.divisions.length);
      for (let i = 0; i < unusedHere; i++) addParticipant(false);
    });
  }

  return [...sql, ...afterReviews];
}

// --- Run -----------------------------------------------------------------------

function supabase(cliArgs) {
  return execFileSync("npx", [...SUPABASE_CLI, ...cliArgs], {
    cwd: APP_REPO,
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 16 * 1024 * 1024,
  }).toString();
}

const statements = ["begin;", ...resetSql, ...(resetOnly ? [] : buildSeed()), "commit;"];
const sqlText = statements.join("\n") + "\n";

function run() {
  const linked = JSON.parse(supabase(["projects", "list", "-o", "json"])).find((p) => p.linked);
  if (!linked || linked.name !== EXPECTED_PROJECT) {
    console.error(
      `Refusing to run: the app repo is linked to "${linked?.name ?? "nothing"}", expected "${EXPECTED_PROJECT}".`,
    );
    process.exitCode = 1;
    return;
  }

  const file = join(mkdtempSync(join(tmpdir(), "demo-seed-")), "seed.sql");
  writeFileSync(file, sqlText);
  supabase(["db", "query", "--linked", "-f", file]);

  console.log(
    resetOnly
      ? `Removed demo contests (${CONTESTS.map((c) => c.code).join(", ")}) from ${linked.name}.`
      : `Seeded ${CONTESTS.length} demo contests into ${linked.name}: ${CONTESTS.map((c) => `${c.name} (${c.code}, ${c.status})`).join("; ")}.`,
  );
}

// No process.exit() after a stdout write: on a pipe it truncates the output.
if (dryRun) process.stdout.write(sqlText);
else run();
