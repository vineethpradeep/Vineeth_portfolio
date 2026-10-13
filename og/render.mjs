// Renders the social images with headless Chrome:
//   node og/render.mjs          -> public/og-image.png        (1200x630, link previews)
//   node og/render.mjs banner   -> public/linkedin-banner.png (1584x396, LinkedIn cover)
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const jobs = {
  og: { src: "og-card.html", out: "og-image.png", size: "1200,630" },
  banner: { src: "linkedin-banner.html", out: "linkedin-banner.png", size: "1584,396" },
};
const job = jobs[process.argv[2] || "og"];
execFileSync(chrome, [
  "--headless=new",
  "--hide-scrollbars",
  `--window-size=${job.size}`,
  "--force-device-scale-factor=1",
  "--virtual-time-budget=8000",
  `--screenshot=${path.join(here, "../public", job.out)}`,
  `file://${path.join(here, job.src)}`,
], { stdio: "ignore" });
console.log(`Wrote public/${job.out}`);
