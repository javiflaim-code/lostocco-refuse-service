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
| `/services` | Residential, recycling, commercial, dumpsters, bulk |
| `/dumpsters` | 10 / 20 / 30 yard comparison + rental request form |
| `/service-area` | Five-town map, per-town detail, address checker |
| `/resources` | Eight PDFs plus the rules written out in HTML |
| `/about` | Family story, the fleet, LoStocco Metalworks |
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
- **Amber is a fill, not a text color on light surfaces.** `#F2A50C` on white or
  mint is about 2:1, well under AA. Amber text is only used on `forest` and
  `ink`. On light surfaces use `forest`, or put the amber behind ink type — see
  the `Numeral` component in `src/components/ui.tsx`.

### The mascot's name

The beaver's name is **not final**. It is a single exported constant:

```ts
// src/lib/site.ts
export const BEAVER_NAME = 'Timber';
```

Change it there and it changes everywhere. The "help us name our beaver" ballot
on the homepage reads its options from `beaverNameOptions` in the same file;
votes are stored in the visitor's own browser (`localStorage`) and are not sent
anywhere.

---

## Swapping the form endpoint

Both forms (contact/start-service, and the dumpster request) share one
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

Everything below renders on the site as a visibly marked
`[PLACEHOLDER — …]` or `[PHOTO — …]` block, so it is obvious what is missing.
Fill the values into `src/lib/site.ts` (or the noted component) and delete the
placeholder.

### Numbers — do not guess these

- [ ] **Number of trucks in the fleet** — homepage stats, About page
- [ ] **Number of households served** — homepage stats, About page
- [ ] **Trash cart size in gallons** — homepage, Services → residential
- [ ] **Recycling cart size in gallons** — homepage, Services → recycling
- [ ] **Dumpster dimensions** (L × W × H) for 10, 20 and 30 yard —
      `dumpsters[].dimensions` in `src/lib/site.ts`
- [ ] **Pickup-truck-load equivalent** for each dumpster size —
      `dumpsters[].truckLoads`
- [ ] **Rental period, daily rate and tonnage allowance** — Dumpsters page
- [ ] **The year Joe founded the company / how many years he ran it** — About page

### Decisions

- [ ] **Are bulk / special pickups offered?** If yes, how are they priced? The
      service is listed with a placeholder rather than described, because we
      could not confirm it. If the answer is no, remove the `bulk-pickups`
      entry from `services` in `src/lib/site.ts` and the matching block on the
      Services page.
- [ ] **Second phone number.** `203-295-7155` is listed publicly in some places.
      The site currently uses `203-743-9940` only. Confirm whether the second
      number should appear anywhere; if so, add it to `site.phone`'s neighbours
      in `src/lib/site.ts`.
- [ ] **The beaver's name.** Seven candidates are on the homepage ballot. Pick
      one and set `BEAVER_NAME`.
- [ ] **LoStocco Metalworks URL.** `site.metalworksUrl` currently points at
      `https://www.lostoccometalworks.com/` — confirm that is right.

### Reviews

- [ ] **Three real Google reviews** — quote plus name and town for each. Three
      marked slots on the homepage.

### Photos

Each is a styled empty frame with a label, never a stretched stock image.

- [ ] Packer truck on route
- [ ] Roll-off delivery (boards down)
- [ ] Container on a driveway
- [ ] Crew at the curb
- [ ] Recycling cart at the curb
- [ ] Commercial container behind a building
- [ ] Bulk item at the curb
- [ ] The yard on Beaver Brook Road
- [ ] Joseph LoStocco III
- [ ] Joseph IV
- [ ] Maria

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
