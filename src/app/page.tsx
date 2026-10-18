import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { homeSeo, socialLinks } from "@/content/site";
import HomePageClient from "./HomePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/book-publishing-author-website-design-agency",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://authorspilot.com/#organization",
  name: "Authors Pilot",
  url: "https://authorspilot.com/",
  logo: "https://authorspilot.com/logo.webp",
  description:
    "Authors Pilot provides professional book writing, editing, design, publishing and audiobook services for authors.",
  sameAs: socialLinks.map((link) => link.href),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <HomePageClient />
    </>
  );
}
