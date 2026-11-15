import type { VideoEmbedProps } from "@/components/blocks/video-embed";
import type { ScreenshotShowcaseProps } from "@/components/blocks/screenshot-showcase";

/**
 * Single source of every product demo asset: its path, accessible text and framing.
 * Pages spread these into `VideoEmbed` / `ScreenshotShowcase`; none hardcode a path.
 *
 * The files are recorded by `npm run capture` (see `scripts/capture/README.md`), so when the
 * product UI changes, re-run it and this module stays as is. Each clip's `aspect` matches the
 * viewport it was recorded at, otherwise `object-cover` would crop the UI. Each poster is the
 * clip's final frame, which is also what reduced-motion visitors see, so it has to tell the
 * story on its own.
 */

/** Home hero. A judge watches an entry, scores it and writes feedback. */
export const judgingClip: VideoEmbedProps = {
  src: "/assets/video/judge/judge_scoring.mp4",
  poster: "/assets/video/judge/judge_scoring_poster.jpg",
  title: "A judge watches an anonymized entry, scores it on the 1 to 10 rubric, and writes feedback",
  aspect: "4/3",
  autoPlay: true,
};

/** How It Works, judges. Drag the top three onto the podium and finish judging. */
export const rankingClip: VideoEmbedProps = {
  src: "/assets/video/judge/judge_ranking.mp4",
  poster: "/assets/video/judge/judge_ranking_poster.jpg",
  title: "A judge drags the top three entries onto the winners' podium and marks judging complete",
  aspect: "video",
  autoPlay: true,
};

/** How It Works, students. QR sign-up with just a name. */
export const registrationClip: VideoEmbedProps = {
  src: "/assets/video/participant/participant_registration.mp4",
  poster: "/assets/video/participant/participant_registration_poster.jpg",
  title: "A student registers with just a name and gets a participant code",
  aspect: "4/3",
  autoPlay: true,
};

/** How It Works, results. The student's rubric level, feedback and placement. */
export const studentResultsClip: VideoEmbedProps = {
  src: "/assets/video/participant/participant_results.mp4",
  poster: "/assets/video/participant/participant_results_poster.jpg",
  title: "A student sees their rubric level, the judge's written feedback, and where they placed",
  aspect: "4/3",
  autoPlay: true,
};

/** How It Works, organizers. Create a contest, then add divisions and categories. */
export const contestSetupClip: VideoEmbedProps = {
  src: "/assets/video/admin/admin_contest_setup.mp4",
  poster: "/assets/video/admin/admin_contest_setup_poster.jpg",
  title: "An organizer creates a contest and adds divisions and categories",
  aspect: "4/3",
  autoPlay: true,
};

/** Judges page hero. Stays a still: it is above the fold and the likely LCP element. */
export const judgeRatingStill: ScreenshotShowcaseProps = {
  src: "/assets/photo/judge/judge_rating.png",
  alt: "A judge scoring an entry on the 1 to 10 rubric, from Developing Skills to Master Creator",
  aspect: "4/3",
  fit: "contain",
  priority: true,
};

/** Judges page, "judge from anywhere". */
export const judgeDashboardStill: ScreenshotShowcaseProps = {
  src: "/assets/photo/judge/judge_dashboard.png",
  alt: "A judge's dashboard showing assigned contests and categories ready to review",
  aspect: "4/3",
  fit: "contain",
};

// Banked for later pages (no entry until a page has a slot for them):
//   public/assets/photo/admin/admin_category_progress.png  (MED-37 Coordinator, MED-30 Features)
//   public/assets/photo/admin/admin_category_detail.png    (MED-37 Coordinator, MED-30 Features)
