"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand, navLinks } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/layout/BrandLogo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
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

  const isActive = (href: string) =>
    normalizePath(pathname) === normalizePath(href);

  const handleNavClick = (href: string) => {
    if (isActive(href)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative z-50 bg-cta-wash px-4 py-2 text-center text-xs text-white/80 sm:text-sm">
        <Link
          href="/book-publishing-author-website-design-agency"
          onClick={() => handleNavClick("/book-publishing-author-website-design-agency")}
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
          <Link
            href="/book-publishing-author-website-design-agency"
            className="group inline-flex min-w-0 items-center text-ink"
            aria-label={`${brand.name} home`}
          >
            <BrandLogo
              priority
              size="lg"
              className="transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                      active
                        ? "font-semibold text-[#E08A2A]"
                        : "text-charcoal hover:bg-sand/40 hover:text-[#E08A2A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center lg:flex">
            <Button href="/contact-author-website-design-agency" variant="primary" className="cta-blink !px-4 !py-2 !text-xs">
              Free Author Website Mockup
            </Button>
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
                <ul className="grid grid-cols-3 gap-x-2 gap-y-1">
                  {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <li key={`${link.href}-${link.label}`}>
                        <Link
                          href={link.href}
                          className={`block rounded-soft px-3 py-3 text-center font-medium transition-colors hover:bg-ivory ${
                            active ? "font-semibold text-[#E08A2A]" : "text-ink"
                          }`}
                          onClick={() => {
                            handleNavClick(link.href);
                            setOpen(false);
                          }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex justify-center pt-4">
                  <Button href="/contact-author-website-design-agency" className="cta-blink">
                    Free Author Website Mockup
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
