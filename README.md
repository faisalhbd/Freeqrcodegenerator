# FreeQR — Free Social Media QR Code Generator

A single-page Next.js 16 app that generates a styled, branded QR code for
25 platforms (Instagram, WhatsApp, TikTok, YouTube, LinkedIn, and more) —
entirely client-side, with no sign-up and no tracking.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js` needed)
- [`qr-code-styling`](https://www.npmjs.com/package/qr-code-styling) — renders the QR code on a `<canvas>` in the browser (no server round-trip)
- Icon artwork sourced from `simple-icons` (CC0) at build time, inlined as static path data — the runtime bundle does **not** depend on the `simple-icons` package

## Why it's built this way (privacy claim = actually true)

The "no tracking" claim on the landing page is backed by the architecture,
not just copy:
- The QR code is drawn with the Canvas API in the visitor's own browser.
  There is no API route, no database, and nothing is logged server-side.
- Static QR codes only — the destination URL is encoded directly, so
  there's no third-party redirect/analytics layer that could expire or
  track scans.
- Fonts are system font stacks (no Google Fonts request at runtime).
- No cookies, no localStorage, no analytics script.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

Both commands were verified to complete with zero TypeScript errors and
zero build warnings in this repository.

## Deploying for free (GitHub → Vercel)

1. Create a new **public** GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import
   the GitHub repo. Vercel auto-detects Next.js — no config needed.
3. Click **Deploy**. You get a free `<project>.vercel.app` domain
   immediately; a custom domain can be attached later from the same free
   plan.
4. **Update the domain in code** before your final deploy — replace
   `https://freeqr-social.vercel.app` in `app/layout.tsx`,
   `app/opengraph-image.tsx`, `app/sitemap.ts`, and `app/robots.ts` with
   your real production URL. This matters for canonical tags, the
   sitemap, and Open Graph previews.
5. After deploying, submit the sitemap (`/sitemap.xml`) in
   [Google Search Console](https://search.google.com/search-console) and
   [Bing Webmaster Tools](https://www.bing.com/webmasters) to speed up
   indexing.

## SEO / AEO / GEO notes

**Competitor gap this exploits:** most "free" QR generators (QRCode
Monkey, QR Tiger, Flowcode, ME-QR, Scanova) either gate downloads behind
sign-up, expire dynamic codes after ~14 days, or add scan tracking by
default — reviewers writing 2026 roundups flag this repeatedly. This
tool's positioning ("static, no sign-up, no tracking, no expiry") is a
direct answer to that gap, and the FAQ content is written to be pulled
verbatim into Google's AI Overviews / ChatGPT / Perplexity answers
(short, self-contained Q&A pairs, matching `FAQPage` JSON-LD).

**Implemented on-page:**
- Single, keyword-rich `<h1>` describing the tool, not a generic tagline
- `WebApplication` JSON-LD (declares it as a free tool — helps rich
  results and AI answer engines identify it as a usable app, not just an
  article)
- `FAQPage` JSON-LD matching the visible FAQ accordion, targeting
  long-tail questions people actually type ("does this track my scans",
  "do QR codes expire")
- `/llms.txt` — a plain-text summary for LLM crawlers (GEO), separate
  from the human-facing page copy
- Dynamic OG/Twitter image generated at build time (`app/opengraph-image.tsx`)
- `sitemap.xml` and `robots.txt` via Next.js's native `MetadataRoute`
- Every input field has real microcopy explaining the exact format
  expected, which doubles as long-tail keyword coverage (e.g. "Just the
  handle — no @ needed" naturally covers "instagram qr code without
  login" style queries in surrounding copy)

**Next steps worth doing once it's live (not automatable from here):**
- Register the domain in Google Search Console + Bing Webmaster Tools
- Get a handful of backlinks from relevant free-tool directories
  (e.g. AlternativeTo, Product Hunt, relevant subreddits) — domain
  authority is what actually moves ranking for a head-term like "free qr
  code generator"; on-page SEO alone won't outrank established players
- Consider a `/blog` or `/guides` section later (e.g. "QR code size for
  print", "static vs dynamic QR codes") to capture long-tail traffic —
  intentionally left out of this v1 to ship a fast, focused single page

## Project structure

```
app/
  layout.tsx        — metadata, JSON-LD (WebApplication)
  page.tsx           — landing page + tool mount
  globals.css         — Tailwind v4 theme tokens
  opengraph-image.tsx — dynamic OG image
  sitemap.ts / robots.ts
components/
  QrTicket.tsx        — the generator UI + qr-code-styling wiring
  FaqSection.tsx       — FAQ accordion + FAQPage JSON-LD
lib/
  platforms.ts         — the 25 supported destinations + URL builders
  brand-icons.ts        — extracted simple-icons path data
  custom-icons.ts        — hand-built icons (website/phone/email/LinkedIn)
  icon-svg.ts             — builds the colored badge SVG used for both
                            on-page icons and the QR center logo
```
