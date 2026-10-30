"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Shared across every author dashboard page. */
export const DASHBOARD_TABS = [
  { href: "/dashboard", label: "Dashboard", exact: true },
  { href: "/dashboard/books", label: "My Books" },
  { href: "/dashboard/approved", label: "Approved" },
  { href: "/dashboard/profile", label: "Profile" },
] as const;

export function DashboardTabs() {
  const pathname = usePathname();

  return (
    <nav
      className="overflow-x-auto rounded-none border border-sand bg-white shadow-soft"
      aria-label="Dashboard sections"
    >
      <ul className="flex gap-0.5 px-2 sm:px-4">
        {DASHBOARD_TABS.map((item) => {
          const exact = "exact" in item && item.exact;
          const active = exact
            ? pathname === item.href || pathname === `${item.href}/`
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`inline-flex shrink-0 border-b-2 px-3 py-3.5 text-sm font-semibold transition sm:px-4 ${
                  active
                    ? "border-[#E08A2A] text-ink"
                    : "border-transparent text-forest-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
