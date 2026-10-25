import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoAppArticle } from "@/components/seo/SeoAppArticle";
import { buildAppMetadata } from "@/lib/seo";
import {
  GUIDE_SLUG_LIST,
  getAllGuidePages,
  getGuidePage,
} from "@/lib/seo-app-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDE_SLUG_LIST.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuidePage(slug);
  if (!page) return {};
  return buildAppMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function GuideSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getGuidePage(slug);
  if (!page) notFound();

  const related = getAllGuidePages()
    .filter((g) => g.slug !== slug)
    .slice(0, 4)
    .map((g) => ({ href: g.path, label: g.h1 }));

  return (
    <SeoAppArticle
      page={page}
      related={[
        { href: "/guides/", label: "All guides" },
        { href: "/compare/indie-author-platforms/", label: "Indie author platforms" },
        ...related,
      ]}
    />
  );
}
