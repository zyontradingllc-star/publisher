import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleView } from "@/components/blog/BlogArticleView";
import {
  buildArticleMetadata,
  getAllBlogArticles,
  getBlogArticle,
  getRelatedArticles,
} from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return {};

  return buildArticleMetadata(article);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug);

  return <BlogArticleView article={article} related={related} />;
}
