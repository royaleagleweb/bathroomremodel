"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/quote", label: "Quote" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-charcoal-deep/95 backdrop-blur-md border-b border-offwhite/5">
      <div className="container mx-auto flex items-center justify-between h-[68px] sm:h-[80px] lg:h-[88px]">
        <Link
          href="/"
          className="font-display text-[22px] sm:text-[26px] font-bold text-offwhite tracking-tight"
        >
          Aurelia<span className="text-gold">.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-caption uppercase tracking-cta font-bold text-offwhite/80 hover:text-gold transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/quote" className="btn-pill h-11 px-5 text-[12px]">
            Get Free Quote
          </Link>
          <a href="tel:+13055550134" className="btn-pill h-11 px-5 text-[12px]">
            <PhoneIcon />
            <span className="ml-2">Call</span>
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative w-10 h-10 grid place-items-center"
        >
          <span
            className={`absolute block w-6 h-[2px] bg-offwhite transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute block w-6 h-[2px] bg-offwhite transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute block w-6 h-[2px] bg-offwhite transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[68px] bottom-0 bg-charcoal-deep/98 backdrop-blur-xl border-t border-offwhite/10 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto flex flex-col gap-1 py-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-[20px] font-display text-offwhite hover:text-gold transition-colors border-b border-offwhite/5"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-6">
            <Link
              href="/quote"
              className="btn-pill"
              onClick={() => setOpen(false)}
            >
              Get Free Quote
            </Link>
            <a href="tel:+13055550134" className="btn-pill-outline">
              <PhoneIcon />
              <span className="ml-2">Call (305) 555-0134</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
