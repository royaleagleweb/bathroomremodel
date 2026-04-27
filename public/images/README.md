# Where to put your photos

There are two ways to add photos. Pick whichever fits.

---

## OPTION 1 — Drop-in gallery (easiest, no renaming)

Got a lot of photos and just want them on the site? Use this.

1. Open this folder on GitHub: **https://github.com/royaleagleweb/bathroomremodel/tree/main/public/images/gallery**
2. Click **Add file → Upload files** (top right).
3. Drag in as many photos as you want — any filenames are fine.
4. Click **Commit changes**.
5. Cloudflare rebuilds in ~1–2 minutes. Open **/portfolio/** — your photos now appear at the bottom of the page in a clean grid.

**Tips for `gallery/`**
- Filenames are sorted alphabetically. Prefix with `01-`, `02-`… to control order (e.g. `01-coral-gables-suite.jpg`).
- The filename (minus the number prefix and dashes) is shown as the caption on hover, so name them descriptively: `02-bayfront-primary-suite.jpg` becomes "Bayfront Primary Suite".

---

## OPTION 2 — Curated slots (controls hero, services, featured portfolio)

Some images are referenced by exact filename so the layout, captions and pricing all line up. Replace these with your own photos using the names below.

How:
1. Open the folder on GitHub (links below), click **Add file → Upload files**, drag yours in.
2. If your filename is different, click the uploaded file → pencil icon → rename to match the list.

### `hero/` — homepage hero background
https://github.com/royaleagleweb/bathroomremodel/tree/main/public/images/hero
- `main.jpg` — landscape, 2400×1600 or larger recommended

### `services/` — one per service card (square / portrait, 1600×1600+)
https://github.com/royaleagleweb/bathroomremodel/tree/main/public/images/services
- `full-remodel.jpg`
- `powder-room.jpg`
- `shower.jpg`
- `soaking-tub.jpg`
- `vanity.jpg`
- `dual-vanity.jpg`

### `portfolio/` — 12 featured slots on the portfolio page
https://github.com/royaleagleweb/bathroomremodel/tree/main/public/images/portfolio
- `01-bayfront-primary-suite.jpg`
- `02-canal-house-wet-room.jpg`
- `03-heritage-powder-room.jpg`
- `04-mediterranean-dual-vanity.jpg`
- `05-cast-iron-soaking-suite.jpg`
- `06-ocean-facing-spa.jpg`
- `07-antique-brass-vanity.jpg`
- `08-penthouse-primary.jpg`
- `09-yacht-inspired-suite.jpg`
- `10-garden-spa-retreat.jpg`
- `11-parisian-powder-room.jpg`
- `12-oceanfront-wet-room.jpg`

### `team/` — designer avatars (square, 600×600)
- `designer-1.jpg`
- `designer-2.jpg`
- `designer-3.jpg`

> Prefer not to rename? Open `/lib/images.ts` and change the paths on the right-hand side to match what you uploaded.

---

## Formats & sizes (both options)

- **JPG or WebP** for photos. PNG only if you need transparency.
- Keep each file **under 2 MB**. Compress at https://squoosh.app — page-speed scores depend on it.
- Photos look best at **landscape 3:2** (hero) or **portrait 4:5** (gallery / cards).
