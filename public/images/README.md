# How to upload your photos

## The fastest way (no command line)

1. Open this folder on GitHub: **https://github.com/royaleagleweb/bathroomremodel/tree/main/public/images**
2. Click the subfolder you want (`hero/`, `services/`, `portfolio/`, or `team/`).
3. Click **Add file → Upload files** near the top right.
4. Drag your photos in from Finder / File Explorer.
5. Leave the commit message alone and click **Commit changes**.
6. Cloudflare will auto-rebuild in 1–2 minutes — refresh the site.

## Filename requirements

Every filename used by the site is listed below. Upload your photos with these exact names (or rename them after dragging in on GitHub — click a file then the pencil icon → change the name).

If you have different filenames and don't want to rename, open `/lib/images.ts` and change the paths on the right-hand side to match what you uploaded.

### `hero/` — homepage hero background
- `main.jpg` — main hero image, landscape, 2400×1600 or larger recommended

### `services/` — one per service card (square / portrait, 1600×1600 or larger)
- `full-remodel.jpg`
- `powder-room.jpg`
- `shower.jpg`
- `soaking-tub.jpg`
- `vanity.jpg`
- `dual-vanity.jpg`

### `portfolio/` — 12 slots for the portfolio page
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

### `team/` — designer avatars for social proof (square, 600×600)
- `designer-1.jpg`
- `designer-2.jpg`
- `designer-3.jpg`

## Formats & sizes

- JPG or WebP for photos. PNG only if you need transparency.
- Keep each file under **2 MB**. Compress at https://squoosh.app if needed — this matters for page-speed scores.
