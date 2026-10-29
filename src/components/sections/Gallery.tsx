import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { contact, gallery } from "../../content/site";
import { instagramHref } from "../../lib/links";
import { Picture } from "../ui/Picture";
import { SectionHeading } from "../ui/SectionHeading";

const spanClass = { tall: "row-span-2", wide: "col-span-2" } as const;

function Lightbox({ index, onClose, onMove }: { index: number; onClose: () => void; onMove: (dir: 1 | -1) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const item = gallery[index];

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
      if (e.key === "Tab") {
        const f = Array.from(ref.current?.querySelectorAll<HTMLElement>("button") ?? []);
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1]?.focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0]?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose, onMove]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} de ${gallery.length}`}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/96 backdrop-blur-sm"
      style={{ animation: "lb-in 0.4s var(--ease-out-quart) both" }}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        if (Math.abs(dx) > 50) onMove(dx < 0 ? 1 : -1);
        startX.current = null;
      }}
    >
      <div className="container-x flex h-16 shrink-0 items-center justify-between">
        <span className="eyebrow text-ash tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Fechar galeria" className="-mr-3 flex size-12 items-center justify-center text-bone hover:text-gold">
          <X className="size-6" strokeWidth={1.4} />
        </button>
      </div>

      <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-4 md:px-24">
        <div key={index} className="flex min-h-0 items-center" style={{ animation: "lb-img 0.6s var(--ease-out-expo) both" }}>
          <Picture
            name={item.image}
            alt={item.alt}
            sizes="100vw"
            className="flex max-h-full"
            imgClassName="max-h-[calc(100svh-10rem)] w-auto max-w-full object-contain"
          />
        </div>
        <figcaption className="mt-4 text-center text-sm text-ash">{item.alt}</figcaption>

        <button type="button" onClick={() => onMove(-1)} aria-label="Foto anterior" className="absolute left-2 top-1/2 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border hairline text-bone transition-colors hover:border-gold hover:text-gold md:flex">
          <ChevronLeft className="size-5" strokeWidth={1.4} />
        </button>
        <button type="button" onClick={() => onMove(1)} aria-label="Próxima foto" className="absolute right-2 top-1/2 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border hairline text-bone transition-colors hover:border-gold hover:text-gold md:flex">
          <ChevronRight className="size-5" strokeWidth={1.4} />
        </button>
      </figure>

      <div className="flex justify-center gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:hidden">
        <button type="button" onClick={() => onMove(-1)} aria-label="Foto anterior" className="flex size-12 items-center justify-center rounded-full border hairline">
          <ChevronLeft className="size-5" strokeWidth={1.4} />
        </button>
        <button type="button" onClick={() => onMove(1)} aria-label="Próxima foto" className="flex size-12 items-center justify-center rounded-full border hairline">
          <ChevronRight className="size-5" strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)), []);

  return (
    <section id="galeria" aria-labelledby="galeria-titulo" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Galeria"
            title={
              <span id="galeria-titulo">
                Trabalho <em className="text-gold-soft">de perto.</em>
              </span>
            }
          />
          <a
            data-reveal
            href={instagramHref()}
            target="_blank"
            rel="noopener"
            className="eyebrow inline-flex min-h-11 items-center gap-2 self-start text-ash transition-colors hover:text-gold md:self-auto"
          >
            Mais no Instagram · @{contact.instagram}
          </a>
        </div>

        <ul className="mt-14 grid grid-flow-row-dense auto-rows-[44vw] grid-cols-2 gap-2 sm:auto-rows-[30vw] md:mt-20 md:grid-cols-4 md:auto-rows-[19vw] md:gap-3 xl:auto-rows-[250px]">
          {gallery.map((g, i) => (
            <li key={g.image} data-reveal style={{ "--d": i % 4 } as React.CSSProperties} className={g.span ? spanClass[g.span] : ""}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Ampliar foto: ${g.alt}`}
                className="group relative block size-full overflow-hidden bg-graphite"
              >
                <Picture
                  name={g.image}
                  alt=""
                  sizes={g.span === "wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="block size-full"
                  imgClassName="size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30" aria-hidden="true" />
                <span className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-ink/60 text-bone opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onMove={move} />}
    </section>
  );
}
