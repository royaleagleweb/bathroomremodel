"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Input, Textarea } from "@/components/Input";
import { Button } from "@/components/Button";
import { QUOTE_ROOMS } from "@/lib/images";

type Step = 1 | 2 | 3 | 4;

const rooms = [
  { key: "full", title: "Full Remodel", sub: "Studs up", image: QUOTE_ROOMS.full },
  { key: "shower", title: "Shower / Wet Room", sub: "Frameless + tile", image: QUOTE_ROOMS.shower },
  { key: "vanity", title: "Vanity & Millwork", sub: "Stone + brass", image: QUOTE_ROOMS.vanity },
  { key: "powder", title: "Powder Room", sub: "Statement", image: QUOTE_ROOMS.powder },
];

const styles = [
  { key: "modern", label: "Modern Coastal" },
  { key: "italianate", label: "Italianate" },
  { key: "artdeco", label: "Miami Art Deco" },
  { key: "minimalist", label: "Warm Minimalist" },
  { key: "traditional", label: "Transitional" },
  { key: "spa", label: "Japandi Spa" },
];

export default function QuotePage() {
  const [step, setStep] = useState<Step>(1);
  const [room, setRoom] = useState("");
  const [style, setStyle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const progress = step === 4 ? 100 : ((step - 1) / 3) * 100;

  const canContinue1 = !!room;
  const canContinue2 = !!style;

  const validateFinal = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Your name helps us personalize the call.";
    if (!form.phone.trim()) e.phone = "We need your phone to text your quote.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (!form.date) e.date = "Pick a consultation date.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (f: File | null) => {
    setUploadError(null);
    if (!f) {
      setFile(null);
      return;
    }
    if (!/image\/(png|jpe?g|heic|webp)/.test(f.type)) {
      setUploadError("Only JPG, PNG, HEIC, or WebP images are supported.");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setUploadError("File must be under 8 MB.");
      return;
    }
    setFile(f);
  };

  return (
    <section className="bg-offwhite">
      <div className="container mx-auto py-[80px] md:py-[120px] max-w-5xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <p className="eyebrow">
            {step < 4 ? `Step ${step} of 3` : "Complete"}
          </p>
          <p className="text-caption text-navy/60">
            97% of quotes answered in under 2 hours
          </p>
        </div>
        <div className="h-2 w-full bg-navy/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-500 ease-luxury"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-12">
          {step === 1 && (
            <div>
              <h1>Which room are we reimagining?</h1>
              <p className="mt-4 text-body text-navy/70 max-w-xl">
                Pick a starting point — you can expand scope at design
                consultation.
              </p>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                {rooms.map((r) => {
                  const active = room === r.key;
                  return (
                    <button
                      key={r.key}
                      onClick={() => setRoom(r.key)}
                      className={`luxury-card text-left p-0 overflow-hidden border-2 transition-all ${
                        active
                          ? "border-gold ring-4 ring-gold/25"
                          : "border-transparent"
                      }`}
                    >
                      <div
                        className="h-36 bg-cover bg-center"
                        style={{ backgroundImage: `url(${r.image})` }}
                      />
                      <div className="p-4">
                        <p className="font-display text-[20px]">{r.title}</p>
                        <p className="text-caption uppercase tracking-cta text-navy/60 mt-1">
                          {r.sub}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-12 flex justify-between gap-4">
                <Link
                  href="/"
                  className="text-caption uppercase tracking-cta font-semibold text-navy/70 hover:text-gold self-center"
                >
                  ← Back to home
                </Link>
                <Button
                  withArrow
                  disabled={!canContinue1}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1>What feeling should the space give off?</h1>
              <p className="mt-4 text-body text-navy/70 max-w-xl">
                Pick a style and drop in a reference photo — Pinterest link,
                Instagram screenshot, anything.
              </p>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                {styles.map((s) => {
                  const active = style === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setStyle(s.key)}
                      className={`h-[72px] rounded-2xl border-2 px-6 text-left font-display text-[20px] transition-all ${
                        active
                          ? "border-gold bg-gold/10"
                          : "border-navy/15 hover:border-gold"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10">
                <p className="label-above">Reference photo (optional)</p>
                <div
                  className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                    uploadError
                      ? "border-error bg-error/5"
                      : "border-navy/20 bg-white"
                  }`}
                >
                  {file ? (
                    <div>
                      <p className="font-display text-[22px]">{file.name}</p>
                      <p className="mt-1 text-caption text-navy/60">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        className="mt-4 text-caption uppercase tracking-cta font-semibold text-gold"
                        onClick={() => {
                          setFile(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                      >
                        Replace
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="font-display text-[22px]">
                        Drop an inspiration photo here
                      </p>
                      <p className="mt-2 text-caption text-navy/60">
                        JPG, PNG, HEIC, or WebP — up to 8 MB
                      </p>
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="mt-6 btn-secondary h-12 px-6"
                      >
                        Choose File
                      </button>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  />
                </div>
                {uploadError && (
                  <p className="mt-2 flex items-center gap-2 text-caption text-error">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-9.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zM10 14a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {uploadError}
                  </p>
                )}
              </div>

              <div className="mt-12 flex justify-between gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-caption uppercase tracking-cta font-semibold text-navy/70 hover:text-gold self-center"
                >
                  ← Back
                </button>
                <Button
                  withArrow
                  disabled={!canContinue2}
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1>Where should we send the quote?</h1>
              <p className="mt-4 text-body text-navy/70 max-w-xl">
                Pick a time for a free 30-minute designer consultation. You&apos;ll
                hear from us within two hours.
              </p>

              <div className="mt-10 grid md:grid-cols-2 gap-5">
                <Input
                  id="name"
                  label="Full name"
                  placeholder="Jane Whitmore"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  error={errors.name}
                />
                <Input
                  id="phone"
                  label="Phone"
                  type="tel"
                  placeholder="(305) 555-0134"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  error={errors.phone}
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="jane@aurelia.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  error={errors.email}
                />
                <Input
                  id="date"
                  label="Preferred consultation date"
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  error={errors.date}
                />
                <div className="md:col-span-2">
                  <Textarea
                    id="notes"
                    label="Anything we should know? (optional)"
                    placeholder="We're renovating the primary suite before the holidays…"
                    value={form.notes}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, notes: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="mt-12 flex justify-between gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-caption uppercase tracking-cta font-semibold text-navy/70 hover:text-gold self-center"
                >
                  ← Back
                </button>
                <Button
                  withArrow
                  onClick={() => {
                    if (validateFinal()) setStep(4);
                  }}
                >
                  Send My Quote
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="inline-grid place-items-center w-20 h-20 rounded-full bg-gold/20 text-gold">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-10 h-10"
                  aria-hidden
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="mt-6">You&apos;re on the list, {form.name.split(" ")[0] || "friend"}.</h1>
              <p className="mt-4 text-body text-navy/70 max-w-xl mx-auto">
                A senior designer will reach out at{" "}
                <span className="font-semibold text-navy">{form.phone}</span> within
                two hours. We&apos;ll confirm your consultation for{" "}
                <span className="font-semibold text-navy">{form.date}</span>.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Add to my calendar
                </a>
                <Link href="/portfolio" className="btn-secondary">
                  Explore portfolio
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
