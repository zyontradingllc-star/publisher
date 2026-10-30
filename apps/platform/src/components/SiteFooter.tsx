import Image from "next/image";
import Link from "next/link";
import {
  MARKETING_HOME_URL,
  MARKETING_URL,
  platformPublicPath,
} from "@/lib/utils";

const columns = [
  {
    title: "Get to Know Us",
    links: [
      {
        href: `${MARKETING_URL}/about-authorspilot-publishing-agency/`,
        label: "About Authors Pilot",
      },
      { href: "/blog/", label: "Blog" },
      { href: "/guides/", label: "Guides" },
      { href: "/how-it-works/", label: "How It Works" },
      { href: "/faq/", label: "FAQ" },
      { href: "/vs-books2read/", label: "vs Books2Read" },
      { href: "/vs-booklinker/", label: "vs Booklinker" },
      {
        href: `${MARKETING_URL}/contact-author-website-design-agency/`,
        label: "Contact Us",
      },
      { href: MARKETING_HOME_URL, label: "authorspilot.com" },
    ],
  },
  {
    title: "Publish With Us",
    links: [
      { href: "/publish/", label: "Publish Your Book" },
      { href: "/signup/", label: "Signup" },
      { href: "/bookstore/", label: "BookStore" },
      { href: "/authors/", label: "Browse Authors" },
      { href: "/pricing/", label: "Pricing" },
      { href: "/author-guidelines/", label: "Author Guidelines" },
      { href: "/publish/", label: "Get Your Free Author Page" },
      {
        href: `${MARKETING_URL}/author-publishing-website-price/`,
        label: "Packages",
      },
      { href: "/community-policy/", label: "Community Policy" },
    ],
  },
  {
    title: "Writing & Design",
    links: [
      {
        href: `${MARKETING_URL}/book-writing-services-for-authors/`,
        label: "eBook Writing & Publishing",
      },
      {
        href: `${MARKETING_URL}/ghostwriting-services-for-authors/`,
        label: "Ghostwriting",
      },
      {
        href: `${MARKETING_URL}/professional-book-editing-services/`,
        label: "Book Editing & Proofreading",
      },
      {
        href: `${MARKETING_URL}/book-formatting-services-for-authors/`,
        label: "Book Formatting",
      },
      {
        href: `${MARKETING_URL}/book-cover-design-services/`,
        label: "Book Cover Design",
      },
      {
        href: `${MARKETING_URL}/book-cover-design-services/`,
        label: "eBook Cover Designing",
      },
      {
        href: `${MARKETING_URL}/book-cover-design-services/`,
        label: "Book Illustration",
      },
      {
        href: `${MARKETING_URL}/author-website-design-agency-usa/`,
        label: "Author Website Development",
      },
      {
        href: `${MARKETING_URL}/contact-author-website-design-agency/`,
        label: "Help & Support",
      },
    ],
  },
  {
    title: "Publishing & Marketing",
    links: [
      {
        href: `${MARKETING_URL}/book-publishing-services-for-authors/`,
        label: "Book Publishing",
      },
      {
        href: `${MARKETING_URL}/self-publishing-services-for-authors/`,
        label: "Self Publishing",
      },
      {
        href: `${MARKETING_URL}/amazon-kdp-publishing-services/`,
        label: "Global Publishing",
      },
      {
        href: `${MARKETING_URL}/book-publishing-services-for-authors/`,
        label: "Children Book Publishing",
      },
      {
        href: `${MARKETING_URL}/book-marketing-services-for-authors/`,
        label: "Book Marketing",
      },
      {
        href: `${MARKETING_URL}/audiobook-production-services-for-authors/`,
        label: "Audiobook Production",
      },
      { href: "/copyright/", label: "Copyright" },
      { href: `${MARKETING_URL}/privacy/`, label: "Privacy" },
      { href: `${MARKETING_URL}/terms/`, label: "Terms" },
    ],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-forest-wash text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <h3 className="text-sm font-bold text-white">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        className="text-sm text-white/75 transition hover:underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition hover:underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        className="border-t border-white/15"
        style={{
          backgroundColor: "#2a412e",
          backgroundImage:
            "radial-gradient(circle, rgba(167,196,171,0.35) 1.5px, transparent 1.6px), linear-gradient(165deg, #304935 0%, #2a412e 48%, #253b29 100%)",
          backgroundSize: "18px 18px, auto",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4 px-4 py-6 sm:gap-6 sm:px-6 lg:px-8">
          <a
            href="/publish/"
            className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/25 bg-white/10"
            aria-label="Authors Pilot"
          >
            <Image
              src={platformPublicPath("/logo-authors-pilot.webp")}
              alt="Authors Pilot"
              width={80}
              height={80}
              className="h-full w-full object-cover"
              unoptimized
            />
          </a>
          <p className="font-display text-lg font-bold text-white">
            Authors Pilot
          </p>
          <span className="rounded border border-white/30 px-3 py-1.5 text-xs text-white/80">
            English
          </span>
          <span className="rounded border border-white/30 px-3 py-1.5 text-xs text-white/80">
            USD · Worldwide
          </span>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-4 text-center text-sm text-white/70 sm:px-6 lg:px-8">
          <p>8 The Green B, Dover, DE 19901, USA</p>
          <p className="mt-1">
            <a href="tel:+17712210508" className="transition hover:text-white hover:underline">
              +1 (771) 221-0508
            </a>
            {" · "}
            <a
              href="mailto:info@authorspilot.com"
              className="transition hover:text-white hover:underline"
            >
              info@authorspilot.com
            </a>
          </p>
        </div>
        <p className="pb-6 text-center text-xs text-white/55">
          © {year} Authors Pilot. Keep 100% of your book royalties.
        </p>
      </div>
    </footer>
  );
}

/** @deprecated Use SiteFooter - same Amazon-style Authors Pilot footer sitewide. */
export { SiteFooter as BookstoreFooter };
