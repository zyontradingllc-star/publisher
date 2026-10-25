import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoAppArticle } from "@/components/seo/SeoAppArticle";
import { buildAppMetadata } from "@/lib/seo";
import {
  COMPARE_SLUG_LIST,
  getAllComparePages,
  getComparePage,
} from "@/lib/seo-app-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COMPARE_SLUG_LIST.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) return {};
  return buildAppMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function CompareSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) notFound();

  const related = getAllComparePages()
    .filter((g) => g.slug !== slug)
    .slice(0, 4)
    .map((g) => ({ href: g.path, label: g.h1 }));

  return (
    <SeoAppArticle
      page={page}
      related={[
        { href: "/vs-books2read/", label: "vs Books2Read" },
        { href: "/vs-booklinker/", label: "vs Booklinker" },
        ...related,
      ]}
    />
  );
}
