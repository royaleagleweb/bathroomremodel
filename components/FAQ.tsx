const faqs = [
  {
    q: "How fast can my bathroom be done?",
    a: "Most full primary suites are built in 4 weeks. Powder rooms in 10 days. We give you a fixed schedule on day one and pay you back if we miss it.",
  },
  {
    q: "Will the price change once you start demo?",
    a: "No. Our quote includes our Price-Lock Guarantee in writing. If we hit something behind a wall, we eat the cost — that's our problem, not yours.",
  },
  {
    q: "Are you licensed and insured in Miami-Dade, Broward, and Palm Beach?",
    a: "Yes. CGC1531882, $2M general liability, full workers' comp. We pull every permit and handle inspections so you don't have to.",
  },
  {
    q: "Do you handle design or just build?",
    a: "Both. Every project includes a senior designer, 3D renderings, and a fixed fixture schedule before we swing a hammer.",
  },
  {
    q: "What's the warranty?",
    a: "5-year craftsmanship warranty on everything we install, plus all manufacturer warranties on fixtures and stone.",
  },
  {
    q: "How does the free consultation work?",
    a: "A senior designer comes to your home within 48 hours, measures, listens, and emails a fixed quote within two business hours. No high-pressure sales, ever.",
  },
];

export function FAQ() {
  return (
    <section className="section-pad bg-cream-light">
      <div className="container mx-auto">
        <div className="max-w-2xl">
          <p className="eyebrow">Before You Book</p>
          <h2 className="mt-3">The questions every smart homeowner asks.</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl bg-white border border-navy/10 px-6 py-5 transition-shadow duration-300 hover:shadow-card open:shadow-card"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
                <span className="font-display text-[20px] md:text-[22px] text-navy">
                  {f.q}
                </span>
                <span className="shrink-0 w-10 h-10 rounded-full bg-cream-light grid place-items-center text-gold transition-transform duration-300 group-open:rotate-45">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5"
                    aria-hidden
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-body text-navy/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
