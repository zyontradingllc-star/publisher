import { redirect } from "next/navigation";

/**
 * Platform publish form lives on the Node app (apps/platform).
 * Marketing static export cannot run that auth/server-action flow, so live
 * Hostinger builds send authors to the marketing submit wizard instead.
 * Locally, middleware still proxies /dashboard/* to :3001 (real form).
 */
export default function DashboardPublishNewFallback() {
  redirect("/signup?google=1");
}
