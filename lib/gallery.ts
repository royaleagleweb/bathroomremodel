// Build-time discovery of "drop-in" photos.
//
// Any image dropped into /public/images/gallery/ shows up on the portfolio
// page automatically — no code changes, no renaming required. Filenames are
// alphabetised so you can prefix with `01-`, `02-` etc. to control order.

import fs from "node:fs";
import path from "node:path";

const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i;

export type GalleryPhoto = {
  src: string;
  alt: string;
};

export function listGalleryPhotos(folder = "gallery"): GalleryPhoto[] {
  const dir = path.join(process.cwd(), "public", "images", folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_RE.test(file))
    .sort()
    .map((file) => ({
      src: `/images/${folder}/${file}`,
      // Turn "01-bayfront-suite.jpg" → "Bayfront Suite"
      alt: file
        .replace(IMAGE_RE, "")
        .replace(/^\d+[-_]?/, "")
        .replace(/[-_]+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase()) || "Project photo",
    }));
}
