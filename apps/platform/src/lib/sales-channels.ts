export type SalesChannel = {
  id: string;
  label: string;
};

export type PlatformLogoChannel = {
  id: string;
  label: string;
  /** Local logo under /public/sales-channels (from each brand’s site) */
  logo: string;
  /** Public SEO path on app.authorspilot.com */
  path: string;
  /** Placeholder for purchase URL input */
  urlPlaceholder?: string;
};

/** Full list (pricing form + legacy). */
export const SALES_CHANNELS: readonly SalesChannel[] = [
  { id: "author_website", label: "Author website / own store" },
  { id: "amazon", label: "Amazon / Kindle" },
  { id: "amazon_com", label: "Amazon.com" },
  { id: "amazon_uk", label: "Amazon.co.uk" },
  { id: "amazon_in", label: "Amazon.in" },
  { id: "amazon_de", label: "Amazon.de" },
  { id: "amazon_ca", label: "Amazon.ca" },
  { id: "amazon_au", label: "Amazon.com.au" },
  { id: "barnes_noble", label: "Barnes & Noble / Nook" },
  { id: "apple_books", label: "Apple Books" },
  { id: "google_play", label: "Google Play Books" },
  { id: "kobo", label: "Kobo" },
  { id: "audible", label: "Audible" },
  { id: "bookshop", label: "Bookshop.org" },
  { id: "ingramspark", label: "IngramSpark" },
  { id: "smashwords", label: "Smashwords" },
  { id: "lulu", label: "Lulu" },
  { id: "blurb", label: "Blurb" },
  { id: "walmart", label: "Walmart" },
  { id: "target", label: "Target" },
  { id: "waterstones", label: "Waterstones" },
  { id: "indiebound", label: "IndieBound / Indie bookstores" },
  { id: "flipkart", label: "Flipkart" },
  { id: "gumroad", label: "Gumroad / Payhip" },
  { id: "shopify", label: "Shopify store" },
  { id: "other", label: "Other retailer" },
  { id: "all", label: "Select All" },
] as const;

/** Platforms on Publish → Rights & sales (+ SEO /sell-on/ pages). */
export const PLATFORM_LOGO_CHANNELS: readonly PlatformLogoChannel[] = [
  {
    id: "amazon",
    label: "Amazon",
    logo: "/sales-channels/amazon.png",
    path: "/sell-on/amazon/",
    urlPlaceholder: "https://www.amazon.com/dp/...",
  },
  {
    id: "barnes_noble",
    label: "Barnes & Noble",
    logo: "/sales-channels/barnes_noble.png",
    path: "/sell-on/barnes-noble/",
    urlPlaceholder: "https://www.barnesandnoble.com/...",
  },
  {
    id: "apple_books",
    label: "Apple Books",
    logo: "/sales-channels/apple_books.png",
    path: "/sell-on/apple-books/",
    urlPlaceholder: "https://books.apple.com/...",
  },
  {
    id: "google_play",
    label: "Google Play Books",
    logo: "/sales-channels/google_play.png",
    path: "/sell-on/google-play-books/",
    urlPlaceholder: "https://play.google.com/store/books/...",
  },
  {
    id: "kobo",
    label: "Kobo",
    logo: "/sales-channels/kobo.png",
    path: "/sell-on/kobo/",
    urlPlaceholder: "https://www.kobo.com/...",
  },
  {
    id: "audible",
    label: "Audible",
    logo: "/sales-channels/audible.png",
    path: "/sell-on/audible/",
    urlPlaceholder: "https://www.audible.com/...",
  },
  {
    id: "bookshop",
    label: "Bookshop.org",
    logo: "/sales-channels/bookshop.png",
    path: "/sell-on/bookshop/",
    urlPlaceholder: "https://bookshop.org/...",
  },
  {
    id: "ingramspark",
    label: "IngramSpark",
    logo: "/sales-channels/ingramspark.png",
    path: "/sell-on/ingramspark/",
    urlPlaceholder: "https://...",
  },
  {
    id: "smashwords",
    label: "Smashwords",
    logo: "/sales-channels/smashwords.png",
    path: "/sell-on/smashwords/",
    urlPlaceholder: "https://www.smashwords.com/...",
  },
  {
    id: "lulu",
    label: "Lulu",
    logo: "/sales-channels/lulu.png",
    path: "/sell-on/lulu/",
    urlPlaceholder: "https://www.lulu.com/...",
  },
  {
    id: "blurb",
    label: "Blurb",
    logo: "/sales-channels/blurb.png",
    path: "/sell-on/blurb/",
    urlPlaceholder: "https://www.blurb.com/...",
  },
  {
    id: "walmart",
    label: "Walmart",
    logo: "/sales-channels/walmart.png",
    path: "/sell-on/walmart/",
    urlPlaceholder: "https://www.walmart.com/...",
  },
  {
    id: "target",
    label: "Target",
    logo: "/sales-channels/target.png",
    path: "/sell-on/target/",
    urlPlaceholder: "https://www.target.com/...",
  },
  {
    id: "waterstones",
    label: "Waterstones",
    logo: "/sales-channels/waterstones.png",
    path: "/sell-on/waterstones/",
    urlPlaceholder: "https://www.waterstones.com/...",
  },
  {
    id: "indiebound",
    label: "IndieBound",
    logo: "/sales-channels/indiebound.png",
    path: "/sell-on/indiebound/",
    urlPlaceholder: "https://www.indiebound.org/...",
  },
  {
    id: "flipkart",
    label: "Flipkart",
    logo: "/sales-channels/flipkart.png",
    path: "/sell-on/flipkart/",
    urlPlaceholder: "https://www.flipkart.com/...",
  },
  {
    id: "gumroad",
    label: "Gumroad",
    logo: "/sales-channels/gumroad.png",
    path: "/sell-on/gumroad/",
    urlPlaceholder: "https://gumroad.com/...",
  },
  {
    id: "shopify",
    label: "Shopify",
    logo: "/sales-channels/shopify.png",
    path: "/sell-on/shopify/",
    urlPlaceholder: "https://your-store.myshopify.com/...",
  },
] as const;

export function getPlatformById(id: string) {
  return PLATFORM_LOGO_CHANNELS.find((p) => p.id === id);
}

export const DEFAULT_SALES_CHANNEL = "amazon";

/** URL path slug → platform (for /sell-on/[slug]/). */
export const SELL_ON_SLUG_LIST = PLATFORM_LOGO_CHANNELS.map((p) =>
  p.path.replace(/^\/sell-on\//, "").replace(/\/$/, "")
);

export function getPlatformBySellOnSlug(slug: string) {
  return PLATFORM_LOGO_CHANNELS.find(
    (p) => p.path === `/sell-on/${slug}/` || p.path === `/sell-on/${slug}`
  );
}

/** Absolute-ready paths for sitemap-app.xml / GSC. */
export const SELL_ON_SITEMAP_PATHS: readonly string[] =
  PLATFORM_LOGO_CHANNELS.map((p) => p.path);
