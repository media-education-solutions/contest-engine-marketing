import { PlayMark } from "@/components/ui/play-mark";
import { cn } from "@/lib/utils";

/**
 * Stand-in for product screenshots/videos until Phase 5 media production.
 * Keeps layout honest (real aspect ratios) so swapping in assets is zero-risk.
 */
export function MediaPlaceholder({
  label,
  aspect = "video",
  className,
}: {
  label: string;
  aspect?: "video" | "4/3" | "square";
  className?: string;
}) {
  const aspectClass = {
    video: "aspect-video",
    "4/3": "aspect-[4/3]",
    square: "aspect-square",
  }[aspect];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl bg-secondary",
        aspectClass,
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-brand/10">
        <PlayMark className="size-4" />
      </span>
      <span className="px-6 text-center text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
