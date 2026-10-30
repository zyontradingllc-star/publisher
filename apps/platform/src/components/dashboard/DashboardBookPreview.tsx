import Link from "next/link";
import Image from "next/image";
import { StatusBadge } from "@/components/StatusBadge";
import { coverUrl, platformPublicPath } from "@/lib/utils";
import type { Book } from "@/types/database";

export const MAX_DASHBOARD_PREVIEWS = 3;

type Props = {
  books: Book[];
  /** Lead-mode fallback when DB has no books yet */
  fallbackTitle?: string | null;
};

export function DashboardBookPreview({ books, fallbackTitle }: Props) {
  const list = books.slice(0, MAX_DASHBOARD_PREVIEWS);

  if (list.length === 0 && !fallbackTitle) {
    return null;
  }

  if (list.length === 0 && fallbackTitle) {
    return (
      <section className="space-y-4">
        <h2 className="heading-display text-xl">Book preview</h2>
        <PreviewCard
          title={fallbackTitle}
          href="/dashboard/books/new"
          status="pending_review"
          showInReview
          description={null}
        />
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h2 className="heading-display text-xl">Book preview</h2>
        <p className="text-xs text-forest-muted">
          {list.length} of {MAX_DASHBOARD_PREVIEWS} books
        </p>
      </div>

      <div className="space-y-4">
        {list.map((book) => {
          const inReview =
            book.status === "pending_review" ||
            book.status === "changes_requested";
          const href =
            book.status === "published" && book.is_public
              ? `/books/${book.slug}`
              : `/dashboard/books/${book.id}`;
          return (
            <PreviewCard
              key={book.id}
              title={book.title}
              author={book.author_display_name}
              cover={coverUrl(book.cover_path)}
              description={book.description}
              href={href}
              manageHref={`/dashboard/books/${book.id}`}
              status={book.status}
              showInReview={inReview}
            />
          );
        })}
      </div>
    </section>
  );
}

function PreviewCard({
  title,
  author,
  cover,
  description,
  href,
  manageHref,
  status,
  showInReview,
}: {
  title: string;
  author?: string | null;
  cover?: string | null;
  description?: string | null;
  href: string;
  manageHref?: string;
  status: Book["status"] | "pending_review";
  showInReview?: boolean;
}) {
  const paragraphs = (description || "")
    .trim()
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const lead = paragraphs[0] ?? "";
  const rest = paragraphs.slice(1).join("\n\n");

  return (
    <div className="overflow-hidden rounded-none border border-sand bg-white shadow-soft">
      <div className="flex items-center justify-between gap-3 border-b border-sand px-4 py-2.5 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-wide text-forest-muted">
          Book preview
        </p>
        {manageHref ? (
          <Link
            href={manageHref}
            className="text-sm font-semibold text-coral hover:underline"
          >
            Manage listing
          </Link>
        ) : null}
      </div>

      {/* Public-page style: cover left, title + description right */}
      <div className="grid gap-5 p-4 sm:grid-cols-[minmax(0,160px)_1fr] sm:gap-6 sm:p-5 lg:grid-cols-[minmax(0,200px)_1fr]">
        <Link
          href={href}
          className="group mx-auto block w-full max-w-[200px] sm:mx-0"
        >
          <div className="relative aspect-[2/3] w-full overflow-hidden border border-sand bg-ivory shadow-book">
            {cover ? (
              <Image
                src={platformPublicPath(cover)}
                alt={`Cover for ${title}`}
                fill
                sizes="200px"
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                unoptimized
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#E8EAED] to-[#D1D5DB] px-4 text-center">
                <span className="font-display text-sm font-bold text-ink/40">
                  {title}
                </span>
                <span className="text-xs text-forest-muted">No cover yet</span>
              </div>
            )}

            {showInReview ? <InReviewCurveOverlay /> : null}
          </div>
        </Link>

        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <Link href={href} className="hover:underline">
                <h3 className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">
                  {title}
                </h3>
              </Link>
              {author ? (
                <p className="mt-1 text-sm text-forest-muted">by {author}</p>
              ) : null}
            </div>
            <StatusBadge status={status} />
          </div>

          {lead ? (
            <div className="mt-4 border-t border-sand pt-4">
              <p className="text-[15px] font-bold leading-7 text-ink">{lead}</p>
              {rest ? (
                <p className="mt-3 line-clamp-5 whitespace-pre-wrap text-[15px] leading-7 text-charcoal">
                  {rest}
                </p>
              ) : null}
              <Link
                href={href}
                className="mt-3 inline-flex text-sm font-semibold text-coral hover:underline"
              >
                View public page →
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-sm text-forest-muted">
              No description yet. Add one so your public page looks complete.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function InReviewCurveOverlay() {
  const pathId = "in-review-arc";
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <div className="absolute inset-0 bg-ink/25" />
      <svg
        viewBox="0 0 320 480"
        className="absolute inset-0 h-full w-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
        role="img"
      >
        <defs>
          <path id={pathId} d="M 28 210 Q 160 95 292 210" fill="none" />
        </defs>
        <text
          fill="#F2C14D"
          stroke="#1a1a1a"
          strokeWidth="0.8"
          paintOrder="stroke"
          className="font-sans font-black uppercase"
          style={{ fontSize: 42, letterSpacing: "0.04em" }}
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            In Review
          </textPath>
        </text>
      </svg>
      <span className="sr-only">In Review</span>
    </div>
  );
}
