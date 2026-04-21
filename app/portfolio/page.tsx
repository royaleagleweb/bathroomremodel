"use client";

import { useMemo, useState } from "react";

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
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80",
    span: "tall",
  },
  {
    id: 2,
    city: "ftlauderdale",
    cityLabel: "Ft Lauderdale · Las Olas",
    title: "Canal House Wet Room",
    scope: "Shower + steam · 3 weeks",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    span: "square",
  },
  {
    id: 3,
    city: "westpalm",
    cityLabel: "West Palm · El Cid",
    title: "Heritage Powder Room",
    scope: "Powder room · 10 days",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    span: "wide",
  },
  {
    id: 4,
    city: "miami",
    cityLabel: "Miami · Coral Gables",
    title: "Mediterranean Dual Vanity",
    scope: "Vanity + lighting · 2 weeks",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    span: "tall",
  },
  {
    id: 5,
    city: "ftlauderdale",
    cityLabel: "Ft Lauderdale · Rio Vista",
    title: "Cast-Iron Soaking Suite",
    scope: "Full remodel · 5 weeks",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
    span: "square",
  },
  {
    id: 6,
    city: "miami",
    cityLabel: "Miami · Key Biscayne",
    title: "Ocean-Facing Spa",
    scope: "Full remodel · 6 weeks",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
    span: "wide",
  },
  {
    id: 7,
    city: "westpalm",
    cityLabel: "West Palm · Palm Beach",
    title: "Antique Brass Vanity",
    scope: "Vanity · 2 weeks",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80",
    span: "tall",
  },
  {
    id: 8,
    city: "miami",
    cityLabel: "Miami · Brickell",
    title: "Penthouse Primary",
    scope: "Full remodel · 4 weeks",
    image:
      "https://images.unsplash.com/photo-1603825553321-ec62e4ca68a2?auto=format&fit=crop&w=1600&q=80",
    span: "square",
  },
  {
    id: 9,
    city: "ftlauderdale",
    cityLabel: "Ft Lauderdale · Harbor Beach",
    title: "Yacht-Inspired Suite",
    scope: "Full remodel · 5 weeks",
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1600&q=80",
    span: "tall",
  },
  {
    id: 10,
    city: "miami",
    cityLabel: "Miami · Pinecrest",
    title: "Garden Spa Retreat",
    scope: "Full remodel · 6 weeks",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    span: "wide",
  },
  {
    id: 11,
    city: "westpalm",
    cityLabel: "West Palm · Worth Ave",
    title: "Parisian Powder Room",
    scope: "Powder room · 2 weeks",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
    span: "square",
  },
  {
    id: 12,
    city: "miami",
    cityLabel: "Miami · Surfside",
    title: "Oceanfront Wet Room",
    scope: "Shower + tub · 4 weeks",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    span: "tall",
  },
];

const cities: { value: City; label: string }[] = [
  { value: "all", label: "All Cities" },
  { value: "miami", label: "Miami" },
  { value: "ftlauderdale", label: "Ft Lauderdale" },
  { value: "westpalm", label: "West Palm" },
];

export default function PortfolioPage() {
  const [city, setCity] = useState<City>("all");

  const filtered = useMemo(
    () => (city === "all" ? projects : projects.filter((p) => p.city === city)),
    [city]
  );

  const spanClass = (span: Project["span"]) => {
    if (span === "tall") return "row-span-2 h-[520px] md:h-[560px]";
    if (span === "wide") return "h-[280px] md:col-span-2";
    return "h-[320px]";
  };

  return (
    <>
      <section className="bg-navy text-offwhite">
        <div className="container mx-auto py-[120px]">
          <p className="eyebrow text-gold">Portfolio</p>
          <h1 className="mt-4 max-w-4xl">
            Twelve South Florida suites. Zero compromises. Explore by city.
          </h1>
        </div>
      </section>

      <section className="sticky top-[88px] z-30 bg-offwhite/95 backdrop-blur border-b border-navy/10">
        <div className="container mx-auto flex flex-wrap gap-2 py-5">
          {cities.map((c) => {
            const active = city === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setCity(c.value)}
                className={`px-6 h-11 rounded-full text-caption uppercase tracking-cta font-semibold transition-all ${
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
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-6">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className={`luxury-card group relative overflow-hidden ${spanClass(
                    p.span
                  )}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-luxury group-hover:scale-110"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Before label */}
                  <span className="absolute top-4 left-4 bg-offwhite/90 text-navy text-caption uppercase tracking-cta font-semibold px-3 py-1 rounded-full">
                    Before / After
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-offwhite translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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
