import { useEffect, useRef, useState } from "react";
import { brand, contact, hoursSummary, nav } from "../../content/site";
import { instagramHref, whatsappHref } from "../../lib/links";
import { BookingButton } from "../ui/BookingButton";
import { Emblem } from "../ui/Emblem";
import { InstagramIcon, WhatsappIcon } from "../ui/icons";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Emblem className="size-9 text-gold" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.15rem] tracking-[0.02em]">{brand.name}</span>
        <span className="mt-1 hidden text-[0.55rem] uppercase tracking-[0.32em] text-stone min-[420px]:block">{brand.descriptor}</span>
      </span>
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca o link da seção visível
  useEffect(() => {
    const sections = nav.map((n) => document.querySelector(n.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menu mobile: trava o scroll, fecha no Esc e mantém o foco dentro do painel
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []).concat(toggleRef.current ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1]?.focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? "border-b hairline bg-ink/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-16" : "h-[72px] lg:h-20"}`}>
        <a href="#inicio" className="relative z-10 -m-2 p-2" aria-label={`${brand.name} — voltar ao início`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className="group relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ash transition-colors hover:text-bone aria-[current]:text-bone"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-aria-[current]:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <BookingButton className="min-h-11 px-5">Agendar horário</BookingButton>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 -mr-2 flex size-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-7" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-7 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 right-0 h-px bg-bone transition-all duration-500 ease-[var(--ease-out-expo)] ${open ? "w-7 -translate-y-1.5 -rotate-45" : "w-5"}`} />
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Painel mobile (fora do header: backdrop-filter criaria outro contexto para `fixed`) */}
      <div
        id="menu-mobile"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-40 h-[100dvh] overflow-y-auto bg-ink lg:hidden"
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="container-x relative flex h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-28">
          <nav aria-label="Menu mobile">
            <ol className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.href} className="border-b hairline">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 py-4"
                    style={{ animation: `menu-in 0.8s var(--ease-out-expo) both ${80 + i * 55}ms` }}
                  >
                    <span className="eyebrow w-6 text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[2.3rem]">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-auto space-y-6" style={{ animation: "menu-in 0.8s var(--ease-out-expo) both 420ms" }}>
            <BookingButton className="w-full">Agendar horário</BookingButton>
            <div className="flex items-center justify-between text-sm text-ash">
              <span>{hoursSummary}</span>
              <span className="flex gap-2">
                <a href={whatsappHref()} target="_blank" rel="noopener" aria-label="WhatsApp" className="flex size-11 items-center justify-center border hairline">
                  <WhatsappIcon />
                </a>
                <a href={instagramHref()} target="_blank" rel="noopener" aria-label={`Instagram @${contact.instagram}`} className="flex size-11 items-center justify-center border hairline">
                  <InstagramIcon />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
