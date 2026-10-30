import Link from "next/link";
import Image from "next/image";
import { requireProfile } from "@/lib/auth";
import { getMyBooks } from "@/lib/books";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardProfileHeader } from "@/components/dashboard/DashboardProfileHeader";
import { coverUrl, formatDate, platformPublicPath } from "@/lib/utils";
import type { Book } from "@/types/database";

export const metadata = { title: "Approved" };

function isApprovedBook(book: Book) {
  return book.status === "published" || book.is_public;
}

export default async function DashboardApprovedPage() {
  const profile = await requireProfile("/dashboard/approved");
  const books = await getMyBooks(profile.id, profile.email);
  const approved = books.filter(isApprovedBook);
  // Dedupe by slug (submission + published book can both appear).
  const seenSlugs = new Set<string>();
  const uniqueApproved = approved.filter((book) => {
    const key = book.slug || book.id;
    if (seenSlugs.has(key)) return false;
    seenSlugs.add(key);
    return true;
  });
  const publishedCount = uniqueApproved.length;
  const draftTitle =
    books.find(
      (b) => b.status === "pending_review" || b.status === "changes_requested"
    )?.title ??
    books.find((b) => b.status === "draft")?.title ??
    null;

  return (
    <DashboardShell books={books} variant="home" showRightRail={false}>
      <DashboardProfileHeader
        profile={profile}
        booksCount={books.length}
        publishedCount={publishedCount}
        draftTitle={draftTitle}
      />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Approved</h2>
          <p className="mt-1 text-sm text-forest-muted">
            Live listings for this account — open the public page anytime.
          </p>
        </div>
        <Button href="/dashboard/books/new" className="!px-4 !py-2.5 text-xs">
          + New Book Project
        </Button>
      </div>

      {uniqueApproved.length === 0 ? (
        <EmptyState
          title="No approved books yet"
          description="When an admin approves your submission, it will appear here with a public link."
          actionHref="/dashboard/books"
          actionLabel="My Books"
        />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2">
          {uniqueApproved.map((book) => (
            <ApprovedCard key={book.id} book={book} />
          ))}
        </section>
      )}
    </DashboardShell>
  );
}

function ApprovedCard({ book }: { book: Book }) {
  const cover = coverUrl(book.cover_path);
  const publicHref = `/books/${book.slug}`;

  return (
    <article className="overflow-hidden rounded-none border border-sand bg-white shadow-soft">
      <Link href={publicHref} className="block">
        <div className="relative aspect-[3/4] max-h-56 w-full bg-ivory sm:max-h-64">
          {cover ? (
            <Image
              src={platformPublicPath(cover)}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 280px"
              className="object-cover object-center"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-forest-muted">
              No cover
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold text-ink">
              <Link href={publicHref} className="hover:underline">
                {book.title}
              </Link>
            </h3>
            {book.subtitle ? (
              <p className="mt-0.5 text-sm text-forest-muted">{book.subtitle}</p>
            ) : null}
            <p className="mt-1 text-xs text-forest-muted">
              Listed {formatDate(book.published_at || book.updated_at)}
            </p>
          </div>
          <span className="shrink-0 bg-green-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-green-800">
            Approved
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href={publicHref} className="!px-4 !py-2 text-xs">
            View public page
          </Button>
          <Link
            href={`/dashboard/books/${book.id}`}
            className="inline-flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wide text-forest-muted hover:text-ink"
          >
            Manage
          </Link>
        </div>
      </div>
    </article>
  );
}
