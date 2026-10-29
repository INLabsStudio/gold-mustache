/** Emblema provisório: bigode desenhado em traço fino dentro de um selo. */
export function Emblem({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <path
        d="M24 25.2c-1.6-2.6-4.4-3.9-7.2-3.1-2.3.6-3.9 2.6-6.1 2.9-1.3.2-2.5-.4-3.2-1.4.3 2.9 2.7 5.3 6 5.4 3.9.1 7.2-1.8 10.5-3.8 3.3 2 6.6 3.9 10.5 3.8 3.3-.1 5.7-2.5 6-5.4-.7 1-1.9 1.6-3.2 1.4-2.2-.3-3.8-2.3-6.1-2.9-2.8-.8-5.6.5-7.2 3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Traço ornamental de bigode usado como divisor; desenha ao entrar na tela. */
export function MustacheRule({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={`draw ${className}`} data-reveal="fade" aria-hidden="true" fill="none">
      <path
        pathLength={1}
        d="M0 12h86c6 0 10-6 18-6 6 0 10 3 16 7 6-4 10-7 16-7 8 0 12 6 18 6h86"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
