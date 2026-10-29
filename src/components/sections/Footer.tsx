import { brand, contact, hoursSummary, nav, site } from "../../content/site";
import { fullAddress, instagramHref, whatsappHref } from "../../lib/links";
import { BookingButton } from "../ui/BookingButton";
import { InstagramIcon, WhatsappIcon } from "../ui/icons";
import { Logo } from "./Header";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t hairline bg-ink pb-28 pt-20 md:pb-12">
      <div className="container-x">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ash">
              Corte de alfaiate, ritual de barbearia. {hoursSummary}.
            </p>
            <BookingButton variant="outline" className="mt-8">
              Agendar horário
            </BookingButton>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3">
            <p className="eyebrow text-stone">Navegação</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-flex min-h-10 items-center text-sm text-ash transition-colors hover:text-gold-soft">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-stone">Contato</p>
            <ul className="mt-5 space-y-3 text-sm text-ash">
              <li>{fullAddress()}</li>
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener" className="hover:text-bone">
                  WhatsApp {contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-bone">
                  {contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a href={instagramHref()} target="_blank" rel="noopener" aria-label="Instagram" className="flex size-11 items-center justify-center border hairline text-ash transition-colors hover:border-gold hover:text-gold">
                <InstagramIcon />
              </a>
              <a href={whatsappHref()} target="_blank" rel="noopener" aria-label="WhatsApp" className="flex size-11 items-center justify-center border hairline text-ash transition-colors hover:border-gold hover:text-gold">
                <WhatsappIcon />
              </a>
            </div>
          </div>
        </div>

        <p aria-hidden="true" className="display pointer-events-none mt-20 select-none whitespace-nowrap text-center text-[clamp(4rem,19vw,17rem)] leading-[0.8] text-bone/[0.04]">
          {brand.name}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t hairline pt-6 text-xs text-stone md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {brand.name}. Todos os direitos reservados.
            {site.demo && <span className="ml-1">Protótipo conceitual · fotos: Unsplash.</span>}
          </p>
          <p>
            Desenvolvido por{" "}
            <a href="https://inlabs.studio" target="_blank" rel="noopener" className="text-ash underline-offset-4 transition-colors hover:text-gold hover:underline">
              INLabs Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
