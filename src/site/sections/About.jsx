import { useLayoutEffect, useRef } from "react";
import { profile, stats } from "../content";
import { gsap, reducedMotion } from "../motion";
import { Chip, CountUp, SplitReveal } from "../ui";

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 48,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-body", start: "top 75%" },
      });
      gsap.from(".about-signature", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".about-signature", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={root}>
      <div className="about-pin">
        <Chip index="01" tone="light" className="about-corner about-corner-tl">
          About me
        </Chip>
        <p className="label about-corner about-corner-tr">{profile.name}</p>

        <div className="about-body">
          <SplitReveal text={profile.aboutTitle} className="about-title" />
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 30)} className="about-text about-reveal">
              {paragraph}
            </p>
          ))}

          <h3 className="label about-why-title about-reveal">Why companies hire me</h3>
          <ul className="about-why about-reveal">
            {profile.whyHire.map((item, i) => (
              <li key={item.title}>
                <span className="about-why-index">0{i + 1}</span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <p className="about-signature" aria-hidden="true">
            Vineeth
          </p>
          <dl className="about-stats about-reveal">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="label about-corner about-corner-br">{profile.tagline}</p>
      </div>
    </section>
  );
}
