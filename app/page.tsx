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
import { Stats } from "@/components/Stats";
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
  const marquee =
    images.length > 1
      ? [
          ...images.slice(Math.floor(images.length / 2)),
          ...images.slice(0, Math.floor(images.length / 2)),
        ]
      : images;

  return (
    <>
      <Hero bgImage={heroImage} />

      <TrustBar />

      {/* Value-prop strip — three reasons to trust us */}
      <section className="bg-offwhite border-y border-navy/[0.06]">
        <div className="container mx-auto py-14 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
          {[
            {
              title: "Fixed price, in writing",
              body: "Price-Lock Guarantee. The quote you sign is the invoice you pay.",
            },
            {
              title: "4-week builds, typical",
              body: "Dedicated crews. Daily progress photos. Schedules we hit.",
            },
            {
              title: "5-year warranty",
              body: "Licensed, insured, and bonded. We stand behind every joint.",
            },
          ].map((v) => (
            <div key={v.title} className="group flex gap-5 items-start">
              <span className="shrink-0 w-11 h-11 rounded-full bg-gold/10 text-gold grid place-items-center ring-1 ring-gold/20 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5"
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
              </span>
              <div>
                <p className="font-display text-[22px] leading-tight text-navy">
                  {v.title}
                </p>
                <p className="mt-1.5 text-[15px] leading-[1.55] text-navy/60">
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The big gallery — every uploaded photo */}
      <Gallery images={images} />

      {/* Stats strip */}
      <Stats />

      {/* Services */}
      <section className="relative section-pad bg-offwhite overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full blur-[140px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, #D4AF77 0%, transparent 70%)",
          }}
        />
        <div className="relative container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Signature Services</p>
              <h2 className="mt-4 font-display text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.01em]">
                Pick the suite. We build it{" "}
                <span className="text-gold-gradient italic">like our own.</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="text-caption uppercase tracking-cta font-semibold text-navy hover:text-gold transition-colors"
            >
              All services →
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="relative bg-charcoal-deep text-offwhite section-pad overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/4 right-[-12%] w-[460px] h-[460px] rounded-full blur-[140px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, #D4AF77 0%, transparent 70%)",
          }}
        />
        <div className="relative container mx-auto">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">How It Works</p>
            <h2 className="mt-4 font-display text-offwhite text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.01em]">
              Four steps. Zero surprises.{" "}
              <span className="text-gold-gradient italic">One stunning bath.</span>
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-4 gap-x-8 gap-y-12">
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
              <div key={p.step} className="group">
                <p className="font-display font-light text-[64px] md:text-[72px] leading-none tracking-[-0.04em] text-gold-gradient">
                  {p.step}
                </p>
                <div className="mt-4 h-px w-10 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-24" />
                <h3 className="mt-5 font-display text-[24px] text-offwhite">
                  {p.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-offwhite/65">
                  {p.body}
                </p>
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

      {/* Final CTA — refined, generous whitespace */}
      <section className="section-pad bg-offwhite">
        <div className="container mx-auto">
          <div className="rounded-[32px] bg-charcoal-deep text-offwhite px-8 md:px-16 py-20 md:py-24 text-center relative overflow-hidden grain">
            <div
              className="absolute inset-0 opacity-30 bg-cover bg-center animate-kenburns"
              style={{
                backgroundImage: heroImage ? `url(${heroImage})` : undefined,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/60 via-charcoal-deep/55 to-charcoal-deep/85" />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[140px] opacity-25"
              style={{
                background:
                  "radial-gradient(circle, #D4AF77 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gold">
                Ready in 4 weeks
              </p>
              <h2 className="mt-5 max-w-3xl mx-auto font-display text-offwhite text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.01em]">
                Free design consult.{" "}
                <span className="text-gold-gradient italic">Fixed quote</span>{" "}
                in 2 hours.
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-[17px] leading-[1.55] text-offwhite/70">
                We only take on six builds per month so every suite gets the
                lead designer&apos;s full attention. Booking now for next
                month.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-5">
                <ButtonLink href="/quote" withArrow>
                  Start my quote
                </ButtonLink>
                <a
                  href="tel:+13055550134"
                  className="text-offwhite text-caption uppercase tracking-cta font-bold hover:text-gold transition-colors"
                >
                  or call (305) 555-0134
                </a>
              </div>
              <p className="mt-8 text-[11px] uppercase tracking-[0.2em] font-semibold text-offwhite/40">
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
