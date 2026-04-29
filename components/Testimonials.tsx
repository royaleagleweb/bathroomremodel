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
    <section className="section-pad bg-offwhite">
      <div className="container mx-auto">
        <div className="max-w-2xl">
          <p className="eyebrow">What Owners Say</p>
          <h2 className="mt-3">
            5-star average across 240+ verified Google &amp; Houzz reviews.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-white rounded-card p-8 shadow-card flex flex-col"
            >
              <div className="flex gap-1 text-gold text-[18px]">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-5 text-body text-navy/85 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-navy/10">
                <p className="font-display text-[20px] text-navy">
                  {t.name}
                </p>
                <p className="text-caption text-navy/60 mt-1">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
