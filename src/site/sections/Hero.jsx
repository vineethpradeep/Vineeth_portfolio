import { useLayoutEffect, useRef } from "react";
import { gallery, profile } from "../content";
import { gsap, reducedMotion } from "../motion";
import { Accent, BookLink, BrowserFrame, CvButton, StatusTag } from "../ui";

const LETTERS = profile.wordmark.split("");

// Where each letter starts, as vw / vh offsets from the centre and degrees of rotation.
const SCATTER = [
  { x: -25, y: 2, r: -32 },
  { x: -9, y: 12, r: 36 },
  { x: 2, y: -6, r: -14 },
  { x: 16, y: -2, r: 14 },
  { x: 6, y: -28, r: 8 },
  { x: 31, y: 24, r: -22 },
  { x: -30, y: -18, r: 18 },
];

// The arch the letters settle into, spaced by each letter's measured width.
let widths = LETTERS.map(() => 1);
function measure(letters) {
  widths = letters.map((el) => el.offsetWidth);
}
function arc(i) {
  const gap = widths[0] * 0.08;
  const total = widths.reduce((a, b) => a + b, 0) + gap * (LETTERS.length - 1);
  // When the word is wider than the screen, shrink letters and spacing together so the arch fits.
  const fit = Math.min(1, (window.innerWidth * 0.86) / total);
  const centre = (widths.slice(0, i).reduce((a, b) => a + b + gap, 0) + widths[i] / 2 - total / 2) * fit;
  const t = centre / ((total / 2) * fit);
  const lift = Math.min(vh(13), vw(11));
  return { s: fit, x: centre, y: (t * t - 1) * lift + vh(4), r: t * 26 };
}

// On narrow screens the scatter is squeezed into the top half, clear of the statement.
const scatterY = (i) => (window.innerWidth < 900 ? SCATTER[i].y * 0.5 - 12 : SCATTER[i].y);

const vw = (v) => (v * window.innerWidth) / 100;
const vh = (v) => (v * window.innerHeight) / 100;

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ring = root.current.querySelector(".ring-inner");
    const setRadius = () => {
      const card = ring.querySelector(".ring-card");
      const radius = (card.offsetWidth * gallery.length) / (2 * Math.PI) * 1.12;
      ring.style.setProperty("--radius", `${radius}px`);
    };
    setRadius();
    window.addEventListener("resize", setRadius);

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".hero-letter");
      measure(letters);

      if (reducedMotion()) {
        letters.forEach((el, i) => gsap.set(el, { xPercent: -50, yPercent: -50, x: arc(i).x, y: arc(i).y, rotation: arc(i).r, scale: arc(i).s }));
        gsap.set(".ring", { y: vh(30), scale: 0.6 });
        gsap.set(".hero-dark", { clipPath: "circle(0% at 50% 62%)" });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onRefreshInit: () => measure(letters),
        },
      });

      tl.to(".hero-intro, .hero-status, .hero-scroll", { autoAlpha: 0, y: -40, duration: 0.12 }, 0);
      letters.forEach((el, i) => {
        tl.fromTo(
          el,
          { xPercent: -50, yPercent: -50, x: () => vw(SCATTER[i].x), y: () => vh(scatterY(i)), rotation: SCATTER[i].r, scale: 1 },
          { x: () => arc(i).x, y: () => arc(i).y, rotation: arc(i).r, scale: () => arc(i).s, ease: "power2.inOut", duration: 0.32 },
          0
        );
      });
      tl.fromTo(
        ".hero-dark",
        { clipPath: "circle(0% at 50% 62%)" },
        { clipPath: "circle(80% at 50% 50%)", duration: 0.24, ease: "power2.in" },
        0.28
      )
        .to(".hero-letter", { color: "#ffffff", duration: 0.08 }, 0.36)
        .to(".hero-label", { color: "#ffffff", duration: 0.1 }, 0.42)
        .to(".hero-word", { y: () => -vh(70), autoAlpha: 0, duration: 0.22, ease: "power1.in" }, 0.5)
        .fromTo(".ring", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.18)
        .fromTo(".ring", { y: () => vh(28), scale: 0.5 }, { y: 0, scale: 1.2, duration: 0.78 }, 0.22)
        .fromTo(ring, { rotationY: 0 }, { rotationY: -320, duration: 1 }, 0);

      // Letters drift with the pointer before the scroll takes over.
      const drift = (e) => {
        const dx = e.clientX / window.innerWidth - 0.5;
        const dy = e.clientY / window.innerHeight - 0.5;
        gsap.to(".hero-word", { xPercent: dx * 2, yPercent: dy * 2, duration: 1.2, ease: "power3.out" });
      };
      window.addEventListener("pointermove", drift);
      return () => window.removeEventListener("pointermove", drift);
    }, root);

    return () => {
      window.removeEventListener("resize", setRadius);
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-pin">
        <div className="hero-dark" aria-hidden="true" />
        <h1 className="sr-only">
          {profile.name}, {profile.role}
        </h1>
        <StatusTag className="hero-status" />

        <div className="hero-word" aria-hidden="true">
          {LETTERS.map((letter, i) => (
            <span key={i} className="hero-letter">
              {letter}
            </span>
          ))}
        </div>

        <div className="ring" aria-hidden="true">
          <div className="ring-inner">
            {gallery.map((item, i) => (
              <div
                key={item.title}
                className="ring-card"
                style={{ transform: `rotateY(${(360 / gallery.length) * i}deg) translateZ(var(--radius))` }}
              >
                <BrowserFrame src={item.image} url={item.url} loading={i < 4 ? "eager" : "lazy"} />
              </div>
            ))}
          </div>
        </div>

        <div className="hero-intro">
          <p className="hero-role">
            {profile.role}
            <span>{profile.roleDetail}</span>
          </p>
          <p className="hero-copy">
            <Accent text={profile.heroStatement} />
          </p>
          <div className="hero-actions">
            <BookLink />
            <CvButton tone="outline" />
          </div>
        </div>

        <p className="hero-scroll label" aria-hidden="true">
          <span className="hero-scroll-line" />
          Scroll
        </p>
        <p className="hero-label hero-label-right">
          {profile.role}
        </p>
      </div>
    </section>
  );
}
