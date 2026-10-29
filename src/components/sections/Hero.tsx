import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { address, booking, brand, hoursSummary, images } from "../../content/site";
import { bookingLinkProps } from "../../lib/booking";
import { BookingButton } from "../ui/BookingButton";
import { Emblem } from "../ui/Emblem";
import { Picture } from "../ui/Picture";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

/** Selo circular com texto girando — atalho para agendar. */
function BookingSeal() {
  const text = "Agende online · Agende online · ";
  return (
    <a
      {...bookingLinkProps()}
      aria-label={`Agendar horário pelo ${booking.platformName}`}
      className="group relative hidden size-36 items-center justify-center rounded-full text-bone transition-colors md:flex"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="seal-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text className="fill-current text-[7.6px] font-medium uppercase tracking-[0.2em]">
          <textPath href="#seal-circle" textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="flex size-16 items-center justify-center rounded-full border border-gold/50 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
        <Emblem className="size-8" />
      </span>
    </a>
  );
}

export function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  // Entrada: marca a seção após o primeiro frame
  useEffect(() => {
    const id = requestAnimationFrame(() => rootRef.current?.classList.add("is-in"));
    return () => cancelAnimationFrame(id);
  }, []);

  // Parallax leve na foto (desligado com reduced-motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        if (mediaRef.current) mediaRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={rootRef} id="inicio" aria-label="Apresentação" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      <div ref={mediaRef} className="img-settle absolute inset-0 -z-10 will-change-transform">
        <Picture
          name={images.hero}
          alt="Barbeiro fazendo a barba de um cliente na navalha, em ambiente de luz baixa"
          priority
          className="block size-full"
          imgClassName="size-full object-cover object-[62%_center] opacity-80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_11_10/0.55)_0%,rgb(11_11_10/0.15)_35%,rgb(11_11_10/0.75)_72%,#0b0b0a_100%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(11_11_10/0.85)_0%,rgb(11_11_10/0.3)_55%,transparent_100%)] lg:block" />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-16 lg:justify-center lg:pt-24">
        <div className="max-w-[46rem]">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="line-mask" style={d(0)}>
              <span>{brand.descriptor}</span>
            </span>
          </p>

          <h1 className="display mt-6 text-[clamp(3.1rem,13.5vw,7.6rem)] text-bone">
            <span className="line-mask" style={d(1)}>
              <span>Corte de alfaiate.</span>
            </span>
            <span className="line-mask" style={d(2)}>
              <span>
                <em className="text-gold-soft">Ritual</em> de barbearia.
              </span>
            </span>
          </h1>

          <p data-reveal style={d(5)} className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-bone/80 md:text-lg">
            Cortes clássicos e contemporâneos, barba na toalha quente e um atendimento sem pressa — do primeiro café ao último acabamento.
          </p>

          <div data-reveal style={d(6)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <BookingButton className="w-full sm:w-auto">Agendar horário</BookingButton>
            <a
              href="#sobre"
              className="group inline-flex min-h-12 items-center justify-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-bone transition-colors hover:text-gold-soft sm:justify-start"
            >
              Conhecer a barbearia
              <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div data-reveal="fade" style={d(8)} className="mt-12 flex items-end justify-between gap-6 border-t hairline pt-5 md:mt-16">
          <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-3 text-[0.78rem] text-ash sm:flex sm:w-auto sm:gap-10">
            <div>
              <dt className="eyebrow text-[0.6rem] text-stone">Horário</dt>
              <dd className="mt-1 text-bone">{hoursSummary}</dd>
            </div>
            <div>
              <dt className="eyebrow text-[0.6rem] text-stone">Endereço</dt>
              <dd className="mt-1 text-bone">
                {address.district} · {address.city}/{address.state}
              </dd>
            </div>
            <div className="hidden sm:block">
              <dt className="eyebrow text-[0.6rem] text-stone">Agendamento</dt>
              <dd className="mt-1 text-bone">Online, 24h por dia</dd>
            </div>
          </dl>
          <a href="#sobre" aria-label="Rolar para a próxima seção" className="hidden size-12 shrink-0 items-center justify-center rounded-full border hairline text-ash transition-colors hover:border-gold hover:text-gold md:flex">
            <ArrowDown className="size-4" strokeWidth={1.4} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block xl:right-16">
        <div className="pointer-events-auto" data-reveal="fade" style={d(9)}>
          <BookingSeal />
        </div>
      </div>
    </section>
  );
}
