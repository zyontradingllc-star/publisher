import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WebsiteDesignCta } from "@/components/WebsiteDesignCta";
import { getCurrentProfile } from "@/lib/auth";
import { logEnvStatus } from "@/lib/env";

logEnvStatus();

export const metadata: Metadata = {
  title: {
    default: "Authors Pilot Publishing Platform",
    template: "%s · Authors Pilot",
  },
  description:
    "Publish book listings on Authors Pilot, keep 100% of your earnings, and send readers to your own website or chosen sales channels.",
};

export default async function RootLayout({
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

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-warm-wash text-ink antialiased">
        <SiteHeader profile={profile} />
        <main className="flex-1">{children}</main>
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
          <WebsiteDesignCta />
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
