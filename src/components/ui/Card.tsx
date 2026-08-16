"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function Card({
  children,
  className = "",
  interactive = true,
}: CardProps) {
  return (
    <motion.div
      whileHover={
        interactive
          ? {
              y: -4,
              scale: 1.01,
              boxShadow: "0 18px 40px -14px rgba(27,59,111,0.28)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`rounded-soft border border-sand bg-cream p-6 shadow-soft ${className}`}
    >
      {children}
    </motion.div>
  );
}
