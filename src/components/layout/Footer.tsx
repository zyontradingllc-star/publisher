"use client";

import Link from "next/link";
import Image from "next/image";
import { brand, footer, homeHref } from "@/content/site";
import { Button } from "@/components/ui/Button";

const telHref = `tel:${brand.phone.replace(/[^\d+]/g, "")}`;
const telAltHref = `tel:${brand.phoneAlt.replace(/[^\d+]/g, "")}`;

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 4.5h2.2l1 4.2-1.7 1.1a12.5 12.5 0 0 0 6.2 6.2l1.1-1.7 4.2 1v2.2c0 .8-.7 1.5-1.5 1.5C9.6 19 5 14.4 5 6c0-.8.7-1.5 1.5-1.5z"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7.5 12 13l8-5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-cta-wash text-linen">
      <div className="border-b border-sand bg-ivory">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-xl">
            <p className="heading-section">
              {footer.cta.headline}
            </p>
            <p className="mt-2 font-sans text-sm text-charcoal sm:text-base">
              {footer.cta.subhead}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
            <Button href={footer.cta.href}>{footer.cta.label}</Button>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-5 py-3 font-sans text-sm font-semibold text-ink shadow-soft transition hover:border-coral/40 hover:text-[#273E2B]"
            >
              <PhoneIcon className="h-4 w-4" />
              {brand.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-14 pb-0 text-center sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-8">
        <div className="flex flex-col items-center">
          <Link
            href={homeHref}
            className="inline-flex flex-col items-center"
            aria-label={`${brand.name} home`}
          >
            <Image
              src="/logo-authors-pilot.webp?v=2"
              alt={brand.name}
              width={200}
              height={190}
              className="h-auto w-44 sm:w-56"
            />
          </Link>
          <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-white/75">
            {footer.blurb}
          </p>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => {
                const external = /^https?:\/\//i.test(link.href);
                return (
                  <li key={`${link.href}-${link.label}`}>
                    {external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm text-white/75 transition hover:text-[#273E2B]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-white/75 transition hover:text-[#273E2B]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
            Get In Touch
          </h3>
          <ul className="mt-4 inline-flex flex-col items-center space-y-3.5">
            <li>
              <a
                href={telHref}
                className="flex items-center justify-center gap-2.5 font-sans text-sm text-white/75 transition hover:text-[#273E2B]"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {brand.phone}
              </a>
            </li>
            <li>
              <a
                href={telAltHref}
                className="flex items-center justify-center gap-2.5 font-sans text-sm text-white/75 transition hover:text-[#273E2B]"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {brand.phoneAlt}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center justify-center gap-2.5 font-sans text-sm text-white/75 transition hover:text-[#273E2B]"
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                hello@AuthorsPilot.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 text-center text-xs text-white/60 sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>
            © {year} {brand.name}. All rights reserved. Authors keep 100% of
            their rights & royalties.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
            <Link href="/privacy-policy" className="transition hover:text-[#273E2B]">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms-and-conditions" className="transition hover:text-[#273E2B]">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
