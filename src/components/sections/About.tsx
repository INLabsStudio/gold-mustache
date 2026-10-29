import { images } from "../../content/site";
import { MustacheRule } from "../ui/Emblem";
import { Picture } from "../ui/Picture";
import { SectionHeading } from "../ui/SectionHeading";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

const values = [
  { title: "Técnica", text: "Formação contínua e repertório que vai do clássico de tesoura ao fade mais preciso." },
  { title: "Tempo", text: "Horários pensados para que ninguém seja atendido com pressa. Cada cliente, uma cadeira, um momento." },
  { title: "Hospitalidade", text: "Café passado, boa música e uma conversa — ou silêncio, se preferir. O espaço é seu." },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="on-light relative bg-bone py-24 text-ink md:py-36">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pr-10">
          <SectionHeading
            tone="light"
            index="01"
            eyebrow="Sobre a casa"
            title={
              <span id="sobre-titulo">
                Uma barbearia feita <em>sem atalhos.</em>
              </span>
            }
          />
          <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-ink/75">
            <p data-reveal style={d(2)}>
              Aqui o corte é tratado como ofício. Ouvimos antes de pegar a tesoura, respeitamos o formato do rosto e o estilo de
              quem senta na cadeira — e só consideramos o trabalho pronto quando cada linha está no lugar.
            </p>
            <p data-reveal style={d(3)}>
              {/* Espaço para a história real: fundação, origem do nome, quem está à frente. */}
              Tradição de barbearia com olhar contemporâneo: ferramentas de qualidade, produtos selecionados e um ambiente que
              convida a ficar mais um pouco.
            </p>
          </div>

          <MustacheRule className="mt-12 h-6 w-48 text-bronze" />

          <ol className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title} data-reveal style={d(i + 1)} className="border-t hairline pt-5">
                <span className="eyebrow text-bronze tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 text-2xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Composição editorial: arco + detalhe sobreposto */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[520px] pb-28 lg:ml-auto lg:mr-0">
            <div data-reveal="fade" className="img-settle arch relative aspect-[4/5] overflow-hidden bg-bone-dim">
              <Picture
                name={images.aboutMain}
                alt="Salão da barbearia com cadeiras e espelhos iluminados"
                sizes="(min-width: 1024px) 520px, 90vw"
                className="block size-full"
                imgClassName="size-full object-cover"
              />
            </div>
            <div
              data-reveal
              style={d(3)}
              className="img-settle absolute -left-2 bottom-0 w-[46%] overflow-hidden border-[6px] border-bone shadow-[0_30px_60px_-30px_rgb(11_11_10/0.5)] sm:-left-10"
            >
              <Picture
                name={images.aboutDetail}
                alt="Máquinas, tesoura e pomadas sobre a bancada"
                sizes="(min-width: 1024px) 240px, 45vw"
                className="block aspect-square"
                imgClassName="size-full object-cover"
              />
            </div>
            <p
              data-reveal
              style={d(4)}
              className="absolute bottom-0 right-0 max-w-[48%] text-right font-serif text-[1.05rem] italic leading-snug text-ink/80 md:text-xl"
            >
              “O detalhe que ninguém nota é o que todo mundo percebe.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
