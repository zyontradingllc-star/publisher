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
        ink: "#212121",
        cream: "#FFFFFF",
        ivory: "#ECECEC",
        // Primary accent — dark blue
        coral: {
          DEFAULT: "#1B3B6F",
          soft: "#4E7FC1",
          deep: "#0F2A52",
        },
        forest: {
          DEFAULT: "#212121",
          muted: "#4A4A4A",
        },
        charcoal: "#6B6B6B",
        sand: "#D4D4D4",
        linen: "#FFFFFF",
        slate: "#333333",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        soft: "1rem",
        blob: "40% 60% 55% 45% / 50% 40% 60% 50%",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(33, 33, 33, 0.14)",
        lift: "0 18px 40px -14px rgba(27, 59, 111, 0.35)",
        book: "0 14px 28px -10px rgba(33, 33, 33, 0.2)",
        cta: "0 16px 30px -6px rgba(3, 43, 184, 0.7), 0 6px 12px -2px rgba(3, 43, 184, 0.45)",
        "cta-lg":
          "0 26px 50px -8px rgba(3, 43, 184, 0.85), 0 10px 20px -4px rgba(3, 43, 184, 0.6)",
      },
      backgroundImage: {
        "warm-wash":
          "linear-gradient(165deg, #FAFAFA 0%, #EFEFEF 45%, #DCDCDC 100%)",
        "cta-wash":
          "linear-gradient(135deg, #212121 0%, #3A3A3A 100%)",
        "promo-wash":
          "linear-gradient(120deg, #0F2A52 0%, #4E7FC1 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
