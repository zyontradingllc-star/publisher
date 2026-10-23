import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { ManuscriptAccess } from "@/components/admin/ManuscriptAccess";
import { StatusBadge } from "@/components/StatusBadge";
import { Alert } from "@/components/ui/Alert";
import type { BookStatus } from "@/types/database";
import { coverUrl, formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: `Admin · Book ${id.slice(0, 8)}…` };
}

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

function mediaPath(
  cover: unknown
): string | null {
  if (!cover) return null;
  if (typeof cover === "string" || typeof cover === "number") {
    return `/api/media/file/${cover}`;
  }
  if (typeof cover === "object" && cover !== null) {
    const m = cover as { url?: string | null; id?: string | number };
    if (m.url) return m.url;
    if (m.id) return `/api/media/file/${m.id}`;
  }
  return null;
}

export default async function AdminBookReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  if (!isPayloadConfigured()) notFound();
  const payload = await getPayloadClient();

  let kind: "submission" | "book" = "submission";
  let title = "";
  let description = "";
  let status: BookStatus = "pending_review";
  let slug: string | null = null;
  let authorDisplay = "-";
  let authorEmail = "";
  let authorSlug: string | null = null;
  let coverPath: string | null = null;
  let adminNotes: string | null = null;
  let primarySalesChannel: string | null = null;
  let updatedAt: string | null = null;

  try {
    const submission = await payload.findByID({
      collection: "book-submissions",
      id,
      depth: 1,
      overrideAccess: true,
    });
    const s = submission as {
      title?: string;
      description?: string;
      status?: string;
      publicSlug?: string | null;
      authorDisplay?: string | null;
      authorEmail?: string | null;
      author?: { email?: string; firstName?: string; lastName?: string };
      cover?: unknown;
      adminNotes?: string | null;
      primarySalesChannel?: string | null;
      updatedAt?: string;
    };
    kind = "submission";
    title = s.title || "Untitled";
    description = s.description || "";
    status = mapSubmissionStatus(s.status);
    slug = s.publicSlug || null;
    authorDisplay =
      s.authorDisplay ||
      `${s.author?.firstName ?? ""} ${s.author?.lastName ?? ""}`.trim() ||
      "-";
    authorEmail = s.authorEmail || s.author?.email || "";
    coverPath = mediaPath(s.cover);
    adminNotes = s.adminNotes || null;
    primarySalesChannel = s.primarySalesChannel || null;
    updatedAt = s.updatedAt || null;
  } catch {
    try {
      const book = await payload.findByID({
        collection: "books",
        id,
        depth: 1,
        overrideAccess: true,
      });
      const b = book as {
        title?: string;
        description?: string;
        status?: string;
        slug?: string;
        cover?: unknown;
        primarySalesChannel?: string | null;
        updatedAt?: string;
        author?: {
          displayName?: string | null;
          email?: string | null;
          slug?: string | null;
        } | null;
      };
      kind = "book";
      title = b.title || "Untitled";
      description = b.description || "";
      status =
        b.status === "published"
          ? "published"
          : b.status === "unpublished"
            ? "unpublished"
            : "draft";
      slug = b.slug || null;
      authorDisplay = b.author?.displayName || "-";
      authorEmail = b.author?.email || "";
      authorSlug = b.author?.slug || null;
      coverPath = mediaPath(b.cover);
      primarySalesChannel = b.primarySalesChannel || null;
      updatedAt = b.updatedAt || null;
    } catch {
      notFound();
    }
  }

  const cover = coverUrl(coverPath);

  return (
    <div className="space-y-10">
      <header>
        <Link
          href="/admin/books"
          className="text-sm font-semibold text-coral hover:underline"
        >
          ← All books
        </Link>
        <h1 className="heading-section mt-2">{title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <StatusBadge status={status} />
          <span className="text-xs uppercase text-forest-muted">{kind}</span>
          {status === "published" && slug ? (
            <Link
              href={`/books/${slug}`}
              className="text-sm font-semibold underline"
            >
              Public listing
            </Link>
          ) : null}
        </div>
        {updatedAt ? (
          <p className="mt-1 text-xs text-forest-muted">
            Updated {formatDate(updatedAt)}
          </p>
        ) : null}
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="card-surface space-y-3">
          <h2 className="font-display text-lg font-bold">Listing details</h2>
          {cover ? (
            <div className="relative aspect-[2/3] max-w-[180px] overflow-hidden rounded-xl">
              <Image
                src={cover}
                alt=""
                fill
                className="object-cover"
                sizes="180px"
              />
            </div>
          ) : (
            <p className="text-sm text-forest-muted">No cover uploaded.</p>
          )}
          <p className="text-sm">
            <span className="font-semibold">Author on listing:</span>{" "}
            {authorDisplay}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Account:</span> {authorDisplay}
            {authorEmail ? ` (${authorEmail})` : ""}
          </p>
          {authorSlug ? (
            <p className="text-sm">
              <span className="font-semibold">Profile:</span>{" "}
              <Link
                href={`/authors/${authorSlug}`}
                className="text-coral underline"
              >
                /authors/{authorSlug}
              </Link>
            </p>
          ) : null}
          <p className="whitespace-pre-wrap text-sm text-charcoal">
            {description}
          </p>
          {adminNotes ? (
            <Alert variant="info">
              <p className="font-semibold">Admin notes</p>
              <p className="mt-1 whitespace-pre-wrap">{adminNotes}</p>
            </Alert>
          ) : null}
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="heading-display text-xl">Review</h2>
            <ReviewForm bookId={id} currentStatus={status} />
          </div>

          <div className="card-surface space-y-3">
            <h2 className="font-display text-lg font-bold">Manuscript</h2>
            <ManuscriptAccess bookId={id} filename={null} />
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <h2 className="heading-display text-xl">Sales channel</h2>
        <Alert variant="info">
          External destinations only - Authors Pilot does not verify purchases or
          pay royalties. Structured sale-link rows live in CMS notes until a
          Payload sale-links field is added.
        </Alert>
        {primarySalesChannel ? (
          <p className="text-sm text-ink">
            Primary channel:{" "}
            <span className="font-semibold">{primarySalesChannel}</span>
          </p>
        ) : (
          <p className="text-sm text-forest-muted">No sales channel set.</p>
        )}
      </section>
    </div>
  );
}
