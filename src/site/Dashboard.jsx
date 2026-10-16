import { useCallback, useEffect, useMemo, useState } from "react";
import "./site.css";
import { profile } from "./content";
import { NO_TRACK_KEY } from "./track";
import { Accent, Chip, Cursor, DigitalButton } from "./ui";

// Private visitor dashboard at /dashboard. Data comes from /api/stats (password protected);
// the password is kept in this tab's sessionStorage only.
const PASS_KEY = "vp-stats-pass";

const read = (store, key) => {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
};
const write = (store, key, value) => {
  try {
    if (value === null) store.removeItem(key);
    else store.setItem(key, value);
  } catch {
    // Storage blocked: the dashboard still works for this page view.
  }
};

const regionName = (() => {
  try {
    const names = new Intl.DisplayNames(["en"], { type: "region" });
    return (code) => (code && code.length === 2 ? names.of(code) : code || "Unknown");
  } catch {
    return (code) => code || "Unknown";
  }
})();

const fmt = (n) => new Intl.NumberFormat("en-GB").format(n);
const dayLabel = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

function timeAgo(t) {
  const s = Math.max(1, Math.round((Date.now() - t) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

function useNoIndex() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Visitor insights | ${profile.name}`;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      meta.remove();
    };
  }, []);
}

function EyeIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {!open && <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />}
    </svg>
  );
}

function Login({ onSubmit, error, busy }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  return (
    <form
      className="dash-login"
      onSubmit={(e) => {
        e.preventDefault();
        if (value) onSubmit(value);
      }}
    >
      <div className="field">
        <label htmlFor="dash-pass">Password</label>
        <div className="dash-pass">
          <input
            id="dash-pass"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            className="dash-eye"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
          >
            <EyeIcon open={show} />
          </button>
        </div>
      </div>
      {error && (
        <p className="dash-error" role="alert">
          {error}
        </p>
      )}
      <DigitalButton label={busy ? "Checking…" : "Unlock dashboard"} type="submit" disabled={busy} />
    </form>
  );
}

function Tile({ label, value, note }) {
  return (
    <div className="dash-tile">
      <p className="dash-tile-label">{label}</p>
      <p className="dash-tile-value">{fmt(value)}</p>
      {note && <p className="dash-tile-note">{note}</p>}
    </div>
  );
}

// Single-series column chart of daily page views, with a per-column hover tooltip and a table view.
function DailyChart({ series }) {
  const [hover, setHover] = useState(null);
  const [asTable, setAsTable] = useState(false);
  const max = Math.max(1, ...series.map((d) => d.views));
  const ticks = [max, Math.round(max / 2), 0];
  const point = hover !== null ? series[hover] : null;

  return (
    <section className="dash-card dash-chart-card" aria-labelledby="dash-chart-title">
      <div className="dash-card-head">
        <h2 id="dash-chart-title" className="dash-card-title">
          Page views · last 30 days
        </h2>
        <button type="button" className="dash-link" onClick={() => setAsTable((v) => !v)}>
          {asTable ? "Show chart" : "Show table"}
        </button>
      </div>

      {asTable ? (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Page views</th>
                <th scope="col">Visitors</th>
              </tr>
            </thead>
            <tbody>
              {[...series].reverse().map((d) => (
                <tr key={d.date}>
                  <td>{dayLabel(d.date)}</td>
                  <td>{fmt(d.views)}</td>
                  <td>{fmt(d.visitors)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="dash-chart" onMouseLeave={() => setHover(null)}>
          <div className="dash-axis" aria-hidden="true">
            {ticks.map((t, i) => (
              <span key={i}>{fmt(t)}</span>
            ))}
          </div>
          <div className="dash-plot">
            <div className="dash-grid" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <ol className="dash-bars">
              {series.map((d, i) => (
                <li
                  key={d.date}
                  className={`dash-col ${hover === i ? "is-hover" : ""}`}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                  aria-label={`${dayLabel(d.date)}: ${d.views} page views, ${d.visitors} visitors`}
                >
                  <span className="dash-bar" style={{ height: `${(d.views / max) * 100}%` }} />
                </li>
              ))}
            </ol>
            {point && (
              <div
                className="dash-tip"
                style={{ left: `${Math.min(88, Math.max(12, ((hover + 0.5) / series.length) * 100))}%` }}
                role="status"
              >
                <strong>{dayLabel(point.date)}</strong>
                <span>
                  {fmt(point.views)} page {point.views === 1 ? "view" : "views"}
                </span>
                <span>
                  {fmt(point.visitors)} {point.visitors === 1 ? "visitor" : "visitors"}
                </span>
              </div>
            )}
          </div>
          <div className="dash-xlabels" aria-hidden="true">
            <span>{dayLabel(series[0].date)}</span>
            <span>{dayLabel(series[Math.floor(series.length / 2)].date)}</span>
            <span>Today</span>
          </div>
        </div>
      )}
    </section>
  );
}

// Ranked list with a proportional bar behind each row; the number is always shown as text.
function RankList({ title, rows, total, format = (n) => n, empty = "No data yet." }) {
  const top = rows.slice(0, 8);
  const max = Math.max(1, ...top.map((r) => r.count));
  return (
    <section className="dash-card" aria-label={title}>
      <h2 className="dash-card-title">{title}</h2>
      {top.length === 0 ? (
        <p className="dash-empty">{empty}</p>
      ) : (
        <ol className="dash-rank">
          {top.map((r) => (
            <li key={r.name}>
              <span className="dash-rank-bar" style={{ width: `${(r.count / max) * 100}%` }} aria-hidden="true" />
              <span className="dash-rank-name">{format(r.name)}</span>
              <span className="dash-rank-count">
                {fmt(r.count)}
                {total > 0 && <small>{Math.round((r.count / total) * 100)}%</small>}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default function Dashboard() {
  useNoIndex();
  const [pass, setPass] = useState(() => read(sessionStorage, PASS_KEY));
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [noTrack, setNoTrack] = useState(() => read(localStorage, NO_TRACK_KEY) === "1");

  const load = useCallback(async (password) => {
    setBusy(true);
    setError("");
    try {
      // Sent in the body (not a header) so any character in the password works.
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setError(json.error || "Could not load the stats.");
        if (res.status === 401) {
          write(sessionStorage, PASS_KEY, null);
          setPass(null);
        }
        return;
      }
      write(sessionStorage, PASS_KEY, password);
      setPass(password);
      setData(json);
    } catch {
      setError("Could not reach the stats service.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    if (pass) load(pass);
    // Load once on mount with a remembered password.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totals = useMemo(() => {
    if (!data) return null;
    const s = data.series;
    const sum = (arr, k) => arr.reduce((n, d) => n + d[k], 0);
    const today = s[s.length - 1];
    const allRefs = data.referrers.reduce((n, r) => n + r.count, 0);
    return {
      today,
      week: sum(s.slice(-7), "views"),
      month: sum(s, "views"),
      visitors30: sum(s, "visitors"),
      allRefs,
    };
  }, [data]);

  const signOut = () => {
    write(sessionStorage, PASS_KEY, null);
    setPass(null);
    setData(null);
  };

  const toggleNoTrack = () => {
    const next = !noTrack;
    write(localStorage, NO_TRACK_KEY, next ? "1" : null);
    setNoTrack(next);
  };

  return (
    <div className="dash">
      <header className="dash-top">
        <a className="nav-logo" href="/">
          {profile.wordmark}
        </a>
        <div className="dash-top-end">
          {data && (
            <>
              <DigitalButton label={busy ? "Refreshing…" : "Refresh"} tone="outline" onClick={() => load(pass)} disabled={busy} />
              <button type="button" className="dash-link" onClick={signOut}>
                Sign out
              </button>
            </>
          )}
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-intro">
          <Chip index="09">Private · Visitor insights</Chip>
          <h1 className="dash-title">
            <Accent text="Who's *viewing* your portfolio." />
          </h1>
          <p className="dash-sub">
            Anonymous visits to {profile.siteUrl.replace(/^https?:\/\//, "")}: no cookies and no IP addresses stored. Only you can see
            this page.
          </p>
        </div>

        {!data ? (
          <Login onSubmit={load} error={error} busy={busy} />
        ) : (
          <>
            <div className="dash-tiles">
              <Tile label="Visitors today" value={totals.today.visitors} note={`${fmt(totals.today.views)} page views`} />
              <Tile label="Page views · 7 days" value={totals.week} />
              <Tile label="Page views · 30 days" value={totals.month} note={`${fmt(totals.visitors30)} visitors (counted daily)`} />
              <Tile label="All-time page views" value={data.total} />
            </div>

            <DailyChart series={data.series} />

            <div className="dash-grid-cards">
              <RankList title="Where visitors came from" rows={data.referrers} total={totals.allRefs} />
              <RankList title="Countries" rows={data.countries} total={totals.allRefs} format={regionName} />
              <RankList title="Devices" rows={data.devices} total={totals.allRefs} />
              <RankList title="Pages" rows={data.pages} total={totals.allRefs} />
            </div>

            <section className="dash-card" aria-labelledby="dash-recent-title">
              <h2 id="dash-recent-title" className="dash-card-title">
                Recent visits
              </h2>
              {data.recent.length === 0 ? (
                <p className="dash-empty">No visits recorded yet.</p>
              ) : (
                <div className="dash-table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th scope="col">When</th>
                        <th scope="col">From</th>
                        <th scope="col">Location</th>
                        <th scope="col">Device</th>
                        <th scope="col">Page</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recent.map((v, i) => (
                        <tr key={`${v.t}-${i}`}>
                          <td>{timeAgo(v.t)}</td>
                          <td>{v.ref}</td>
                          <td>{[v.city, regionName(v.country)].filter(Boolean).join(", ")}</td>
                          <td>{v.device}</td>
                          <td>{v.path}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <footer className="dash-foot">
              <label className="dash-check">
                <input type="checkbox" checked={noTrack} onChange={toggleNoTrack} />
                <span>Don't count my own visits on this device</span>
              </label>
              <p className="label dash-store">{data.store === "redis" ? "Live data" : "Local test data (not saved)"}</p>
            </footer>
          </>
        )}
      </main>
      <Cursor />
    </div>
  );
}
