import type { Metadata } from "next";
import { LiveHubView } from "@/components/live/LiveHubView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "LIVE Bookstore Funnel | Authors Pilot",
  description:
    "Launch a live AuthorsPilot bookstore in three steps. Free AI tools, storefront pages, and a path to a zero-commission author website.",
  path: "/live",
  keywords: "live bookstore, author storefront, self publishing funnel",
});

export default function LivePage() {
  return <LiveHubView />;
}
