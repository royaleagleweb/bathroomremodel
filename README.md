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
npm run build
```
