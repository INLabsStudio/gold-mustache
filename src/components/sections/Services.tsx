import { ArrowUpRight, Clock } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { images, serviceCategories, services, type ServiceCategory } from "../../content/site";
import { bookingLinkProps } from "../../lib/booking";
import { formatDuration, formatPrice } from "../../lib/format";
import { BookingButton } from "../ui/BookingButton";
import { DemoNote } from "../ui/DemoNote";
import { Picture } from "../ui/Picture";
import { SectionHeading } from "../ui/SectionHeading";

type Filter = ServiceCategory | "todos";

export function Services() {
  const [filter, setFilter] = useState<Filter>("todos");
  const tabsId = useId();
  const featured = services.find((s) => s.featured);
  const list = useMemo(
    () => services.filter((s) => !s.featured && (filter === "todos" || s.category === filter)),
    [filter],
  );
  const tabs: { id: Filter; label: string }[] = [{ id: "todos", label: "Todos" }, ...serviceCategories];

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="relative bg-ink py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            eyebrow="Serviços"
            title={
              <span id="servicos-titulo">
                O menu da <em className="text-gold-soft">cadeira.</em>
              </span>
            }
            intro="Cada serviço inclui consulta rápida antes de começar e finalização com produtos selecionados."
          />
          <DemoNote className="text-ash lg:mb-2">Valores e durações ilustrativos</DemoNote>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Destaque */}
          {featured && (
            <article data-reveal className="group relative isolate flex min-h-[460px] flex-col justify-end overflow-hidden bg-graphite p-7 lg:sticky lg:top-24 lg:col-span-5 lg:h-[calc(100svh-8rem)] lg:max-h-[680px] md:p-9">
              <Picture
                name={images.booking}
                alt=""
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="absolute inset-0 -z-10"
                imgClassName="size-full object-cover opacity-60 transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_20%,rgb(11_11_10/0.92)_80%)]" />
              <span className="eyebrow absolute left-7 top-7 border border-gold/50 bg-ink/70 px-3 py-2 text-gold-soft backdrop-blur md:left-9 md:top-9">Mais pedido</span>
              <h3 className="display text-[clamp(2.4rem,6vw,3.6rem)]">{featured.name}</h3>
              <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-bone/80">{featured.description}</p>
              <div className="mt-7 flex items-center justify-between border-t hairline pt-5">
                <span className="font-serif text-3xl text-gold-soft">{formatPrice(featured.price)}</span>
                <span className="flex items-center gap-2 text-sm text-ash">
                  <Clock className="size-4" strokeWidth={1.4} aria-hidden="true" />
                  {formatDuration(featured.duration)}
                </span>
              </div>
              <BookingButton service={featured} className="mt-6 w-full" label={`Agendar ${featured.name}`}>
                Agendar este serviço
              </BookingButton>
            </article>
          )}

          <div className="lg:col-span-7">
            {/* Filtros */}
            <div
              role="tablist"
              aria-label="Categorias de serviço"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
            >
              {tabs.map((t) => {
                const selected = filter === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    id={`${tabsId}-${t.id}`}
                    aria-selected={selected}
                    aria-controls={`${tabsId}-panel`}
                    onClick={() => setFilter(t.id)}
                    className={`min-h-11 shrink-0 rounded-full border px-5 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                      selected ? "border-gold bg-gold text-ink" : "hairline text-ash hover:border-bone/40 hover:text-bone"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <ul id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${filter}`} className="mt-8 border-t hairline">
              {list.map((s) => (
                <li key={s.id} className="group border-b hairline" style={{ animation: "menu-in 0.6s var(--ease-out-expo) both" }}>
                  <a
                    {...bookingLinkProps({ service: s })}
                    aria-label={`${s.name}, ${formatPrice(s.price)}, ${formatDuration(s.duration)}. Agendar`}
                    className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-6 transition-colors md:py-7"
                  >
                    <div className="flex items-baseline gap-4">
                      <h3 className="display text-[1.55rem] transition-colors duration-300 group-hover:text-gold-soft md:text-[1.9rem]">{s.name}</h3>
                      <span className="hidden h-px flex-1 translate-y-[-0.3em] border-b border-dotted border-bone/20 sm:block" aria-hidden="true" />
                    </div>
                    <span className="text-right font-serif text-xl text-gold-soft md:text-2xl">{formatPrice(s.price)}</span>
                    <span className="max-w-md text-sm leading-relaxed text-ash">{s.description}</span>
                    <span className="flex items-start justify-end gap-3 text-xs text-stone">
                      <span className="whitespace-nowrap pt-0.5">{formatDuration(s.duration)}</span>
                      <ArrowUpRight
                        className="size-4 text-gold opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 max-md:opacity-100"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-stone">Toque em um serviço para agendar. Formas de pagamento e políticas são confirmadas no agendamento.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
