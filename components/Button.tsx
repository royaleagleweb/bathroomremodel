import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
};

function arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  withArrow,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = variant === "primary" ? "btn-primary" : "btn-secondary";
  return (
    <button className={`group ${cls} ${className}`} {...rest}>
      {children}
      {withArrow && arrow()}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  withArrow,
}: CommonProps & { href: string }) {
  const cls = variant === "primary" ? "btn-primary" : "btn-secondary";
  return (
    <Link href={href} className={`group ${cls} ${className}`}>
      {children}
      {withArrow && arrow()}
    </Link>
  );
}
