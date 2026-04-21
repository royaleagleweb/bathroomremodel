import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ServiceCard } from "@/components/Card";
import { TrustBar } from "@/components/TrustBar";

const heroImage =
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2400&q=80";

const services = [
  {
    title: "Full Primary Suite Remodel",
    price: "$62k",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    description:
      "Studs-to-soul transformation. Italian tile, custom millwork, and spa-grade fixtures.",
  },
  {
    title: "Walk-In Shower & Wet Room",
    price: "$28k",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80",
    description:
      "Frameless glass, radiant floors, and zero-threshold entries engineered for South Florida.",
  },
  {
    title: "Custom Vanity & Millwork",
    price: "$18k",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    description:
      "Hand-selected stone, brushed brass, and cabinetry built for the humidity of the coast.",
  },
];

const teaser = [
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/90" />

        <div className="relative container mx-auto py-[120px] text-offwhite">
          <p className="eyebrow text-gold">South Florida · Est. 2012</p>
          <h1 className="mt-4 max-w-4xl text-offwhite text-[56px] md:text-[88px] leading-[1.02] font-display font-bold tracking-tight">
            Luxury Bathrooms,
            <br />
            <span className="italic text-gold">Reimagined</span> in South Florida.
          </h1>
          <p className="mt-6 max-w-xl text-body text-offwhite/85">
            Design-build studios across Miami, Ft Lauderdale, and West Palm.
            97% of quotes answered in under 2 hours.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/quote" withArrow>
              Get Instant Quote
            </ButtonLink>
            <Link
              href="/portfolio"
              className="btn-secondary border-offwhite/60 text-offwhite hover:text-navy"
            >
              View Portfolio
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap gap-10 text-offwhite/80">
            <Stat value="620+" label="Suites Completed" />
            <Stat value="4 wk" label="Average Build" />
            <Stat value="4.98★" label="Houzz Rating" />
          </div>
        </div>
      </section>

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
            {teaser.map((src, i) => (
              <div
                key={src}
                className={`luxury-card h-[${
                  i % 2 === 0 ? "360" : "280"
                }px] relative`}
                style={{ height: i % 2 === 0 ? 360 : 280 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
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
              style={{ backgroundImage: `url(${heroImage})` }}
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-[48px] leading-none text-gold">{value}</p>
      <p className="mt-1 text-caption uppercase tracking-cta text-offwhite/70">
        {label}
      </p>
    </div>
  );
}
