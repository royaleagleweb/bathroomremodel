"use client";

import { useMemo, useState } from "react";
import { ServiceCard } from "@/components/Card";
import { Select } from "@/components/Input";
import { SERVICE_IMAGES } from "@/lib/images";

type Service = {
  title: string;
  priceValue: number;
  price: string;
  image: string;
  description: string;
  room: "full" | "shower" | "vanity";
};

const services: Service[] = [
  {
    title: "Full Primary Suite Remodel",
    priceValue: 62000,
    price: "$62k",
    image: SERVICE_IMAGES.fullRemodel,
    description:
      "Studs to soul: custom layout, imported stone, radiant floors, and spa lighting.",
    room: "full",
  },
  {
    title: "Powder Room Statement",
    priceValue: 22000,
    price: "$22k",
    image: SERVICE_IMAGES.powderRoom,
    description:
      "Bold, tailored, unforgettable. Wall-upholstered powder rooms that stop guests mid-sentence.",
    room: "full",
  },
  {
    title: "Walk-In Shower & Wet Room",
    priceValue: 28000,
    price: "$28k",
    image: SERVICE_IMAGES.shower,
    description:
      "Frameless glass, linear drains, thermostatic fixtures. Engineered for coastal humidity.",
    room: "shower",
  },
  {
    title: "Freestanding Soaking Tub",
    priceValue: 24000,
    price: "$24k",
    image: SERVICE_IMAGES.soakingTub,
    description:
      "Sculptural resin or cast iron tubs, set against lit-stone feature walls.",
    room: "shower",
  },
  {
    title: "Custom Vanity & Millwork",
    priceValue: 18000,
    price: "$18k",
    image: SERVICE_IMAGES.vanity,
    description:
      "Hand-selected stone tops, brushed brass hardware, humidity-stable cabinetry.",
    room: "vanity",
  },
  {
    title: "His + Hers Dual Vanity",
    priceValue: 32000,
    price: "$32k",
    image: SERVICE_IMAGES.dualVanity,
    description:
      "Twin stations with tailored storage, integrated charging, and cove lighting.",
    room: "vanity",
  },
];

const rooms = [
  { value: "all", label: "All rooms" },
  { value: "full", label: "Full Remodel" },
  { value: "shower", label: "Shower & Tub" },
  { value: "vanity", label: "Vanity" },
];

const budgets = [
  { value: "any", label: "Any budget", min: 0, max: Infinity },
  { value: "under25", label: "Under $25k", min: 0, max: 25000 },
  { value: "25to45", label: "$25k – $45k", min: 25000, max: 45000 },
  { value: "45plus", label: "$45k+", min: 45000, max: Infinity },
];

export default function ServicesPage() {
  const [room, setRoom] = useState("all");
  const [budget, setBudget] = useState("any");

  const filtered = useMemo(() => {
    const b = budgets.find((x) => x.value === budget)!;
    return services.filter(
      (s) =>
        (room === "all" || s.room === room) &&
        s.priceValue >= b.min &&
        s.priceValue <= b.max
    );
  }, [room, budget]);

  return (
    <>
      <section className="relative bg-navy text-offwhite overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 bg-charcoal"
          style={{
            backgroundImage: `url(${SERVICE_IMAGES.fullRemodel})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-navy" />
        <div className="relative container mx-auto py-[120px]">
          <p className="eyebrow text-gold">Services</p>
          <h1 className="mt-4 max-w-3xl">
            From a studs-up remodel to a single statement vanity — every suite
            built with the same obsession.
          </h1>
        </div>
      </section>

      <section className="section-pad bg-offwhite">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            <Select
              id="room"
              label="Filter by room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            >
              {rooms.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </Select>
            <Select
              id="budget"
              label="Filter by budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              {budgets.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 luxury-card p-12 text-center">
              <p className="eyebrow">Nothing matches</p>
              <p className="mt-3 font-display text-[28px]">
                We don&apos;t build mass-market — but we&apos;ll tailor a scope to your
                budget.
              </p>
              <p className="mt-3 text-body text-navy/70">
                Send us a note and we&apos;ll design a plan that fits.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
