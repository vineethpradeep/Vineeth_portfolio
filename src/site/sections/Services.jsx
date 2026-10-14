import { useLayoutEffect, useRef, useState } from "react";
import { gallery, overviews, services } from "../content";
import { gsap, reducedMotion, ScrollTrigger } from "../motion";
import { BookLink, BrowserFrame, Chip, Marquee } from "../ui";

// Lanes the fly-through images travel in: left position (vw) and tilt.
const LANES = [
  { left: 38, r: -4 },
  { left: 6, r: 12 },
  { left: 70, r: -10 },
  { left: 22, r: 6 },
  { left: 58, r: 14 },
  { left: 2, r: -8 },
  { left: 76, r: 4 },
  { left: 44, r: -12 },
];

// Featured portfolio projects fly through first (newest first), then the rest of the gallery.
const pool = [...overviews, ...gallery.filter((g) => !overviews.some((o) => o.url === g.url))];
const flyers = LANES.map((lane, i) => ({ ...lane, ...pool[i % pool.length] }));

export default function Services() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setActive(Math.min(services.length - 1, Math.floor(self.progress * services.length))),
      });

      if (reducedMotion()) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
      });
      tl.fromTo(".services .marquee", { xPercent: 0 }, { xPercent: -25, duration: 1 }, 0);
      // The white panel rises over the dark About section from rounded corners.
      gsap.fromTo(
        ".services-pin",
        { clipPath: "inset(0% 3% 0% 3% round 48px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true },
        }
      );
      gsap.utils.toArray(".flyer").forEach((el, i) => {
        tl.fromTo(
          el,
          { y: () => window.innerHeight * 1.1, rotation: LANES[i].r },
          { y: () => -window.innerHeight * 0.9, rotation: -LANES[i].r, duration: 0.32 },
          0.12 + (i / LANES.length) * 0.62
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="services" id="services" ref={root} style={{ height: `${(services.length + 1) * 100}vh` }}>
      <div className="services-pin">
        <Marquee text="Vision to digital" />
        <h2 className="sr-only">Approach: business vision to digital, end to end</h2>

        <div className="flyers" aria-hidden="true">
          {flyers.map((f, i) => (
            <BrowserFrame key={i} className="flyer" src={f.image} url={f.url} style={{ left: `${f.left}vw` }} />
          ))}
        </div>

        <div className="service">
          <Chip index="03" className="service-chip">
            Approach · Step {active + 1} of {services.length}
          </Chip>
          <div className="service-titles">
            <ul style={{ transform: `translateY(-${(active * 100) / services.length}%)` }}>
              {services.map((s, i) => (
                <li key={s.title} aria-current={i === active ? "true" : undefined}>
                  <h3>{s.title}</h3>
                </li>
              ))}
            </ul>
          </div>
          <p key={active} className="service-text">
            {services[active].text}
          </p>
        </div>

        <ol className="service-rail" aria-hidden="true">
          {services.map((s, i) => (
            <li key={s.title} className={i === active ? "is-active" : i < active ? "is-done" : ""}>
              <span>0{i + 1}</span>
            </li>
          ))}
        </ol>
        <p className="label services-hint">Keep scrolling</p>
        <BookLink className="services-book" />
      </div>
    </section>
  );
}
