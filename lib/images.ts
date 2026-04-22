// Single source of truth for every image path on the site.
// Upload files to the matching folders in /public/images/ — or rename a path
// here to match whatever filename you uploaded.
//
// All paths are root-relative (Next.js serves /public/* from the site root).
// Change a path once here and it updates everywhere the image is used.

export const HERO = {
  desktop: "/images/hero/main.jpg",
  fallback: "/images/hero/main-compressed.jpg",
};

export const SERVICE_IMAGES: Record<string, string> = {
  fullRemodel: "/images/services/full-remodel.jpg",
  powderRoom: "/images/services/powder-room.jpg",
  shower: "/images/services/shower.jpg",
  soakingTub: "/images/services/soaking-tub.jpg",
  vanity: "/images/services/vanity.jpg",
  dualVanity: "/images/services/dual-vanity.jpg",
};

export const PORTFOLIO_IMAGES: Record<number, string> = {
  1: "/images/portfolio/01-bayfront-primary-suite.jpg",
  2: "/images/portfolio/02-canal-house-wet-room.jpg",
  3: "/images/portfolio/03-heritage-powder-room.jpg",
  4: "/images/portfolio/04-mediterranean-dual-vanity.jpg",
  5: "/images/portfolio/05-cast-iron-soaking-suite.jpg",
  6: "/images/portfolio/06-ocean-facing-spa.jpg",
  7: "/images/portfolio/07-antique-brass-vanity.jpg",
  8: "/images/portfolio/08-penthouse-primary.jpg",
  9: "/images/portfolio/09-yacht-inspired-suite.jpg",
  10: "/images/portfolio/10-garden-spa-retreat.jpg",
  11: "/images/portfolio/11-parisian-powder-room.jpg",
  12: "/images/portfolio/12-oceanfront-wet-room.jpg",
};

export const TEASER_IMAGES = [
  "/images/portfolio/01-bayfront-primary-suite.jpg",
  "/images/portfolio/02-canal-house-wet-room.jpg",
  "/images/portfolio/04-mediterranean-dual-vanity.jpg",
  "/images/portfolio/05-cast-iron-soaking-suite.jpg",
  "/images/portfolio/06-ocean-facing-spa.jpg",
  "/images/portfolio/09-yacht-inspired-suite.jpg",
];

export const TEAM_AVATARS = [
  "/images/team/designer-1.jpg",
  "/images/team/designer-2.jpg",
  "/images/team/designer-3.jpg",
];

// Quote-flow room cards use the same imagery as services
export const QUOTE_ROOMS = {
  full: SERVICE_IMAGES.fullRemodel,
  shower: SERVICE_IMAGES.shower,
  vanity: SERVICE_IMAGES.vanity,
  powder: SERVICE_IMAGES.powderRoom,
};
