import { Star } from "lucide-react";
import { reviews } from "../../content/site";
import { DemoNote } from "../ui/DemoNote";
import { SectionHeading } from "../ui/SectionHeading";

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-1 text-bronze" role="img" aria-label={`${value} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-3.5" strokeWidth={1.2} fill={i < value ? "currentColor" : "none"} aria-hidden="true" />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-titulo" className="on-light bg-bone py-24 text-ink md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            tone="light"
            index="06"
            eyebrow="Avaliações"
            title={
              <span id="avaliacoes-titulo">
                Quem senta, <em>volta.</em>
              </span>
            }
          />
          <DemoNote className="text-ink/70">Depoimentos ilustrativos — substituir por avaliações reais do Google</DemoNote>
        </div>

        <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 md:scroll-px-0 pb-2 md:mx-0 md:mt-20 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 xl:grid-cols-4">
          {reviews.map((r, i) => (
            <li
              key={r.name}
              data-reveal
              style={{ "--d": i } as React.CSSProperties}
              className="flex w-[84%] shrink-0 snap-start flex-col justify-between border hairline bg-bone p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(11_11_10/0.35)] sm:w-[60%] md:w-auto"
            >
              <figure>
                <Stars value={r.rating} />
                <blockquote className="mt-6 font-serif text-[1.22rem] leading-snug text-ink/90">“{r.text}”</blockquote>
                <figcaption className="mt-8 flex items-center justify-between border-t hairline pt-5 text-sm">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-ink/70">{r.service}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
