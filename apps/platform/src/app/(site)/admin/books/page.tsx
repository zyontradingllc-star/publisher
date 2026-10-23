import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";
import { StatusBadge } from "@/components/StatusBadge";
import { BOOK_STATUS_LABELS, type BookStatus } from "@/types/database";
import { formatDate, cn } from "@/lib/utils";

export const metadata = { title: "Admin · Books" };

const STATUSES: BookStatus[] = [
  "pending_review",
  "published",
  "draft",
  "changes_requested",
  "rejected",
  "unpublished",
];

function mapSubmissionStatus(status: string | null | undefined): BookStatus {
  switch (status) {
    case "approved":
      return "published";
    case "changes_requested":
      return "changes_requested";
    case "rejected":
      return "rejected";
    case "under_review":
    case "pending":
    default:
      return "pending_review";
  }
}

type AdminRow = {
  id: string;
  title: string;
  authorName: string;
  authorEmail: string;
  status: BookStatus;
  updatedAt: string;
  kind: "submission" | "book";
};

export default async function AdminBooksPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status: statusFilter } = await searchParams;

  const rows: AdminRow[] = [];

  if (isPayloadConfigured()) {
    const payload = await getPayloadClient();

    const submissions = await payload.find({
      collection: "book-submissions",
      limit: 100,
      sort: "-updatedAt",
      overrideAccess: true,
      depth: 0,
    });

    for (const doc of submissions.docs) {
      const d = doc as {
        id: string | number;
        title?: string | null;
        authorDisplay?: string | null;
        authorEmail?: string | null;
        author?: { email?: string | null; firstName?: string; lastName?: string };
        status?: string | null;
        updatedAt?: string;
      };
      rows.push({
        id: String(d.id),
        title: d.title || "Untitled",
        authorName:
          d.authorDisplay ||
          `${d.author?.firstName ?? ""} ${d.author?.lastName ?? ""}`.trim() ||
          "-",
        authorEmail: d.authorEmail || d.author?.email || "",
        status: mapSubmissionStatus(d.status),
        updatedAt: d.updatedAt || new Date().toISOString(),
        kind: "submission",
      });
    }

    const books = await payload.find({
      collection: "books",
      limit: 100,
      sort: "-updatedAt",
      overrideAccess: true,
      depth: 1,
    });

    for (const doc of books.docs) {
      const d = doc as {
        id: string | number;
        title?: string | null;
        status?: string | null;
        updatedAt?: string;
        author?: {
          displayName?: string | null;
          email?: string | null;
        } | null;
      };
      const status: BookStatus =
        d.status === "published"
          ? "published"
          : d.status === "unpublished"
            ? "unpublished"
            : "draft";
      rows.push({
        id: String(d.id),
        title: d.title || "Untitled",
        authorName: d.author?.displayName || "-",
        authorEmail: d.author?.email || "",
        status,
        updatedAt: d.updatedAt || new Date().toISOString(),
        kind: "book",
      });
    }
  }

  const filtered =
    statusFilter && STATUSES.includes(statusFilter as BookStatus)
      ? rows.filter((r) => r.status === statusFilter)
      : rows;

  filtered.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-section">Books</h1>
        <p className="mt-2 text-forest-muted">
          Submissions and catalog books from Payload CMS.
        </p>
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
            {filtered.map((book) => (
              <tr key={`${book.kind}-${book.id}`}>
                <td className="px-4 py-3 font-semibold text-ink">
                  {book.title}
                  <span className="mt-0.5 block text-[10px] font-normal uppercase text-forest-muted">
                    {book.kind}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-forest-muted md:table-cell">
                  {book.authorName}
                  {book.authorEmail ? (
                    <span className="block text-xs">{book.authorEmail}</span>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={book.status} />
                </td>
                <td className="hidden px-4 py-3 text-forest-muted sm:table-cell">
                  {formatDate(book.updatedAt)}
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
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
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
