import Link from "next/link";
import { ReactNode } from "react";

export function ServiceCard({
  title,
  price,
  image,
  description,
  href = "/quote",
}: {
  title: string;
  price: string;
  image: string;
  description: string;
  href?: string;
}) {
  return (
    <article className="group luxury-card flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-cream transition-transform duration-700 ease-luxury group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden
        />
        {/* Subtle gradient that intensifies on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Gold price chip */}
        <span
          className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-navy/85 backdrop-blur text-offwhite px-4 py-1.5 text-caption uppercase tracking-cta font-bold ring-1 ring-gold/40"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          From {price}
        </span>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-h3 group-hover:text-gold-deep transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-3 text-body text-navy/70 flex-1">{description}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center text-caption uppercase tracking-cta font-semibold text-navy group-hover:text-gold transition-colors"
        >
          Book Now
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export function InfoCard({
  title,
  children,
  icon,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="luxury-card p-6">
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold grid place-items-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-h3">{title}</h3>
      <p className="mt-3 text-body text-navy/70">{children}</p>
    </div>
  );
}
