import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A1A",
        cream: "#FFFFFF",
        ivory: "#E5E7EB",
        // Primary accent — BookChimp CTA blue
        coral: {
          DEFAULT: "#1D5EDB",
          soft: "#4B82F0",
          deep: "#1547B0",
        },
        forest: {
          DEFAULT: "#1A1A1A",
          muted: "#4A4540",
        },
        charcoal: "#6B7280",
        sand: "#D1D5DB",
        linen: "#FFFFFF",
        slate: "#2C2C2C",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        soft: "1rem",
        blob: "40% 60% 55% 45% / 50% 40% 60% 50%",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(26, 26, 26, 0.12)",
        lift: "0 18px 40px -14px rgba(29, 94, 219, 0.35)",
        book: "0 14px 28px -10px rgba(26, 26, 26, 0.18)",
      },
      backgroundImage: {
        "warm-wash":
          "linear-gradient(180deg, #FFFFFF 0%, #E5E7EB 100%)",
        "cta-wash":
          "linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%)",
        "promo-wash":
          "linear-gradient(120deg, #1D5EDB 0%, #1547B0 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
