"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Fade-up-on-scroll wrapper. CSS transition driven by a one-shot
 * IntersectionObserver; respects prefers-reduced-motion via globals.css.
 * `delay` staggers siblings (ms).
 *
 * Hidden state is applied via direct DOM class manipulation (not React state)
 * so content is always visible if this module fails to load (e.g. dev HMR
 * issues). The `.reveal` CSS rule has no opacity:0 — only `.reveal-pending`
 * does, and that class is only ever added by this effect.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal-pending");

    let observer: IntersectionObserver;
    // RAF ensures the browser paints opacity:0 before the observer fires,
    // so the CSS transition actually plays.
    const rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.remove("reveal-pending");
            el.classList.add("is-visible");
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
