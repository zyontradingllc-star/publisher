import type { BlogInterlink } from "./posts";

const M = "https://authorspilot.com/blog";

/**
 * Topic → marketing blog cross-links (authorspilot.com).
 * Merged into app blog interlinks without editing generated posts by hand.
 */
export const MARKETING_CROSS_LINKS_BY_TOPIC: Record<string, BlogInterlink[]> = {
  royalties: [
    {
      href: `${M}/is-ebook-business-profitable/`,
      label: "Is eBook Business Profitable?",
    },
    {
      href: `${M}/passive-income-with-ebooks-2026/`,
      label: "Passive Income With eBooks 2026",
    },
    {
      href: `${M}/the-best-ebook-business-model/`,
      label: "Best eBook Business Model",
    },
  ],
  "author page": [
    {
      href: `${M}/author-website-design-free/`,
      label: "Free Author Website Design",
    },
    {
      href: `${M}/author-ebook-page/`,
      label: "Author eBook Page",
    },
    {
      href: `${M}/free-book-publishing-app/`,
      label: "Free Book Publishing App",
    },
  ],
  "book listing": [
    {
      href: `${M}/free-book-publishing-platform/`,
      label: "Free Book Publishing Platform",
    },
    {
      href: `${M}/free-book-publishing-sites/`,
      label: "Free Book Publishing Sites",
    },
    {
      href: `${M}/top-10-free-publishers/`,
      label: "Top 10 Free Publishers",
    },
  ],
  promotion: [
    {
      href: `${M}/how-people-are-making-money-selling-ebooks/`,
      label: "Making Money Selling eBooks",
    },
    {
      href: `${M}/best-ebook-selling-websites/`,
      label: "Best eBook Selling Websites",
    },
    {
      href: `${M}/best-ebook-selling-website/`,
      label: "Best eBook Selling Website",
    },
  ],
  comparisons: [
    {
      href: `${M}/best-ebook-selling-websites/`,
      label: "Best eBook Selling Websites",
    },
    {
      href: `${M}/where-can-i-publish-my-book-online-and-earn-money/`,
      label: "Where to Publish Online & Earn",
    },
    {
      href: `${M}/book-publishing-business/`,
      label: "Book Publishing Business",
    },
  ],
  "book launch": [
    {
      href: `${M}/how-i-create-ebook-fast/`,
      label: "How I Create an eBook Fast",
    },
    {
      href: `${M}/ebook-and-pdf-platform/`,
      label: "eBook and PDF Platform",
    },
    {
      href: `${M}/selling-ebooks-on-amazon-without-writing/`,
      label: "Sell eBooks on Amazon Without Writing",
    },
  ],
};

export function marketingLinksForCategory(category: string): BlogInterlink[] {
  const key = category.trim().toLowerCase();
  return MARKETING_CROSS_LINKS_BY_TOPIC[key] ?? [];
}
