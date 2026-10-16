import { useEffect } from "react";
import "./site.css";
import { ScrollTrigger, startSmoothScroll } from "./motion";
import { Cursor, ScrollProgress } from "./ui";
import { trackView } from "./track";
import Intro from "./sections/Intro";
import { ConsultationProvider } from "./sections/Consultation";
import { CvProvider } from "./sections/CvModal";
import Statement from "./sections/Statement";
import Current from "./sections/Current";
import Stack from "./sections/Stack";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Work from "./sections/Work";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Closing from "./sections/Closing";

export default function Site() {
  useEffect(() => {
    // Always start at the top: the intro and hero are scroll-driven, so a restored position looks broken.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    trackView();
    const stop = startSmoothScroll();
    // Fonts and images change section heights after first paint.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      stop();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <ConsultationProvider>
      <CvProvider>
      <Intro />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Statement />
        <Current />
        <Services />
        <Stack />
        <Work />
        <Projects />
        <Experience />
        <Closing />
      </main>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      </CvProvider>
    </ConsultationProvider>
  );
}
