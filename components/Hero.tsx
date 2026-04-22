"use client";

import Link from "next/link";
import { useState } from "react";
import { HERO, TEAM_AVATARS } from "@/lib/images";

export function Hero() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Enter a 10-digit phone — we'll text your quote.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy">
      {/* Background image + fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-charcoal" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${HERO.desktop})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/40" />

      <div className="relative container mx-auto py-[80px] md:py-[120px] text-offwhite grid lg:grid-cols-[minmax(0,1fr)_420px] gap-12 items-center">
        {/* Left: pitch + inline capture */}
        <div>
          <TrustRow />

          <h1 className="mt-6 text-offwhite text-[44px] md:text-[72px] lg:text-[84px] leading-[1.02] font-display font-bold tracking-tight">
            Luxury Bathrooms,
            <br />
            <span className="italic text-gold">Reimagined</span> in
            <br className="hidden md:block" /> South Florida.
          </h1>

          <p className="mt-6 max-w-xl text-body text-offwhite/85">
            Free in-home designer visit. Fixed-price quote in your inbox within
            two hours. Typical build: <span className="text-gold font-semibold">four weeks</span>.
          </p>

          {/* Inline capture */}
          <div className="mt-10 max-w-xl">
            {submitted ? (
              <div className="rounded-2xl bg-gold/15 border border-gold/40 p-6">
                <p className="eyebrow text-gold">You&apos;re in</p>
                <p className="mt-2 font-display text-[22px] text-offwhite">
                  A senior designer will text {phone} within two hours.
                </p>
                <Link
                  href="/quote"
                  className="mt-4 inline-flex items-center text-caption uppercase tracking-cta font-semibold text-gold"
                >
                  Finish your details →
                </Link>
              </div>
            ) : (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                  className="flex flex-col sm:flex-row gap-3 bg-offwhite/10 backdrop-blur-md p-2 rounded-2xl border border-offwhite/20"
                >
                  <input
                    type="tel"
                    inputMode="tel"
                    aria-label="Phone number"
                    placeholder="Your phone — we'll text your quote"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 h-[56px] px-5 rounded-xl bg-transparent text-offwhite text-body placeholder:text-offwhite/50 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <button
                    type="submit"
                    className="h-[56px] px-6 rounded-xl bg-gold text-navy font-sans font-semibold text-caption uppercase tracking-cta transition-all duration-300 ease-luxury hover:scale-[1.03] hover:shadow-gold-glow active:scale-95"
                  >
                    Text Me My Quote →
                  </button>
                </form>
                <p className="mt-3 text-caption text-offwhite/70">
                  {error ? (
                    <span className="text-[#FCA5A5]">⚠ {error}</span>
                  ) : (
                    <>
                      Takes 30 seconds · No obligation · 97% answered in under
                      2 hours
                    </>
                  )}
                </p>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-caption text-offwhite/80">
            <a
              href="tel:+13055550134"
              className="inline-flex items-center gap-2 hover:text-gold transition-colors"
            >
              <PhoneIcon />
              <span className="font-semibold">(305) 555-0134</span>
              <span className="text-offwhite/60">— answered by a real designer</span>
            </a>
            <Link href="/portfolio" className="underline underline-offset-4 decoration-gold/50 hover:text-gold">
              See recent work →
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-xl">
            <Stat value="620+" label="Suites built" />
            <Stat value="4.98★" label="Across 412 reviews" />
            <Stat value="4 wk" label="Average build" />
          </div>
        </div>

        {/* Right: social proof stack */}
        <div className="hidden lg:flex flex-col gap-4">
          <ScarcityCard />
          <LiveActivityCard />
          <GuaranteeCard />
        </div>
      </div>

      {/* Mobile floating CTA bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur border-t border-offwhite/10 p-3 flex gap-2">
        <a
          href="tel:+13055550134"
          className="flex-1 h-12 rounded-xl border border-offwhite/30 text-offwhite text-caption uppercase tracking-cta font-semibold grid place-items-center"
        >
          Call Now
        </a>
        <Link
          href="/quote"
          className="flex-1 h-12 rounded-xl bg-gold text-navy text-caption uppercase tracking-cta font-semibold grid place-items-center"
        >
          Free Quote
        </Link>
      </div>
    </section>
  );
}

function TrustRow() {
  return (
    <div className="inline-flex items-center gap-3 bg-offwhite/10 backdrop-blur-md border border-offwhite/20 rounded-full px-4 py-2 text-caption text-offwhite/90">
      <span className="flex gap-0.5 text-gold">
        {"★★★★★".split("").map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </span>
      <span className="font-semibold">4.98</span>
      <span className="text-offwhite/60">·</span>
      <span>412 Houzz & Google reviews</span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-[32px] md:text-[44px] leading-none text-gold">
        {value}
      </p>
      <p className="mt-1 text-caption uppercase tracking-cta text-offwhite/70">
        {label}
      </p>
    </div>
  );
}

function ScarcityCard() {
  return (
    <div className="rounded-2xl bg-offwhite/10 backdrop-blur-md border border-offwhite/20 p-6">
      <p className="eyebrow text-gold">April calendar</p>
      <p className="mt-2 font-display text-[28px] text-offwhite leading-tight">
        3 consultation slots left
      </p>
      <p className="mt-2 text-caption text-offwhite/70">
        Next available: Thursday, 10:30 AM · Coral Gables
      </p>
      <div className="mt-4 h-1.5 w-full bg-offwhite/15 rounded-full overflow-hidden">
        <div className="h-full w-[82%] bg-gold" />
      </div>
      <p className="mt-2 text-caption text-offwhite/50">82% of April booked</p>
    </div>
  );
}

function LiveActivityCard() {
  return (
    <div className="rounded-2xl bg-offwhite/10 backdrop-blur-md border border-offwhite/20 p-6 flex items-start gap-4">
      <div className="flex -space-x-3 shrink-0">
        {TEAM_AVATARS.map((src, i) => (
          <div
            key={i}
            className="w-11 h-11 rounded-full border-2 border-navy bg-cover bg-center bg-cream"
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden
          />
        ))}
      </div>
      <div>
        <p className="flex items-center gap-2 text-caption text-gold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          Live
        </p>
        <p className="mt-1 font-display text-[20px] text-offwhite leading-snug">
          New consult booked 14 min ago
        </p>
        <p className="mt-1 text-caption text-offwhite/60">
          Primary suite · Coral Gables
        </p>
      </div>
    </div>
  );
}

function GuaranteeCard() {
  return (
    <div className="rounded-2xl bg-gold/15 border border-gold/40 p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gold text-navy grid place-items-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
            <path
              d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="font-display text-[20px] text-offwhite leading-tight">
            Price-lock guarantee
          </p>
          <p className="text-caption text-offwhite/70">
            5-year craftsmanship warranty · Licensed FL CGC-1529384
          </p>
        </div>
      </div>
    </div>
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
