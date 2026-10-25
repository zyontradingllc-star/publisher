import { redirect } from "next/navigation";

/** Legacy homepage URL — Hostinger also 301s this to /. */
export default function LegacyHomeRedirect() {
  redirect("/");
}
