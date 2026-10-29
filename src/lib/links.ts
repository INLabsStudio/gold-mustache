import { address, contact } from "../content/site";

export const whatsappHref = () =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

export const instagramHref = () => `https://instagram.com/${contact.instagram}`;

export const mapsDirectionsHref = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.mapsQuery)}`;

export const fullAddress = () =>
  `${address.street} — ${address.district}, ${address.city}/${address.state}`;
