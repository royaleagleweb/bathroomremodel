import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ServiceCard } from "@/components/Card";
import { TrustBar } from "@/components/TrustBar";
import { Hero } from "@/components/Hero";
import { HERO, SERVICE_IMAGES, TEASER_IMAGES } from "@/lib/images";

const services = [
  {
    title: "Full Primary Suite Remodel",
    price: "$62k",
    image: SERVICE_IMAGES.fullRemodel,
    description:
      "Studs-to-soul transformation. Italian tile, custom millwork, and spa-grade fixtures.",
  },
  {
    title: "Walk-In Shower & Wet Room",
    price: "$28k",
    image: SERVICE_IMAGES.shower,
    description:
      "Frameless glass, radiant floors, and zero-threshold entries engineered for South Florida.",
  },
  {
    title: "Custom Vanity & Millwork",
    price: "$18k",
    image: SERVICE_IMAGES.vanity,
    description:
      "Hand-selected stone, brushed brass, and cabinetry built for the humidity of the coast.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

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

          <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

          <div className="mt-10 lg:mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
            {TEASER_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`luxury-card relative ${
                  i % 2 === 0
                    ? "h-[200px] sm:h-[280px] md:h-[360px]"
                    : "h-[160px] sm:h-[220px] md:h-[280px]"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-cream"
                  style={{ backgroundImage: `url(${src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-90 md:opacity-0 md:hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 sm:p-6 text-offwhite">
                    <p className="eyebrow text-gold">Coral Gables</p>
                    <p className="mt-1 font-display text-[16px] sm:text-[20px] md:text-[22px]">
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
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {[
            { step: "01", title: "Consult", body: "A designer visits your home within 48 hours." },
            { step: "02", title: "Design", body: "3D renderings + fixed fixture schedule in 7 days." },
            { step: "03", title: "Build", body: "Dedicated crews, typical build in 4 weeks." },
            { step: "04", title: "Delight", body: "Walkthrough, 5-year craftsmanship warranty." },
          ].map((p) => (
            <div key={p.step}>
              <p className="font-display text-[40px] sm:text-[48px] lg:text-[52px] text-gold leading-none">
                {p.step}
              </p>
              <h3 className="mt-3 sm:mt-4 text-offwhite">{p.title}</h3>
              <p className="mt-2 text-body text-offwhite/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-offwhite">
        <div className="container mx-auto">
          <div className="rounded-card bg-navy text-offwhite px-6 sm:px-10 md:px-16 py-14 sm:py-16 lg:py-20 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-25 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO.desktop})` }}
            />
            <div className="relative">
              <p className="eyebrow text-gold">Transform in 4 weeks</p>
              <h2 className="mt-4 max-w-3xl mx-auto">
                Your quote, answered in under two hours — no hidden fees, no
                pushy sales.
              </h2>
              <div className="mt-8 sm:mt-10 flex justify-center">
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
