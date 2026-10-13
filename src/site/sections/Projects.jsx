import { useLayoutEffect, useRef, useState } from "react";
import { overviews } from "../content";
import { gsap, reducedMotion, ScrollTrigger, scrollToY } from "../motion";
import { BrowserFrame, DigitalButton, Marquee } from "../ui";

// Pinned portfolio walkthrough (the template's testimonials slot): scrolling steps through each project.
export default function Projects() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setProgress(self.progress);
          setActive(Math.min(overviews.length - 1, Math.floor(self.progress * overviews.length)));
        },
      });
      if (reducedMotion()) return;
      // The dark panel opens out from rounded corners as it scrolls in.
      gsap.fromTo(
        ".projects-pin",
        { clipPath: "inset(0% 3% 0% 3% round 48px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  // Tabs jump to the middle of that project's scroll segment.
  const goTo = (i) => {
    const section = root.current;
    const travel = section.offsetHeight - window.innerHeight;
    scrollToY(section.offsetTop + ((i + 0.5) / overviews.length) * travel);
  };

  const current = overviews[active];

  return (
    <section className="projects" id="projects" ref={root} style={{ height: `${(overviews.length + 1) * 100}vh` }}>
      <div className="projects-pin">
        <div className="projects-glow" aria-hidden="true" />

        <Marquee text="Portfolio" className="marquee-light" />
        <h2 className="sr-only">Portfolio: from vision to delivered</h2>

        <div className="projects-stage">
          <div className="projects-preview">
            {overviews.map((p, i) => (
              <BrowserFrame
                key={p.title}
                src={p.image}
                url={p.url}
                alt={i === active ? `${p.title} homepage` : ""}
                tone="dark"
                className={i === active ? "is-active" : i < active ? "is-past" : ""}
              />
            ))}
          </div>

          <article key={active} className="projects-info" aria-live="polite">
            <p className="label projects-sector">{current.sector}</p>
            <h3 className="projects-title">{current.title}</h3>
            <dl className="projects-facts">
              <div>
                <dt className="label">The vision</dt>
                <dd>{current.vision}</dd>
              </div>
              <div>
                <dt className="label">What I delivered</dt>
                <dd>{current.text}</dd>
              </div>
            </dl>
            <DigitalButton label="Visit live site" href={current.url} tone="light" cursor="Visit" />
          </article>
        </div>

        <ol className="projects-tabs" aria-label="Projects">
          {overviews.map((p, i) => {
            const fill = Math.min(1, Math.max(0, progress * overviews.length - i));
            return (
              <li key={p.title}>
                <button
                  type="button"
                  className={i === active ? "is-active" : ""}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => goTo(i)}
                >
                  <span className="projects-tab-bar">
                    <span style={{ transform: `scaleX(${fill})` }} />
                  </span>
                  <span className="projects-tab-label">
                    {p.tab || p.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
