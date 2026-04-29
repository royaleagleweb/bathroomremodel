"use client";

import { useState } from "react";

export function Hero({ bgImage = "" }: { bgImage?: string }) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-charcoal-deep grain">
      {/* Cinematic photo background with slow ken-burns zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 animate-kenburns"
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
      />

      {/* Layered gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep via-charcoal-deep/75 to-charcoal-deep/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/55 via-transparent to-charcoal-deep" />

      {/* Soft gold accent orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[140px] opacity-25 animate-float"
        style={{ background: "radial-gradient(circle, #D4AF77 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-180px] right-[-140px] w-[560px] h-[560px] rounded-full blur-[160px] opacity-20 animate-float"
        style={{
          background: "radial-gradient(circle, #E8C988 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      <div className="relative container mx-auto py-[80px] md:py-[140px] grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-16 items-center">
        {/* Left: pitch */}
        <div className="text-offwhite">
          {/* Tag chip */}
          <div
            className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/[0.06] backdrop-blur-md px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-gold"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Now booking · 6 builds / month
          </div>

          <h1 className="mt-7 font-display font-normal text-offwhite text-[52px] md:text-[80px] lg:text-[92px] leading-[0.92] tracking-[-0.02em]">
            <span
              className="block animate-fade-up italic font-light text-offwhite/95"
              style={{ animationDelay: "0.15s" }}
            >
              Luxury baths,
            </span>
            <span
              className="block animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="text-gold-shimmer">reimagined</span>
            </span>
            <span
              className="block animate-fade-up font-light text-offwhite/95"
              style={{ animationDelay: "0.45s" }}
            >
              for South Florida.
            </span>
          </h1>

          <p
            className="mt-8 animate-fade-up max-w-lg text-[18px] md:text-[19px] leading-[1.55] text-offwhite/75"
            style={{ animationDelay: "0.6s" }}
          >
            Hand-built primary suites, wet rooms, and powder rooms across Miami,
            Ft Lauderdale, and West Palm — fixed price, four-week build,
            five-year warranty.
          </p>

          <ul
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up max-w-xl"
            style={{ animationDelay: "0.75s" }}
          >
            {[
              { k: "620+", v: "Suites built" },
              { k: "4 wk", v: "Typical build" },
              { k: "5 yr", v: "Warranty" },
            ].map((s) => (
              <li key={s.k}>
                <p className="font-display text-[28px] leading-none text-gold">
                  {s.k}
                </p>
                <p className="mt-1.5 text-[12px] uppercase tracking-[0.18em] font-semibold text-offwhite/55">
                  {s.v}
                </p>
              </li>
            ))}
          </ul>

          <div
            className="mt-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            <a href="#quote-form" className="btn-pill">
              Book a Free Consultation
            </a>
            <a
              href="tel:+13055550134"
              className="text-caption uppercase tracking-cta font-bold text-offwhite/80 hover:text-gold transition-colors px-2"
            >
              or call (305) 555-0134
            </a>
          </div>

          <div
            className="mt-10 animate-fade-up flex items-center gap-4"
            style={{ animationDelay: "1.05s" }}
          >
            <div className="flex gap-0.5 text-gold text-[14px]">
              {"★★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
            <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-offwhite/65">
              5.0 · 240+ verified reviews on Google &amp; Houzz
            </p>
          </div>
        </div>

        {/* Right: lead capture form card */}
        <div
          id="quote-form"
          className="animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <LeadForm />
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#portfolio"
        aria-label="Scroll to portfolio"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-offwhite/55 hover:text-gold transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
          Explore
        </span>
        <span className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent animate-scroll-cue" />
      </a>
    </section>
  );
}

const projectTypes = [
  "Full Bathroom Remodel",
  "Shower / Wet Room",
  "Vanity & Millwork",
  "Powder Room",
  "Whole-Home (multiple baths)",
  "Not Sure Yet",
];

function LeadForm() {
  const [form, setForm] = useState({
    type: "",
    name: "",
    phone: "",
    zip: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (!form.type) e.type = "Pick a project type.";
    if (!form.name.trim()) e.name = "Enter your name.";
    if (form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Enter a 10-digit phone.";
    if (!/^\d{5}$/.test(form.zip)) e.zip = "Enter a valid 5-digit ZIP.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative rounded-[28px] glass-card p-9">
        <div className="w-12 h-12 rounded-full bg-gold/15 text-gold grid place-items-center ring-1 ring-gold/30">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-offwhite text-[30px] leading-tight">
          You&apos;re booked, {form.name.split(" ")[0]}.
        </h3>
        <p className="mt-3 text-body text-offwhite/75">
          A senior designer will call {form.phone} within two hours. Check
          your inbox for a calendar invite.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Soft gold gradient frame */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-[28px] opacity-40 blur-[3px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(232,201,136,0.5), rgba(212,175,119,0.05) 35%, rgba(176,138,74,0.5))",
        }}
      />
      <div className="relative rounded-[28px] glass-card p-8 md:p-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gold/85">
            Free · No obligation
          </p>
          <h3 className="mt-3 font-display text-offwhite text-[30px] md:text-[34px] leading-[1.05]">
            Get your free <span className="text-gold-gradient italic">bathroom quote</span>
          </h3>
        </div>

        <form
          className="mt-7 flex flex-col gap-3"
          onSubmit={(ev) => {
            ev.preventDefault();
            submit();
          }}
        >
          <PillSelect
            value={form.type}
            onChange={(v) => setForm((f) => ({ ...f, type: v }))}
            error={errors.type}
            label="What kind of project?"
          >
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </PillSelect>
          <PillInput
            placeholder="Name"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            error={errors.name}
          />
          <div className="grid grid-cols-2 gap-3">
            <PillInput
              placeholder="Phone"
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              error={errors.phone}
            />
            <PillInput
              placeholder="ZIP"
              inputMode="numeric"
              value={form.zip}
              onChange={(v) => setForm((f) => ({ ...f, zip: v }))}
              error={errors.zip}
            />
          </div>
          <PillInput
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            error={errors.email}
          />

          <button type="submit" className="btn-pill mt-3 h-[58px] text-[14px]">
            Book a Free Consultation
          </button>

          <p className="mt-2 text-center text-[11px] uppercase tracking-[0.18em] font-semibold text-offwhite/45">
            SSL secured · 97% answered in &lt;2 hrs
          </p>
        </form>
      </div>
    </div>
  );
}

function PillInput({
  placeholder,
  value,
  onChange,
  error,
  ...rest
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
        className={`input-pill ${error ? "ring-2 ring-error focus:ring-error" : ""}`}
        {...rest}
      />
      {error && (
        <p className="mt-1 pl-5 text-caption text-[#FCA5A5]">⚠ {error}</p>
      )}
    </div>
  );
}

function PillSelect({
  value,
  onChange,
  error,
  label,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input-pill appearance-none pr-12 ${
          error ? "ring-2 ring-error focus:ring-error" : ""
        } ${value === "" ? "text-navy/45" : "text-navy"}`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230F172A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 20px center",
          backgroundSize: "20px",
        }}
      >
        <option value="" disabled>
          {label}
        </option>
        {children}
      </select>
      {error && (
        <p className="mt-1 pl-5 text-caption text-[#FCA5A5]">⚠ {error}</p>
      )}
    </div>
  );
}
