import type { Metadata } from "next";
import type { BlogArticle } from "@/lib/blog/types";
import { canonicalUrl } from "@/lib/seo";

export function buildArticleMetadata(article: BlogArticle): Metadata {
  const url = canonicalUrl(`/blog/${article.slug}`);

  return {
    title: { absolute: article.seoTitle },
    description: article.metaDescription,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    alternates: { canonical: url },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url,
      siteName: "Authors Pilot",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [
        {
          url: article.featuredImage,
          alt: article.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
      images: [article.featuredImage],
    },
    robots: { index: true, follow: true },
  };
}

export function buildArticleSchema(article: BlogArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: canonicalUrl(article.featuredImage),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author,
      url: canonicalUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "Authors Pilot",
      url: canonicalUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: canonicalUrl("/logo.webp"),
      },
    },
    mainEntityOfPage: canonicalUrl(`/blog/${article.slug}`),
    articleSection: article.category,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(", "),
  };
}

export function buildArticleFaqSchema(article: BlogArticle) {
  if (!article.faqs?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
