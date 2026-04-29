const stats = [
  { value: "620+", label: "Suites built" },
  { value: "4 wk", label: "Typical build" },
  { value: "240+", label: "5-star reviews" },
  { value: "5 yr", label: "Warranty" },
];

export function Stats() {
  return (
    <section className="relative bg-charcoal-deep text-offwhite overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container mx-auto py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-y-10">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center md:px-8 ${
              i !== 0 ? "md:border-l md:border-offwhite/10" : ""
            }`}
          >
            <p className="font-display font-light text-[44px] md:text-[60px] leading-none tracking-[-0.02em] text-gold-shimmer">
              {s.value}
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-offwhite/60">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
