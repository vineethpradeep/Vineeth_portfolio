// Renders og/og-card.html to public/og-image.png at 1200x630 with headless Chrome.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
execFileSync(chrome, [
  "--headless=new",
  "--hide-scrollbars",
  "--window-size=1200,630",
  "--force-device-scale-factor=1",
  "--virtual-time-budget=8000",
  `--screenshot=${path.join(here, "../public/og-image.png")}`,
  `file://${path.join(here, "og-card.html")}`,
], { stdio: "ignore" });
console.log("Wrote public/og-image.png");
