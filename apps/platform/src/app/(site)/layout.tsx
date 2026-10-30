import type { Metadata } from "next";
import { headers } from "next/headers";
import "../globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WebsiteDesignCta } from "@/components/WebsiteDesignCta";
import {
  JsonLd,
  organizationSchema,
  webSiteSchema,
} from "@/components/seo/JsonLd";
import { getCurrentProfile } from "@/lib/auth";
import { logEnvStatus } from "@/lib/env";
import {
  APP_ORIGIN,
  APP_SITE_NAME,
  DEFAULT_OG_IMAGE,
  appCanonical,
} from "@/lib/seo";
import { PRIMARY_KEYWORDS } from "@/lib/seo-content";
import { siteFont } from "../fonts";

logEnvStatus();

export const metadata: Metadata = {
  metadataBase: new URL(APP_ORIGIN),
  title: {
    default:
      "Free Author Page & One Link to Sell Your Book | Authors Pilot",
    template: `%s · ${APP_SITE_NAME}`,
  },
  description:
    "Get a free author page and one shareable link to sell on Amazon or your website. Keep 100% book royalties—no commission. A free Booklinker / Books2Read-style alternative with a branded page and click tracking.",
  keywords: [...PRIMARY_KEYWORDS],
  authors: [{ name: APP_SITE_NAME, url: APP_ORIGIN }],
  creator: APP_SITE_NAME,
  publisher: APP_SITE_NAME,
  alternates: {
    canonical: appCanonical("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Free Author Page & One Link to Sell Your Book | Authors Pilot",
    description:
      "Branded author page, universal book link, click analytics, and 100% royalties. No commission—send readers to Amazon or your site.",
    type: "website",
    url: appCanonical("/"),
    siteName: APP_SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Authors Pilot — free author page and book link",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Author Page & One Link to Sell Your Book | Authors Pilot",
    description:
      "Keep 100% royalties. Free author page + one link to Amazon or your website.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let profile = null;
  try {
    profile = await getCurrentProfile();
  } catch {
    profile = null;
  }

  const headerList = await headers();
  const pathname =
    headerList.get("x-pathname") ||
    headerList.get("x-invoke-path") ||
    "";
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  return (
    <html lang="en" className={siteFont.variable}>
      <body
        className="flex min-h-screen flex-col bg-page-wash font-sans text-ink antialiased"
        suppressHydrationWarning
      >
        <JsonLd
          data={[organizationSchema(APP_ORIGIN), webSiteSchema(APP_ORIGIN)]}
        />
        <SiteHeader profile={profile} />
        <main className="flex-1">{children}</main>
        {/* Promo CTA: hidden on all /dashboard routes (client + server). */}
        {isDashboard ? null : (
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
            <WebsiteDesignCta />
          </div>
        )}
        <SiteFooter />
      </body>
    </html>
  );
}
