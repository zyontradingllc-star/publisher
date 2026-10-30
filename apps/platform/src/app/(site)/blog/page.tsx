import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import {
  JsonLd,
  breadcrumbListSchema,
  organizationSchema,
} from "@/components/seo/JsonLd";
import { APP_ORIGIN, buildAppMetadata } from "@/lib/seo";
import { getAllBlogPosts, getTrendingPosts } from "@/lib/blog/posts";

export const metadata: Metadata = buildAppMetadata({
  title: "Book Marketing Tips & Author Guides | Authors Pilot",
  description:
    "Explore practical book marketing tips, launch strategies, author page guides and promotion ideas to help independent authors reach more readers.",
  path: "/blog/",
  keywords: [
    "book marketing tips",
    "author guides",
    "book launch marketing",
    "promote a book on social media",
    "free author page",
    "indie author marketing",
  ],
});

function blogSchema(origin: string, posts: ReturnType<typeof getAllBlogPosts>) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Book Marketing Tips & Author Guides",
    description:
      "Practical book marketing tips, launch strategies, author page guides and promotion ideas for independent authors.",
    url: `${origin}/blog/`,
    publisher: { "@id": `${origin}/#organization` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      author: { "@type": "Person", name: post.author },
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
        data={[
          organizationSchema(APP_ORIGIN),
          breadcrumbListSchema(APP_ORIGIN, [
            { name: "Home", path: "/publish/" },
            { name: "Blog", path: "/blog/" },
          ]),
          blogSchema(APP_ORIGIN, posts),
        ]}
      />
      <BlogListing posts={posts} trending={trending} />
    </>
  );
}
