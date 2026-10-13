import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { navLinks, profile } from "../content";
import { lockScroll, ScrollTrigger } from "../motion";
import { BookLink, CvButton, HashLink } from "../ui";

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/London",
});

function useLondonTime() {
  const [time, setTime] = useState(() => timeFormat.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(timeFormat.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef(null);
  const time = useLondonTime();

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Highlight the section currently in the middle of the screen.
  useLayoutEffect(() => {
    const triggers = navLinks.map((link) =>
      ScrollTrigger.create({
        trigger: link.href,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => self.isActive && setActive(link.href),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      <header className="nav">
        <HashLink href="#top" className="nav-logo" aria-label={`${profile.name}, back to top`}>
          {profile.wordmark}
        </HashLink>

        <div className="nav-end">
          <CvButton className="nav-cv" tone="outline" label="CV" />
          <span className="nav-time">
            <time>{time}</time>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className={`nav-plus ${open ? "is-open" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </header>

      <nav className="nav-pill" aria-label="Sections">
        {navLinks.map((link) => (
          <HashLink
            key={link.href}
            href={link.href}
            className={active === link.href ? "is-active" : ""}
            aria-current={active === link.href ? "location" : undefined}
          >
            {link.label}
          </HashLink>
        ))}
      </nav>

      <div id="site-menu" data-lenis-prevent className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open} inert={open ? undefined : ""}>
        <nav className="menu-links" aria-label="Main">
          {navLinks.map((link, i) => (
            <HashLink key={link.href} href={link.href} className="menu-link" onNavigate={close}>
              <span className="menu-index">0{i + 1}</span>
              <span className="roll" data-text={link.label}>
                <span>{link.label}</span>
              </span>
            </HashLink>
          ))}
        </nav>
        <div className="menu-meta">
          <p>{profile.name}</p>
          <p>{profile.role}</p>
          <p>{profile.location}</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <div className="menu-actions">
            <BookLink className="menu-book" tone="light" onClick={() => setOpen(false)} />
            <CvButton tone="outline-light" onClick={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
}
