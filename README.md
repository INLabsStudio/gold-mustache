# Barbearia — protótipo conceitual (INLabs Studio)

Site institucional premium para barbearia, pensado como peça de portfólio e base
reutilizável para clientes reais. Mobile-first, estático e pronto para Cloudflare Pages.

**Conceito visual:** "Barbearia de alfaiataria": preto e grafite com dourado fosco
usado com parcimônia, serifa expressiva (Fraunces) com itálicos de destaque, Inter
no texto corrido, composições editoriais (arcos de espelho, palavras gigantes
atravessadas por fotos, numeração de seções) e motion discreto.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (tokens em `src/styles.css`, bloco `@theme`)
- Lucide (ícones), Fontsource (fontes self-hosted, sem chamadas a terceiros)
- Sem bibliotecas de animação: CSS + um único `IntersectionObserver`

## Comandos

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # typecheck + build em dist/
npm run preview    # serve o build localmente
npm run images     # regenera imagens otimizadas a partir de images-src/
```

## Onde editar o conteúdo

Quase tudo fica em **`src/content/site.ts`**:

| O quê | Campo |
| --- | --- |
| Nome, descrição, título e descrição para SEO | `brand` |
| Link de agendamento e nome da plataforma | `booking` |
| WhatsApp, Instagram, e-mail | `contact` |
| Endereço e busca do Maps | `address` |
| Horários (destaca o dia atual) | `hours`, `hoursSummary` |
| Serviços, preços, durações, destaque | `services`, `serviceCategories` |
| Profissionais | `team` |
| Avaliações | `reviews` |
| Fotos de cada seção e da galeria | `images`, `gallery` |
| Modo demonstração | `site.demo` |

`site.demo = true` exibe avisos de "conteúdo ilustrativo", aplica `noindex` e
bloqueia o `robots.txt`. Com dados reais e confirmados, troque para `false`: o
build passa a publicar JSON-LD `BarberShop`, `sitemap.xml` e `robots.txt` liberado
(veja `seo.config.ts`).

### Imagens

1. Coloque a foto original (JPG/PNG, idealmente com pelo menos 2000px) em `images-src/`, por exemplo `fachada.jpg`.
2. Rode `npm run images`. O script gera AVIF e WebP em 480, 960 e 1600px, um placeholder borrado e atualiza `src/content/images.generated.ts`.
3. Use o nome do arquivo sem extensão (`"fachada"`) no `site.ts`. O TypeScript acusa nomes inexistentes.

### Agendamento (App Barber ou outra plataforma)

Toda a lógica fica em `src/lib/booking.ts`. Hoje os botões redirecionam para
`booking.url`. Se a plataforma oferecer links por serviço ou por profissional,
preencha `bookingUrl` no item correspondente: ele passa a ter prioridade.

Não encontrei API, widget ou iframe documentado publicamente pelo App Barber.
A plataforma só menciona que o agendamento online pode ser colocado no site. Se
uma integração for liberada, basta trocar o retorno de `bookingLinkProps()`; os
componentes não mudam.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`
- `public/_headers` define o cache longo para `/assets` e `/images`, além de cabeçalhos básicos de segurança.

## Pendências para um cliente real

- [ ] Nome, logo em vetor e cores oficiais (o emblema atual é provisório)
- [ ] Link oficial de agendamento e, se existir, links por serviço ou profissional
- [ ] Endereço, mapa, horários, WhatsApp, Instagram e e-mail
- [ ] Serviços, preços e durações confirmados
- [ ] Profissionais reais (nome, foto, especialidade)
- [ ] Avaliações reais (ex.: Google) com autorização
- [ ] Fotos reais do ambiente, dos trabalhos e da equipe
- [ ] História da barbearia (texto em `About.tsx`)
- [ ] Domínio final em `site.url` e `site.demo = false`

## Créditos

Fotos: [Unsplash](https://unsplash.com/license) (licença gratuita). Os
profissionais, depoimentos e preços são fictícios e estão marcados como
ilustrativos no site.
