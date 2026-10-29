import { CalendarCheck, Clock, MapPin, Navigation } from "lucide-react";
import { address, contact, hours } from "../../content/site";
import { formatHour } from "../../lib/format";
import { fullAddress, instagramHref, mapsDirectionsHref, whatsappHref } from "../../lib/links";
import { BookingButton } from "../ui/BookingButton";
import { InstagramIcon, WhatsappIcon } from "../ui/icons";
import { SectionHeading } from "../ui/SectionHeading";

/** Mapa ilustrado (sem dependência externa). Pode ser trocado por um iframe do Google Maps. */
function StylizedMap() {
  return (
    <svg viewBox="0 0 600 600" className="size-full" role="img" aria-label="Mapa ilustrativo da localização">
      <rect width="600" height="600" fill="#121211" />
      <g stroke="#2a2927" strokeWidth="1">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} />
        ))}
      </g>
      <g fill="none" stroke="#3a3835" strokeLinecap="round">
        <path d="M-20 420 C 120 380, 220 460, 330 330 S 520 180, 640 210" strokeWidth="22" />
        <path d="M150 -20 L 250 640" strokeWidth="14" />
        <path d="M-20 140 L 640 260" strokeWidth="10" />
        <path d="M420 -20 C 400 160, 470 380, 430 640" strokeWidth="9" />
      </g>
      <g fill="#1b1b1a">
        <rect x="60" y="40" width="70" height="80" />
        <rect x="290" y="60" width="90" height="120" />
        <rect x="470" y="300" width="100" height="70" />
        <rect x="40" y="470" width="90" height="90" />
        <rect x="300" y="430" width="100" height="120" />
      </g>
      <path d="M-20 420 C 120 380, 220 460, 330 330 S 520 180, 640 210" fill="none" stroke="#c4a574" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 8" />
      <g transform="translate(330 330)">
        <circle r="46" fill="#c4a574" fillOpacity="0.08">
          <animate attributeName="r" values="18;56;18" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" values="0.22;0;0.22" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle r="14" fill="#c4a574" />
        <circle r="5" fill="#0b0b0a" />
      </g>
    </svg>
  );
}

export function Location() {
  const today = new Date().getDay();

  return (
    <section id="localizacao" aria-labelledby="local-titulo" className="bg-coal py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="07"
          eyebrow="Localização & contato"
          title={
            <span id="local-titulo">
              Venha nos <em className="text-gold-soft">visitar.</em>
            </span>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-10 lg:col-span-5">
            <div data-reveal className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.4} aria-hidden="true" />
              <address className="not-italic leading-relaxed">
                <span className="block text-lg">{address.street}</span>
                <span className="block text-ash">
                  {address.district} · {address.city}/{address.state} · CEP {address.postalCode}
                </span>
              </address>
            </div>

            <div data-reveal style={{ "--d": 1 } as React.CSSProperties} className="flex gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.4} aria-hidden="true" />
              <table className="w-full text-sm">
                <caption className="sr-only">Horário de funcionamento</caption>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 0].map((i) => {
                    const h = hours[i];
                    const isToday = i === today;
                    return (
                      <tr key={h.day} className={`border-b hairline ${isToday ? "text-bone" : "text-ash"}`}>
                        <th scope="row" className="py-2.5 text-left font-normal">
                          {h.day}
                          {isToday && <span className="eyebrow ml-3 text-[0.58rem] text-gold">Hoje</span>}
                        </th>
                        <td className="py-2.5 text-right tabular-nums">
                          {h.open && h.close ? `${formatHour(h.open)} – ${formatHour(h.close)}` : "Fechado"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div data-reveal style={{ "--d": 2 } as React.CSSProperties} className="grid gap-3 sm:grid-cols-2">
              <BookingButton className="sm:col-span-2">
                <CalendarCheck className="-ml-1 mr-1 inline size-4 align-[-3px]" strokeWidth={1.6} aria-hidden="true" />
                Agendar horário
              </BookingButton>
              <a href={mapsDirectionsHref()} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center justify-center gap-3 border border-gold/60 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-colors hover:border-gold hover:text-gold-soft">
                <Navigation className="size-4" strokeWidth={1.6} aria-hidden="true" />
                Traçar rota
              </a>
              <a href={whatsappHref()} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center justify-center gap-3 border hairline text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-colors hover:border-bone/40">
                <WhatsappIcon className="size-4" />
                WhatsApp
              </a>
            </div>

            <ul data-reveal style={{ "--d": 3 } as React.CSSProperties} className="space-y-2 text-sm text-ash">
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-3 hover:text-bone">
                  <WhatsappIcon className="size-4 text-gold" /> {contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={instagramHref()} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-3 hover:text-bone">
                  <InstagramIcon className="size-4 text-gold" /> @{contact.instagram}
                </a>
              </li>
            </ul>
          </div>

          <a
            href={mapsDirectionsHref()}
            target="_blank"
            rel="noopener"
            data-reveal="fade"
            aria-label={`Abrir rota no Google Maps: ${fullAddress()}`}
            className="group relative block aspect-square overflow-hidden border hairline lg:col-span-7 lg:aspect-auto lg:min-h-[560px]"
          >
            <StylizedMap />
            <span className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 border hairline bg-ink/85 p-4 backdrop-blur md:bottom-8 md:left-8 md:right-auto md:min-w-[320px]">
              <span>
                <span className="eyebrow block text-[0.6rem] text-gold">Abrir no Google Maps</span>
                <span className="mt-1 block text-sm">{fullAddress()}</span>
              </span>
              <Navigation className="size-5 shrink-0 text-gold transition-transform duration-500 group-hover:rotate-12" strokeWidth={1.4} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
