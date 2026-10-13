import { useLayoutEffect, useRef, useState } from "react";
import { profile } from "../content";
import { gsap, lockScroll, reducedMotion } from "../motion";

const SEEN_KEY = "vp-intro-seen";

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

// Opening screen: a 0–100 counter and the wordmark, then the panel lifts away. Shown once per visit.
export default function Intro() {
  const root = useRef(null);
  const [done, setDone] = useState(() => reducedMotion() || alreadySeen());

  useLayoutEffect(() => {
    if (done) return;
    lockScroll(true);
    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            try {
              sessionStorage.setItem(SEEN_KEY, "1");
            } catch {
              // Private mode: the intro simply shows again next time.
            }
            lockScroll(false);
            setDone(true);
          },
        })
        .from(".intro-letter", { yPercent: 110, stagger: 0.06, duration: 0.9, ease: "power4.out" })
        .to(
          counter,
          {
            n: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              const el = root.current?.querySelector(".intro-count");
              if (el) el.textContent = String(Math.round(counter.n)).padStart(3, "0");
            },
          },
          0
        )
        .to(".intro-bar span", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(".intro-letter", { yPercent: -110, stagger: 0.04, duration: 0.6, ease: "power3.in" }, 1.7)
        .to(root.current, { clipPath: "inset(0 0 100% 0 round 0 0 40px 40px)", duration: 1, ease: "power4.inOut" }, 2.1);
    }, root);
    return () => {
      ctx.revert();
      lockScroll(false);
    };
  }, [done]);

  if (done) return null;
  return (
    <div className="intro" ref={root} aria-hidden="true">
      <div className="intro-word">
        {profile.wordmark.split("").map((letter, i) => (
          <span key={i} className="intro-mask">
            <span className="intro-letter">{letter}</span>
          </span>
        ))}
      </div>
      <p className="label intro-role">{profile.tagline}</p>
      <div className="intro-foot">
        <span className="intro-count">000</span>
        <span className="intro-bar">
          <span />
        </span>
      </div>
    </div>
  );
}
