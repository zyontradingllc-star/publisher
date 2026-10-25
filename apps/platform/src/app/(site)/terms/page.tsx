import { redirect } from "next/navigation";
import { MARKETING_URL } from "@/lib/utils";

/** One canonical terms page on the main site. */
export default function TermsRedirect() {
  redirect(`${MARKETING_URL}/terms/`);
}
