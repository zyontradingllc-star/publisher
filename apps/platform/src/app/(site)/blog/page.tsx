import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import {
  JsonLd,
  organizationSchema,
} from "@/components/seo/JsonLd";
import { APP_ORIGIN, buildAppMetadata } from "@/lib/seo";
import { getAllBlogPosts, getTrendingPosts } from "@/lib/blog/posts";

export const metadata: Metadata = buildAppMetadata({
  title: "Marketing Secrets for Authors Who Want to Sell More Books | Blog",
  description:
    "Real launch, Amazon ads, and newsletter swap strategies for indie authors. Free author page, one shareable link, and 100% royalties—no commission.",
  path: "/blog/",
  keywords: [
    "author blog",
    "book launch tips",
    "amazon ads for authors",
    "indie author marketing",
  ],
});

function blogSchema(origin: string, posts: ReturnType<typeof getAllBlogPosts>) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Authors Pilot Blog",
    description:
      "Insights for authors who want to sell more books—launches, ads, swaps, mindset, and productivity.",
    url: `${origin}/blog/`,
    publisher: { "@id": `${origin}/#organization` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      author: { "@type": "Organization", name: post.author },
      url: `${origin}/blog/${post.slug}/`,
    })),
  };
}

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const trending = getTrendingPosts(3);

  return (
    <>
      <JsonLd
        data={[organizationSchema(APP_ORIGIN), blogSchema(APP_ORIGIN, posts)]}
      />
      <BlogListing posts={posts} trending={trending} />
    </>
  );
}
