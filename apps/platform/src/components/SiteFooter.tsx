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
      {
        href: `${MARKETING_URL}/blog/author-publishing-blog-resources/`,
        label: "Blog",
      },
      { href: "/how-publishing-works", label: "How Publishing Works" },
      { href: "/faq", label: "FAQ" },
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
      { href: "/publish", label: "Publish Your Book" },
      { href: "/publish/start", label: "Submit Your Book" },
      { href: "/bookstore", label: "BookStore" },
      { href: "/authors", label: "Browse Authors" },
      { href: "/pricing", label: "Pricing" },
      { href: "/author-guidelines", label: "Author Guidelines" },
    ],
  },
  {
    title: "Our Services",
    links: [
      {
        href: `${MARKETING_URL}/book-writing-services-for-authors/`,
        label: "Write",
      },
      {
        href: `${MARKETING_URL}/self-publishing-agency-services/`,
        label: "Prepare",
      },
      {
        href: `${MARKETING_URL}/audiobook-production-services-for-authors/`,
        label: "Audiobooks",
      },
      {
        href: `${MARKETING_URL}/book-marketing-services-for-authors/`,
        label: "Promote",
      },
      {
        href: `${MARKETING_URL}/author-website-design-agency-usa/`,
        label: "Website",
      },
      {
        href: `${MARKETING_URL}/author-publishing-website-price/`,
        label: "Packages",
      },
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      { href: "/dashboard", label: "Your Dashboard" },
      { href: "/community-policy", label: "Community Policy" },
      { href: "/copyright", label: "Copyright" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      {
        href: `${MARKETING_URL}/contact-author-website-design-agency/`,
        label: "Help & Support",
      },
    ],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-forest-wash text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
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

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4 px-4 py-6 sm:gap-6 sm:px-6 lg:px-8">
          <a
            href={MARKETING_HOME_URL}
            className="relative block h-12 w-12 shrink-0"
            aria-label="Authors Pilot"
          >
            <Image
              src={platformPublicPath("/logo-authors-pilot.webp")}
              alt="Authors Pilot"
              width={80}
              height={80}
              className="h-full w-full object-contain"
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
            <a href="tel:+12023306521" className="transition hover:text-white hover:underline">
              +1 (202) 330-6521
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
          © {year} Authors Pilot. Keep 100% of your book royalties. Legal pages
          are drafts and do not constitute legal advice.
        </p>
      </div>
    </footer>
  );
}

/** @deprecated Use SiteFooter - same Amazon-style Authors Pilot footer sitewide. */
export { SiteFooter as BookstoreFooter };
