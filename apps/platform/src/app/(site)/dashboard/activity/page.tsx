import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { getMyBooks } from "@/lib/books";
import { getAuthorActivity } from "@/lib/activity";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Messages",
};

export default async function ActivityPage() {
  const profile = await requireProfile("/dashboard/activity");
  const books = await getMyBooks(profile.id, profile.email);
  const activity = await getAuthorActivity(profile.id, profile.email);

  return (
    <DashboardShell books={books}>
    <div className="space-y-6">
      <header>
        <h1 className="heading-display text-2xl font-bold text-ink">
          Messages & activity
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-forest-muted">
          Privacy-conscious totals for your public listings only. Outbound link
          clicks are not purchases, orders, or revenue.
        </p>
      </header>

      <Alert variant="info">
        These numbers help you understand interest. Authors Pilot does not track
        completed sales on external websites and does not calculate royalties.
      </Alert>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Book page views" value={activity.bookViews} />
        <Stat label="Profile views" value={activity.profileViews} />
        <Stat
          label="Purchase-link clicks"
          value={activity.outboundClicks}
          hint="Not confirmed sales"
        />
        <Stat
          label="Website Design CTA clicks"
          value={activity.websiteDesignCtaClicks}
        />
      </div>

      <section>
        <h2 className="heading-display text-xl">By book</h2>
        {activity.books.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="No books yet"
              description="Add a book listing to start collecting public activity."
              actionHref="/dashboard/books/new"
              actionLabel="Publish Book"
            />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-none border border-sand bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-sand bg-ivory/80 text-xs uppercase tracking-wide text-forest-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Book</th>
                  <th className="px-4 py-3 font-semibold">Views</th>
                  <th className="px-4 py-3 font-semibold">Link clicks</th>
                </tr>
              </thead>
              <tbody>
                {activity.books.map((book) => (
                  <tr key={book.id} className="border-b border-sand/70 last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/books/${book.id}`}
                        className="font-semibold text-ink hover:underline"
                      >
                        {book.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 tabular-nums">{book.views}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {book.outboundClicks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
    </DashboardShell>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="card-surface">
      <p className="text-xs font-bold uppercase tracking-wide text-forest-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-bold text-ink tabular-nums">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-forest-muted">{hint}</p> : null}
    </div>
  );
}
