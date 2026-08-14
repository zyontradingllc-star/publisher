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
    "bg-coral text-white shadow-soft hover:bg-coral-deep focus-visible:ring-coral rounded-md uppercase tracking-wide",
  secondary:
    "bg-ink text-linen shadow-soft hover:bg-slate focus-visible:ring-ink rounded-md",
  ghost:
    "bg-transparent text-ink border-2 border-sand hover:border-coral hover:text-coral-deep focus-visible:ring-coral rounded-md",
  inverse:
    "bg-linen text-ink shadow-soft hover:bg-ivory focus-visible:ring-linen rounded-md",
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
  const classes = `inline-flex items-center justify-center rounded-md px-6 py-3 font-sans text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-60 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
