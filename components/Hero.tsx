"use client";

import { useState } from "react";
import { HERO } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal-deep">
      {/* Background photo with Ken-Burns drift */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55 animate-hero-drift"
          style={{ backgroundImage: `url(${HERO.desktop})` }}
        />
        {/* Cinematic overlays — darken left for legibility, let image show on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep via-charcoal-deep/80 to-charcoal-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/40 via-transparent to-charcoal-deep" />
        {/* Soft gold vignette */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-gold/15 blur-[120px]" />
      </div>

      <div className="container mx-auto pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
        {/* Left: pitch */}
        <div className="text-offwhite max-w-2xl">
          <p className="eyebrow text-gold animate-fade-up">
            South Florida · Established 2014
          </p>

          <h1 className="mt-4 font-display text-h1 text-offwhite uppercase animate-fade-up delay-150">
            #1 Luxury <br className="hidden sm:block" />
            Bathroom <span className="relative inline-block">
              Remodeler
              <Brushstroke />
            </span>{" "}
            in South Florida
          </h1>

          <p className="mt-7 text-body text-offwhite/85 max-w-xl animate-fade-up delay-300">
            Studs-to-soul transformations across Miami, Ft Lauderdale, and West
            Palm — designed in days, built in weeks, guaranteed for years.
          </p>

          <ul className="mt-7 space-y-3 animate-fade-up delay-300">
            <CheckItem>
              <strong>620+ Suites Built</strong> · Customer-First Design
            </CheckItem>
            <CheckItem>
              <strong>Price-Lock Guarantee</strong> · 5-Year Warranty
            </CheckItem>
            <CheckItem>
              <strong>4-Week Average Build</strong> · Fixed Schedule
            </CheckItem>
          </ul>

          <RatingBadges />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up delay-450">
            <a href="#quote-form" className="btn-pill">
              Book a Free Consultation
            </a>
            <a href="tel:+13055550134" className="btn-pill-outline">
              Call (305) 555-0134
            </a>
          </div>
        </div>

        {/* Right: lead capture form card */}
        <div id="quote-form" className="animate-fade-up delay-300">
          <LeadForm />
        </div>
      </div>

      {/* Decorative gold rule */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
    </section>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-body text-offwhite/90">
      <span className="shrink-0 mt-1 text-gold">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

function RatingBadges() {
  return (
    <div className="mt-7 inline-flex items-center gap-4 rounded-2xl bg-offwhite/5 border border-offwhite/10 px-4 py-3 animate-fade-up delay-450">
      <div className="flex -space-x-2">
        <BrandBadge kind="facebook" />
        <BrandBadge kind="google" />
        <BrandBadge kind="bbb" />
      </div>
      <div>
        <p className="flex items-center gap-1 text-caption font-bold text-offwhite">
          5 Star &amp; A+ Rating
          <span className="flex gap-0.5 text-gold ml-2">
            {"★★★★★".split("").map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </span>
        </p>
        <p className="text-caption text-offwhite/60">
          Facebook, Google &amp; BBB
        </p>
      </div>
    </div>
  );
}

function BrandBadge({ kind }: { kind: "facebook" | "google" | "bbb" }) {
  if (kind === "facebook") {
    return (
      <div className="w-9 h-9 rounded-full bg-[#1877F2] text-white grid place-items-center font-bold text-[18px] border-2 border-charcoal-deep">
        f
      </div>
    );
  }
  if (kind === "google") {
    return (
      <div className="w-9 h-9 rounded-full bg-white grid place-items-center border-2 border-charcoal-deep">
        <span className="font-bold text-[16px]">
          <span className="text-[#4285F4]">G</span>
        </span>
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-[#00528C] text-white grid place-items-center font-bold text-[10px] border-2 border-charcoal-deep">
      BBB
    </div>
  );
}

function Brushstroke() {
  return (
    <svg
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute left-0 right-0 -bottom-2 sm:-bottom-3 w-full h-3 sm:h-4 text-gold"
    >
      <path
        d="M4 16 C 40 4, 80 22, 140 10 S 240 4, 296 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
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
      <div className="rounded-3xl bg-offwhite/5 border border-gold/40 p-7 sm:p-8 backdrop-blur-md">
        <div className="w-14 h-14 rounded-full bg-gold/20 text-gold grid place-items-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-h3 text-offwhite uppercase">
          You&apos;re Booked, {form.name.split(" ")[0]}.
        </h3>
        <p className="mt-3 text-body text-offwhite/80">
          A senior designer will call {form.phone} within two hours. Check your
          inbox for a calendar invite.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-offwhite/5 border border-offwhite/15 p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <h3 className="text-center font-display text-[22px] sm:text-[26px] lg:text-[28px] text-offwhite uppercase tracking-tight">
        Get Your Free <span className="text-gold">Bathroom Quote</span>
      </h3>
      <p className="mt-2 text-center text-caption text-offwhite/60">
        We&apos;ll never share your info with anyone.
      </p>

      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={(ev) => {
          ev.preventDefault();
          submit();
        }}
      >
        <PillSelect
          value={form.type}
          onChange={(v) => setForm((f) => ({ ...f, type: v }))}
          error={errors.type}
          label="Type of project you're interested in?"
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
        <PillInput
          placeholder="Phone Number"
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
          error={errors.phone}
        />
        <div className="grid grid-cols-2 gap-3">
          <PillInput
            placeholder="ZIP Code"
            inputMode="numeric"
            value={form.zip}
            onChange={(v) => setForm((f) => ({ ...f, zip: v }))}
            error={errors.zip}
          />
          <PillInput
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            error={errors.email}
          />
        </div>

        <button type="submit" className="btn-pill mt-2 h-[56px] sm:h-[60px] text-[15px]">
          Book a Free Consultation
        </button>
      </form>
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
        className={`input-pill appearance-none pr-12 uppercase tracking-cta text-caption font-semibold ${
          error ? "ring-2 ring-error focus:ring-error" : ""
        } ${value === "" ? "text-navy/50" : "text-navy"}`}
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
