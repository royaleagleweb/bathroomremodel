const stats = [
  { value: "620+", label: "Suites Built" },
  { value: "4 wk", label: "Typical Build" },
  { value: "240+", label: "5-Star Reviews" },
  { value: "5 yr", label: "Craftsmanship Warranty" },
];

export function Stats() {
  return (
    <section className="relative bg-charcoal-deep text-offwhite overflow-hidden">
      {/* Top gold hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      {/* Bottom gold hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container mx-auto py-14 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center md:px-6 ${
              i !== 0 ? "md:border-l md:border-offwhite/10" : ""
            }`}
          >
            <p className="font-display text-[44px] md:text-[64px] leading-none text-gold-shimmer">
              {s.value}
            </p>
            <p className="mt-3 text-caption uppercase tracking-cta font-bold text-offwhite/70">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
