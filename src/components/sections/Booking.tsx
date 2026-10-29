import { booking, images } from "../../content/site";
import { BookingButton } from "../ui/BookingButton";
import { Emblem } from "../ui/Emblem";
import { Picture } from "../ui/Picture";

const steps = [
  { title: "Escolha o serviço", text: "Corte, barba, combo ou tratamento — com preço e duração à vista." },
  { title: "Escolha profissional e horário", text: "Veja a agenda em tempo real e reserve o melhor horário para você." },
  { title: "Confirme e pronto", text: "Você recebe a confirmação e um lembrete antes do atendimento." },
];

export function Booking() {
  return (
    <section id="agendar" aria-labelledby="agendar-titulo" className="relative isolate overflow-hidden bg-ink py-24 md:py-36">
      <div className="absolute inset-0 -z-10 opacity-35">
        <Picture name={images.aboutDetail} alt="" sizes="100vw" className="block size-full" imgClassName="size-full object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(11_11_10/0.55),#0b0b0a_75%)]" />
      </div>

      <div className="container-x grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <Emblem className="size-12 text-gold" />
          <h2 id="agendar-titulo" data-reveal className="display mt-8 text-[clamp(2.6rem,9vw,5.5rem)]">
            Seu horário, <br />
            <em className="text-gold-soft">em menos de um minuto.</em>
          </h2>
          <p data-reveal style={{ "--d": 1 } as React.CSSProperties} className="mt-6 max-w-md leading-relaxed text-ash">
            O agendamento é feito pela plataforma oficial da barbearia, o {booking.platformName}. Você escolhe, confirma e recebe
            lembretes — sem ligação, sem espera.
          </p>
          <div data-reveal style={{ "--d": 2 } as React.CSSProperties} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <BookingButton className="w-full sm:w-auto">Agendar agora</BookingButton>
            <span className="text-xs text-stone">Você será direcionado ao {booking.platformName}.</span>
          </div>
        </div>

        <ol className="relative space-y-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ "--d": i + 1 } as React.CSSProperties}
              className="flex gap-6 border hairline bg-ink/60 p-6 backdrop-blur-sm md:p-8"
            >
              <span className="display text-[2.6rem] leading-none text-gold tabular-nums">{i + 1}</span>
              <div>
                <h3 className="text-base font-semibold tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
