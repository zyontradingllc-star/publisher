import type { Metadata } from "next";
import { StorefrontView } from "@/components/store/StorefrontView";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ slug: "preview" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");
  return buildPageMetadata({
    title: `${title} | AuthorsPilot Storefront`,
    description: `Live bookstore page for ${title}.`,
    path: `/store/${slug}`,
  });
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;
  return <StorefrontView slug={slug} />;
}
