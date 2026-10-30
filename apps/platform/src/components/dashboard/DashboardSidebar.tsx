"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: "home", exact: true },
  { href: "/dashboard/profile", label: "My Profile", icon: "user" },
  { href: "/dashboard/books", label: "My Books", icon: "book" },
  { href: "/dashboard/approved", label: "Approved", icon: "post" },
  { href: "/dashboard/activity", label: "Messages", icon: "msg" },
  { href: "/dashboard/settings", label: "Settings", icon: "gear" },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[220px] shrink-0 lg:block">
      <nav
        className="sticky top-24 space-y-1 rounded-none border border-sand bg-white p-3 shadow-soft"
        aria-label="Dashboard"
      >
        {NAV.map((item) => {
          const exact = "exact" in item && item.exact;
          const active = exact
            ? pathname === item.href || pathname === `${item.href}/`
            : pathname === item.href ||
              pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-none px-3 py-2.5 text-sm font-semibold transition",
                active
                  ? "bg-[#E08A2A]/15 text-ink"
                  : "text-charcoal hover:bg-ivory"
              )}
            >
              <NavIcon name={item.icon} className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function NavIcon({
  name,
  className,
}: {
  name: (typeof NAV)[number]["icon"];
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    className,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M4 10.5 12 4l8 6.5V20H4V10.5Z" strokeLinejoin="round" />
          <path d="M9 20v-6h6v6" strokeLinejoin="round" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.25" />
          <path d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19" strokeLinecap="round" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path
            d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "post":
      return (
        <svg {...common}>
          <path d="M5 5h14v14H5V5Z" strokeLinejoin="round" />
          <path d="M8 9h8M8 12h8M8 15h5" strokeLinecap="round" />
        </svg>
      );
    case "msg":
      return (
        <svg {...common}>
          <path
            d="M5 6h14v10H9l-4 3V6Z"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path
            d="M12 3.5v2.2M12 18.3v2.2M4.9 7.1l1.6 1.6M17.5 15.3l1.6 1.6M3.5 12h2.2M18.3 12h2.2M4.9 16.9l1.6-1.6M17.5 8.7l1.6-1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
