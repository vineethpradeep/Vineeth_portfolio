// Sends one anonymous page view to /api/track (see api/track.js). No cookies.
// Visits from a device where "Don't count my visits" was ticked on /dashboard are skipped.
export const NO_TRACK_KEY = "vp-no-track";

let sent = false;

export function trackView() {
  if (sent) return;
  sent = true;
  try {
    if (localStorage.getItem(NO_TRACK_KEY) === "1") return;
  } catch {
    // Storage blocked: count the visit as normal.
  }
  fetch("/api/track", {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: location.pathname, referrer: document.referrer, width: window.innerWidth }),
  }).catch(() => {});
}
