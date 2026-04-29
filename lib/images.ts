// All images now live in /public/uploads/.
// The homepage auto-discovers whatever you drop into that folder
// (see lib/uploads.ts). The other pages still reference specific filenames
// below — drop matching names into /public/uploads/ if you want them to show.

export const HERO = {
  desktop: "/uploads/main.jpg",
  fallback: "/uploads/main.jpg",
};

export const SERVICE_IMAGES: Record<string, string> = {
  fullRemodel: "/uploads/full-remodel.jpg",
  powderRoom: "/uploads/powder-room.jpg",
  shower: "/uploads/shower.jpg",
  soakingTub: "/uploads/soaking-tub.jpg",
  vanity: "/uploads/vanity.jpg",
  dualVanity: "/uploads/dual-vanity.jpg",
};

export const PORTFOLIO_IMAGES: Record<number, string> = {
  1: "/uploads/01-bayfront-primary-suite.jpg",
  2: "/uploads/02-canal-house-wet-room.jpg",
  3: "/uploads/03-heritage-powder-room.jpg",
  4: "/uploads/04-mediterranean-dual-vanity.jpg",
  5: "/uploads/05-cast-iron-soaking-suite.jpg",
  6: "/uploads/06-ocean-facing-spa.jpg",
  7: "/uploads/07-antique-brass-vanity.jpg",
  8: "/uploads/08-penthouse-primary.jpg",
  9: "/uploads/09-yacht-inspired-suite.jpg",
  10: "/uploads/10-garden-spa-retreat.jpg",
  11: "/uploads/11-parisian-powder-room.jpg",
  12: "/uploads/12-oceanfront-wet-room.jpg",
};

export const TEASER_IMAGES = [
  "/uploads/01-bayfront-primary-suite.jpg",
  "/uploads/02-canal-house-wet-room.jpg",
  "/uploads/04-mediterranean-dual-vanity.jpg",
  "/uploads/05-cast-iron-soaking-suite.jpg",
  "/uploads/06-ocean-facing-spa.jpg",
  "/uploads/09-yacht-inspired-suite.jpg",
];

export const TEAM_AVATARS = [
  "/uploads/designer-1.jpg",
  "/uploads/designer-2.jpg",
  "/uploads/designer-3.jpg",
];

export const QUOTE_ROOMS = {
  full: SERVICE_IMAGES.fullRemodel,
  shower: SERVICE_IMAGES.shower,
  vanity: SERVICE_IMAGES.vanity,
  powder: SERVICE_IMAGES.powderRoom,
};
