import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/books", label: "Books" },
  { href: "/admin/authors", label: "Authors" },
  { href: "/admin/audit", label: "Audit log" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row lg:gap-12">
      <aside className="lg:w-56 lg:shrink-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
          Admin
        </p>
        <p className="mt-1 font-display text-lg font-bold text-ink">
          Authors Pilot
        </p>
        <nav className="mt-6 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-charcoal transition hover:bg-ivory hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-forest-muted transition hover:bg-ivory"
          >
            ← Dashboard
          </Link>
        </nav>
        <form action={logoutAction} className="mt-8">
          <Button type="submit" variant="ghost" className="w-full justify-center">
            Log out
          </Button>
        </form>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
