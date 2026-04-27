"use client";

import { useMemo, useState } from "react";
import { PORTFOLIO_IMAGES } from "@/lib/images";

type City = "all" | "miami" | "ftlauderdale" | "westpalm";

type Project = {
  id: number;
  city: Exclude<City, "all">;
  cityLabel: string;
  title: string;
  scope: string;
  image: string;
  span: "tall" | "wide" | "square";
};

const projects: Project[] = [
  {
    id: 1,
    city: "miami",
    cityLabel: "Miami · Coconut Grove",
    title: "Bayfront Primary Suite",
    scope: "Full remodel · 4 weeks",
    image: PORTFOLIO_IMAGES[1],
    span: "tall",
  },
  {
    id: 2,
    city: "ftlauderdale",
    cityLabel: "Ft Lauderdale · Las Olas",
    title: "Canal House Wet Room",
    scope: "Shower + steam · 3 weeks",
    image: PORTFOLIO_IMAGES[2],
    span: "square",
  },
  {
    id: 3,
    city: "westpalm",
    cityLabel: "West Palm · El Cid",
    title: "Heritage Powder Room",
    scope: "Powder room · 10 days",
    image: PORTFOLIO_IMAGES[3],
    span: "wide",
  },
  {
    id: 4,
    city: "miami",
    cityLabel: "Miami · Coral Gables",
    title: "Mediterranean Dual Vanity",
    scope: "Vanity + lighting · 2 weeks",
    image: PORTFOLIO_IMAGES[4],
    span: "tall",
  },
  {
    id: 5,
    city: "ftlauderdale",
    cityLabel: "Ft Lauderdale · Rio Vista",
    title: "Cast-Iron Soaking Suite",
    scope: "Full remodel · 5 weeks",
    image: PORTFOLIO_IMAGES[5],
    span: "square",
  },
  {
    id: 6,
    city: "miami",
    cityLabel: "Miami · Key Biscayne",
    title: "Ocean-Facing Spa",
    scope: "Full remodel · 6 weeks",
    image: PORTFOLIO_IMAGES[6],
    span: "wide",
  },
  {
    id: 7,
    city: "westpalm",
    cityLabel: "West Palm · Palm Beach",
    title: "Antique Brass Vanity",
    scope: "Vanity · 2 weeks",
    image: PORTFOLIO_IMAGES[7],
    span: "tall",
  },
  {
    id: 8,
    city: "miami",
    cityLabel: "Miami · Brickell",
    title: "Penthouse Primary",
    scope: "Full remodel · 4 weeks",
    image: PORTFOLIO_IMAGES[8],
    span: "square",
  },
  {
    id: 9,
    city: "ftlauderdale",
    cityLabel: "Ft Lauderdale · Harbor Beach",
    title: "Yacht-Inspired Suite",
    scope: "Full remodel · 5 weeks",
    image: PORTFOLIO_IMAGES[9],
    span: "tall",
  },
  {
    id: 10,
    city: "miami",
    cityLabel: "Miami · Pinecrest",
    title: "Garden Spa Retreat",
    scope: "Full remodel · 6 weeks",
    image: PORTFOLIO_IMAGES[10],
    span: "wide",
  },
  {
    id: 11,
    city: "westpalm",
    cityLabel: "West Palm · Worth Ave",
    title: "Parisian Powder Room",
    scope: "Powder room · 2 weeks",
    image: PORTFOLIO_IMAGES[11],
    span: "square",
  },
  {
    id: 12,
    city: "miami",
    cityLabel: "Miami · Surfside",
    title: "Oceanfront Wet Room",
    scope: "Shower + tub · 4 weeks",
    image: PORTFOLIO_IMAGES[12],
    span: "tall",
  },
];

const cities: { value: City; label: string }[] = [
  { value: "all", label: "All Cities" },
  { value: "miami", label: "Miami" },
  { value: "ftlauderdale", label: "Ft Lauderdale" },
  { value: "westpalm", label: "West Palm" },
];

export default function PortfolioGrid() {
  const [city, setCity] = useState<City>("all");

  const filtered = useMemo(
    () => (city === "all" ? projects : projects.filter((p) => p.city === city)),
    [city]
  );

  const spanClass = (span: Project["span"]) => {
    if (span === "tall") return "md:row-span-2 h-[280px] sm:h-[360px] md:h-[560px]";
    if (span === "wide") return "h-[220px] sm:h-[260px] md:col-span-2 md:h-[280px]";
    return "h-[240px] sm:h-[280px] md:h-[320px]";
  };

  return (
    <>
      <section className="bg-navy text-offwhite">
        <div className="container mx-auto py-16 sm:py-24 lg:py-[120px]">
          <p className="eyebrow text-gold">Portfolio</p>
          <h1 className="mt-4 max-w-4xl">
            Twelve South Florida suites. Zero compromises. Explore by city.
          </h1>
        </div>
      </section>

      <section className="sticky top-[68px] sm:top-[80px] lg:top-[88px] z-30 bg-offwhite/95 backdrop-blur border-b border-navy/10">
        <div className="container mx-auto flex flex-wrap gap-2 py-4 sm:py-5">
          {cities.map((c) => {
            const active = city === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setCity(c.value)}
                className={`px-5 sm:px-6 h-10 sm:h-11 rounded-full text-caption uppercase tracking-cta font-semibold transition-all ${
                  active
                    ? "bg-navy text-offwhite"
                    : "bg-transparent text-navy border border-navy/15 hover:border-gold hover:text-gold"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="section-pad bg-offwhite">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div className="luxury-card p-12 text-center">
              <p className="eyebrow">Empty State</p>
              <p className="mt-3 font-display text-[32px]">
                No projects yet in this area.
              </p>
              <button
                onClick={() => setCity("all")}
                className="mt-6 btn-secondary"
              >
                View all projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[260px] gap-4 sm:gap-5 md:gap-6">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className={`luxury-card group relative overflow-hidden ${spanClass(
                    p.span
                  )}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-cream transition-transform duration-700 ease-luxury group-hover:scale-110"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-80 md:opacity-60 md:group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Before label */}
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-offwhite/90 text-navy text-caption uppercase tracking-cta font-semibold px-3 py-1 rounded-full">
                    Before / After
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-offwhite md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                    <p className="eyebrow text-gold">{p.cityLabel}</p>
                    <h3 className="mt-1 text-offwhite">{p.title}</h3>
                    <p className="mt-1 text-caption uppercase tracking-cta text-offwhite/75">
                      {p.scope}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-20 text-center">
            <p className="eyebrow">Keep Scrolling</p>
            <p className="mt-2 font-display text-[22px] text-navy/70">
              More work is loaded as you scroll.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
