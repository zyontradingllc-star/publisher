import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About AuthorsPilot Publishing Agency | Authors Pilot",
  description:
    "Learn about AuthorsPilot, the publishing agency behind 500+ author books - writing, design, publishing, and author websites from one studio.",
  path: "/about-authorspilot-publishing-agency",
  keywords: "about AuthorsPilot publishing agency, author publishing studio, book publishing team",
});

export default function AboutPage() {
  return <AboutView />;
}
