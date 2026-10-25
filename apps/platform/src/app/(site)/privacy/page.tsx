import { redirect } from "next/navigation";
import { MARKETING_URL } from "@/lib/utils";

/** One canonical privacy page on the main site. */
export default function PrivacyRedirect() {
  redirect(`${MARKETING_URL}/privacy/`);
}
