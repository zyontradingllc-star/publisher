"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SignupCta } from "@/components/forms/SignupCta";
import { Button } from "@/components/ui/Button";
import {
  MARKETING_HOME_URL,
  MARKETING_URL,
  platformPublicPath,
} from "@/lib/utils";
import type { Profile } from "@/types/database";

const CONTACT_HREF = `${MARKETING_URL}/contact-author-website-design-agency/`;

const SERVICES_CHILDREN = [
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
] as const;

const NAV_LINKS = [
  { href: "/publish", label: "Publish" },
  { href: "/bookstore", label: "BookStore" },
  {
    href: MARKETING_HOME_URL,
    label: "Services",
    children: SERVICES_CHILDREN,
  },
  {
    href: `${MARKETING_URL}/author-website-design-agency-usa/`,
    label: "Website",
  },
  { href: CONTACT_HREF, label: "Contact" },
] as const;

type Props = {
  profile?: Profile | null;
};

export function SiteHeader({ profile }: Props) {
  const loggedIn = Boolean(profile && profile.id !== "lead-session");
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const linkClass = (mobile = false) =>
    mobile
      ? "block rounded-lg px-3 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:bg-ivory"
      : "rounded-full px-3 py-1.5 text-[13px] font-medium text-charcoal transition-colors hover:bg-sand/40 hover:text-[#E08A2A]";

  return (
    <>
      <div className="relative z-50 bg-cta-wash px-4 py-2 text-center text-xs text-white/80 sm:text-sm">
        <a href={MARKETING_HOME_URL} className="transition hover:text-white">
          Pilot Your Story. Self-Publishing Story System.
        </a>{" "}
        <a
          href={CONTACT_HREF}
          className="font-medium text-[#273E2B] underline-offset-2 hover:underline"
        >
          Start a conversation →
        </a>
      </div>

      <header className="relative sticky top-0 z-50 border-b border-sand/40 bg-white/85 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80">
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-1 sm:gap-4 sm:px-6 lg:px-8">
          <a
            href={MARKETING_HOME_URL}
            className="inline-flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            aria-label="Authors Pilot home"
          >
            <span className="relative block h-12 w-[52px] sm:h-14 sm:w-[60px]">
              <Image
                src={platformPublicPath("/logo-authors-pilot.webp")}
                alt=""
                width={400}
                height={400}
                className="h-full w-full object-contain object-left"
                priority
                unoptimized
              />
            </span>
            <span className="font-display text-base font-bold tracking-tight text-[#273E2B] sm:text-lg lg:text-xl">
              Authors Pilot
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              if ("children" in link && link.children) {
                return (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className={`${linkClass()} inline-flex items-center gap-0.5`}>
                      <a
                        href={link.href}
                        className="rounded-full px-3 py-1.5 -my-1.5 -ml-3"
                      >
                        {link.label}
                      </a>
                      <button
                        type="button"
                        className="rounded-full p-1.5 -my-1.5 -mr-1.5 hover:bg-sand/40"
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                        aria-label="Services menu"
                        onClick={(e) => {
                          e.preventDefault();
                          setServicesOpen((v) => !v);
                        }}
                      >
                        <svg
                          viewBox="0 0 12 12"
                          className={`h-3 w-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                          fill="currentColor"
                          aria-hidden
                        >
                          <path
                            d="M2.5 4.5 6 8l3.5-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    {servicesOpen ? (
                      <ul className="absolute left-0 top-full z-50 min-w-[11rem] rounded-xl border border-sand bg-white py-2 shadow-lift">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              className="block px-4 py-2 text-[13px] font-medium text-charcoal transition-colors hover:bg-ivory hover:text-[#E08A2A]"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              }

              return (
                <li key={`${link.href}-${link.label}`}>
                  {link.href.startsWith("http") ? (
                    <a href={link.href} className={linkClass()}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass()}>
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            {loggedIn ? (
              <>
                {profile?.role === "admin" ? (
                  <Link
                    href="/admin"
                    className="rounded-full px-3 py-1.5 text-[13px] font-medium text-charcoal hover:text-[#E08A2A]"
                  >
                    Admin
                  </Link>
                ) : null}
                <Button href="/dashboard" variant="ghost" className="!px-4 !py-2 !text-xs">
                  Dashboard
                </Button>
              </>
            ) : (
              <SignupCta className="!px-4 !py-2 !text-xs" />
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="platform-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 rounded bg-ink transition-transform ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-ink transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 block h-0.5 w-5 rounded bg-ink transition-transform ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        {open ? (
          <div
            id="platform-mobile-menu"
            className="border-t border-sand/40 bg-white lg:hidden"
          >
            <div className="px-4 py-4">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => {
                  if ("children" in link && link.children) {
                    return (
                      <li key={link.label}>
                        <div
                          className={`${linkClass(true)} flex w-full items-center justify-center gap-1`}
                        >
                          <a
                            href={link.href}
                            onClick={() => setOpen(false)}
                          >
                            {link.label}
                          </a>
                          <button
                            type="button"
                            className="rounded p-1"
                            aria-expanded={mobileServicesOpen}
                            aria-label="Services menu"
                            onClick={() => setMobileServicesOpen((v) => !v)}
                          >
                            <svg
                              viewBox="0 0 12 12"
                              className={`h-3 w-3 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                              fill="currentColor"
                              aria-hidden
                            >
                              <path
                                d="M2.5 4.5 6 8l3.5-3.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        {mobileServicesOpen ? (
                          <ul className="mt-1 space-y-0.5 border-l border-sand pl-3">
                            {link.children.map((child) => (
                              <li key={child.href}>
                                <a
                                  href={child.href}
                                  className={linkClass(true)}
                                  onClick={() => setOpen(false)}
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    );
                  }

                  return (
                    <li key={`${link.href}-${link.label}`}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          className={linkClass(true)}
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className={linkClass(true)}
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-center pt-4">
                {loggedIn ? (
                  <Button href="/dashboard" variant="ghost">
                    Dashboard
                  </Button>
                ) : (
                  <SignupCta />
                )}
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
