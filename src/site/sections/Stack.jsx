import { useLayoutEffect, useRef } from "react";
import { stackGroups } from "../content";
import { gsap, reducedMotion } from "../motion";
import { Chip, scrambleTo, SplitReveal } from "../ui";

const total = stackGroups.reduce((n, g) => n + g.items.length, 0);

// Technology stack as a command-line style listing, one row per group.
export default function Stack() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".stack-row", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stack-list", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const decode = (e) => scrambleTo(e.currentTarget, e.currentTarget.dataset.text, 320);

  return (
    <section className="stack" id="stack" ref={root}>
      <div className="stack-head">
        <Chip index="04" tone="light">
          Technology stack
        </Chip>
        <SplitReveal text="The tools I *build* with." className="stack-heading" />
        <p className="label stack-total">{total} technologies</p>
      </div>

      <p className="stack-prompt" aria-hidden="true">
        <span>vineeth@portfolio</span>:~$ stack --list --group
      </p>

      <ol className="stack-list">
        {stackGroups.map((group, i) => (
          <li key={group.title} className="stack-row">
            <h3 className="stack-group">
              <span className="stack-index">{String(i + 1).padStart(2, "0")}</span>
              {group.title}
              <span className="stack-count">[{group.items.length}]</span>
            </h3>
            <ul className="stack-items">
              {group.items.map((item) => (
                <li key={item} data-text={item} onPointerEnter={decode}>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
