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
    "rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] text-ink shadow-cta hover:brightness-105 hover:shadow-cta-lg focus-visible:ring-[#E08A2A] uppercase tracking-wide",
  secondary:
    "rounded-full bg-ink text-linen shadow-soft hover:bg-slate hover:shadow-lift focus-visible:ring-ink uppercase tracking-wide",
  ghost:
    "rounded-full bg-white text-ink border border-sand hover:border-coral/40 focus-visible:ring-coral uppercase tracking-wide",
  inverse:
    "rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] text-ink shadow-cta hover:brightness-105 hover:shadow-cta-lg focus-visible:ring-[#E08A2A] uppercase tracking-wide",
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
  const classes = `group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap px-6 py-3 font-sans text-sm font-bold tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-60 ${variants[variant]} ${className}`;

  const content = (
    <>
      <span className="relative inline-flex items-center gap-2">{children}</span>
      {(variant === "primary" || variant === "inverse") && (
        <span aria-hidden="true" className="relative">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.div
        className="flex w-full justify-center md:inline-flex md:w-auto"
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
    <span className="flex w-full justify-center md:inline-flex md:w-auto">
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
    </span>
  );
}
