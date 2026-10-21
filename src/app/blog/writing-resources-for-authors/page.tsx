import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WriteBlogView } from "@/components/blog/WriteBlogView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Writing Resources for Authors | Authors Pilot",
  description:
    "Writing resources for authors - tips, tools, and guides on how to write a book, plus a place to submit your own publishing insight.",
  path: "/blog/writing-resources-for-authors",
  keywords: "writing resources for authors, how to write a book, author writing guides",
});

export default function WriteBlogPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/book-publishing-author-website-design-agency" },
          { label: "Blog", href: "/blog/author-publishing-blog-resources" },
          { label: "Write" },
        ]}
      />
      <WriteBlogView />
    </>
  );
}
