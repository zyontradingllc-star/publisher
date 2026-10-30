import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MARKETING_URL } from "@/lib/utils";

/** Not indexed — canonical terms live on authorspilot.com. */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: `${MARKETING_URL}/terms/` },
};

/** One canonical terms page on the main site. */
export default function TermsRedirect() {
  redirect(`${MARKETING_URL}/terms/`);
}
