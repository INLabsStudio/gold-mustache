import { images } from "../../content/site";
import { Picture } from "../ui/Picture";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

const pillars = [
  { title: "Atendimento", text: "Começa com uma conversa: o que você quer, como é sua rotina, o que funciona no seu cabelo." },
  { title: "Ambiente", text: "Luz baixa, música no volume certo, poltronas confortáveis. Um lugar para desacelerar." },
  { title: "Qualidade", text: "Ferramentas afiadas, higienização rigorosa a cada cliente e produtos profissionais." },
  { title: "Detalhes", text: "Toalha quente, contorno à navalha, finalização e dica de manutenção para casa." },
  { title: "Para você", text: "Seu histórico fica registrado: preferências, máquina, comprimento. Na próxima, é só sentar." },
];

export function Experience() {
  return (
    <section aria-labelledby="experiencia-titulo" className="grain relative overflow-hidden bg-graphite py-24 md:py-36">
      <div className="container-x">
        <p data-reveal className="eyebrow flex items-center gap-3 text-gold">
          <span className="tabular-nums">03</span>
          <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
          <span>A experiência</span>
        </p>

        {/* Palavra gigante atravessada pela imagem */}
        <div className="relative mt-8 md:mt-12">
          <h2
            id="experiencia-titulo"
            data-reveal
            className="display pointer-events-none relative z-20 select-none text-center text-[clamp(3.4rem,15vw,13.5rem)] leading-[0.85] text-bone"
          >
            Mais que <br className="md:hidden" />
            <em className="text-gold-soft">um corte</em>
          </h2>
          <div
            data-reveal
            style={d(2)}
            className="img-settle relative z-10 mx-auto -mt-6 aspect-[3/4] w-[min(78%,420px)] overflow-hidden rounded-[999px] md:-mt-16 md:aspect-[4/5]"
          >
            <Picture
              name={images.experience}
              alt="Barbeiro cortando cabelo com tesoura e pente"
              sizes="(min-width: 768px) 420px, 78vw"
              className="block size-full"
              imgClassName="size-full object-cover"
            />
          </div>
        </div>

        <ol className="mt-20 grid gap-px overflow-hidden border hairline bg-bone/10 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              style={d(i)}
              className="group relative bg-graphite p-7 transition-colors duration-500 hover:bg-smoke md:p-8"
            >
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" aria-hidden="true" />
              <span className="eyebrow text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-8 text-[1.75rem]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
