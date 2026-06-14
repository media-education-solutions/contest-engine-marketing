"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlayMark } from "@/components/ui/play-mark";
import { cn } from "@/lib/utils";

const aspectClass = {
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  square: "aspect-square",
} as const;

type CommonProps = {
  /** Used for the play-button aria-label and the iframe/video title. */
  title: string;
  /**
   * Poster shown until the visitor hits play (or, in autoplay mode, the
   * frame shown while paused / for reduced-motion users). A local `/public`
   * path or a Bunny CDN url (`*.b-cdn.net`, allowed in next.config).
   */
  poster?: string;
  aspect?: keyof typeof aspectClass;
};

/** Bunny Stream source: `iframe.mediadelivery.net/embed/{libraryId}/{videoId}`. */
type BunnyProps = CommonProps & {
  libraryId: string;
  videoId: string;
  src?: never;
  autoPlay?: never;
};

/** Self-hosted source: an mp4/webm in `/public` (or any same-origin url). */
type FileProps = CommonProps & {
  src: string;
  libraryId?: never;
  videoId?: never;
  /**
   * Ambient autoplay: a silent, looping "living screenshot" that plays when
   * scrolled into view and pauses when out. Only for self-hosted, narration-
   * free clips, and only below the fold (above-the-fold autoplay hurts LCP).
   * Respects `prefers-reduced-motion` — those users get the static poster.
   */
  autoPlay?: boolean;
};

export type VideoEmbedProps = BunnyProps | FileProps;

/**
 * Video for any `media` slot (Hero, FeatureSplit), in place of
 * MediaPlaceholder. Plays from Bunny Stream (libraryId + videoId) OR a
 * self-hosted file (`src`). Default is click-to-play so nothing heavy loads
 * until interaction (video is never the LCP element). Self-hosted clips can
 * opt into `autoPlay` for a muted, looping ambient demo.
 */
export function VideoEmbed(props: VideoEmbedProps) {
  const { title, poster, aspect = "video" } = props;
  const isBunny = "libraryId" in props && props.libraryId != null;
  const ambient = !isBunny && props.autoPlay === true;

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Ambient mode: play once when scrolled into view (pausing/resuming if the
  // viewer scrolls past mid-play), then rest on the final frame — no loop, and
  // no replay on re-entry. Never autoplays for reduced-motion users.
  useEffect(() => {
    if (!ambient) return;
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ended = false;
    const onEnded = () => {
      ended = true;
    };
    video.addEventListener("ended", onEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (ended) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", onEnded);
    };
  }, [ambient]);

  const wrapperClass = cn(
    "relative overflow-hidden rounded-xl bg-brand-deep",
    aspectClass[aspect],
  );

  if (ambient) {
    return (
      <div ref={containerRef} className={wrapperClass}>
        <video
          ref={videoRef}
          src={(props as FileProps).src}
          title={title}
          poster={poster}
          muted
          playsInline
          preload="none"
          aria-label={title}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      {playing ? (
        isBunny ? (
          <iframe
            src={`https://iframe.mediadelivery.net/embed/${props.libraryId}/${props.videoId}?autoplay=true&preload=true&responsive=true`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <video
            src={(props as FileProps).src}
            title={title}
            autoPlay
            controls
            playsInline
            poster={poster}
            className="absolute inset-0 size-full object-cover"
          />
        )
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}
          <span
            aria-hidden
            className="absolute inset-0 bg-brand-deep/10 transition-colors group-hover:bg-brand-deep/0"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 shadow-lg transition-transform group-hover:scale-110"
          >
            <PlayMark className="size-6 translate-x-0.5" />
          </span>
        </button>
      )}
    </div>
  );
}
