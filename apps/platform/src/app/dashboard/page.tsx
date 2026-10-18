import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { getAuthorLead } from "@/lib/lead-session";
import { getMyBooks } from "@/lib/books";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { PricingNotice } from "@/components/PricingNotice";
import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { BookStatus } from "@/types/database";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; published?: string }>;
}) {
  const profile = await requireProfile("/dashboard");
  const params = await searchParams;
  const justSubmitted =
    params.submitted === "1" || params.published === "1";

  const books = await getMyBooks(profile.id);
  const lead = await getAuthorLead();

  const counts = books.reduce(
    (acc, b) => {
      acc[b.status as BookStatus] = (acc[b.status as BookStatus] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<BookStatus, number>>
  );

  const pendingFromDb = counts.pending_review ?? 0;
  const publishedFromDb = counts.published ?? 0;
  const drafts = counts.draft ?? 0;

  // Lead mode (no Supabase yet): show pending from cookie after Publish Your Book
  const pending = Math.max(pendingFromDb, lead?.pendingCount ?? 0);
  const published = publishedFromDb;

  const recent = books.slice(0, 5);
  const successPending = justSubmitted ? Math.max(pending, 1) : pending;

  return (
    <div className="space-y-8">
      {justSubmitted ? (
        <div
          className="rounded-2xl border-2 border-green-500 bg-green-50 px-5 py-5 text-green-950 shadow-soft"
          role="status"
        >
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-white"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M4 10.5 8 14.5 16 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <p className="font-display text-lg font-bold text-green-900">
                Request successfully submitted
              </p>
              <p className="mt-2 text-sm leading-relaxed text-green-900">
                Your request has been submitted successfully. Pending Review
                shows <strong>1</strong>. After we finish under review, your book
                will be listed and Published will become <strong>1</strong>. You
                will also receive an automated email from{" "}
                <strong>no-reply@authorspilot.com</strong>.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <header>
        <h1 className="heading-section">
          Welcome{profile.display_name ? `, ${profile.display_name}` : ""}
        </h1>
        <p className="mt-2 max-w-2xl text-forest-muted">
          Manage your book listings, send readers to your own sales channels, and
          keep 100% of your royalties. Authors Pilot does not process purchases or
          take a cut of book sales.
        </p>
      </header>

      {!profile.profile_complete && !justSubmitted ? (
        <Alert variant="warning">
          <p className="font-semibold">Complete your author profile</p>
          <p className="mt-1">
            Add a display name, public URL, and a short bio so readers can find
            you.{" "}
            <Link href="/dashboard/profile" className="font-semibold underline">
              Edit profile
            </Link>
          </p>
        </Alert>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Published listings" value={published} />
        <StatCard label="Drafts" value={drafts} />
        <StatCard
          label="Pending review"
          value={successPending}
          highlight={justSubmitted}
          success
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button href="/dashboard/books/new">Publish Book</Button>
        <Button href="/dashboard/books" variant="ghost">
          View all books
        </Button>
      </div>

      <PricingNotice />

      <section>
        <h2 className="heading-display text-xl">Recent books</h2>
        {recent.length === 0 && !justSubmitted ? (
          <div className="mt-4">
            <EmptyState
              title="No books yet"
              description="Create a draft listing whenever you're ready. You can save progress and add cover art and manuscripts after the first save."
              actionHref="/dashboard/books/new"
              actionLabel="Publish Book"
            />
          </div>
        ) : recent.length === 0 && justSubmitted ? (
          <ul className="mt-4 divide-y divide-sand rounded-2xl border border-green-200 bg-green-50/50 shadow-soft">
            <li className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-semibold text-ink">
                  {lead?.lastBookTitle ?? "Your book submission"}
                </p>
                <p className="text-sm text-forest-muted">
                  {profile.display_name}
                </p>
              </div>
              <StatusBadge status="pending_review" />
            </li>
          </ul>
        ) : (
          <ul className="mt-4 divide-y divide-sand rounded-2xl border border-sand bg-white shadow-soft">
            {recent.map((book) => (
              <li
                key={book.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
              >
                <div>
                  <Link
                    href={`/dashboard/books/${book.id}`}
                    className="font-semibold text-ink hover:underline"
                  >
                    {book.title}
                  </Link>
                  <p className="text-sm text-forest-muted">
                    {book.author_display_name}
                  </p>
                </div>
                <StatusBadge status={book.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
  success,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  success?: boolean;
}) {
  return (
    <div
      className={
        highlight && success
          ? "rounded-2xl border-2 border-green-500 bg-green-50 p-5 shadow-soft"
          : highlight
            ? "card-surface ring-1 ring-green-200"
            : "card-surface"
      }
    >
      <p className="text-xs font-bold uppercase tracking-wide text-forest-muted">
        {label}
      </p>
      <p
        className={`mt-2 font-display text-3xl font-bold tabular-nums ${
          highlight && success ? "text-green-800" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
