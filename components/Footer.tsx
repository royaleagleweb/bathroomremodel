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

const socials: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M13 22v-8h3l1-4h-4V7.5C13 6.4 13.4 6 14.5 6H17V2h-3.2C11.4 2 10 3.4 10 6.2V10H7v4h3v8h3z" />
      </svg>
    ),
  },
  {
    label: "Houzz",
    href: "#",
    icon: (
      <span className="font-display text-[16px] leading-none">h</span>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative bg-navy text-offwhite overflow-hidden">
      {/* Top gold hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Soft accent orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-[-6%] w-[420px] h-[420px] rounded-full blur-[140px] opacity-25"
        style={{
          background: "radial-gradient(circle, #D4AF77 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link
              href="/"
              className="inline-flex items-baseline font-display text-[28px] font-bold tracking-tight"
            >
              Aurelia
              <span className="text-gold-gradient text-[30px] leading-none">.</span>
            </Link>
            <p className="mt-4 text-body text-offwhite/70 max-w-xs">
              Luxury bathroom remodeling for the homes of South Florida.
              Transform in 4 weeks.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full border border-offwhite/20 grid place-items-center text-offwhite/80 hover:bg-gold hover:text-navy hover:border-gold hover:scale-110 transition-all duration-300"
                >
                  {s.icon}
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
                      className="group inline-flex items-center gap-2 text-body text-offwhite/80 hover:text-gold transition-colors"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-gold transition-all duration-300" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gold-divider mt-12" />

        <div className="mt-6 flex flex-col md:flex-row justify-between gap-3 text-caption text-offwhite/60">
          <p>
            © {new Date().getFullYear()} Aurelia Bath Co. All rights reserved.
          </p>
          <p>Licensed &amp; Insured · FL CGC-1529384</p>
        </div>
      </div>
    </footer>
  );
}
