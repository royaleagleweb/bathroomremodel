type Props = {
  images: string[];
};

export function Gallery({ images }: Props) {
  if (images.length === 0) return null;

  return (
    <section
      id="portfolio"
      className="relative section-pad bg-cream-light overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] w-[480px] h-[480px] rounded-full blur-[140px] opacity-30"
        style={{
          background: "radial-gradient(circle, #D4AF77 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow">The Portfolio</p>
            <h2 className="mt-4 font-display text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.01em]">
              <span className="text-gold-gradient italic">{images.length}</span>{" "}
              suites your neighbors stopped scrolling on Zillow for.
            </h2>
            <p className="mt-5 text-body text-navy/65 max-w-xl">
              Every project below was hand-built by our South Florida crews.
              Tap any suite to start a quote built around it.
            </p>
          </div>
          <a href="#quote-form" className="btn-primary self-start md:self-end">
            Get my quote
          </a>
        </div>

        <div className="gold-divider mt-14" />

        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 [column-fill:_balance]">
          {images.map((src, i) => (
            <a
              key={i}
              href="#quote-form"
              className="mb-3 block break-inside-avoid group relative rounded-2xl overflow-hidden ring-1 ring-navy/[0.04] hover:ring-gold/50 transition-all duration-500"
            >
              <div
                className="bg-cream"
                style={{
                  aspectRatio:
                    i % 5 === 0 ? "3/4" : i % 3 === 0 ? "4/5" : "1/1",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1000ms] ease-luxury group-hover:scale-[1.06]"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </div>
              {/* Quiet hover veil */}
              <div className="absolute inset-0 bg-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Gold corner cue */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-3 right-3 w-9 h-9 rounded-full bg-offwhite/0 ring-1 ring-offwhite/0 group-hover:bg-offwhite/95 group-hover:ring-gold/40 transition-all duration-500 grid place-items-center text-navy text-[13px] font-bold"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
