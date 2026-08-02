"use client";

import { useEffect, useRef } from "react";

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

/** Injects api.js at most once per document; resolves when window.turnstile exists. */
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  const script = existing ?? document.createElement("script");
  if (!existing) {
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
  return new Promise((resolve) => {
    if (window.turnstile) resolve();
    else script.addEventListener("load", () => resolve(), { once: true });
  });
}

/**
 * Cloudflare Turnstile. Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is
 * unset, which keeps local dev and CI screenshots working — the server half
 * (src/lib/turnstile.ts) fails open in exactly the same case.
 *
 * The widget injects a hidden `cf-turnstile-response` input into its container,
 * so this must be rendered INSIDE the <form> for the token to reach the action.
 *
 * A token is single-use: after a rejected submit, Cloudflare returns
 * `timeout-or-duplicate` for the same token. Pass the action state as `resetOn`
 * so a fresh token is minted whenever the action returns.
 */
export function TurnstileWidget({
  action,
  resetOn,
}: {
  action: string;
  resetOn?: unknown;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!siteKey || !el) return;
    let cancelled = false;

    void loadTurnstile().then(() => {
      if (cancelled || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(el, {
        sitekey: siteKey,
        action,
        theme: "auto",
      });
    });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey, action]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }, [resetOn]);

  if (!siteKey) return null;
  // Reserve the widget's height so the submit button doesn't jump on load.
  return <div ref={containerRef} className="min-h-[65px]" />;
}
