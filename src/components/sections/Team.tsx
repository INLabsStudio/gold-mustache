import { ArrowUpRight } from "lucide-react";
import { team } from "../../content/site";
import { bookingLinkProps } from "../../lib/booking";
import { DemoNote } from "../ui/DemoNote";
import { Picture } from "../ui/Picture";
import { SectionHeading } from "../ui/SectionHeading";

export function Team() {
  return (
    <section aria-labelledby="equipe-titulo" className="bg-coal py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="05"
            eyebrow="Profissionais"
            title={
              <span id="equipe-titulo">
                Mãos que <em className="text-gold-soft">conhecem o ofício.</em>
              </span>
            }
          />
          <DemoNote className="text-ash">Profissionais e fotos ilustrativos</DemoNote>
        </div>

        <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 md:scroll-px-0 md:mx-0 md:mt-20 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {team.map((p, i) => (
            <li key={p.id} data-reveal style={{ "--d": i } as React.CSSProperties} className="w-[78%] shrink-0 snap-start sm:w-[48%] md:w-auto">
              <a {...bookingLinkProps({ professional: p })} className="group block" aria-label={`Agendar com ${p.name}, ${p.role}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                  <Picture
                    name={p.image}
                    alt={`Retrato de ${p.name}`}
                    sizes="(min-width: 768px) 30vw, 78vw"
                    className="block size-full"
                    imgClassName="size-full object-cover grayscale-[0.85] contrast-[1.05] transition-[filter,transform] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(11_11_10/0.85))]" aria-hidden="true" />
                  <ul className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {p.specialties.map((s) => (
                      <li key={s} className="rounded-full border border-bone/25 bg-ink/40 px-3 py-1 text-[0.68rem] text-bone backdrop-blur">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="display text-[1.7rem] transition-colors group-hover:text-gold-soft">{p.name}</h3>
                    <p className="eyebrow mt-2 text-stone">{p.role}</p>
                  </div>
                  <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border hairline text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
