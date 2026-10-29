import { booking, type Professional, type Service } from "../content/site";

/**
 * Ponto único de integração com a plataforma de agendamento.
 *
 * Hoje: redirecionamento externo para o link oficial da barbearia.
 * Se um serviço/profissional tiver `bookingUrl` próprio, ele tem prioridade.
 * Uma futura integração (widget, iframe ou API) muda apenas este arquivo.
 */
export type BookingTarget = { service?: Service; professional?: Professional };

export function bookingUrl(target: BookingTarget = {}): string {
  return target.service?.bookingUrl ?? target.professional?.bookingUrl ?? booking.url;
}

export function bookingLinkProps(target: BookingTarget = {}) {
  const href = bookingUrl(target);
  const external = /^https?:\/\//.test(href);
  return external && booking.openInNewTab
    ? { href, target: "_blank", rel: "noopener" as const }
    : { href };
}
