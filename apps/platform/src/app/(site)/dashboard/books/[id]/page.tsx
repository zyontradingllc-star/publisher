import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { getMyBook } from "@/lib/books";
import { BookForm } from "@/components/forms/BookForm";
import { SalesLinkForm } from "@/components/forms/SalesLinkForm";
import {
  deleteSalesLinkAction,
  uploadCoverAction,
  uploadManuscriptAction,
} from "@/app/actions/books";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { coverUrl } from "@/lib/utils";
import { isAuthorEditable } from "@/lib/status-transitions";
import type { BookStatus } from "@/types/database";
import { getGenres } from "@/lib/books";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: `Edit book ${id.slice(0, 8)}…` };
}

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  async function coverUpload(formData: FormData) {
    "use server";
    await uploadCoverAction(formData);
  }

  async function manuscriptUpload(formData: FormData) {
    "use server";
    await uploadManuscriptAction(formData);
  }

  async function removeSalesLink(formData: FormData) {
    "use server";
    await deleteSalesLinkAction(formData);
  }

  const { id } = await params;
  const profile = await requireProfile(`/dashboard/books/${id}`);
  const [{ book, error }, genres] = await Promise.all([
    getMyBook(profile.id, id),
    getGenres(),
  ]);

  if (error || !book) notFound();

  const canEdit = isAuthorEditable(book.status as BookStatus);
  const canManageSalesLinks =
    canEdit || book.status === "published" || book.status === "pending_review";
  const cover = coverUrl(book.cover_path);

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/dashboard/books"
            className="text-sm font-semibold text-coral hover:underline"
          >
            ← My books
          </Link>
          <h1 className="heading-section mt-2">{book.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <StatusBadge status={book.status} />
            {book.status === "published" && book.is_public ? (
              <Link
                href={`/books/${book.slug}`}
                className="text-sm font-semibold text-ink underline"
              >
                View public listing
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      {book.rejection_reason ? (
        <Alert variant="error">
          <p className="font-semibold">Rejection reason</p>
          <p className="mt-1 whitespace-pre-wrap">{book.rejection_reason}</p>
        </Alert>
      ) : null}

      {book.changes_requested_reason ? (
        <Alert variant="warning">
          <p className="font-semibold">Changes requested</p>
          <p className="mt-1 whitespace-pre-wrap">
            {book.changes_requested_reason}
          </p>
        </Alert>
      ) : null}

      {!canEdit ? (
        <Alert variant="info">
          This listing is locked while it is under review or live. Contact support
          if you need help.
        </Alert>
      ) : null}

      <section className="space-y-4">
        <h2 className="heading-display text-xl">Book details</h2>
        <BookForm
          book={book}
          genres={genres}
          defaultAuthorName={profile.display_name ?? ""}
          readOnly={!canEdit}
          showSubmit={canEdit}
        />
      </section>

      {canEdit ? (
        <>
          <section className="space-y-4">
            <h2 className="heading-display text-xl">Cover image</h2>
            <div className="card-surface flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="relative aspect-[2/3] w-full max-w-[160px] overflow-hidden rounded-xl bg-ivory">
                {cover ? (
                  <Image
                    src={cover}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-3 text-center text-xs text-forest-muted">
                    No cover yet
                  </div>
                )}
              </div>
              <form action={coverUpload} className="flex-1 space-y-3">
                <input type="hidden" name="book_id" value={book.id} />
                <input
                  type="file"
                  name="cover"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="block w-full text-sm"
                  required
                />
                <p className="help-text">JPEG, PNG, WebP, or GIF — max 5 MB.</p>
                <Button type="submit" variant="secondary">
                  Upload cover
                </Button>
              </form>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="heading-display text-xl">Manuscript (private)</h2>
            <div className="card-surface space-y-3">
              {book.manuscript_filename ? (
                <p className="text-sm text-charcoal">
                  Current file:{" "}
                  <span className="font-semibold">{book.manuscript_filename}</span>
                </p>
              ) : (
                <p className="text-sm text-forest-muted">No manuscript uploaded.</p>
              )}
              <form action={manuscriptUpload} className="space-y-3">
                <input type="hidden" name="book_id" value={book.id} />
                <input
                  type="file"
                  name="manuscript"
                  accept=".pdf,.epub,.doc,.docx,application/pdf"
                  className="block w-full text-sm"
                  required
                />
                <p className="help-text">
                  PDF, EPUB, or DOCX for editorial review. Not distributed to
                  readers and not sold on Authors Pilot.
                </p>
                <Button type="submit" variant="secondary">
                  Upload manuscript
                </Button>
              </form>
            </div>
          </section>
        </>
      ) : null}

      <section className="space-y-4">
        <h2 className="heading-display text-xl">Sales links</h2>
        <Alert variant="info">
          <p className="font-semibold">You own your sales channels</p>
          <p className="mt-1">
            Add links to your author website, Amazon, or other stores. Readers
            leave Authors Pilot to buy — we do not checkout, hold funds, or take
            royalties. Outbound clicks are analytics only, not confirmed sales.
          </p>
        </Alert>

        {(book.sales_links ?? []).length === 0 ? (
          <p className="text-sm text-forest-muted">No sales links yet.</p>
        ) : (
          <ul className="space-y-3">
            {(book.sales_links ?? []).map((link) => (
              <li
                key={link.id}
                className="card-surface flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <p className="font-semibold text-ink">{link.label}</p>
                  <p className="text-sm text-forest-muted break-all">{link.url}</p>
                  <p className="mt-1 text-xs text-forest-muted">
                    {link.is_primary ? "Primary · " : ""}
                    {link.is_active ? "Active" : "Hidden"} · {link.link_type}
                  </p>
                </div>
                {canManageSalesLinks ? (
                  <form action={removeSalesLink}>
                    <input type="hidden" name="book_id" value={book.id} />
                    <input type="hidden" name="link_id" value={link.id} />
                    <Button type="submit" variant="danger">
                      Remove
                    </Button>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
        )}

        {canManageSalesLinks ? (
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-forest-muted">
              Add or update link
            </h3>
            <SalesLinkForm bookId={book.id} />
          </div>
        ) : null}

      </section>
    </div>
  );
}
