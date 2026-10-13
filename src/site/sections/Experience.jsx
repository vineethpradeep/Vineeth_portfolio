import { useLayoutEffect, useRef, useState } from "react";
import { achievements, experience, leadership } from "../content";
import { gsap, reducedMotion } from "../motion";
import { Chip, CvButton, SplitReveal } from "../ui";

// Career history from the CV as an accordion, with achievements and leadership focus alongside.
export default function Experience() {
  const root = useRef(null);
  const [open, setOpen] = useState(0);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      // The white panel rises over the dark Portfolio section from rounded corners.
      gsap.fromTo(
        root.current,
        { clipPath: "inset(0% 3% 0% 3% round 48px 48px 0px 0px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true },
        }
      );
      gsap.from(".exp-row", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-list", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="exp-wrap">
      <section className="exp" id="experience" ref={root}>
        <div className="exp-head">
          <Chip index="07">Experience</Chip>
          <SplitReveal text="13+ years of *shipping* real products." className="exp-heading" />
          <CvButton />
        </div>

        <ol className="exp-list">
          {experience.map((job, i) => {
            const isOpen = open === i;
            return (
              <li key={`${job.company}-${job.date}`} className={`exp-row ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    className="exp-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`exp-panel-${i}`}
                    data-cursor={isOpen ? "Close" : "Open"}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="exp-index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="exp-date">{job.date}</span>
                    <span className="exp-role">{job.role}</span>
                    <span className="exp-company">
                      {job.company}
                      <small>{job.place}</small>
                    </span>
                    <span className="exp-plus" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`exp-panel-${i}`} className="exp-panel" role="region" aria-label={job.role} aria-hidden={!isOpen}>
                  <div>
                    <div className="exp-detail">
                      <ul className="exp-points">
                        {job.points.map((point) => (
                          <li key={point.slice(0, 40)}>{point}</li>
                        ))}
                      </ul>
                      <ul className="tech-tags" aria-label="Technologies">
                        {job.tech.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="exp-extra">
          <div>
            <h3 className="label exp-extra-title">Key achievements</h3>
            <ul className="exp-achievements">
              {achievements.map((a) => (
                <li key={a.title}>
                  <strong>{a.title}</strong>
                  {a.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label exp-extra-title">Leadership focus</h3>
            <ul className="exp-leadership">
              {leadership.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
