"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-[#032bb8] text-white shadow-cta hover:bg-[#02208f] hover:shadow-cta-lg focus-visible:ring-[#032bb8] rounded-md uppercase tracking-wide",
  secondary:
    "bg-ink text-linen shadow-soft hover:bg-slate hover:shadow-lift focus-visible:ring-ink rounded-md",
  ghost:
    "bg-transparent text-ink border-2 border-sand hover:border-coral hover:text-coral-deep focus-visible:ring-coral rounded-md",
  inverse:
    "bg-linen text-ink shadow-soft hover:bg-ivory hover:shadow-lift focus-visible:ring-linen rounded-md",
};

/** Light streak for solid buttons, a dark one for pale surfaces. */
const shine = {
  primary: "via-white/35",
  secondary: "via-white/30",
  ghost: "via-coral/15",
  inverse: "via-ink/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `group relative isolate inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 font-sans text-sm font-semibold tracking-wide transition-[background-color,border-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-60 ${variants[variant]} ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%] motion-reduce:hidden ${shine[variant]}`}
      />
      <span className="relative">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.div
        className="inline-flex"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
