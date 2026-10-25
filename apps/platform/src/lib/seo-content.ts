/** Shared AEO/SEO copy for app.authorspilot.com — single source, no duplicates. */

export const APP_ORG = {
  name: "Authors Pilot",
  legalName: "Authors Pilot",
  url: "https://app.authorspilot.com",
  email: "info@authorspilot.com",
  phone: "+1-346-421-2554",
  phoneDisplay: "+1 (346) 421-2554",
  address: {
    street: "8 The Green B",
    city: "Dover",
    region: "DE",
    postal: "19901",
    country: "US",
  },
} as const;

export const PRIMARY_KEYWORDS = [
  "free author page with amazon link",
  "one link to sell book everywhere",
  "keep 100% book royalties platform",
  "booklinker alternative free",
  "universal book link without draft2digital",
] as const;

/** Five launch FAQs used in FAQPage JSON-LD and AEO pages (40–50 word answers). */
export const LAUNCH_FAQS = [
  {
    question: "Do I keep 100% royalties?",
    answer:
      "Yes. Authors Pilot never takes a commission on book sales. Readers buy on Amazon or your own website, and you keep the royalties those channels pay. Optional design or publishing services are billed separately and never as a cut of your sales.",
  },
  {
    question: "How is Authors Pilot different from Books2Read?",
    answer:
      "Books2Read mainly gives a multi-store link. Authors Pilot gives a branded author page, one shareable link, outbound click tracking, and 100% royalties with no Draft2Digital lock-in. You stay in control of Amazon and website destinations without routing sales through our checkout.",
  },
  {
    question: "How does universal book link work?",
    answer:
      "You submit your book once, add Amazon or website purchase URLs, and after approval you get a public author page plus a single shareable link. Readers open that link, see your brand, then click out to buy where you already sell—no Authors Pilot cart or fee.",
  },
  {
    question: "Can I link to Amazon and my own website?",
    answer:
      "Yes. Add Amazon, your author website, and other store links on each book. Purchase buttons send readers straight to those destinations. Authors Pilot records outbound clicks for analytics but never processes the sale or takes a royalty percentage.",
  },
  {
    question: "Is it free during launch?",
    answer:
      "Yes. During launch you can create an author profile, get a free author page, and list eligible books at no platform fee. Optional professional services such as covers or websites may have separate prices. Paid memberships, if introduced later, will be announced in advance.",
  },
] as const;

export const VS_BOOKS2READ_POINTS = [
  {
    title: "Branded author page",
    body: "A public profile for your books and bio—not just a plain redirect menu.",
  },
  {
    title: "Click analytics",
    body: "See outbound interest from your dashboard so you know which titles get attention.",
  },
  {
    title: "100% royalties",
    body: "No Authors Pilot commission on Amazon or website sales—ever.",
  },
  {
    title: "No Draft2Digital lock-in",
    body: "Use a free universal book link without joining Draft2Digital distribution first.",
  },
] as const;

export const VS_BOOKLINKER_POINTS = [
  {
    title: "Author brand, not only a short link",
    body: "Booklinker focuses on smart redirects; Authors Pilot adds a branded page readers remember.",
  },
  {
    title: "Built for indie authors",
    body: "List covers, genres, and bio in one place, then send buyers to Amazon or your site.",
  },
  {
    title: "Free during launch",
    body: "A Booklinker alternative free to start—no paid plan required to list during launch.",
  },
  {
    title: "Keep 100% of royalties",
    body: "We never sit in the checkout. Your Amazon and website royalty rates stay yours.",
  },
] as const;
