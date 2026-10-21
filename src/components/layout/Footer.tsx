"use client";

import Link from "next/link";
import Image from "next/image";
import { brand, homeHref } from "@/content/site";
import { platformHref } from "@/lib/platform";

const columns = [
  {
    title: "Get to Know Us",
    links: [
      { href: "/about-authorspilot-publishing-agency", label: "About Authors Pilot" },
      { href: "/blog/author-publishing-blog-resources", label: "Blog" },
      { href: platformHref("/how-publishing-works"), label: "How Publishing Works" },
      { href: platformHref("/faq"), label: "FAQ" },
      { href: "/contact-author-website-design-agency", label: "Contact Us" },
      { href: homeHref, label: "authorspilot.com" },
    ],
  },
  {
    title: "Publish With Us",
    links: [
      { href: platformHref("/publish"), label: "Publish Your Book" },
      { href: platformHref("/publish/start"), label: "Submit Your Book" },
      { href: platformHref("/bookstore"), label: "BookStore" },
      { href: platformHref("/authors"), label: "Browse Authors" },
      { href: platformHref("/pricing"), label: "Pricing" },
      { href: platformHref("/author-guidelines"), label: "Author Guidelines" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { href: "/book-writing-services-for-authors", label: "Write" },
      { href: "/self-publishing-agency-services", label: "Prepare" },
      { href: "/audiobook-production-services-for-authors", label: "Audiobooks" },
      { href: "/book-marketing-services-for-authors", label: "Promote" },
      { href: "/author-website-design-agency-usa", label: "Website" },
      { href: "/author-publishing-website-price", label: "Packages" },
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      { href: platformHref("/dashboard"), label: "Your Dashboard" },
      { href: platformHref("/community-policy"), label: "Community Policy" },
      { href: platformHref("/copyright"), label: "Copyright" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/contact-author-website-design-agency", label: "Help & Support" },
    ],
  },
] as const;

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export function Footer() {
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
                    {isExternal(link.href) ? (
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
          <Link
            href={homeHref}
            className="relative block h-12 w-12 shrink-0"
            aria-label={`${brand.name} home`}
          >
            <Image
              src="/logo-authors-pilot.webp?v=2"
              alt={brand.name}
              width={80}
              height={80}
              className="h-full w-full object-contain"
            />
          </Link>
          <p className="font-display text-lg font-bold text-white">
            {brand.name}
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
            <a href="tel:+12023306521" className="transition hover:underline hover:text-white">
              +1 (202) 330-6521
            </a>
            {" · "}
            <a
              href="mailto:info@authorspilot.com"
              className="transition hover:underline hover:text-white"
            >
              info@authorspilot.com
            </a>
          </p>
        </div>
        <p className="pb-6 text-center text-xs text-white/55">
          © {year} {brand.name}. Keep 100% of your book royalties.
        </p>
      </div>
    </footer>
  );
}
