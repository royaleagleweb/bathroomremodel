import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ServiceCard } from "@/components/Card";
import { TrustBar } from "@/components/TrustBar";
import { Hero } from "@/components/Hero";
import { getUploadedImages } from "@/lib/uploads";

const serviceCopy = [
  {
    title: "Full Primary Suite Remodel",
    price: "$62k",
    description:
      "Studs-to-soul transformation. Italian tile, custom millwork, and spa-grade fixtures.",
  },
  {
    title: "Walk-In Shower & Wet Room",
    price: "$28k",
    description:
      "Frameless glass, radiant floors, and zero-threshold entries engineered for South Florida.",
  },
  {
    title: "Custom Vanity & Millwork",
    price: "$18k",
    description:
      "Hand-selected stone, brushed brass, and cabinetry built for the humidity of the coast.",
  },
];

function pick(images: string[], index: number, fallback = ""): string {
  if (images.length === 0) return fallback;
  return images[index % images.length];
}

export default function HomePage() {
  const images = getUploadedImages();
  const heroImage = pick(images, 0);
  const services = serviceCopy.map((s, i) => ({
    ...s,
    image: pick(images, i + 1),
  }));
  const teasers = Array.from({ length: 6 }, (_, i) => pick(images, i + 4));

  return (
    <>
      <Hero bgImage={heroImage} />

      <TrustBar />

      {/* Services */}
      <section className="section-pad bg-offwhite">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Signature Services</p>
              <h2 className="mt-3">
                Spaces that feel inevitable — as if they were always meant to
                be yours.
              </h2>
            </div>
            <Link
              href="/services"
              className="text-caption uppercase tracking-cta font-semibold text-navy hover:text-gold transition-colors"
            >
              All services →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="section-pad bg-cream-light">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Recent Work</p>
              <h2 className="mt-3">
                Six weeks ago these were dated. Today they feel inherited
                from a Milanese penthouse.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="text-caption uppercase tracking-cta font-semibold text-navy hover:text-gold transition-colors"
            >
              Full portfolio →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
            {teasers.map((src, i) => (
              <div
                key={i}
                className="luxury-card relative"
                style={{ height: i % 2 === 0 ? 360 : 280 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-cream"
                  style={{ backgroundImage: src ? `url(${src})` : undefined }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-offwhite">
                    <p className="eyebrow text-gold">Coral Gables</p>
                    <p className="mt-1 font-display text-[22px]">
                      Primary Suite No. {i + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="bg-navy text-offwhite section-pad">
        <div className="container mx-auto grid md:grid-cols-4 gap-10">
          {[
            { step: "01", title: "Consult", body: "A designer visits your home within 48 hours." },
            { step: "02", title: "Design", body: "3D renderings + fixed fixture schedule in 7 days." },
            { step: "03", title: "Build", body: "Dedicated crews, typical build in 4 weeks." },
            { step: "04", title: "Delight", body: "Walkthrough, 5-year craftsmanship warranty." },
          ].map((p) => (
            <div key={p.step}>
              <p className="font-display text-[52px] text-gold leading-none">
                {p.step}
              </p>
              <h3 className="mt-4 text-offwhite">{p.title}</h3>
              <p className="mt-2 text-body text-offwhite/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-offwhite">
        <div className="container mx-auto">
          <div className="rounded-card bg-navy text-offwhite px-8 md:px-16 py-20 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-25 bg-cover bg-center"
              style={{ backgroundImage: heroImage ? `url(${heroImage})` : undefined }}
            />
            <div className="relative">
              <p className="eyebrow text-gold">Transform in 4 weeks</p>
              <h2 className="mt-4 max-w-3xl mx-auto">
                Your quote, answered in under two hours — no hidden fees, no
                pushy sales.
              </h2>
              <div className="mt-10 flex justify-center">
                <ButtonLink href="/quote" withArrow>
                  Start My Quote
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
