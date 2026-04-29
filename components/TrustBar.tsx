const badges = [
  "Miami Design District",
  "Ft Lauderdale Living",
  "NARI Member",
  "Houzz Pro 2026",
  "Best of South FL",
];

export function TrustBar() {
  return (
    <section className="bg-navy text-offwhite">
      <div className="container mx-auto py-9">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] font-semibold text-offwhite/40">
          As featured in
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {badges.map((b) => (
            <span
              key={b}
              className="font-display italic text-[20px] text-offwhite/65"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
