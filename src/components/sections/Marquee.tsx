const words = ["Corte", "Barba", "Navalha", "Toalha quente", "Degradê", "Acabamento", "Hospitalidade"];

/** Faixa contínua de palavras; duplicada para o loop sem emenda. */
export function Marquee() {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="display px-6 text-[clamp(1.6rem,4vw,2.6rem)] italic text-bone/90">{w}</span>
          <span className="size-1.5 rotate-45 bg-gold" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden border-y hairline bg-ink py-5 md:py-7">
      <p className="sr-only">{words.join(", ")}</p>
      <div className="flex w-max animate-marquee motion-reduce:animate-none" aria-hidden="true">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
