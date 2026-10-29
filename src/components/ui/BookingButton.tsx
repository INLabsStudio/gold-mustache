import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { bookingLinkProps, type BookingTarget } from "../../lib/booking";

type Variant = "solid" | "outline" | "ghost" | "light";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-6 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-[color,background-color,border-color,transform] duration-500 ease-[var(--ease-out-quart)] active:scale-[0.98]";

const variants: Record<Variant, string> = {
  solid: "bg-gold text-ink hover:bg-gold-soft",
  outline: "border border-gold/60 text-bone hover:border-gold hover:text-gold-soft",
  ghost: "text-bone hover:text-gold-soft px-0",
  light: "bg-ink text-bone hover:bg-graphite",
};

type Props = BookingTarget & {
  children?: ReactNode;
  variant?: Variant;
  className?: string;
  label?: string;
};

/** Botão de agendamento: o destino vem sempre de lib/booking. */
export function BookingButton({ children = "Agendar horário", variant = "solid", className = "", label, ...target }: Props) {
  return (
    <a {...bookingLinkProps(target)} aria-label={label} className={`${base} ${variants[variant]} ${className}`}>
      {variant === "solid" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent_20%,rgb(255_255_255/0.35)_50%,transparent_80%)] transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      <ArrowUpRight
        className="relative size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.6}
        aria-hidden="true"
      />
    </a>
  );
}
