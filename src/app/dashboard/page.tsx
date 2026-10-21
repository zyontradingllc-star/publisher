import { redirect } from "next/navigation";

/** Static-export fallback — real dashboard is on the platform Node app. */
export default function DashboardFallback() {
  redirect("/publish/");
}
