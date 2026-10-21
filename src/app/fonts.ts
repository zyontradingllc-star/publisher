import localFont from "next/font/local";

/** Sitewide UI font (same stack the Amazon-style footer uses). */
export const siteFont = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-site",
  weight: "100 900",
  display: "swap",
});
