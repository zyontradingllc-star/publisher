import type { Metadata } from "next";
import { headers } from "next/headers";
import "../globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WebsiteDesignCta } from "@/components/WebsiteDesignCta";
import { getCurrentProfile } from "@/lib/auth";
import { logEnvStatus } from "@/lib/env";
import { siteFont } from "../fonts";

logEnvStatus();

export const metadata: Metadata = {
  title: {
    default: "Authors Pilot Publishing Platform",
    template: "%s · Authors Pilot",
  },
  description:
    "Publish book listings on Authors Pilot, keep 100% of your earnings, and send readers to your own website or chosen sales channels.",
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

  const pathname = (await headers()).get("x-pathname") ?? "";
  const hideWebsiteCta =
    pathname === "/bookstore" ||
    pathname.startsWith("/bookstore/") ||
    pathname === "/faq" ||
    pathname.startsWith("/faq/") ||
    pathname === "/publish" ||
    pathname.startsWith("/publish/");

  return (
    <html lang="en" className={siteFont.variable}>
      <body className="flex min-h-screen flex-col bg-page-wash font-sans text-ink antialiased">
        <SiteHeader profile={profile} />
        <main className="flex-1">{children}</main>
        {!hideWebsiteCta ? (
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
            <WebsiteDesignCta />
          </div>
        ) : null}
        <SiteFooter />
      </body>
    </html>
  );
}
