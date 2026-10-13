import { createElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import { profile } from "./content";
import { gsap, reducedMotion, ScrollTrigger, scrollToHash } from "./motion";
import { useConsultation } from "./sections/Consultation";
import { useCv } from "./sections/CvModal";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>[]";

// Matrix-style decode: characters cycle through random glyphs and lock in left to right.
export function scrambleTo(el, text, duration = 450) {
  if (!el) return;
  cancelAnimationFrame(el._scramble);
  if (reducedMotion()) {
    el.textContent = text;
    return;
  }
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const locked = Math.floor(p * text.length);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      out += text[i] === " " || i < locked ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) el._scramble = requestAnimationFrame(tick);
  };
  el._scramble = requestAnimationFrame(tick);
}

const scrambleLabel = (e) => {
  const label = e.currentTarget.querySelector(".btn-label");
  if (label) scrambleTo(label, label.dataset.text);
};

// Diagonal "external" arrow drawn as SVG: the ↗ character is missing from the site fonts, so phones
// fell back to a system glyph (or an emoji on iOS).
export function ArrowIcon({ className = "" }) {
  return (
    <svg className={`arrow-icon ${className}`} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

// Rectangular "terminal" button used for every primary action. Renders a link when given `href`;
// external links always open in a new tab.
export function DigitalButton({ label, href, tone = "dark", className = "", cursor, ...rest }) {
  const Tag = href ? "a" : "button";
  const linkProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { type: rest.type || "button" };
  return (
    <Tag
      className={`btn btn-${tone} ${className}`}
      data-cursor={cursor}
      onPointerEnter={scrambleLabel}
      onFocus={scrambleLabel}
      {...linkProps}
      {...rest}
    >
      <span className="btn-status" aria-hidden="true" />
      <span key={label} className="btn-label" data-text={label}>
        {label}
      </span>
      <span className="btn-arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
    </Tag>
  );
}

// Opens the hire-me form. `tone="light"` for dark backgrounds.
export function BookLink({ className = "", label = profile.cta, tone = "dark", onClick }) {
  const openConsultation = useConsultation();
  return (
    <DigitalButton
      label={label}
      tone={tone}
      className={className}
      cursor="Hire"
      aria-haspopup="dialog"
      onClick={() => {
        onClick?.();
        openConsultation();
      }}
    />
  );
}

// Opens the CV preview modal.
export function CvButton({ className = "", tone = "outline", label = "View CV", onClick }) {
  const openCv = useCv();
  return (
    <DigitalButton
      label={label}
      tone={tone}
      className={className}
      cursor="CV"
      aria-haspopup="dialog"
      onClick={() => {
        onClick?.();
        openCv();
      }}
    />
  );
}

// Live status line, e.g. "Taking new projects", with a blinking block.
export function StatusTag({ className = "" }) {
  return (
    <p className={`status-tag ${className}`}>
      <span className="btn-status" aria-hidden="true" />
      {profile.availability}
    </p>
  );
}

// Small numbered section label, e.g. "(02) Approach".
export function Chip({ index, children, tone = "dark", className = "" }) {
  return (
    <p className={`chip chip-${tone} ${className}`}>
      {index && <span className="chip-index">({index})</span>}
      {children}
    </p>
  );
}

export function HashLink({ href, children, className = "", onNavigate, ...rest }) {
  const onClick = (e) => {
    e.preventDefault();
    if (!onNavigate) {
      scrollToHash(href);
      return;
    }
    // Closing the menu releases its scroll lock on the next render; scrolling before that is ignored.
    onNavigate();
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(href)));
  };
  return (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

// Text wrapped in *asterisks* renders as a red script accent.
export function Accent({ text }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") ? (
      <em key={i} className="accent">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    )
  );
}

// Heading that reveals word by word from behind a mask when it scrolls into view.
export function SplitReveal({ as = "h2", text, className = "" }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll(".split-word > span"), {
        yPercent: 110,
        rotate: 4,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, [text]);

  const words = text.split(/(\*[^*]+\*|\s+)/).filter((w) => w && !/^\s+$/.test(w));
  return createElement(
    as,
    { ref, className: `split ${className}`, "aria-label": text.replace(/\*/g, "") },
    words.map((word, i) => (
      <span key={i} className="split-word" aria-hidden="true">
        <span>{word.startsWith("*") ? <em className="accent">{word.slice(1, -1)}</em> : word}</span>
      </span>
    ))
  );
}

// Counts up to the number in `value` (keeping any suffix such as "+") when scrolled into view.
export function CountUp({ value }) {
  const ref = useRef(null);
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");

  useLayoutEffect(() => {
    if (Number.isNaN(target) || reducedMotion()) return;
    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: target,
      duration: 1.6,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${Math.round(counter.n)}${suffix}`;
      },
    });
    const st = ScrollTrigger.create({ trigger: ref.current, start: "top 90%", once: true, onEnter: () => tween.play() });
    ref.current.textContent = `0${suffix}`;
    return () => {
      st.kill();
      tween.kill();
    };
  }, [target, suffix]);

  return <span ref={ref}>{value}</span>;
}

// Infinite marquee that speeds up and skews with scroll velocity.
export function Marquee({ text, className = "" }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const track = ref.current.querySelector(".marquee-track");
    const loop = gsap.to(track, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
    const skew = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3.out" });
    let velocity = 0;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => (velocity = self.getVelocity()),
    });
    // Ease the boost back down every frame so the marquee settles after a fast scroll.
    const tick = () => {
      velocity *= 0.9;
      loop.timeScale(1 + Math.min(Math.abs(velocity) / 600, 5));
      skew(gsap.utils.clamp(-12, 12, velocity / -250));
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      loop.kill();
      st.kill();
    };
  }, []);

  const items = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="marquee-item">
      {text}
      <span className="marquee-dot" aria-hidden="true" />
    </span>
  ));
  return (
    <div ref={ref} className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {items}
        {items}
      </div>
    </div>
  );
}

// The standard way every project screenshot is shown: a browser window with its domain.
// Built from spans so it can sit inside buttons and links.
export function BrowserFrame({ src, url, alt = "", tone = "light", loading = "lazy", className = "", style }) {
  const host = url ? new URL(url).hostname.replace(/^www\./, "") : "";
  return (
    <span className={`frame frame-${tone} ${className}`} style={style}>
      <span className="frame-bar" aria-hidden="true">
        <span className="frame-dots">
          <i />
          <i />
          <i />
        </span>
        {host && <span className="frame-url">{host}</span>}
      </span>
      <span className="frame-view">
        <img src={src} alt={alt} loading={loading} />
      </span>
    </span>
  );
}

// Crosshair cursor with a live X/Y readout; over anything marked data-cursor it shows a decoding label.
export function Cursor() {
  const [pos, setPos] = useState(null);
  const [label, setLabel] = useState("");
  const labelRef = useRef(null);

  useEffect(() => {
    const track = (x, y, el) => {
      setPos({ x, y });
      const target = el?.closest?.("[data-cursor]");
      setLabel(target ? target.dataset.cursor : "");
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      const move = (e) => track(e.clientX, e.clientY, e.target);
      const leave = () => setPos(null);
      window.addEventListener("pointermove", move);
      document.addEventListener("pointerleave", leave);
      return () => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
      };
    }

    // Touch screens have no hover pointer: the crosshair follows the finger and fades after release.
    let hideTimer;
    const touch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      clearTimeout(hideTimer);
      track(t.clientX, t.clientY, document.elementFromPoint(t.clientX, t.clientY));
    };
    const release = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setPos(null), 700);
    };
    window.addEventListener("touchstart", touch, { passive: true });
    window.addEventListener("touchmove", touch, { passive: true });
    window.addEventListener("touchend", release);
    window.addEventListener("touchcancel", release);
    return () => {
      clearTimeout(hideTimer);
      window.removeEventListener("touchstart", touch);
      window.removeEventListener("touchmove", touch);
      window.removeEventListener("touchend", release);
      window.removeEventListener("touchcancel", release);
    };
  }, []);

  useEffect(() => {
    if (label) scrambleTo(labelRef.current, `[ ${label} ]`, 380);
  }, [label]);

  if (!pos) return null;
  const at = { transform: `translate(${pos.x}px, ${pos.y}px)` };
  const coord = (n) => String(Math.round(n)).padStart(4, "0");
  // The tag sits in its own layer: the crosshair layer uses a difference blend that would recolour it.
  return (
    <>
      <div className={`cursor ${label ? "has-label" : ""}`} aria-hidden="true">
        <span className="cursor-x" style={{ transform: `translateY(${pos.y}px)` }} />
        <span className="cursor-y" style={{ transform: `translateX(${pos.x}px)` }} />
        <span className="cursor-reticle" style={at} />
        <span className="cursor-coords" style={at}>
          X {coord(pos.x)} · Y {coord(pos.y)}
        </span>
      </div>
      <div className={`cursor-tag ${label ? "is-visible" : ""}`} aria-hidden="true">
        <span style={at}>
          <span ref={labelRef} />
        </span>
      </div>
    </>
  );
}

// Thin accent bar across the top showing how far down the page you are.
export function ScrollProgress() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => ref.current && (ref.current.style.transform = `scaleX(${self.progress})`),
    });
    return () => st.kill();
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
