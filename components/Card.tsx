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
      <div className="relative h-[320px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-cream transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.07]"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden
        />
        {/* Quiet gradient — barely there until hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>
      <div className="p-7 flex flex-col flex-1">
        <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gold">
          From {price}
        </p>
        <h3 className="mt-3 font-display text-[26px] leading-[1.15] text-navy group-hover:text-gold-deep transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-3 text-body text-navy/65 flex-1">{description}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-caption uppercase tracking-cta font-semibold text-navy group-hover:text-gold transition-colors"
        >
          Book now
          <span className="transition-transform duration-300 group-hover:translate-x-1">
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
