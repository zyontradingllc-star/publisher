import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";

export const metadata = { title: "Admin" };

export default async function AdminOverviewPage() {
  await requireAdmin();

  const counts = {
    pending_review: 0,
    published: 0,
    changes_requested: 0,
    rejected: 0,
  };

  if (isPayloadConfigured()) {
    const payload = await getPayloadClient();
    const [pending, underReview, changes, rejected, publishedBooks] =
      await Promise.all([
        payload.find({
          collection: "book-submissions",
          where: { status: { equals: "pending" } },
          limit: 0,
          overrideAccess: true,
        }),
        payload.find({
          collection: "book-submissions",
          where: { status: { equals: "under_review" } },
          limit: 0,
          overrideAccess: true,
        }),
        payload.find({
          collection: "book-submissions",
          where: { status: { equals: "changes_requested" } },
          limit: 0,
          overrideAccess: true,
        }),
        payload.find({
          collection: "book-submissions",
          where: { status: { equals: "rejected" } },
          limit: 0,
          overrideAccess: true,
        }),
        payload.find({
          collection: "books",
          where: { status: { equals: "published" } },
          limit: 0,
          overrideAccess: true,
        }),
      ]);

    counts.pending_review =
      (pending.totalDocs ?? 0) + (underReview.totalDocs ?? 0);
    counts.changes_requested = changes.totalDocs ?? 0;
    counts.rejected = rejected.totalDocs ?? 0;
    counts.published = publishedBooks.totalDocs ?? 0;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="heading-section">Admin overview</h1>
        <p className="mt-2 text-forest-muted">
          Review submissions and manage listings via Payload CMS. Authors Pilot
          does not track sales or royalties.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          label="Pending review"
          value={counts.pending_review}
          href="/admin/books?status=pending_review"
        />
        <Metric
          label="Published"
          value={counts.published}
          href="/admin/books?status=published"
        />
        <Metric
          label="Changes requested"
          value={counts.changes_requested}
          href="/admin/books?status=changes_requested"
        />
        <Metric
          label="Rejected"
          value={counts.rejected}
          href="/admin/books?status=rejected"
        />
      </div>

      <section className="card-surface">
        <h2 className="font-display text-lg font-bold text-ink">CMS</h2>
        <p className="mt-2 text-sm text-forest-muted">
          Full submission workflow lives in Payload at{" "}
          <Link href="/cms" className="font-semibold text-coral hover:underline">
            /cms
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href} className="card-surface transition hover:shadow-lift">
      <p className="text-xs font-bold uppercase tracking-wide text-forest-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
    </Link>
  );
}
