# Vineeth Pradeep — Solutions Architect & Full-Stack Developer

Profile and design system for the portfolio site. Adapted from the Monocad template system in
[DESIGN.md](DESIGN.md) and [SKILL.md](SKILL.md), applied to Vineeth's own brand and content.
Content lives in `src/site/content.js`; tokens live in `src/site/site.css`.

## Profile

- **Name:** Vineeth Pradeep (Vineeth Suvarna Pradeep on the CV)
- **Role:** Solutions Architect & Full-Stack Developer: frontend, backend and AI-driven solutions. Currently Technical Lead / Full-Stack Developer at QTHE.
- **Location:** Swansea, UK
- **Contact:** vineethpradeeps@gmail.com · [LinkedIn](https://www.linkedin.com/in/vineeth-full-stack-developer)
- **Audience:** recruiters and hiring managers first, then businesses with a product to build.
- **Promise:** I design and build AI-driven business solutions end to end, from modern frontends and
  robust backends to intelligent AI agents, turning real business problems into products people use.
- **AI wording:** the CV covers AI agent design, model integration and orchestration. Do not claim
  training custom models unless the CV is updated to say so.
- **Enquiry email:** sent through the Zoho account in `MAIL_*` and delivered to `MAIL_TO`
  (vineethpradeeps@gmail.com); replies go to the enquirer.
- **Link previews:** `public/og-image.png` (1200x630, a tutor-agent code window) is rendered from `og/og-card.html` with
  `node og/render.mjs`. Re-render it when the role or headline changes, and bump the `?v=` number on
  the `og:image` and `twitter:image` URLs in `index.html` so social sites fetch the new image.
- **Primary action:** "Hire me" opens the hire form. It adapts to the engagement type: full-time or
  contract roles ask for job title, salary or day rate, work arrangement and a job description link;
  freelance projects and consultations ask what is needed and the budget.

### Source of truth

All career facts come from the CV at `public/vineeth_pradeep_cv.pdf`, which is also what the CV
modal previews and downloads. When the CV changes, replace that file and update `experience`,
`stackGroups`, `currentProjects`, `achievements` and `leadership` in `src/site/content.js` to
match. Never add claims, numbers or employers that are not on the CV or the live portfolio.

### Page structure

1. **Hero:** role line, statement, "Hire me" and "View CV".
2. **About (01):** introduction, "Why companies hire me" (solution architecture, frontend to
   backend, AI-driven delivery) and stats (13+ years, 20+ projects, 8 roles, 3 QTHE products).
3. **Personal statement:** a large quote, with CV and consultation buttons.
4. **Currently leading (02):** QTHE Accredited, Kids MindMath / CLP and QBuddy AI agent workflows.
5. **Approach (03):** six delivery steps, from understanding the business to support and growth.
6. **Technology stack (04):** the seven CV skill groups as a command-line listing.
7. **Selected work (05)**, **Portfolio** walkthrough, **Experience (07)** with per-role tech,
   key achievements and leadership focus, and **Contact (08)**.
8. **CV modal:** PDF preview with Download and Open in new tab, opened from the nav, hero,
   statement, Experience, the closing section and the footer.

## Design system

### Colors

| Token | Value | Role |
|-------|-------|------|
| `--color-ink` | `#202020` | Primary text, dark sections |
| `--color-grey` | `#797979` | Secondary text, hero transition midpoint |
| `--color-paper` | `#FFFFFF` | Light background, text on dark |
| `--color-accent` | `#C8161D` | Call-to-action links and focus rings only |

DESIGN.md lists `#0000EE` (the browser default link colour picked up by its extraction). The live
template uses red for its "Book a session" links, so this site uses `--color-accent` instead.

### Typography

- **Headline:** Stack Sans Headline 500. Wordmark, section titles, marquees.
- **Text:** Stack Sans Text 400/500. Body copy and labels.
- **Accent:** Instrument Serif italic in `--color-accent`. One or two words per headline, marked
  with `*asterisks*` in `content.js` (for example "*end to end.*" and "*vision*").
- **Mono:** JetBrains Mono. Buttons, chips, the status tag and the cursor readout: the "digital" layer.
- **Script:** Fuggles. Used only for the signature in the About section.

| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 14px | Labels, corners, metadata (uppercase) |
| `--text-sm` | 16px | Body copy (sentence case) |
| `--text-base` | 26–40px | Section titles, service steps |
| `--text-lg` | 56–120px | Closing headline |

### Spacing and motion

- Spacing scale: 6 · 12 · 16 · 24 · 30 · 38 · 60 · 120px. Page gutter scales from 16px to 38px.
- Easing: `cubic-bezier(0.645, 0.045, 0.355, 1)`. Durations: 0.4s for hover, 0.8s for reveals.
- Square corners and no shadows everywhere, except on the browser frame below.

### Project imagery: the browser frame

Every project screenshot uses the `BrowserFrame` component (`src/site/ui.jsx`). Never place a bare
screenshot `<img>` on the page.

- **Anatomy:** a top bar with three window dots and the site's domain in a pill, then a 16:10
  view of the screenshot cropped from the top.
- **Tokens:** `--radius-frame` (6px) and `--shadow-frame` (a soft drop shadow). These are the only
  rounded corners and shadow in the system.
- **Tones:** `light` (default) on white sections and `dark` on ink sections.
- **Used in:** the hero ring, the approach fly-through, the work grid, the work modal, the
  portfolio preview and the closing strip.
- **Hover (work grid):** the frame lifts 6px, its shadow deepens and the screenshot zooms to 1.04.
- **Exception:** the full-bleed greyscale background behind the portfolio section is decoration
  rather than a project image, so it stays unframed.

### Page behaviour (mirrors the template)

1. **Hero:** scattered `VINEETH` letters settle into an arch as you scroll. A dark circle expands
   from the centre, the letters turn white, and a 3D ring of framed project screenshots rotates and grows.
2. **About:** a dark statement with corner labels, a script signature and four proof-point stats.
3. **Approach:** the pinned "Vision to digital" marquee. The six journey steps roll in one at a
   time while project images fly through.
4. **Selected work:** a scattered four-column grid with parallax columns. Each tile opens a modal
   with the screenshot, tech tags and description. Its "Visit live site" button opens the site in
   a new tab.
5. **Portfolio:** the pinned "Portfolio" marquee over a greyscale project image. Project names
   slide, a progress line fills, and vision and delivered text change per project.
6. **Experience:** an accordion of every role from `experiences` in `src/data/constants.js`
   (dates, role, company). Rows fill dark on hover and expand to show the details. The newest role
   is open by default.
7. **Consultation form:** every "Book a consultation" button opens a modal form (name, email,
   company, phone, stage, services, budget, timeline, message). It posts to `api/consultation.js`,
   which emails the request using the `MAIL_*` environment variables.
8. **Closing:** the "Let’s build what’s *next*" headline and a strip of tumbling project cards that
   react to hover.
9. **Footer:** navigation, contact details and an oversized wordmark.
10. **Global:** an intro screen, Lenis smooth scrolling, a crosshair cursor with coordinates on fine pointers, a
    floating glass nav bar, a full-screen menu, a scroll-progress bar and film grain.

## How this differs from the Monocad reference

The site keeps the reference's motion language (scroll-built wordmark, 3D ring, pinned marquees,
fly-through images, scattered grid, tumbling closing strip) but has its own visual identity:

| Reference | This site |
|-----------|-----------|
| No intro | Intro screen: 0–100 counter and wordmark, then the panel lifts away (once per visit) |
| Text-only nav corners | Floating glass nav bar with active-section highlight, plus a live Swansea clock |
| Plain full-screen crosshair | Crosshair with a live `X 0000 · Y 0000` readout in mono; over links it shows a red `[ VIEW ]`, `[ VISIT ]`, `[ BOOK ]` or `[ OPEN ]` tag that decodes matrix-style |
| Crosshair grid on a white hero | Dot-grid hero, availability chip, large sentence-case statement, scroll cue |
| Flat white → grey → black fade | A dark circle expands from the centre and the letters invert to white |
| Red squares around text links | Rectangular terminal-style buttons (`DigitalButton`): mono type, red corner brackets, blinking status block, arrow cell, matrix decode on hover |
| Plain uppercase labels | Rectangular mono chips, e.g. "(02) Approach", and a blinking "Taking new projects" status tag |
| Static headings | Word-by-word masked reveals with serif italic accent words |
| Constant-speed marquees with "·" | Marquees that speed up and skew with scroll velocity, with red dot separators |
| Hard section cuts | Approach and Portfolio panels open out from rounded corners |
| Static numbers | Count-up stats, a step rail in Approach, a red scroll-progress bar, film grain |

## Rules

- Use the tokens above; do not add colours, sizes or spacing outside them.
- Uppercase is for labels, headings and marquees. Body copy stays in sentence case.
- Every interactive element needs hover and focus-visible states. The menu closes with Escape.
- With `prefers-reduced-motion`, scroll-linked motion is disabled and content still shows its
  final state.
- Check layouts at 375px and 1440px. No horizontal scroll at phone width.
- Copy is concise and confident. Write in the first person for Vineeth and make no unverifiable
  claims.
