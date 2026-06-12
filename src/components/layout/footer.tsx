import Link from "next/link";
import { PlayMark } from "@/components/ui/play-mark";
import { footer, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-background/10 bg-brand-deep text-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            {/* Name set in type, not the red-on-maroon logo */}
            <p className="font-heading text-lg font-bold uppercase tracking-[0.18em]">
              {site.productName}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-background/60">
              <PlayMark className="size-2" />
              {footer.tagline}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-background/60">
              {site.mission}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footer.groups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-background/40">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-background/70 transition-colors hover:text-background"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-background/10 pt-6 text-xs text-background/40">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
