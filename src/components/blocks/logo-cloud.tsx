import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/layout/section";

export type LogoItem = {
  name: string;
  /** Optional image; falls back to a styled text mark until logos exist. */
  src?: string;
};

export type LogoCloudProps = {
  title: string;
  logos: LogoItem[];
};

export function LogoCloud({ title, logos }: LogoCloudProps) {
  return (
    <Section tone="muted" className="py-12 sm:py-14">
      <Reveal>
        <p className="text-center font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <li key={logo.name}>
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={140}
                  height={48}
                  className="h-10 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="font-heading text-base font-bold tracking-wide text-foreground/40 transition-colors hover:text-foreground/70">
                  {logo.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
