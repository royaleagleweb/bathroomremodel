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
    <article className="luxury-card flex flex-col">
      <div
        className="h-[280px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className="p-6 flex flex-col flex-1">
        <p className="eyebrow">Starting at {price}</p>
        <h3 className="mt-2 text-h3">{title}</h3>
        <p className="mt-3 text-body text-navy/70 flex-1">{description}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center text-caption uppercase tracking-cta font-semibold text-navy hover:text-gold transition-colors"
        >
          Book Now
          <span className="ml-2">→</span>
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
