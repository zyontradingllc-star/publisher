"use client";

import Link from "next/link";
import { brand, footer } from "@/content/site";
import { BrandLogo } from "@/components/layout/BrandLogo";

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M6.5 9.5H3.75V20.25H6.5V9.5ZM5.12 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM20.25 20.25h-2.75v-5.35c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.44H10.94V9.5h2.64v1.47h.04c.37-.7 1.27-1.44 2.61-1.44 2.79 0 3.3 1.84 3.3 4.22v6.5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M3 4.5h4.2l4.05 5.7L16.8 4.5H21l-6.75 8.1L21.3 19.5h-4.2l-4.35-6.15L7.2 19.5H3l7.05-8.55L3 4.5Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-auto bg-ink text-linen">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-soft bg-slate px-6 py-8 sm:flex-row sm:items-center sm:px-8">
          <div>
            <h3 className="font-display text-2xl font-semibold text-linen">
              {footer.cta.label}
            </h3>
            <p className="mt-1 text-sm text-charcoal">{brand.tagline}</p>
          </div>
          <Link
            href={footer.cta.href}
            className="group relative inline-flex overflow-hidden rounded-md bg-[#032bb8] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-cta transition duration-300 hover:-translate-y-0.5 hover:bg-[#02208f] hover:shadow-cta-lg"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%] motion-reduce:hidden"
            />
            <span className="relative">{footer.cta.link}</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center text-linen">
            <BrandLogo size="lg" />
          </Link>
          <p className="mt-3 font-display text-[20px] text-coral-soft">{footer.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal">
            {footer.blurb}
          </p>
          <div className="mt-6 flex gap-3">
            {footer.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-linen transition hover:border-coral hover:bg-coral hover:text-white"
              >
                <SocialIcon icon={item.icon} />
              </a>
            ))}
          </div>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title} className="lg:col-span-2">
            <h3 className="font-display text-lg font-semibold">{column.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal transition hover:text-coral-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-charcoal sm:px-6">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}
