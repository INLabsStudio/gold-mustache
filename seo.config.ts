import type { Plugin } from "vite";
import { address, brand, contact, hours, site } from "./src/content/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** JSON-LD só é publicado com dados reais (site.demo = false). */
function jsonLd() {
  if (site.demo) return "";
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const data = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: brand.name,
    description: brand.seoDescription,
    url: site.url,
    image: `${site.url}/og.jpg`,
    telephone: contact.whatsapp ? `+${contact.whatsapp}` : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: "BR",
    },
    sameAs: [`https://instagram.com/${contact.instagram}`],
    openingHoursSpecification: hours
      .map((h, i) => ({ h, day: days[i] }))
      .filter(({ h }) => h.open)
      .map(({ h, day }) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: day, opens: h.open, closes: h.close })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function seo(): Plugin {
  return {
    name: "site-seo",
    transformIndexHtml(html) {
      const tags = [
        `<title>${esc(brand.seoTitle)}</title>`,
        `<meta name="description" content="${esc(brand.seoDescription)}" />`,
        `<link rel="canonical" href="${site.url}/" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:locale" content="pt_BR" />`,
        `<meta property="og:site_name" content="${esc(brand.name)}" />`,
        `<meta property="og:title" content="${esc(brand.seoTitle)}" />`,
        `<meta property="og:description" content="${esc(brand.seoDescription)}" />`,
        `<meta property="og:url" content="${site.url}/" />`,
        `<meta property="og:image" content="${site.url}/og.jpg" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        site.demo ? `<meta name="robots" content="noindex" />` : "",
        jsonLd(),
      ].filter(Boolean);
      return html.replace(/<!-- %SEO%.*?-->/, tags.join("\n    "));
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: site.demo ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site.url}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
      });
    },
  };
}
