import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Full Remodel", href: "/services" },
      { label: "Shower & Tub", href: "/services" },
      { label: "Custom Vanities", href: "/services" },
      { label: "Luxury Tile", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Quote", href: "/quote" },
      { label: "Contact", href: "/contact" },
      { label: "Process", href: "/services" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Miami", href: "/portfolio" },
      { label: "Ft Lauderdale", href: "/portfolio" },
      { label: "West Palm", href: "/portfolio" },
      { label: "Boca Raton", href: "/portfolio" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-offwhite">
      <div className="container mx-auto py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link
              href="/"
              className="font-display text-[28px] font-bold tracking-tight"
            >
              Aurelia<span className="text-gold">.</span>
            </Link>
            <p className="mt-4 text-body text-offwhite/70 max-w-xs">
              Luxury bathroom remodeling for the homes of South Florida.
              Transform in 4 weeks.
            </p>
            <div className="flex gap-3 mt-6">
              {["IG", "FB", "IN"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-11 h-11 rounded-full border border-offwhite/20 grid place-items-center text-caption text-offwhite/80 hover:bg-gold hover:text-navy hover:border-gold transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-body text-offwhite/80 hover:text-gold transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-offwhite/10 flex flex-col md:flex-row justify-between gap-3 text-caption text-offwhite/60">
          <p>© {new Date().getFullYear()} Aurelia Bath Co. All rights reserved.</p>
          <p>Licensed & Insured · FL CGC-1529384</p>
        </div>
      </div>
    </footer>
  );
}
