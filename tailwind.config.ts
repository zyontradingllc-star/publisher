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
        ink: "#1F2937",
        cream: "#FFFFFF",
        ivory: "#F3F4F6",
        // Primary — logo forest green + white + gray
        coral: {
          DEFAULT: "#273E2B",
          soft: "#A7C4AB",
          deep: "#1A2B1D",
        },
        forest: {
          DEFAULT: "#1F2937",
          muted: "#6B7280",
        },
        charcoal: "#4B5563",
        sand: "#E5E7EB",
        linen: "#FFFFFF",
        slate: "#1F2937",
      },
      fontFamily: {
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        soft: "1rem",
        blob: "40% 60% 55% 45% / 50% 40% 60% 50%",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(31, 41, 55, 0.12)",
        lift: "0 18px 40px -14px rgba(39, 62, 43, 0.28)",
        book: "0 14px 28px -10px rgba(31, 41, 55, 0.18)",
        cta: "0 10px 22px -8px rgba(224, 138, 42, 0.65)",
        "cta-lg": "0 18px 32px -8px rgba(224, 138, 42, 0.8)",
      },
      backgroundImage: {
        "warm-wash":
          "linear-gradient(165deg, #FFFFFF 0%, #F3F4F6 45%, #E5E7EB 100%)",
        "cta-wash":
          "linear-gradient(135deg, #1A2B1D 0%, #273E2B 55%, #3A5640 100%)",
        "promo-wash":
          "linear-gradient(120deg, #273E2B 0%, #3A5640 50%, #A7C4AB 100%)",
        "footer-wash":
          "linear-gradient(165deg, #F3F4F6 0%, #F0F5F1 50%, #DCE8DE 100%)",
        "footer-wash-deep":
          "linear-gradient(135deg, #E5E7EB 0%, #C5D6C8 100%)",
        "service-hero-wash":
          "linear-gradient(180deg, #E88A9E 0%, #EA9F8C 28%, #ECB088 52%, #EFC96E 78%, #EFD84A 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
