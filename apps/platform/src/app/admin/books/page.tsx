import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/StatusBadge";
import { BOOK_STATUS_LABELS, type BookStatus } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata = { title: "Admin · Books" };

const STATUSES: BookStatus[] = [
  "pending_review",
  "published",
  "draft",
  "changes_requested",
  "rejected",
  "unpublished",
];

export default async function AdminBooksPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status: statusFilter } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("books")
    .select(
      `
      id,
      title,
      author_display_name,
      status,
      updated_at,
      profiles:profiles!books_author_id_fkey(display_name, email)
    `
    )
    .order("updated_at", { ascending: false })
    .limit(100);

  if (statusFilter && STATUSES.includes(statusFilter as BookStatus)) {
    query = query.eq("status", statusFilter);
  }

  const { data: books } = await query;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-section">Books</h1>
        <p className="mt-2 text-forest-muted">Filter by workflow status.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        <FilterChip href="/admin/books" active={!statusFilter} label="All" />
        {STATUSES.map((s) => (
          <FilterChip
            key={s}
            href={`/admin/books?status=${s}`}
            active={statusFilter === s}
            label={BOOK_STATUS_LABELS[s]}
          />
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-sand bg-ivory/80 text-xs uppercase tracking-wide text-forest-muted">
            <tr>
              <th className="px-4 py-3 font-bold">Title</th>
              <th className="hidden px-4 py-3 font-bold md:table-cell">Author</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="hidden px-4 py-3 font-bold sm:table-cell">Updated</th>
              <th className="px-4 py-3 font-bold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {(books ?? []).map((book) => {
              const author = book.profiles as {
                display_name?: string | null;
                email?: string | null;
              } | null;
              return (
                <tr key={book.id}>
                  <td className="px-4 py-3 font-semibold text-ink">{book.title}</td>
                  <td className="hidden px-4 py-3 text-forest-muted md:table-cell">
                    {author?.display_name ?? book.author_display_name}
                    {author?.email ? (
                      <span className="block text-xs">{author.email}</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={book.status as BookStatus} />
                  </td>
                  <td className="hidden px-4 py-3 text-forest-muted sm:table-cell">
                    {formatDate(book.updated_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/books/${book.id}`}
                      className="font-semibold text-coral hover:underline"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(books ?? []).length === 0 ? (
          <p className="px-4 py-8 text-center text-forest-muted">
            No books match this filter.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition",
        active
          ? "bg-ink text-linen"
          : "border border-sand bg-white text-charcoal hover:border-coral/40"
      )}
    >
      {label}
    </Link>
  );
}
