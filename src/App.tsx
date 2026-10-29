import { About } from "./components/sections/About";
import { Booking } from "./components/sections/Booking";
import { Experience } from "./components/sections/Experience";
import { Footer } from "./components/sections/Footer";
import { Gallery } from "./components/sections/Gallery";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { Location } from "./components/sections/Location";
import { Marquee } from "./components/sections/Marquee";
import { MobileBookingBar } from "./components/sections/MobileBookingBar";
import { Reviews } from "./components/sections/Reviews";
import { Services } from "./components/sections/Services";
import { Team } from "./components/sections/Team";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  useReveal();
  return (
    <>
      <a href="#conteudo" className="sr-only z-[70] bg-gold px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Experience />
        <Gallery />
        <Team />
        <Reviews />
        <Booking />
        <Location />
      </main>
      <Footer />
      <MobileBookingBar />
    </>
  );
}
