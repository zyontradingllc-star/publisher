"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand, homeHref, navLinks, servicesNavChildren } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { SignupCta } from "@/components/SignupCta";
import { platformHref } from "@/lib/platform";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const normalizePath = (path: string) => {
    const base = path.split("#")[0] || path;
    if (base === "/") return "/";
    return base.replace(/\/$/, "");
  };

  const isExternal = (href: string) => /^https?:\/\//i.test(href);

  const isActive = (href: string) =>
    !isExternal(href) && normalizePath(pathname) === normalizePath(href);

  const servicesActive = servicesNavChildren.some((c) => isActive(c.href));

  const handleNavClick = (href: string) => {
    if (isActive(href)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const linkClass = (active: boolean, mobile = false) =>
    mobile
      ? `block rounded-soft px-3 py-3 text-center font-medium transition-colors hover:bg-ivory ${
          active ? "font-semibold text-[#E08A2A]" : "text-ink"
        }`
      : `rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
          active
            ? "font-semibold text-[#E08A2A]"
            : "text-charcoal hover:bg-sand/40 hover:text-[#E08A2A]"
        }`;

  return (
    <>
      <div className="relative z-50 bg-cta-wash px-4 py-2 text-center text-xs text-white/80 sm:text-sm">
        <Link
          href={homeHref}
          onClick={() => handleNavClick(homeHref)}
          className="transition hover:text-white"
        >
          {brand.tagline}
        </Link>{" "}
        <Link
          href="/contact-author-website-design-agency"
          className="font-medium text-[#273E2B] underline-offset-2 hover:underline"
        >
          Start a conversation →
        </Link>
      </div>
      <header className="relative sticky top-0 z-50 border-b border-sand/40 bg-white/85 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80">
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-1 sm:gap-4 sm:px-6 lg:px-8">
          <BrandLogo
            priority
            size="lg"
            onClick={() => handleNavClick(homeHref)}
          />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              if ("children" in link && link.children) {
                return (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div
                      className={`${linkClass(servicesActive || isActive(link.href))} inline-flex items-center gap-0.5`}
                    >
                      <Link
                        href={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="rounded-full px-3 py-1.5 -my-1.5 -ml-3"
                      >
                        {link.label}
                      </Link>
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
                          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <AnimatePresence>
                      {servicesOpen ? (
                        <motion.ul
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full z-50 min-w-[11rem] rounded-xl border border-sand bg-white py-2 shadow-lift"
                        >
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => handleNavClick(child.href)}
                                className={`block px-4 py-2 text-[13px] font-medium transition-colors hover:bg-ivory hover:text-[#E08A2A] ${
                                  isActive(child.href)
                                    ? "font-semibold text-[#E08A2A]"
                                    : "text-charcoal"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              }

              const active = isActive(link.href);
              const className = linkClass(active);
              return (
                <li key={`${link.href}-${link.label}`}>
                  {isExternal(link.href) ? (
                    <a href={link.href} className={className}>
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={className}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center lg:flex">
            <SignupCta className="cta-blink !px-4 !py-2 !text-xs" />
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
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

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-sand/40 bg-white lg:hidden"
            >
              <div className="px-4 py-4">
                <ul className="space-y-1">
                  {navLinks.map((link) => {
                    if ("children" in link && link.children) {
                      return (
                        <li key={link.label}>
                          <div
                            className={`${linkClass(servicesActive || isActive(link.href), true)} flex w-full items-center justify-center gap-1`}
                          >
                            <Link
                              href={link.href}
                              onClick={() => {
                                handleNavClick(link.href);
                                setOpen(false);
                              }}
                            >
                              {link.label}
                            </Link>
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
                                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                          {mobileServicesOpen ? (
                            <ul className="mt-1 space-y-0.5 border-l border-sand pl-3">
                              {link.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className={linkClass(isActive(child.href), true)}
                                    onClick={() => {
                                      handleNavClick(child.href);
                                      setOpen(false);
                                    }}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      );
                    }

                    const active = isActive(link.href);
                    const className = linkClass(active, true);
                    return (
                      <li key={`${link.href}-${link.label}`}>
                        {isExternal(link.href) ? (
                          <a
                            href={link.href}
                            className={className}
                            onClick={() => setOpen(false)}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className={className}
                            onClick={() => {
                              handleNavClick(link.href);
                              setOpen(false);
                            }}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="flex justify-center pt-4">
                  <SignupCta className="cta-blink" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
