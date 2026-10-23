"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  formAction?: ButtonHTMLAttributes<HTMLButtonElement>["formAction"];
};

const variants: Record<Variant, string> = {
  primary:
    "rounded-none bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] text-ink shadow-cta hover:brightness-105 hover:shadow-cta-lg focus-visible:ring-[#E08A2A] uppercase tracking-wide",
  secondary:
    "rounded-none bg-ink text-linen shadow-soft hover:bg-slate hover:shadow-lift focus-visible:ring-ink uppercase tracking-wide",
  ghost:
    "rounded-none bg-white text-ink border border-sand hover:border-coral/40 focus-visible:ring-coral uppercase tracking-wide",
  danger:
    "rounded-none bg-red-600 text-white shadow-soft hover:bg-red-700 focus-visible:ring-red-600 uppercase tracking-wide",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
  disabled,
  type = "button",
  onClick,
  formAction,
}: ButtonProps) {
  const classes = cn(
    "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap px-6 py-3 font-sans text-sm font-bold tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    className
  );

  const content = (
    <span className="relative inline-flex items-center gap-2">{children}</span>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      formAction={formAction}
      className={classes}
    >
      {content}
    </button>
  );
}
