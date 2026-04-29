"use client";

import { useState } from "react";
import { Input, Select, Textarea } from "@/components/Input";
import { Button } from "@/components/Button";

const projectTypes = [
  "Full bathroom remodel",
  "Shower / wet room",
  "Vanity & millwork",
  "Powder room",
  "Whole-home (multiple baths)",
  "Not sure yet",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: projectTypes[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.phone.trim()) e.phone = "Please enter your phone number.";
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  return (
    <section className="bg-offwhite">
      <div className="container mx-auto py-[80px] md:py-[120px]">
        <div className="max-w-3xl">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4">
            Schedule a free consultation. A senior designer visits, not a
            salesperson.
          </h1>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          {/* Left: map + info */}
          <div className="flex flex-col gap-8">
            <div className="luxury-card overflow-hidden">
              <iframe
                title="Aurelia Bath Co. studio map"
                className="w-full h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-80.25%2C25.74%2C-80.13%2C25.82&layer=mapnik&marker=25.78%2C-80.19"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <InfoBlock
                title="Miami Studio"
                lines={[
                  "3811 NE 2nd Ave",
                  "Miami Design District, FL 33137",
                  "(305) 555-0134",
                ]}
              />
              <InfoBlock
                title="Ft Lauderdale Showroom"
                lines={[
                  "601 E Las Olas Blvd",
                  "Ft Lauderdale, FL 33301",
                  "(954) 555-0218",
                ]}
              />
              <InfoBlock
                title="Hours"
                lines={[
                  "Mon – Fri · 9:00 – 18:00",
                  "Saturday · by appointment",
                  "Sunday · closed",
                ]}
              />
              <InfoBlock
                title="Email"
                lines={[
                  "hello@aurelia.com",
                  "press@aurelia.com",
                  "careers@aurelia.com",
                ]}
              />
            </div>
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="luxury-card p-10">
                <div className="inline-grid place-items-center w-16 h-16 rounded-full bg-gold/20 text-gold">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-8 h-8"
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
                <h2 className="mt-6">Thank you, {form.name.split(" ")[0]}.</h2>
                <p className="mt-3 text-body text-navy/70">
                  We&apos;ll call {form.phone} within two hours to book your free
                  consultation. No pressure, no sales script.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  submit();
                }}
                className="luxury-card p-8 md:p-10 flex flex-col gap-6"
              >
                <Input
                  id="c-name"
                  label="Full name"
                  placeholder="Jane Whitmore"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  error={errors.name}
                />
                <Input
                  id="c-phone"
                  label="Phone"
                  type="tel"
                  placeholder="(305) 555-0134"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  error={errors.phone}
                />
                <Select
                  id="c-type"
                  label="Project type"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                >
                  {projectTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
                <Textarea
                  id="c-message"
                  label="Message"
                  placeholder="Tell us about your space, your timeline, and what you dream about…"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />

                <Button type="submit" withArrow className="mt-2">
                  Schedule Free Consultation
                </Button>

                <p className="text-caption text-navy/60">
                  97% of inquiries answered in under two hours. We never share
                  your info.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="mt-3 flex flex-col gap-1 text-body text-navy/80">
        {lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}
