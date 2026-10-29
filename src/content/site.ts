/**
 * CONTEÚDO CENTRAL DO SITE
 * ------------------------------------------------------------------
 * Tudo que muda de cliente para cliente fica aqui: marca, contatos,
 * horários, serviços, preços, profissionais, avaliações, galeria e
 * links de agendamento. Os componentes apenas leem estes dados.
 *
 * `demo: true` exibe avisos discretos de "conteúdo ilustrativo" nas
 * seções com dados fictícios (preços, depoimentos, profissionais).
 * Ao preencher com dados reais e confirmados, troque para `false`.
 */
import type { ImageName } from "./images.generated";

export const site = {
  demo: true,
  /** Domínio final, usado em canonical, sitemap e Open Graph. */
  url: "https://barbearia.inlabs.studio",
  lang: "pt-BR",
} as const;

export const brand = {
  name: "Barbearia",
  descriptor: "Estúdio de cuidado masculino",
  /** Frase curta usada no título da página e no Open Graph. */
  seoTitle: "Barbearia — Corte de alfaiate, ritual de barbearia",
  seoDescription:
    "Cortes clássicos e contemporâneos, barba na toalha quente e atendimento sem pressa. Agende seu horário online em poucos toques.",
};

/* ------------------------------------------------------------------ */
/* Agendamento                                                         */
/* ------------------------------------------------------------------ */

export const booking = {
  /** Nome exibido ao usuário antes do redirecionamento. */
  platformName: "App Barber",
  /**
   * Link oficial de agendamento da barbearia na plataforma.
   * Substitua pela URL pública fornecida pela barbearia.
   * (Placeholder: página da plataforma.)
   */
  url: "https://www.appbarber.com.br/",
  /** Abre em nova aba no desktop; no celular a navegação segue normal. */
  openInNewTab: true,
};

/* ------------------------------------------------------------------ */
/* Contato e localização                                               */
/* ------------------------------------------------------------------ */

export const contact = {
  /** Somente dígitos, com DDI + DDD. Vazio = botão abre o WhatsApp sem número. */
  whatsapp: "",
  whatsappDisplay: "(00) 00000-0000",
  whatsappMessage: "Olá! Vim pelo site e gostaria de mais informações.",
  phoneDisplay: "(00) 0000-0000",
  instagram: "barbearia",
  email: "contato@barbearia.com.br",
};

export const address = {
  street: "Rua Exemplo, 000",
  district: "Centro",
  city: "Cidade",
  state: "UF",
  postalCode: "00000-000",
  /** Texto usado para busca no Google Maps (rotas). */
  mapsQuery: "Rua Exemplo 000 Centro",
};

/** 0 = domingo … 6 = sábado. `null` = fechado. */
export const hours: { day: string; short: string; open: string | null; close: string | null }[] = [
  { day: "Domingo", short: "Dom", open: null, close: null },
  { day: "Segunda", short: "Seg", open: "09:00", close: "20:00" },
  { day: "Terça", short: "Ter", open: "09:00", close: "20:00" },
  { day: "Quarta", short: "Qua", open: "09:00", close: "20:00" },
  { day: "Quinta", short: "Qui", open: "09:00", close: "20:00" },
  { day: "Sexta", short: "Sex", open: "09:00", close: "21:00" },
  { day: "Sábado", short: "Sáb", open: "09:00", close: "18:00" },
];

export const hoursSummary = "Seg a Sáb · 9h às 20h";

/* ------------------------------------------------------------------ */
/* Navegação                                                           */
/* ------------------------------------------------------------------ */

export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Localização", href: "#localizacao" },
];

/* ------------------------------------------------------------------ */
/* Serviços                                                            */
/* ------------------------------------------------------------------ */

export type ServiceCategory = "cortes" | "barba" | "combos" | "acabamentos" | "tratamentos";

export const serviceCategories: { id: ServiceCategory; label: string }[] = [
  { id: "combos", label: "Combos" },
  { id: "cortes", label: "Cortes" },
  { id: "barba", label: "Barba" },
  { id: "acabamentos", label: "Acabamentos" },
  { id: "tratamentos", label: "Tratamentos" },
];

export type Service = {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  /** Em reais. `null` = "sob consulta". */
  price: number | null;
  /** Em minutos. */
  duration: number;
  featured?: boolean;
  /** Link de agendamento direto para o serviço, se a plataforma permitir. */
  bookingUrl?: string;
};

export const services: Service[] = [
  {
    id: "corte-barba",
    name: "Corte + Barba",
    description: "O serviço completo: corte sob medida e barba alinhada na navalha, com toalha quente.",
    category: "combos",
    price: 100,
    duration: 60,
    featured: true,
  },
  {
    id: "combo-completo",
    name: "Combo Completo",
    description: "Corte, barba e sobrancelha na navalha. Para sair pronto para qualquer ocasião.",
    category: "combos",
    price: 115,
    duration: 75,
  },
  {
    id: "corte-classico",
    name: "Corte Clássico",
    description: "Tesoura e pente, com acabamento à navalha. Linhas limpas e caimento natural.",
    category: "cortes",
    price: 60,
    duration: 45,
  },
  {
    id: "degrade",
    name: "Degradê / Fade",
    description: "Low, mid ou high fade com transições precisas, do zero ao comprimento desejado.",
    category: "cortes",
    price: 55,
    duration: 45,
  },
  {
    id: "corte-social",
    name: "Corte Social",
    description: "Objetivo e elegante, ideal para a rotina. Lavagem inclusa.",
    category: "cortes",
    price: 50,
    duration: 30,
  },
  {
    id: "barba-completa",
    name: "Barba Completa",
    description: "Ritual com toalha quente, óleo pré-barba e navalha. Pele confortável, contorno definido.",
    category: "barba",
    price: 50,
    duration: 30,
  },
  {
    id: "design-barba",
    name: "Design de Barba",
    description: "Desenho e volume pensados para o formato do rosto.",
    category: "barba",
    price: 40,
    duration: 30,
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha na Navalha",
    description: "Limpeza e alinhamento discretos, sem perder a naturalidade.",
    category: "acabamentos",
    price: 20,
    duration: 15,
  },
  {
    id: "pigmentacao",
    name: "Pigmentação",
    description: "Preenchimento de falhas no cabelo ou na barba, com resultado natural.",
    category: "acabamentos",
    price: 50,
    duration: 30,
  },
  {
    id: "limpeza-pele",
    name: "Limpeza de Pele",
    description: "Esfoliação, extração e máscara calmante. Um respiro para a pele do rosto.",
    category: "tratamentos",
    price: 80,
    duration: 45,
  },
  {
    id: "platinado",
    name: "Platinado / Luzes",
    description: "Descoloração com tratamento de proteção da fibra. Avaliação prévia recomendada.",
    category: "tratamentos",
    price: null,
    duration: 90,
  },
];

/* ------------------------------------------------------------------ */
/* Profissionais                                                       */
/* ------------------------------------------------------------------ */

export type Professional = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  image: ImageName;
  bookingUrl?: string;
};

export const team: Professional[] = [
  {
    id: "profissional-01",
    name: "Rafael Moura",
    role: "Barbeiro Sênior",
    specialties: ["Cortes clássicos", "Navalha"],
    image: "equipe-01",
  },
  {
    id: "profissional-02",
    name: "Caio Bastos",
    role: "Barbeiro",
    specialties: ["Fade", "Design de barba"],
    image: "equipe-02",
  },
  {
    id: "profissional-03",
    name: "Ari Tanaka",
    role: "Visagismo & Química",
    specialties: ["Platinado", "Texturas"],
    image: "equipe-03",
  },
];

/* ------------------------------------------------------------------ */
/* Avaliações                                                          */
/* ------------------------------------------------------------------ */

export type Review = { name: string; text: string; rating: number; service: string };

export const reviews: Review[] = [
  {
    name: "Cliente A.",
    text: "Atendimento sem pressa, café bom e um degradê impecável. Saí com a sensação de que cada detalhe foi pensado.",
    rating: 5,
    service: "Degradê / Fade",
  },
  {
    name: "Cliente B.",
    text: "A barba com toalha quente virou meu momento da semana. Ambiente tranquilo e profissionais muito atentos.",
    rating: 5,
    service: "Barba Completa",
  },
  {
    name: "Cliente C.",
    text: "Agendei pelo celular em menos de um minuto e fui atendido no horário. Simples do jeito que deveria ser.",
    rating: 5,
    service: "Corte + Barba",
  },
  {
    name: "Cliente D.",
    text: "Expliquei o que queria e o barbeiro sugeriu algo ainda melhor para o meu rosto. Virei cliente.",
    rating: 5,
    service: "Corte Clássico",
  },
];

/* ------------------------------------------------------------------ */
/* Imagens e galeria                                                   */
/* ------------------------------------------------------------------ */

export const images = {
  hero: "navalha",
  aboutMain: "ambiente",
  aboutDetail: "ferramentas",
  experience: "tesoura",
  booking: "finalizacao",
} satisfies Record<string, ImageName>;

export const gallery: { image: ImageName; alt: string; span?: "tall" | "wide" }[] = [
  { image: "desenho", alt: "Barbeiro desenhando o contorno da barba com navalha", span: "tall" },
  { image: "ambiente", alt: "Salão da barbearia com cadeiras pretas e espelhos iluminados", span: "wide" },
  { image: "finalizacao", alt: "Finalização com secador após o corte", span: "tall" },
  { image: "navalha", alt: "Cliente recebendo barba na navalha em ambiente escuro" },
  { image: "tesoura", alt: "Corte com tesoura e pente" },
  { image: "ferramentas", alt: "Máquinas, tesoura, pente e pomadas sobre a bancada", span: "wide" },
  { image: "maquina", alt: "Acabamento na nuca com máquina", span: "wide" },
];
