"use client";

import { useState } from "react";
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
   * Poster shown until the visitor hits play. A local `/public` path or a
   * Bunny CDN url (`*.b-cdn.net`, allowed in next.config). Omit for a plain
   * brand-maroon placeholder.
   */
  poster?: string;
  aspect?: keyof typeof aspectClass;
};

/** Bunny Stream source: `iframe.mediadelivery.net/embed/{libraryId}/{videoId}`. */
type BunnyProps = CommonProps & {
  libraryId: string;
  videoId: string;
  src?: never;
};

/** Self-hosted source: an mp4/webm in `/public` (or any same-origin url). */
type FileProps = CommonProps & {
  src: string;
  libraryId?: never;
  videoId?: never;
};

export type VideoEmbedProps = BunnyProps | FileProps;

/**
 * Click-to-play video for any `media` slot (Hero, FeatureSplit), in place of
 * MediaPlaceholder. Plays from Bunny Stream (libraryId + videoId) OR a
 * self-hosted file (`src`) — Bunny is optional, so a Screen Studio export can
 * live in `/public` until/unless Bunny is set up. Nothing heavy loads until
 * the visitor clicks play, so video is never the LCP element.
 */
export function VideoEmbed(props: VideoEmbedProps) {
  const { title, poster, aspect = "video" } = props;
  const [playing, setPlaying] = useState(false);
  const isBunny = "libraryId" in props && props.libraryId != null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-brand-deep",
        aspectClass[aspect],
      )}
    >
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
            src={props.src}
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
            className="absolute inset-0 bg-brand-deep/25 transition-colors group-hover:bg-brand-deep/10"
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
