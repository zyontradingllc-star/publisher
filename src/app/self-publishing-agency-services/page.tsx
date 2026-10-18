import { ServicesView } from "@/components/services/ServicesView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Self-Publishing Agency Services | Authors Pilot",
  description:
    "Self-publishing agency services for authors: editing, cover design, formatting, publishing, audiobooks, marketing, and author websites.",
  path: "/self-publishing-agency-services",
  keywords: "self-publishing agency services, author services, book editing design formatting",
});

export default function ServicesPage() {
  return <ServicesView />;
}
