import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlogHomeView } from "@/components/blog/BlogHomeView";
import {
  getAllBlogArticles,
  getFeaturedArticle,
} from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Author Publishing Blog & Resources | Authors Pilot",
  description:
    "Author publishing blog resources: writing, self-publishing, cover design, formatting, Amazon KDP, ghostwriting, and audiobooks.",
  path: "/blog/author-publishing-blog-resources",
  keywords:
    "author publishing blog resources, publishing tips, self publishing guide, book cover design tips",
});

export default function BlogPage() {
  const articles = getAllBlogArticles();
  const featured = getFeaturedArticle();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/book-publishing-author-website-design-agency" },
          { label: "Blog" },
        ]}
      />
      {featured && <BlogHomeView articles={articles} featured={featured} />}
    </>
  );
}
