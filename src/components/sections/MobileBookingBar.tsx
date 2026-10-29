import { useEffect, useState } from "react";
import { whatsappHref } from "../../lib/links";
import { BookingButton } from "../ui/BookingButton";
import { WhatsappIcon } from "../ui/icons";

/** CTA fixo no celular: aparece após o hero e some na seção de agendamento e no rodapé. */
export function MobileBookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const hide = [document.getElementById("agendar"), document.querySelector("footer")].filter(Boolean) as Element[];
    const state = { pastHero: false, blocked: new Set<Element>() };
    const update = () => setVisible(state.pastHero && state.blocked.size === 0);

    const heroIO = new IntersectionObserver(([e]) => {
      state.pastHero = !e.isIntersecting;
      update();
    }, { rootMargin: "-40% 0px 0px 0px" });
    const hideIO = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? state.blocked.add(e.target) : state.blocked.delete(e.target);
      update();
    });
    if (hero) heroIO.observe(hero);
    hide.forEach((el) => hideIO.observe(el));
    return () => {
      heroIO.disconnect();
      hideIO.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t hairline bg-ink/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-2">
        <BookingButton className="flex-1">Agendar horário</BookingButton>
        <a href={whatsappHref()} target="_blank" rel="noopener" aria-label="Falar no WhatsApp" className="flex size-12 shrink-0 items-center justify-center border hairline text-bone">
          <WhatsappIcon />
        </a>
      </div>
    </div>
  );
}
