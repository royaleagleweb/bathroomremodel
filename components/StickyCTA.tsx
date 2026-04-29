export function StickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-charcoal-deep/95 backdrop-blur-md border-t border-gold/20 px-4 py-3 flex gap-2 shadow-[0_-8px_24px_rgba(0,0,0,0.3)]">
      <a
        href="tel:+13055550134"
        className="flex-1 h-[52px] rounded-full border-2 border-gold text-gold font-bold text-caption uppercase tracking-cta inline-flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden>
          <path
            d="M3 5.5C3 4.12 4.12 3 5.5 3h2c1.1 0 2 .9 2 2 0 1.27.2 2.5.57 3.65.13.4.04.85-.27 1.16l-1.62 1.62a16 16 0 0 0 6.39 6.39l1.62-1.62c.31-.31.76-.4 1.16-.27 1.15.37 2.38.57 3.65.57 1.1 0 2 .9 2 2v2c0 1.38-1.12 2.5-2.5 2.5C11.83 23 1 12.17 1 5.5 1 4.12 2.12 3 3.5 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        Call
      </a>
      <a
        href="#quote-form"
        className="flex-1 h-[52px] rounded-full bg-gold text-white font-bold text-caption uppercase tracking-cta inline-flex items-center justify-center active:scale-95 transition-transform"
      >
        Free Quote
      </a>
    </div>
  );
}
