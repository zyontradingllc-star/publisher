import { PackagesView } from "@/components/packages/PackagesView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Author Publishing Website Price | Authors Pilot",
  description:
    "See author publishing and website package pricing. Transparent, one-time rates for writing, design, publishing, and an author website - rights stay yours.",
  path: "/author-publishing-website-price",
  keywords: "author publishing website price, author website cost, book publishing packages",
});

export default function PackagesPage() {
  return <PackagesView />;
}
