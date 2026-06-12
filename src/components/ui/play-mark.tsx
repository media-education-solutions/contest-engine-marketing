import { cn } from "@/lib/utils";

/**
 * The play-button triangle lifted from the CE monogram — the site's
 * signature motif. Used in kickers, step markers, and list bullets.
 */
export function PlayMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={cn("inline-block size-2.5 fill-brand", className)}
    >
      <path d="M1.5 1.2a1 1 0 0 1 1.52-.85l8 4.8a1 1 0 0 1 0 1.7l-8 4.8a1 1 0 0 1-1.52-.85V1.2Z" />
    </svg>
  );
}

/** Uppercase, letterspaced section label — echoes the wordmark's tracking. */
export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand",
        className,
      )}
    >
      <PlayMark />
      {children}
    </span>
  );
}
