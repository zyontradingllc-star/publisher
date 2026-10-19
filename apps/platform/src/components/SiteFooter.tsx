import Link from "next/link";
import { MARKETING_HOME_URL } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/how-publishing-works", label: "How Publishing Works" },
  { href: "/author-guidelines", label: "Author Guidelines" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/copyright", label: "Copyright" },
  { href: "/community-policy", label: "Community Policy" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-sand bg-footer-wash bg-ivory">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-lg font-bold text-ink">
              Authors Pilot
            </p>
            <p className="mt-2 text-sm text-forest-muted">
              Discover independent books and publish your listings while keeping
              100% of your book earnings from sales on your own website.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-coral">
              Free Access During Launch · Paid Plans Coming Soon
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-coral"
              >
                {link.label}
              </Link>
            ))}
            <a href={MARKETING_HOME_URL} className="text-charcoal hover:text-coral">
              authorspilot.com
            </a>
          </div>
        </div>
        <p className="mt-8 text-xs text-forest-muted">
          © {new Date().getFullYear()} Authors Pilot. Legal pages are drafts for
          review and do not constitute legal advice.
        </p>
      </div>
    </footer>
  );
}
