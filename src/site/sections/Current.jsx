import { useLayoutEffect, useRef } from "react";
import { currentProjects } from "../content";
import { gsap, reducedMotion } from "../motion";
import { BrowserFrame, Chip, DigitalButton, SplitReveal } from "../ui";

// Shape of a QBuddy lesson plan, shown instead of a screenshot for the AI project.
const PLAN_PREVIEW = `{
  "lessonIntent": "place-value",
  "steps": [
    { "scene": "abacus", "goal": "count-to-ten" },
    { "scene": "quiz",   "goal": "check-understanding" }
  ],
  "guidance": "proposed by model",
  "validated": "by application rules"
}`;

function TerminalPanel() {
  return (
    <span className="frame frame-dark terminal">
      <span className="frame-bar" aria-hidden="true">
        <span className="frame-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="frame-url">qbuddy · lesson-plan.json</span>
      </span>
      <pre className="terminal-body" aria-label="Illustrative lesson plan structure">
        <code>{PLAN_PREVIEW}</code>
        <span className="terminal-caret" aria-hidden="true" />
      </pre>
    </span>
  );
}

export default function Current() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".current-card", {
        y: 60,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".current-grid", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="current" id="current" ref={root}>
      <div className="current-head">
        <Chip index="02">Currently leading</Chip>
        <SplitReveal text="What I'm *building* now." className="current-heading" />
        <p className="label">QTHE · United Kingdom</p>
      </div>

      <div className="current-grid">
        {currentProjects.map((project) => (
          <article key={project.title} className="current-card">
            {project.image ? (
              <BrowserFrame src={project.image} url={project.url} alt={`${project.title} homepage`} />
            ) : (
              <TerminalPanel />
            )}
            <div className="current-body">
              <p className="label current-role">{project.role}</p>
              <h3 className="current-title">{project.title}</h3>
              <ul className="current-points">
                {project.points.map((point) => (
                  <li key={point.slice(0, 30)}>{point}</li>
                ))}
              </ul>
              <ul className="tech-tags" aria-label="Technologies">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {project.url ? (
                <DigitalButton label="Visit live site" href={project.url} cursor="Visit" className="current-visit" />
              ) : (
                <p className="current-status">
                  <span className="btn-status" aria-hidden="true" />
                  Tutor workflows at preview stage
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
