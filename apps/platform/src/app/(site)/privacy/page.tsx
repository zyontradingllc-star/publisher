import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MARKETING_URL } from "@/lib/utils";

/** Not indexed — canonical privacy lives on authorspilot.com. */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: `${MARKETING_URL}/privacy/` },
};

/** One canonical privacy page on the main site. */
export default function PrivacyRedirect() {
  redirect(`${MARKETING_URL}/privacy/`);
}
