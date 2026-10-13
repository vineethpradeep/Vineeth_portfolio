import { useLayoutEffect, useRef, useState } from "react";
import { work } from "../content";
import { gsap, reducedMotion } from "../motion";
import { BrowserFrame, Chip, SplitReveal } from "../ui";
import WorkModal from "./WorkModal";

const COLUMNS = 4;
const SPEEDS = [-14, 10, -22, 6];
// Size and offset per tile so the grid reads as scattered, like the template.
const TILES = [
  { w: 100, mt: 0 },
  { w: 64, mt: 18 },
  { w: 82, mt: 10 },
  { w: 70, mt: 0 },
  { w: 92, mt: 24 },
  { w: 60, mt: 8 },
];

export default function Work() {
  const root = useRef(null);
  const [selected, setSelected] = useState(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".work-col").forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: -SPEEDS[i] / 2 },
          {
            yPercent: SPEEDS[i] / 2,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const columns = Array.from({ length: COLUMNS }, (_, c) => work.filter((_, i) => i % COLUMNS === c));

  return (
    <section className="work" id="work" ref={root}>
      <div className="work-head">
        <Chip index="05">Selected work</Chip>
        <SplitReveal text="20+ projects, built *end to end.*" className="work-heading" />
        <p className="label">2018 — 2026</p>
      </div>
      <div className="work-grid">
        {columns.map((items, c) => (
          <div key={c} className="work-col">
            {items.map((item, i) => {
              const tile = TILES[(c * 2 + i) % TILES.length];
              return (
                <button
                  key={item.title}
                  type="button"
                  className="work-item"
                  aria-haspopup="dialog"
                  data-cursor="View"
                  onClick={() => setSelected(item)}
                  style={{ width: `${tile.w}%`, marginTop: `${tile.mt}%`, marginLeft: c % 2 ? "auto" : 0 }}
                >
                  <BrowserFrame className="work-media" src={item.image} url={item.url} />
                  <span className="work-title roll" data-text={item.title}>
                    <span>{item.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <WorkModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
