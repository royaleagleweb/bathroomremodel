# Aurelia Bath Co. — Design System & Marketing Site

Luxury bathroom remodeling website for South Florida. Built on Next.js 15 (App
Router) + Tailwind CSS, with a bespoke luxury design system.

## Design System

### Colors
| Token | Value | Usage |
| --- | --- | --- |
| `navy` | `#0F172A` | Primary — headings, backgrounds, body text |
| `gold` | `#D4AF77` | Secondary — CTAs, accents, active states |
| `cream` | `#E2D8C3` | Accent — warm highlights |
| `charcoal` | `#111827` | Neutral body |
| `offwhite` | `#F8F4EC` | Neutral backgrounds |
| `error` | `#EF4444` | Form / validation errors |

### Typography
- **Headings** — Playfair Display (H1 48/60 · H2 36/44 · H3 28/36 · bold)
- **Body** — Inter 18/28
- **Captions / CTAs** — Inter 14/20 medium, uppercase, +0.5px tracking

### Spacing
- 12-column grid · 24px gutter · 1440px container
- Base unit 8px · paddings 24 / 48 / 80 / 120 · margins 32 / 64 / 96

### Components
`Button` (primary gold / secondary outline · 64px · rounded-2xl) · `Nav` · `Card`
(24px radius · subtle shadow) · `Input/Select/Textarea` (64px · gold focus ring)
· `Hero CTA` · `Footer`.

### States
Hover: `scale 1.05` + gold glow · Active: `scale 0.95` · Disabled: 40% opacity +
no pointer · Error: `#EF4444` border + icon.

## Pages

| Route | Description |
| --- | --- |
| `/` | Full-screen hero, services grid, portfolio teaser, trust bar, process, CTA |
| `/services` | Hero + 6 vertical service cards, filter by room & budget |
| `/portfolio` | Masonry before/after grid, filter by Miami / Ft Lauderdale / West Palm, empty state |
| `/quote` | 3-step flow (room → style + upload → contact + calendar) with gold progress bar, inline upload errors, confirmation |
| `/contact` | Split map + info / form with project-type dropdown |

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # writes static site to ./out
```

## Deploying to Cloudflare

The site is configured for Next.js **static export** (`output: "export"`), so
every route is pre-rendered to HTML — no server required.

### Option A · Cloudflare Workers (recommended, git-connected)

`wrangler.jsonc` in the repo root tells Workers to serve `./out` as static
assets. In the dashboard:

1. **Workers & Pages → Create → Workers → Connect to Git**.
2. Pick `royaleagleweb/bathroomremodel` and the branch to deploy.
3. Build settings:

   | Field | Value |
   | --- | --- |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` (default) |
   | Root directory | `/` |

4. Save and deploy. You'll get a `<project>.<account>.workers.dev` URL.

### Option B · Cloudflare Pages (legacy)

1. **Workers & Pages → Create → Pages → Connect to Git**, pick the repo/branch.
2. Build settings:

   | Field | Value |
   | --- | --- |
   | Framework preset | **Next.js (Static HTML Export)** |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Node version | `20` (set `NODE_VERSION=20` env var if needed) |

3. Save and deploy for a `<project>.pages.dev` URL.
