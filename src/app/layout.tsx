import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JourneyConsultation } from "@/components/layout/JourneyConsultation";
import { DeferredThirdParty } from "@/components/layout/DeferredThirdParty";
import { PageTransition } from "@/components/motion/PageTransition";
import JsonLd from "@/components/seo/JsonLd";
import { brand } from "@/content/site";
import { canonicalUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://authorspilot.com"),
  title: {
    default: "Book Writing & Publishing Services | Authors Pilot",
    template: "%s | Authors Pilot",
  },
  description:
    "Authors Pilot helps authors write, edit, design, and publish books — plus audiobooks and marketing to reach readers.",
  keywords: [
    "book writing services",
    "book publishing services",
    "self publishing services",
    "ghostwriting services",
    "book cover design",
    "ebook writing services",
    "audiobook production",
    "Amazon KDP publishing",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48.png?v=3", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96.png?v=3", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png?v=3",
  },
  verification: {
    other: {
      "msvalidate.01": "CAD5F71B3F44A582737E144DFC6C92AC",
    },
  },
  openGraph: {
    title: "Book Writing & Publishing Services | Authors Pilot",
    description:
      "Professional book writing, editing, design, publishing and audiobook services for authors.",
    url: "https://authorspilot.com/",
    siteName: "Authors Pilot",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Authors Pilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Writing & Publishing Services | Authors Pilot",
    description:
      "Professional services for authors from idea to published book.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#273E2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-cream font-sans font-normal text-ink antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: brand.name,
            url: canonicalUrl("/"),
          }}
        />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <JourneyConsultation />
        <DeferredThirdParty />
      </body>
    </html>
  );
}
