import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Cabeçalho editorial numerado ("01 — Serviços"). */
export function SectionHeading({ index, eyebrow, title, intro, align = "left", tone = "dark", className = "" }: Props) {
  const accent = tone === "dark" ? "text-gold" : "text-bronze";
  const muted = tone === "dark" ? "text-ash" : "text-ink/70";
  return (
    <header className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p data-reveal className={`eyebrow flex items-center gap-3 ${accent} ${align === "center" ? "justify-center" : ""}`}>
        <span className="tabular-nums">{index}</span>
        <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
        <span>{eyebrow}</span>
      </p>
      <h2 data-reveal style={{ "--d": 1 } as React.CSSProperties} className="display mt-5 text-[clamp(2.4rem,8vw,4.75rem)]">
        {title}
      </h2>
      {intro && (
        <p data-reveal style={{ "--d": 2 } as React.CSSProperties} className={`mt-6 max-w-xl text-[0.98rem] leading-relaxed ${muted} ${align === "center" ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </header>
  );
}
