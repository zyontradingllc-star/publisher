/** App-only SEO landing pages from the app sitemap (guides, compare, bookstore hubs). */

export type SeoAppPage = {
  slug: string;
  path: string;
  kind: "guide" | "compare" | "bookstore";
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  question: string;
  answer: string;
  bullets: string[];
};

const GUIDE_SLUGS = [
  "create-author-page",
  "free-author-profile-page",
  "author-link-in-bio",
  "one-link-for-all-books",
  "share-your-book-link",
  "book-link-instagram-bio",
  "author-landing-page",
  "qr-code-for-book",
  "custom-book-url",
  "what-to-put-on-author-page",
  "author-bio-for-book-listing",
  "author-profile-examples",
  "build-author-brand-online",
  "list-your-book-online",
  "list-book-for-free",
  "book-listing-requirements",
  "book-cover-for-listing",
  "write-book-description",
  "choose-book-genre",
  "add-purchase-links",
  "list-book-already-on-amazon",
  "list-kindle-ebook",
  "list-paperback-book",
  "list-audiobook",
  "list-self-published-book",
  "book-listing-review-process",
  "update-book-listing",
  "sell-books-direct",
  "sell-books-without-amazon",
  "sell-books-on-your-website",
  "keep-100-percent-royalties",
  "no-commission-book-platform",
  "how-authors-make-money",
  "sell-ebooks-from-website",
  "payment-options-selling-direct",
  "build-author-email-list",
  "how-to-price-a-book",
  "own-your-reader-relationships",
  "book-royalty-rates-explained",
  "promote-book-social-media",
  "promote-book-instagram",
  "booktok-for-authors",
  "promote-book-facebook",
  "promote-book-on-x",
  "share-book-link-whatsapp",
  "promote-book-pinterest",
  "linkedin-for-nonfiction-authors",
  "youtube-book-promotion",
  "book-link-email-signature",
  "book-promotion-content-ideas",
  "social-media-post-ideas-authors",
  "book-launch-announcement-post",
  "book-launch-social-media-plan",
  "track-book-link-clicks",
  "outbound-click-tracking",
  "utm-links-for-authors",
  "best-social-platform-for-book-sales",
  "understand-reader-interest",
  "measure-book-marketing",
  "google-analytics-for-authors",
  "author-dashboard-guide",
  "what-is-authors-pilot",
  "is-authors-pilot-free",
  "book-discovery-sites-for-indie-authors",
  "do-authors-need-a-website",
  "indie-author-checklist",
] as const;

const COMPARE_SLUGS = [
  "author-page-vs-author-website",
  "direct-sales-vs-retailers",
  "author-store-vs-author-page",
  "book-listing-vs-publishing",
  "amazon-author-central-vs-author-page",
  "goodreads-author-profile-vs-author-page",
  "link-in-bio-tools-for-authors",
  "indie-author-platforms",
] as const;

const BOOKSTORE_SLUGS = [
  "romance",
  "fantasy",
  "thriller",
  "mystery",
  "science-fiction",
  "memoir",
  "nonfiction",
  "childrens",
  "young-adult",
  "horror",
  "historical-fiction",
  "self-help",
  "business",
  "poetry",
  "cozy-mystery",
  "biography",
  "new-releases",
  "book-club-picks",
] as const;

/** Static paths for sitemap-app.xml (exact list from product SEO brief). */
export const APP_SITEMAP_STATIC_PATHS: readonly string[] = [
  "/publish/",
  "/bookstore/",
  "/authors/",
  "/pricing/",
  "/how-publishing-works/",
  "/faq/",
  "/author-guidelines/",
  "/guides/",
  ...GUIDE_SLUGS.map((s) => `/guides/${s}/`),
  ...COMPARE_SLUGS.map((s) => `/compare/${s}/`),
  ...BOOKSTORE_SLUGS.map((s) => `/bookstore/${s}/`),
];

function humanize(slug: string): string {
  return slug
    .split("-")
    .map((w) => {
      if (w === "vs") return "vs";
      if (w === "100") return "100%";
      if (w === "percent") return "";
      if (w === "utm") return "UTM";
      if (w === "qr") return "QR";
      if (w === "x") return "X";
      if (w === "booktok") return "BookTok";
      if (w === "kindle") return "Kindle";
      if (w === "amazon") return "Amazon";
      if (w === "instagram") return "Instagram";
      if (w === "facebook") return "Facebook";
      if (w === "whatsapp") return "WhatsApp";
      if (w === "pinterest") return "Pinterest";
      if (w === "linkedin") return "LinkedIn";
      if (w === "youtube") return "YouTube";
      if (w === "goodreads") return "Goodreads";
      if (w === "childrens") return "Children's";
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function guidePage(slug: string): SeoAppPage {
  const topic = humanize(slug);
  const question = `How do I ${topic.toLowerCase().replace(/^how /, "")}?`;
  return {
    slug,
    path: `/guides/${slug}/`,
    kind: "guide",
    title: `${topic} | Authors Pilot Guide`,
    description: `${topic} for indie authors: free author page, one shareable book link to Amazon or your website, click tracking, and 100% royalties—no commission.`,
    h1: topic,
    eyebrow: "Author guide",
    question:
      question.length > 90
        ? `What should authors know about ${topic.toLowerCase()}?`
        : question,
    answer: `${topic} on Authors Pilot starts with a free author page and one shareable link. Add Amazon or website buy buttons, share that URL everywhere, and keep 100% royalties—Authors Pilot never takes a sales commission. Outbound clicks help you see which posts drive reader interest.`,
    bullets: [
      "Create a free branded author page for your books and bio.",
      "Use one link in bios, emails, and posts instead of juggling store URLs.",
      "Send readers to Amazon or your own site—you keep retailer royalties.",
      "Review outbound clicks in your dashboard to improve what you promote.",
    ],
  };
}

function comparePage(slug: string): SeoAppPage {
  const topic = humanize(slug);
  return {
    slug,
    path: `/compare/${slug}/`,
    kind: "compare",
    title: `${topic} | Authors Pilot Comparison`,
    description: `Compare ${topic.toLowerCase()}. Authors Pilot gives a branded author page, universal book link, click analytics, and 100% royalties with no commission.`,
    h1: topic,
    eyebrow: "Compare",
    question: `How does Authors Pilot fit ${topic.toLowerCase()}?`,
    answer: `${topic} often leaves authors with a plain profile or redirect. Authors Pilot adds a branded author page, one shareable link to Amazon or your website, outbound click tracking, and zero commission on sales so you keep 100% of royalties those channels pay.`,
    bullets: [
      "Branded author page readers remember—not only a link menu.",
      "One URL for social, email, QR codes, and ads.",
      "Purchase clicks go to Amazon or your site; we do not take a cut.",
      "Free during launch so you can list and share without a platform fee.",
    ],
  };
}

function bookstorePage(slug: string): SeoAppPage {
  const topic =
    slug === "childrens"
      ? "Children's Books"
      : slug === "new-releases"
        ? "New Releases"
        : slug === "book-club-picks"
          ? "Book Club Picks"
          : slug === "science-fiction"
            ? "Science Fiction"
            : slug === "young-adult"
              ? "Young Adult"
              : slug === "self-help"
                ? "Self-Help"
                : slug === "historical-fiction"
                  ? "Historical Fiction"
                  : slug === "cozy-mystery"
                    ? "Cozy Mystery"
                    : humanize(slug);
  return {
    slug,
    path: `/bookstore/${slug}/`,
    kind: "bookstore",
    title: `${topic} Books | Authors Pilot Bookstore`,
    description: `Discover ${topic.toLowerCase()} books from indie authors on Authors Pilot. Free author pages, shareable buy links, and 100% royalties for authors.`,
    h1: `${topic} books`,
    eyebrow: "Bookstore",
    question: `Where can I find ${topic.toLowerCase()} books on Authors Pilot?`,
    answer: `Browse ${topic.toLowerCase()} titles listed by independent authors on Authors Pilot. Each book links out to Amazon or the author’s website—authors keep 100% royalties with no platform commission. Use an author page link to share your own ${topic.toLowerCase()} release.`,
    bullets: [
      `Explore ${topic.toLowerCase()} listings from indie authors.`,
      "Open buy links to Amazon or author websites—sales stay off-platform.",
      "Authors get a free page and one shareable link for this genre.",
      "Track interest with outbound click analytics after you publish.",
    ],
  };
}

const GUIDE_PAGES = Object.fromEntries(
  GUIDE_SLUGS.map((s) => [s, guidePage(s)])
) as Record<string, SeoAppPage>;

const COMPARE_PAGES = Object.fromEntries(
  COMPARE_SLUGS.map((s) => [s, comparePage(s)])
) as Record<string, SeoAppPage>;

const BOOKSTORE_PAGES = Object.fromEntries(
  BOOKSTORE_SLUGS.map((s) => [s, bookstorePage(s)])
) as Record<string, SeoAppPage>;

/** Stronger copy for high-intent pages. */
const OVERRIDES: Partial<Record<string, Partial<SeoAppPage>>> = {
  "keep-100-percent-royalties": {
    h1: "Keep 100% book royalties",
    question: "Do I keep 100% royalties on Authors Pilot?",
    answer:
      "Yes. Authors Pilot never takes a commission on book sales. Readers buy on Amazon or your website, and you keep the royalties those channels pay. Optional design services are billed separately—never as a cut of your sales.",
  },
  "what-is-authors-pilot": {
    h1: "What is Authors Pilot?",
    question: "What is Authors Pilot?",
    answer:
      "Authors Pilot is an independent publishing and discovery platform. Authors get a free branded page, one shareable book link, and click tracking while sending readers to Amazon or their own site—with no commission on sales.",
  },
  "is-authors-pilot-free": {
    h1: "Is Authors Pilot free?",
    question: "Is Authors Pilot free during launch?",
    answer:
      "Yes. During launch you can create a profile, get a free author page, and list eligible books at no platform fee. Optional professional services may have separate prices. Any future paid plans will be announced in advance.",
  },
  "author-link-in-bio": {
    h1: "Author link in bio",
    question: "What should authors put in their link in bio?",
    answer:
      "Use one Authors Pilot link in your Instagram, TikTok, or X bio. It opens your branded author page with buy buttons for Amazon or your website—so you stop swapping store URLs and can track outbound clicks from one place.",
  },
  "no-commission-book-platform": {
    h1: "No-commission book platform",
    question: "Is Authors Pilot a no-commission book platform?",
    answer:
      "Yes for book sales. We do not sit in checkout or take a royalty percentage. You list books, share one link, and send buyers to Amazon or your site while keeping 100% of those channel royalties.",
  },
};

export function getGuidePage(slug: string): SeoAppPage | undefined {
  const base = GUIDE_PAGES[slug];
  if (!base) return undefined;
  return { ...base, ...OVERRIDES[slug] };
}

export function getComparePage(slug: string): SeoAppPage | undefined {
  return COMPARE_PAGES[slug];
}

export function getBookstoreSeoPage(slug: string): SeoAppPage | undefined {
  return BOOKSTORE_PAGES[slug];
}

export function getAllGuidePages(): SeoAppPage[] {
  return GUIDE_SLUGS.map((s) => getGuidePage(s)!);
}

export function getAllComparePages(): SeoAppPage[] {
  return COMPARE_SLUGS.map((s) => getComparePage(s)!);
}

export function getAllBookstoreSeoPages(): SeoAppPage[] {
  return BOOKSTORE_SLUGS.map((s) => getBookstoreSeoPage(s)!);
}

export const GUIDE_SLUG_LIST = [...GUIDE_SLUGS];
export const COMPARE_SLUG_LIST = [...COMPARE_SLUGS];
export const BOOKSTORE_SEO_SLUG_LIST = [...BOOKSTORE_SLUGS];
