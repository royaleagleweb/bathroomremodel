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
      <div className="container mx-auto py-8">
        <p className="text-center eyebrow text-offwhite/60">
          As featured in
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {badges.map((b) => (
            <span
              key={b}
              className="font-display text-[22px] text-offwhite/80"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
