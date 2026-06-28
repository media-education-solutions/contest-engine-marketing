import { Section } from "@/components/layout/section";

type LegalContent =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "subhead"; text: string };

export type LegalSection = {
  heading: string;
  body: LegalContent[];
};

export type LegalDocProps = {
  lastUpdated?: string;
  preamble?: LegalContent[];
  sections: LegalSection[];
  footnote?: string;
};

function Body({ items }: { items: LegalContent[] }) {
  return (
    <>
      {items.map((item, i) => {
        if (item.kind === "subhead")
          return (
            <p key={i} className="mt-6 font-heading font-semibold text-foreground">
              {item.text}
            </p>
          );
        if (item.kind === "list")
          return (
            <ul key={i} className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              {item.items.map((li, j) => (
                <li key={j} className="leading-relaxed">
                  {li}
                </li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="mt-4 leading-relaxed text-muted-foreground">
            {item.text}
          </p>
        );
      })}
    </>
  );
}

/** Long-form legal document — numbered sections of prose + lists, measure-limited. */
export function LegalDoc({ lastUpdated, preamble, sections, footnote }: LegalDocProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        {lastUpdated && (
          <p className="text-sm text-muted-foreground">{lastUpdated}</p>
        )}
        {preamble && (
          <div className="mt-6">
            <Body items={preamble} />
          </div>
        )}
        {sections.map((section, idx) => (
          <section key={idx} className="mt-10">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {idx + 1}. {section.heading}
            </h2>
            <Body items={section.body} />
          </section>
        ))}
        {footnote && (
          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
            {footnote}
          </p>
        )}
      </div>
    </Section>
  );
}
