// Server component — runs at build time. Reads /public/images/gallery/
// and renders any photos found into a clean grid. Drop new photos in
// the folder, rebuild, and they appear automatically.

import { listGalleryPhotos } from "@/lib/gallery";

export function AutoGallery() {
  const photos = listGalleryPhotos();
  if (photos.length === 0) return null;

  return (
    <section className="section-pad-tight bg-offwhite border-t border-navy/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <p className="eyebrow">More From the Studio</p>
            <h2 className="mt-3">Recent photography from the build floor.</h2>
          </div>
          <p className="text-caption text-navy/60">
            {photos.length} photo{photos.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {photos.map((p) => (
            <figure
              key={p.src}
              className="luxury-card relative aspect-[4/5] overflow-hidden"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="image-tile"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-navy/85 to-transparent text-offwhite text-caption uppercase tracking-cta opacity-0 hover:opacity-100 transition-opacity">
                {p.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
