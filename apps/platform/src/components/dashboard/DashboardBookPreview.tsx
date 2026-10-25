import Link from "next/link";
import Image from "next/image";
import { StatusBadge } from "@/components/StatusBadge";
import { coverUrl, platformPublicPath } from "@/lib/utils";
import type { Book } from "@/types/database";

type Props = {
  book: Book | null;
  /** Lead-mode fallback when DB has no pending book yet */
  fallbackTitle?: string | null;
  showInReview: boolean;
};

export function DashboardBookPreview({
  book,
  fallbackTitle,
  showInReview,
}: Props) {
  const title = book?.title || fallbackTitle || "Your book";
  const cover = book ? coverUrl(book.cover_path) : null;
  const href = book ? `/dashboard/books/${book.id}` : "/dashboard/books/new";

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h2 className="heading-display text-xl">Book preview</h2>
        {book ? (
          <Link
            href={href}
            className="text-sm font-semibold text-coral hover:underline"
          >
            Manage listing
          </Link>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-none border border-sand bg-white shadow-soft">
        <Link href={href} className="group block">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[280px] overflow-hidden bg-ivory sm:max-w-[320px]">
            {cover ? (
              <Image
                src={platformPublicPath(cover)}
                alt={`Cover for ${title}`}
                fill
                sizes="320px"
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                unoptimized
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#E8EAED] to-[#D1D5DB] px-6 text-center">
                <span className="font-display text-lg font-bold text-ink/40">
                  {title}
                </span>
                <span className="text-xs text-forest-muted">No cover yet</span>
              </div>
            )}

            {showInReview ? <InReviewCurveOverlay /> : null}
          </div>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-bold text-ink">
              {title}
            </p>
            {book?.author_display_name ? (
              <p className="text-sm text-forest-muted">
                {book.author_display_name}
              </p>
            ) : null}
          </div>
          {showInReview ? (
            <StatusBadge status="pending_review" />
          ) : book ? (
            <StatusBadge status={book.status} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Large arched “In Review” label over the cover */
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
          <path
            id={pathId}
            d="M 28 210 Q 160 95 292 210"
            fill="none"
          />
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
