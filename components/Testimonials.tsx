const testimonials = [
  {
    quote:
      "Aurelia delivered three weeks faster than the other two firms quoted. Tile is flawless. I have already referred them to two neighbors.",
    name: "Daniela R.",
    location: "Coral Gables · Full primary suite",
    stars: 5,
  },
  {
    quote:
      "We were burned by a contractor before. Aurelia's price-lock guarantee and weekly walkthroughs made this feel like a different industry.",
    name: "Jonathan K.",
    location: "Fort Lauderdale · Wet room conversion",
    stars: 5,
  },
  {
    quote:
      "Honest pricing, real designers, and the brass fittings they sourced are gorgeous. Friends keep asking who built it.",
    name: "Marisol T.",
    location: "West Palm · Custom vanity & shower",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative section-pad bg-offwhite overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, #D4AF77 0%, transparent 70%)",
        }}
      />
      <div className="relative container mx-auto">
        <div className="max-w-2xl">
          <p className="eyebrow">What Owners Say</p>
          <h2 className="mt-4 font-display text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.01em]">
            5-star average across{" "}
            <span className="text-gold-gradient italic">240+ verified</span>{" "}
            Google &amp; Houzz reviews.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative bg-white rounded-[20px] p-9 flex flex-col transition-all duration-500 hover:-translate-y-1"
              style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}
            >
              <span
                aria-hidden
                className="absolute top-6 right-7 font-display text-[88px] leading-none text-gold/15 select-none"
              >
                &ldquo;
              </span>

              <div className="relative flex gap-0.5 text-gold text-[14px]">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="relative mt-5 text-[16px] leading-[1.6] text-navy/85 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="relative mt-7 pt-6 border-t border-navy/[0.08]">
                <p className="font-display text-[20px] text-navy">{t.name}</p>
                <p className="mt-1 text-[12px] uppercase tracking-[0.18em] font-semibold text-navy/55">
                  {t.location}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
