import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ServiceCard } from "@/components/Card";
import { TrustBar } from "@/components/TrustBar";
import { Hero } from "@/components/Hero";
import { ImageMarquee } from "@/components/ImageMarquee";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { StickyCTA } from "@/components/StickyCTA";
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
  // Reverse marquee uses an offset slice so it doesn't mirror the gallery order
  const marquee =
    images.length > 1 ? [...images.slice(Math.floor(images.length / 2)), ...images.slice(0, Math.floor(images.length / 2))] : images;

  return (
    <>
      <Hero bgImage={heroImage} />

      <TrustBar />

      {/* Value-prop strip — three reasons to trust us */}
      <section className="bg-offwhite border-y border-navy/5">
        <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {[
            {
              title: "Fixed Price, In Writing",
              body: "Price-Lock Guarantee. The quote you sign is the invoice you pay.",
            },
            {
              title: "4-Week Builds, Typical",
              body: "Dedicated crews. Daily progress photos. Schedules we hit.",
            },
            {
              title: "5-Year Warranty",
              body: "Licensed, insured, and bonded. We stand behind every joint.",
            },
          ].map((v) => (
            <div key={v.title} className="flex gap-4 items-start">
              <span className="shrink-0 w-10 h-10 rounded-full bg-gold/15 text-gold grid place-items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5"
                  aria-hidden
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="font-display text-[22px] text-navy">
                  {v.title}
                </p>
                <p className="mt-1 text-body text-navy/70">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The big gallery — every uploaded photo */}
      <Gallery images={images} />

      {/* Services */}
      <section className="section-pad bg-offwhite">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Signature Services</p>
              <h2 className="mt-3">
                Pick the suite. We will build it like it&apos;s our own.
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

      {/* Process strip */}
      <section className="bg-navy text-offwhite section-pad">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">How It Works</p>
            <h2 className="mt-3 text-offwhite">
              Four steps. Zero surprises. One stunning bath.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-4 gap-10">
            {[
              {
                step: "01",
                title: "Consult",
                body: "A senior designer visits within 48 hours, measures, and listens.",
              },
              {
                step: "02",
                title: "Design",
                body: "3D renderings + fixed fixture schedule emailed within 7 days.",
              },
              {
                step: "03",
                title: "Build",
                body: "Dedicated crew, daily photo updates, typical 4-week build.",
              },
              {
                step: "04",
                title: "Delight",
                body: "Walkthrough + 5-year craftsmanship warranty in writing.",
              },
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
        </div>
      </section>

      {/* Visual breath: marquee strip */}
      {marquee.length > 0 && (
        <ImageMarquee images={marquee} reverse height={260} />
      )}

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA — cannot-miss banner */}
      <section className="section-pad bg-offwhite">
        <div className="container mx-auto">
          <div className="rounded-card bg-navy text-offwhite px-8 md:px-16 py-20 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30 bg-cover bg-center"
              style={{
                backgroundImage: heroImage ? `url(${heroImage})` : undefined,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy/85" />
            <div className="relative">
              <p className="eyebrow text-gold">Ready in 4 Weeks</p>
              <h2 className="mt-4 max-w-3xl mx-auto text-offwhite">
                Free design consult. Fixed quote in 2 hours. Zero hard sell.
              </h2>
              <p className="mt-5 max-w-2xl mx-auto text-body text-offwhite/75">
                We only take on 6 builds per month so every suite gets the
                lead designer&apos;s attention. Booking now for next month.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <ButtonLink href="/quote" withArrow>
                  Start My Quote
                </ButtonLink>
                <a
                  href="tel:+13055550134"
                  className="text-offwhite text-caption uppercase tracking-cta font-bold hover:text-gold transition-colors"
                >
                  or call (305) 555-0134
                </a>
              </div>
              <p className="mt-6 text-caption text-offwhite/55">
                Licensed CGC1531882 · $2M insured · 240+ five-star reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
