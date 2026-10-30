import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoAppArticle } from "@/components/seo/SeoAppArticle";
import { buildAppMetadata } from "@/lib/seo";
import type { SeoAppPage } from "@/lib/seo-app-pages";
import {
  SELL_ON_SLUG_LIST,
  getPlatformBySellOnSlug,
} from "@/lib/sales-channels";

type Props = { params: Promise<{ slug: string }> };

function sellOnPage(
  slug: string,
  label: string,
  path: string
): SeoAppPage {
  return {
    slug,
    path,
    kind: "guide",
    title: `Sell Your Book on ${label} | Authors Pilot`,
    description: `List your book on Authors Pilot and send readers to ${label}. Free author page, one shareable link, outbound click tracking, and 100% of your ${label} earnings.`,
    h1: `Sell your book on ${label}`,
    eyebrow: "Sales channel",
    question: `How do I sell my book on ${label} with Authors Pilot?`,
    answer: `Create a free Authors Pilot listing, add your ${label} purchase link, and share one author page URL. Readers click through to ${label} to buy—Authors Pilot does not checkout or take a commission on those sales.`,
    bullets: [
      `Add your ${label} buy link on your Authors Pilot book listing.`,
      "Share one author page link across social, email, and QR codes.",
      `Readers purchase on ${label}; you keep that channel’s royalties.`,
      "Track outbound clicks to see which promotions drive interest.",
    ],
  };
}

export function generateStaticParams() {
  return SELL_ON_SLUG_LIST.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatformBySellOnSlug(slug);
  if (!platform) return {};
  const page = sellOnPage(slug, platform.label, platform.path);
  return buildAppMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function SellOnPlatformPage({ params }: Props) {
  const { slug } = await params;
  const platform = getPlatformBySellOnSlug(slug);
  if (!platform) notFound();

  const page = sellOnPage(slug, platform.label, platform.path);

  return (
    <SeoAppArticle
      page={page}
      related={[
        { href: "/publish/", label: "Publish your book" },
        { href: "/guides/add-purchase-links/", label: "Add purchase links" },
        { href: "/guides/sell-books-direct/", label: "Sell books direct" },
        { href: "/bookstore/", label: "Bookstore" },
      ]}
    />
  );
}
