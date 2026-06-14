import Image from "next/image";
import { cn } from "@/lib/utils";

const aspectClass = {
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  square: "aspect-square",
} as const;

// Static map so Tailwind sees every responsive class at build time.
const smAspectClass = {
  video: "sm:aspect-video",
  "4/3": "sm:aspect-[4/3]",
  square: "sm:aspect-square",
} as const;

type Aspect = keyof typeof aspectClass;

export type ScreenshotShowcaseProps = {
  /** Desktop screenshot. Local `/public` path or remote (configured) host. */
  src: string;
  alt: string;
  /**
   * Art-directed crop for ≤sm. A full admin dashboard is unreadable at
   * 375px — supply a tighter crop of the relevant panel. Falls back to
   * `src` when omitted.
   */
  mobileSrc?: string;
  /** Desktop aspect ratio. */
  aspect?: Aspect;
  /** Mobile aspect ratio (only meaningful with `mobileSrc`). */
  mobileAspect?: Aspect;
  /** Set on an above-the-fold showcase so it isn't lazy-loaded. */
  priority?: boolean;
};

/**
 * Framed product screenshot for any `media` slot (Hero, FeatureSplit), in
 * place of MediaPlaceholder. Supports an art-directed mobile crop so a wide
 * desktop capture doesn't shrink into illegibility on phones.
 */
export function ScreenshotShowcase({
  src,
  alt,
  mobileSrc,
  aspect = "video",
  mobileAspect = "4/3",
  priority = false,
}: ScreenshotShowcaseProps) {
  const sizes = "(min-width: 1024px) 50vw, 100vw";

  if (!mobileSrc) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl", aspectClass[aspect])}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        aspectClass[mobileAspect],
        smAspectClass[aspect],
      )}
    >
      {/* Mobile crop ≤sm */}
      <Image
        src={mobileSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover sm:hidden"
      />
      {/* Desktop capture ≥sm */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="hidden object-cover sm:block"
      />
    </div>
  );
}
