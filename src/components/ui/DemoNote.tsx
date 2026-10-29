import { site } from "../../content/site";

/** Aviso discreto de conteúdo ilustrativo (some quando `site.demo` = false). */
export function DemoNote({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  if (!site.demo) return null;
  return (
    <p className={`inline-flex items-center gap-2 text-[0.7rem] tracking-wide opacity-70 ${className}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}
