type Props = {
  images: string[];
};

const NEIGHBORHOODS = [
  "Coral Gables",
  "Miami Beach",
  "Fort Lauderdale",
  "West Palm",
  "Bal Harbour",
  "Coconut Grove",
  "Boca Raton",
  "Key Biscayne",
  "Pinecrest",
  "Aventura",
  "Sunny Isles",
  "Brickell",
];

const SUITE_TYPES = [
  "Primary Suite",
  "Wet Room",
  "Powder Room",
  "Spa Bath",
  "Guest Suite",
  "Soaking Bath",
];

export function Gallery({ images }: Props) {
  if (images.length === 0) return null;

  return (
    <section
      id="portfolio"
      className="relative section-pad bg-cream-light overflow-hidden"
    >
      {/* Soft accent orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] w-[480px] h-[480px] rounded-full blur-[140px] opacity-40"
        style={{
          background: "radial-gradient(circle, #D4AF77 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">The Aurelia Portfolio</p>
            <h2 className="mt-4">
              <span className="text-gold-gradient">{images.length}</span>{" "}
              reasons your neighbors stopped scrolling on Zillow.
            </h2>
            <p className="mt-4 text-body text-navy/70 max-w-xl">
              Every project below was hand-built by our South Florida crews.
              Tap any suite to start a quote built around it.
            </p>
          </div>
          <a href="#quote-form" className="btn-primary self-start md:self-end">
            Get My Quote
          </a>
        </div>

        <div className="gold-divider mt-12" />

        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
          {images.map((src, i) => (
            <a
              key={i}
              href="#quote-form"
              className="mb-4 block break-inside-avoid group relative rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(15,23,42,0.12)] hover:shadow-[0_24px_56px_rgba(15,23,42,0.3)] transition-all duration-500 ring-1 ring-transparent hover:ring-gold/60"
            >
              {/* Variable heights for visual rhythm */}
              <div
                className="bg-cream"
                style={{
                  aspectRatio:
                    i % 5 === 0 ? "3/4" : i % 3 === 0 ? "4/5" : "1/1",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-luxury group-hover:scale-110"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent opacity-65 group-hover:opacity-95 transition-opacity duration-500" />
              {/* gold corner accent on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-3 right-3 w-8 h-8 rounded-full bg-gold/0 ring-1 ring-gold/0 group-hover:bg-gold/90 group-hover:ring-gold transition-all duration-500 grid place-items-center text-navy text-[14px] font-bold"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                  ↗
                </span>
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-offwhite translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="eyebrow text-gold">
                  {NEIGHBORHOODS[i % NEIGHBORHOODS.length]}
                </p>
                <p className="mt-1 font-display text-[20px] leading-tight">
                  {SUITE_TYPES[i % SUITE_TYPES.length]} No.{" "}
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-caption uppercase tracking-cta font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Quote a suite like this
                  <span aria-hidden>→</span>
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
