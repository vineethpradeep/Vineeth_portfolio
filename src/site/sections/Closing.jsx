import { useLayoutEffect, useRef } from "react";
import { gallery, navLinks, profile } from "../content";
import { gsap, reducedMotion } from "../motion";
import { ArrowIcon, BookLink, BrowserFrame, Chip, CvButton, HashLink, StatusTag } from "../ui";
import { useCv } from "./CvModal";

// Resting tilt and drop height for each card in the closing strip.
const STRIP = gallery.map((item, i) => ({ ...item, r: [-6, 4, -3, 7, -8, 3, 9, -4, 5, -7][i % 10] }));

export default function Closing() {
  const root = useRef(null);
  const openCv = useCv();

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-title-line", {
        yPercent: 110,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".cta-title", start: "top 80%" },
      });
      gsap.from(".strip-card", {
        y: () => -window.innerHeight * 0.9,
        rotation: () => gsap.utils.random(-40, 40),
        stagger: { each: 0.06, from: "random" },
        duration: 1.3,
        ease: "bounce.out",
        scrollTrigger: { trigger: ".strip", start: "top 95%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const nudge = (e, rest) => {
    if (reducedMotion()) return;
    gsap.to(e.currentTarget, {
      rotation: rest + gsap.utils.random(-14, 14),
      y: gsap.utils.random(-46, -18),
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
      onComplete() {
        gsap.to(this.targets()[0], { rotation: rest, y: 0, duration: 1.2, ease: "elastic.out(1, 0.4)" });
      },
    });
  };

  return (
    <div ref={root}>
      <section className="cta" id="contact">
        <Chip index="08" className="cta-corner-left">
          Let&apos;s talk
        </Chip>
        <StatusTag className="cta-corner-right" />
        <h2 className="cta-title">
          <span className="cta-title-mask">
            <span className="cta-title-line">Let’s build</span>
          </span>
          <span className="cta-title-mask">
            <span className="cta-title-line">
              what’s <em className="accent">next</em>
            </span>
          </span>
        </h2>
        <div className="cta-actions">
          <BookLink />
          <CvButton tone="outline" />
        </div>
        <div className="strip" aria-hidden="true">
          {STRIP.map((card, i) => (
            <div
              key={i}
              className="strip-card"
              style={{ transform: `rotate(${card.r}deg)` }}
              onPointerEnter={(e) => nudge(e, card.r)}
            >
              <BrowserFrame src={card.image} url={card.url} />
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <HashLink href="#top" className="footer-logo">
            {profile.wordmark}
          </HashLink>
          <nav className="footer-nav" aria-label="Footer">
            {navLinks.map((link) => (
              <HashLink key={link.href} href={link.href}>
                {link.label}
              </HashLink>
            ))}
          </nav>
        </div>
        <div className="footer-main">
          <a className="footer-talk" href={`mailto:${profile.email}`} data-cursor="Email">
            Talk to me now <ArrowIcon />
          </a>
          <div className="footer-col">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <button type="button" className="footer-link" onClick={openCv}>
              View &amp; download CV
            </button>
            <HashLink href="#work">Portfolio</HashLink>
          </div>
          <div className="footer-col">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <p>{profile.role}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Business · Full-stack · Cloud</p>
        </div>
        <p className="footer-word" aria-hidden="true">
          {profile.wordmark.split("").map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </p>
      </footer>
    </div>
  );
}
