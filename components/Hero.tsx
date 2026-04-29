"use client";

import { useState } from "react";

export function Hero({ bgImage = "" }: { bgImage?: string }) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-charcoal-deep">
      {/* Photo background with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep via-charcoal-deep/85 to-charcoal-deep/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/70 via-transparent to-charcoal-deep" />

      <div className="relative container mx-auto py-[80px] md:py-[120px] grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 items-center">
        {/* Left: pitch */}
        <div className="text-offwhite">
          <h1 className="font-bold text-offwhite text-[40px] md:text-[64px] lg:text-[72px] leading-[0.98] uppercase tracking-tight">
            #1 Luxury <br />
            Bathroom <br />
            <span className="relative inline-block">
              Remodeler
              <Brushstroke />
            </span>
            <br />
            South Florida
          </h1>

          <h2 className="mt-10 font-bold text-offwhite text-[22px] md:text-[26px] uppercase tracking-tight">
            <span className="relative inline-block">
              Craftsmanship Built on
              <br />
              Trust &amp; Design
              <Brushstroke />
            </span>
          </h2>

          <ul className="mt-10 space-y-3">
            <CheckItem>
              Locally Serving <strong>Miami, Ft Lauderdale, &amp; West Palm</strong>
            </CheckItem>
            <CheckItem>
              Customer-First Design Approach · <strong>620+ Suites Built</strong>
            </CheckItem>
            <CheckItem>
              Price-Lock Guarantee · <strong>5-Year Craftsmanship Warranty</strong>
            </CheckItem>
          </ul>

          <RatingBadges />

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#quote-form" className="btn-pill">
              Book a Free Consultation
            </a>
            <a href="tel:+13055550134" className="btn-pill-outline">
              Call (305) 555-0134
            </a>
          </div>
        </div>

        {/* Right: lead capture form card */}
        <div id="quote-form">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-body text-offwhite">
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
    <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-offwhite/5 border border-offwhite/10 px-4 py-3">
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
      className="absolute left-0 right-0 -bottom-4 w-full h-4 text-gold"
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
      <div className="rounded-3xl bg-offwhite/5 border border-gold/40 p-8 backdrop-blur-md">
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
        <h3 className="mt-5 font-bold text-offwhite text-[28px] uppercase tracking-tight">
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
    <div className="rounded-3xl bg-offwhite/5 border border-offwhite/15 p-8 md:p-10 backdrop-blur-md">
      <h3 className="text-center font-bold text-offwhite text-[26px] md:text-[30px] uppercase tracking-tight">
        Get Your Free <span className="text-gold">Bathroom Quote!</span>
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

        <button type="submit" className="btn-pill mt-2 h-[60px] text-[15px]">
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
