import type { Metadata } from "next";
import { PublishLanding } from "@/components/publish/PublishLanding";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Publish Your Book | Authors Pilot",
  description:
    "Publish book listings on Authors Pilot, keep 100% of your earnings, and send readers to your own sales channels.",
  path: "/publish",
});

export default function PublishPage() {
  return <PublishLanding />;
}
