"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/quote", label: "Quote" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-offwhite/90 backdrop-blur-md border-b border-navy/5">
      <div className="container mx-auto flex items-center justify-between h-[88px]">
        <Link
          href="/"
          className="font-display text-[26px] font-bold text-navy tracking-tight"
        >
          Aurelia<span className="text-gold">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-caption uppercase tracking-cta font-medium text-navy/80 hover:text-gold transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/quote" className="btn-primary h-12 px-6">
            Get Instant Quote
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-6 h-[2px] bg-navy" />
          <span className="block w-6 h-[2px] bg-navy" />
          <span className="block w-6 h-[2px] bg-navy" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-navy/5 bg-offwhite">
          <div className="container mx-auto flex flex-col gap-4 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-caption uppercase tracking-cta font-medium text-navy/80"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className="btn-primary h-12 px-6 w-fit"
              onClick={() => setOpen(false)}
            >
              Get Instant Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
