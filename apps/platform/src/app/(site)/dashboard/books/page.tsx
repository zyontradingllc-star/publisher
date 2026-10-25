import Link from "next/link";
import Image from "next/image";
import { requireProfile } from "@/lib/auth";
import { getMyBooks } from "@/lib/books";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardProfileHeader } from "@/components/dashboard/DashboardProfileHeader";
import { coverUrl, formatDate, platformPublicPath } from "@/lib/utils";
import type { Book } from "@/types/database";

export const metadata = { title: "My Books" };

export default async function DashboardBooksPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>;
}) {
  const profile = await requireProfile("/dashboard/books");
  const params = await searchParams;
  const justSubmitted = params.submitted === "1";

  const books = await getMyBooks(profile.id, profile.email);
  const publishedCount = books.filter((b) => b.status === "published").length;
  const waiting = books.filter(
    (b) => b.status === "pending_review" || b.status === "changes_requested"
  );
  const rest = books.filter(
    (b) => b.status !== "pending_review" && b.status !== "changes_requested"
  );
  const draftTitle =
    waiting[0]?.title ??
    books.find((b) => b.status === "draft")?.title ??
    null;

  return (
    <DashboardShell books={books} variant="home" showRightRail={false}>
      {justSubmitted ? (
        <div
          className="rounded-none border-2 border-amber-400 bg-amber-50 px-4 py-4 text-amber-950 shadow-soft"
          role="status"
        >
          <p className="font-display text-base font-bold">
            Submitted — waiting for approval
          </p>
          <p className="mt-1 text-sm">
            Your book details are in review. You will get an email from{" "}
            <strong>no-reply@authorspilot.com</strong> when it is listed.
          </p>
        </div>
      ) : null}

      <DashboardProfileHeader
        profile={profile}
        booksCount={books.length}
        publishedCount={publishedCount}
        draftTitle={draftTitle}
      />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-ink">My Books</h2>
          <p className="mt-1 text-sm text-forest-muted">
            Drafts, submissions waiting for approval, and published listings.
          </p>
        </div>
        <Button href="/dashboard/books/new" className="!px-4 !py-2.5 text-xs">
          + New Book Project
        </Button>
      </div>

      {books.length === 0 && !justSubmitted ? (
        <EmptyState
          title="No listings yet"
          description="Start with a draft. You can submit for review when your description, cover, and policies are ready."
          actionHref="/dashboard/books/new"
          actionLabel="Publish Book"
        />
      ) : null}

      {waiting.length > 0 || justSubmitted ? (
        <section className="rounded-none border border-amber-200 bg-white shadow-soft">
          <div className="border-b border-amber-100 bg-amber-50/80 px-4 py-3 sm:px-5">
            <h3 className="font-display text-lg font-bold text-ink">
              Waiting for approval
            </h3>
            <p className="mt-0.5 text-sm text-forest-muted">
              These books are pending admin review before they go live.
            </p>
          </div>
          {waiting.length === 0 ? (
            <p className="px-4 py-5 text-sm text-forest-muted sm:px-5">
              Your submission was received. It will show here once saved to
              your account.
            </p>
          ) : (
            <ul className="divide-y divide-sand">
              {waiting.map((book) => (
                <BookRow key={book.id} book={book} pending />
              ))}
            </ul>
          )}
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="overflow-hidden rounded-none border border-sand bg-white shadow-soft">
          <div className="border-b border-sand px-4 py-3 sm:px-5">
            <h3 className="font-display text-lg font-bold text-ink">
              All other books
            </h3>
          </div>
          <ul className="divide-y divide-sand">
            {rest.map((book) => (
              <BookRow key={book.id} book={book} />
            ))}
          </ul>
        </section>
      ) : null}
    </DashboardShell>
  );
}

function BookRow({ book, pending = false }: { book: Book; pending?: boolean }) {
  const cover = coverUrl(book.cover_path);

  return (
    <li className="flex flex-wrap items-center gap-4 px-4 py-4 sm:px-5">
      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-none bg-ivory">
        {cover ? (
          <Image
            src={platformPublicPath(cover)}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
            unoptimized
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-ink">{book.title}</p>
        {book.subtitle ? (
          <p className="text-sm text-forest-muted">{book.subtitle}</p>
        ) : null}
        <p className="mt-1 text-xs text-forest-muted">
          Updated {formatDate(book.updated_at)}
        </p>
      </div>
      <StatusBadge status={book.status} />
      <div className="w-full sm:w-auto">
        {pending ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-800">
            In review
          </span>
        ) : book.status === "published" && book.is_public ? (
          <Link
            href={`/books/${book.slug}`}
            className="font-semibold text-coral hover:underline"
          >
            View
          </Link>
        ) : (
          <Link
            href={`/dashboard/books/${book.id}`}
            className="font-semibold text-coral hover:underline"
          >
            Edit
          </Link>
        )}
      </div>
    </li>
  );
}
