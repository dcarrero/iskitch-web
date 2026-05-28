# iskitch-web

Public website for **iSkitch** — landing page, privacy policy, terms of service and
support, all at [iskitch.com](https://iskitch.com).

## About the project

**iSkitch** is the idea of [David Carrero](https://github.com/dcarrero) (Color Vivo
Internet, S.L.): a modern, native macOS take on the classic **Skitch** annotation
tool. The original Skitch app has been effectively abandoned and only ships an
Intel binary — leaving Apple Silicon Macs (M1, M2, M3, M4…) running it under
Rosetta with quirks and bugs.

iSkitch is a ground-up rewrite in **Swift / SwiftUI / AppKit** that runs natively
on Apple Silicon, keeps the iconic Skitch-style tapered arrow, and adds modern
touches (pixelate, spotlight, native share sheet, App Store distribution).
The macOS app lives in a separate, private repository.

This repo contains only the **public marketing site**.

## Stack

- **[Astro](https://astro.build)** 5 (static site generator)
- **Multi-language**: English (`/`) + Spanish (`/es/`)
- **[Cloudflare Pages](https://pages.cloudflare.com)** for hosting
- **Cloudflare Pages Functions** for the beta signup form
- **Cloudflare KV** for storing beta subscribers
- **GitHub Actions** for the daily sync to Acumbamail

## Project structure

```
.
├── astro.config.mjs        # Astro + i18n config (en / es)
├── package.json
├── tsconfig.json
├── public/                 # Static assets served as-is
│   └── assets/
│       ├── editor-hero-en.png
│       ├── editor-hero-es.png
│       └── app-icon.png
├── src/
│   ├── i18n/
│   │   ├── en.json         # English translations
│   │   └── es.json         # Spanish translations
│   ├── layouts/Layout.astro
│   ├── components/         # Nav, Hero, Features, Tools, BetaSignup, CTA, Footer
│   ├── pages/
│   │   ├── index.astro     # EN → /
│   │   ├── privacy.astro   # EN → /privacy
│   │   ├── terms.astro     # EN → /terms
│   │   ├── support.astro   # EN → /support
│   │   └── es/             # Same pages under /es/
│   └── styles/global.css
├── functions/              # Cloudflare Pages Functions
│   └── api/
│       ├── subscribe.js            # POST: store email in KV
│       ├── ping.js                 # GET: health check
│       └── admin/
│           ├── subscribers.js      # GET: list/export subscribers
│           ├── mark-synced.js      # POST: mark as synced
│           └── delete.js           # POST: delete subscribers
├── scripts/
│   └── sync-acumbamail.mjs # KV → Acumbamail sync
├── .github/workflows/
│   └── sync-acumbamail.yml # Daily cron (07:30 UTC) + manual dispatch
└── dist/                   # Build output (gitignored, deployed by Cloudflare)
```

## Local development

```sh
npm install
npm run dev       # http://localhost:4321
```

Pages Functions don't run with `astro dev`. To test them locally use Wrangler:

```sh
npm i -g wrangler
npm run build
wrangler pages dev dist --kv SUBSCRIBERS --binding ADMIN_KEY=test
```

## Build

```sh
npm run build     # output → dist/
npm run preview   # serve dist/ locally
```

## Deployment (Cloudflare Pages)

1. **Workers & Pages → Create application → Connect to Git → `iskitch-web`**.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - **Build output directory: `dist`**
   - Node version: 20+
3. Custom domain → `iskitch.com`.

Only the contents of `dist/` are served. `README.md`, `src/`, configs, etc. stay
in the repo but are **not** deployed.

## Beta signup form

The landing page has a form for collecting beta signups. The flow:

1. User submits email on the landing page.
2. Cloudflare Pages Function (`functions/api/subscribe.js`) writes the email to
   **Cloudflare KV** (key `subscriber:<email>`).
3. A daily GitHub Action syncs new subscribers to **Acumbamail** with double
   opt-in (Acumbamail's WAF blocks Cloudflare Worker IPs, hence the indirection).

### Cloudflare configuration

In **Pages → `iskitch-web` → Settings**:

**KV namespace binding** (Bindings tab):

| Variable name | KV namespace |
|---|---|
| `SUBSCRIBERS` | `iskitch-kv` |

**Environment variables / Secrets**:

| Variable | Value | Type |
|---|---|---|
| `ADMIN_KEY` | random string (used to protect admin endpoints) | Secret 🔒 |

### GitHub Secrets (for the daily sync action)

In **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `ADMIN_KEY` | same as in Cloudflare |
| `ACUMBAMAIL_AUTH_TOKEN` | your Acumbamail API token |
| `ACUMBAMAIL_LIST_ID` | numeric ID of the target list |

### Manual operations

Once `ADMIN_KEY` is set, you can hit the admin endpoints:

```sh
# List all subscribers (JSON)
curl 'https://iskitch.com/api/admin/subscribers?key=ADMIN_KEY'

# Pending subscribers only (not yet synced)
curl 'https://iskitch.com/api/admin/subscribers?key=ADMIN_KEY&only=pending'

# Already synced
curl 'https://iskitch.com/api/admin/subscribers?key=ADMIN_KEY&only=synced'

# Export as CSV
curl 'https://iskitch.com/api/admin/subscribers?key=ADMIN_KEY&format=csv' \
  -o subscribers.csv

# Delete subscribers
curl -X POST 'https://iskitch.com/api/admin/delete?key=ADMIN_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"emails": ["a@b.com", "c@d.com"]}'

# Health check (also returns whether bindings are configured)
curl https://iskitch.com/api/subscribe
```

### Run the sync manually

From GitHub: **Actions → "Sync KV → Acumbamail" → Run workflow**.

Or from your terminal:

```sh
gh workflow run sync-acumbamail.yml --repo dcarrero/iskitch-web
```

Or locally on your Mac (no GitHub Actions needed):

```sh
cp .env.example .env       # then edit .env with real values
npm run sync
```

## i18n — adding a new language

1. Copy `src/i18n/en.json` → `src/i18n/xx.json` and translate.
2. Create `src/pages/xx/index.astro` (use `src/pages/es/index.astro` as a template).
3. Add `xx` to the `locales` array in `astro.config.mjs`.
4. Add a `<link rel="alternate" hreflang="xx" …>` in `src/layouts/Layout.astro`.

## Roadmap

- [ ] `public/og-cover.png` — 1200×630 Open Graph image.
- [ ] `public/favicon.png` — 32×32 + apple-touch-icon.
- [ ] Update Mac App Store links when iSkitch ships.
- [ ] Add more languages (FR, DE, PT, IT…).

## License

Source code is released under the **[MIT License](./LICENSE)**.
Copyright © 2026 **Color Vivo Internet, S.L.**

> The MIT license covers the **source code** of this website only.
> The "iSkitch" **name, logo and brand assets** are trademarks of
> Color Vivo Internet, S.L. and are **not** licensed under MIT.
> For brand or commercial use, contact <hello@iskitch.com>.

---

**iSkitch** is a tribute to the discontinued Skitch app (originally by Plasq,
later Evernote / Bending Spoons). We are not affiliated with, endorsed by or
sponsored by Plasq, Evernote or Bending Spoons.
