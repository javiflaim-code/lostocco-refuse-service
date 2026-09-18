# LoStocco Refuse Service — website

Marketing site for **LoStocco Refuse Service, LLC** — family-owned trash, recycling
and dumpster rental in Danbury, Connecticut.

Next.js (App Router) · TypeScript · Tailwind · deployed on Vercel.

---

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier, writes in place |

> **Note on the dev server:** Turbopack's hot reload can leave client components
> un-hydrated after a long editing session, which looks like buttons that do
> nothing. If interactive pieces stop responding, restart `npm run dev`. It does
> not happen in `npm run build && npm start`.

---

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/services` | Residential, recycling, dumpsters, bulk |
| `/dumpsters` | 10 / 20 / 30 yard comparison, driveway protection |
| `/service-area` | Five-town map, per-town detail, address checker |
| `/resources` | Calendars, reference PDFs, rules written out in HTML |
| `/about` | Family story, the fleet, HRRA licence |
| `/pay-bill` | Hand-off to the existing payment portal |
| `/contact` | Start-service form, hours, address, embedded map |
| _anything else_ | 404 |

`sitemap.xml` and `robots.txt` are generated from the route list.

---

## Where things live

```
src/
  lib/site.ts        Every verified fact: phone, address, hours, towns,
                     services, dumpster sizes, resource PDFs, BEAVER_NAME
  lib/poses.ts       The beaver art: file, dimensions, alt text
  components/        Header, footer, and the interactive pieces
  app/<route>/       One folder per page, each with its own metadata
tailwind.config.ts   Design tokens (colors, type scale, shadows, breakpoints)
public/poses/        The pose art, compressed
```

**Nothing about the business should be typed into a component.** It goes in
`src/lib/site.ts` and gets imported.

### Design tokens

All eight colors and the whole type scale are in
[`tailwind.config.ts`](tailwind.config.ts):

| Token | Hex | Use |
| --- | --- | --- |
| `forest` | `#1B4D2E` | Hero/section backgrounds, primary buttons, headings |
| `ink` | `#14211A` | Borders, body text, footer background |
| `amber` | `#F2A50C` | Top bar, marquee, accent buttons, active states |
| `mint` | `#EAF2E7` | Light section tint, cards |
| `page` | `#F7FBF4` | Default page background |
| `paper` | `#FFFFFF` | Cards |
| `bone` | `#F7F6F1` | Alternate light band |
| `warning` | `#C0392B` | The "Nope!" badge only |

Two rules worth keeping:

- **Anton never ships below `0.04em` tracking.** The `.display` class in
  `src/app/globals.css` sets `0.05em`. If you scale display type inside an
  element that already has `.display`, set `tracking-[0.05em]` explicitly —
  letter-spacing inherits as a pixel value, so a larger child ends up tighter
  than it looks.
- **Never put `scroll-behavior: smooth` on `html`.** The App Router scrolls a
  new page to the top by calling `scrollIntoView` on each section from the
  bottom up, so the last call is the one that lands you at the top. Smooth makes
  every one of those an animation, and an animation in flight gets cancelled by
  the layout shift from a streaming Suspense boundary or a late image — which
  leaves the reader stranded partway down the page they just opened. Instant
  scrolling lands on the band every time. `scroll-padding-top` stays; that is
  what keeps in-page anchors clear of the sticky header.
- **Amber is a fill, not a text color on light surfaces.** `#F2A50C` on white or
  mint is about 2:1, well under AA. Amber text is only used on `forest` and
  `ink`. On light surfaces use `forest`, or put the amber behind ink type — see
  the `Numeral` component in `src/components/ui.tsx`.

### The mascot

The beaver is **Rocco**, kept as a single exported constant:

```ts
// src/lib/site.ts
export const BEAVER_NAME = 'Rocco';
```

Change it there and it changes everywhere.

---

## Swapping the form endpoint

The contact / start-service form is one
component, `src/components/ContactForm.tsx`, which posts JSON to a single
endpoint read from an environment variable:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

1. Create a form at [Formspree](https://formspree.io) and copy its endpoint URL.
2. Locally: put it in `.env.local` (copy `.env.example` as a starting point).
3. On Vercel: **Project → Settings → Environment Variables**, add
   `NEXT_PUBLIC_FORM_ENDPOINT`, then redeploy.

**With the variable unset the form runs in demo mode** — it validates, shows the
loading state and shows the success state, but sends nothing. That is deliberate
so the site is safe to show before the endpoint exists. Nothing is silently
dropped in production once the variable is set.

Any endpoint that accepts a JSON `POST` and returns 2xx works — Formspree,
Resend behind a route handler, or a Vercel serverless function. Only the URL
changes; no component edits.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_FORM_ENDPOINT` | For live form delivery | Where form submissions POST |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URLs, Open Graph, `sitemap.xml` |

---

## What the client still needs to provide

Gaps render on the site as visibly marked `[PLACEHOLDER — …]` blocks.

### Open questions

- [ ] **Are bulk / special pickups offered, and how are they priced?** Listed on
      the services page with a placeholder rather than described.
- [ ] **Which cart sizes apply to trash vs recycling.** 45 / 65 / 95 gallon came
      off LoStocco's own site; the source does not say which service each is for,
      so the site presents them as the sizes available.
- [ ] **Is commercial collection offered?** Removed sitewide — it appears nowhere
      on their own site. Front-loader artwork exists, so it may be worth asking.
- [ ] **Second phone number.** `203-295-7155` appears publicly in places. The site
      uses `203-743-9940` only.
- [ ] **HRRA licence.** The copy published on the old site expired in 2024. The
      credential appears only on the About page.

> **Fleet and household figures are agency estimates, not client-confirmed.**
> The site shows "40+" years, "10+" trucks and five towns. The 40 years and the
> five towns are from LoStocco's own material; the truck count is a placeholder.

### Testimonials

The three quotes on the homepage are **real published comments** from Angi,
quoted as written and attributed. Three further quotes are in the source
document and were left off: the Facebook one at the client's request, and two
Nextdoor lines — one of which carries a monthly price that would need
confirming before it goes live.

### Artwork

The v4 set arrives cut out, so it drops straight into `public/poses/`. Source
files live in `poses_NEW_0918/` and keep their names.

The homepage banner is `hero-rear-step_NEW`, trimmed to its content before it
was resized — the delivered file carries about 11% dead transparency down the
left edge, which reads as the truck sitting small and off-center in its column.
Trim first, then resize, then update the width and height in `src/lib/poses.ts`
so `next/image` reserves the right box.

- [ ] `front-loader` still carries a strip of asphalt under the truck, so it has
      a slightly boxy lower edge on light sections.
- [ ] A dedicated hero pose for the Resources page — it currently borrows the
      front loader, since the Santa/calendar drawing only suits a holiday context.

---

## Analytics

Vercel Web Analytics is enabled. `<Analytics />` from `@vercel/analytics/next`
is mounted once in the root layout, so every route is counted without any
per-page wiring. The tracker only loads on Vercel deployments — local
development sends nothing. Figures show up under **Project → Analytics** in the
Vercel dashboard.

No cookies and no env vars are involved.

---

## Accessibility and SEO

Verified across all nine routes at 375 / 768 / 1440 px:

- No horizontal overflow at any width
- One `<h1>` per page, no skipped heading levels
- Every image has descriptive alt text; no `#` or empty hrefs
- All text at 14px or larger; all hit targets 44px or larger
- Text contrast meets 4.5:1 (3:1 for display-scale type) on every page
- Skip-to-content link, visible focus rings, keyboard-operable size switcher and
  town map, focus-trapped mobile drawer that closes on Escape and on navigation
- All motion disabled under `prefers-reduced-motion: reduce`
- Per-page title/description, Open Graph tags, and LocalBusiness JSON-LD
  carrying the name, address, phone, hours and the five towns
