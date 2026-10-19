import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { ManuscriptAccess } from "@/components/admin/ManuscriptAccess";
import { StatusBadge } from "@/components/StatusBadge";
import { Alert } from "@/components/ui/Alert";
import {
  BOOK_STATUS_LABELS,
  type BookStatus,
  type BookStatusEvent,
} from "@/types/database";
import { coverUrl, formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: `Admin · Book ${id.slice(0, 8)}…` };
}

export default async function AdminBookReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await createClient();

  const { data: book } = await supabase
    .from("books")
    .select(
      `
      *,
      genre:genres(*),
      profiles:profiles!books_author_id_fkey(id, display_name, email, slug, website_url, has_author_website),
      sales_links(*)
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (!book) notFound();

  const { data: events } = await supabase
    .from("book_status_events")
    .select("*")
    .eq("book_id", id)
    .order("created_at", { ascending: false });

  const cover = coverUrl(book.cover_path);
  const author = book.profiles as {
    display_name?: string | null;
    email?: string | null;
    slug?: string | null;
    website_url?: string | null;
    has_author_website?: boolean;
  } | null;

  return (
    <div className="space-y-10">
      <header>
        <Link
          href="/admin/books"
          className="text-sm font-semibold text-coral hover:underline"
        >
          ← All books
        </Link>
        <h1 className="heading-section mt-2">{book.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <StatusBadge status={book.status as BookStatus} />
          {book.status === "published" ? (
            <Link
              href={`/books/${book.slug}`}
              className="text-sm font-semibold underline"
            >
              Public listing
            </Link>
          ) : null}
        </div>
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
            {book.author_display_name}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Account:</span>{" "}
            {author?.display_name ?? "—"}
            {author?.email ? ` (${author.email})` : ""}
          </p>
          {author?.slug ? (
            <p className="text-sm">
              <span className="font-semibold">Profile:</span>{" "}
              <Link href={`/authors/${author.slug}`} className="text-coral underline">
                /authors/{author.slug}
              </Link>
            </p>
          ) : null}
          <p className="whitespace-pre-wrap text-sm text-charcoal">{book.description}</p>
          {book.admin_notes ? (
            <Alert variant="info">
              <p className="font-semibold">Admin notes</p>
              <p className="mt-1 whitespace-pre-wrap">{book.admin_notes}</p>
            </Alert>
          ) : null}
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="heading-display text-xl">Review</h2>
            <ReviewForm
              bookId={book.id}
              currentStatus={book.status as BookStatus}
            />
          </div>

          <div className="card-surface space-y-3">
            <h2 className="font-display text-lg font-bold">Manuscript</h2>
            <ManuscriptAccess
              bookId={book.id}
              filename={book.manuscript_filename}
            />
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <h2 className="heading-display text-xl">Sales links</h2>
        <Alert variant="info">
          External destinations only — Authors Pilot does not verify purchases or
          pay royalties.
        </Alert>
        {(book.sales_links ?? []).length === 0 ? (
          <p className="text-sm text-forest-muted">No sales links.</p>
        ) : (
          <ul className="divide-y divide-sand rounded-2xl border border-sand bg-white">
            {(book.sales_links ?? []).map(
              (link: {
                id: string;
                label: string;
                url: string;
                click_count: number;
                is_primary: boolean;
              }) => (
                <li
                  key={link.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold">{link.label}</p>
                    <a
                      href={link.url}
                      className="text-coral underline break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.url}
                    </a>
                  </div>
                  <p className="text-xs text-forest-muted">
                    {link.is_primary ? "Primary · " : ""}
                    {link.click_count} outbound clicks (not sales)
                  </p>
                </li>
              )
            )}
          </ul>
        )}
        {author?.has_author_website ? (
          <p className="text-sm text-forest-muted">
            Author indicated they have a website
            {author.website_url ? `: ${author.website_url}` : "."}
          </p>
        ) : null}
      </section>

      <section className="space-y-4">
        <h2 className="heading-display text-xl">Status history</h2>
        <ol className="space-y-3">
          {(events ?? []).map((ev: BookStatusEvent) => (
            <li key={ev.id} className="card-surface text-sm">
              <p className="font-semibold text-ink">
                {ev.from_status
                  ? `${BOOK_STATUS_LABELS[ev.from_status]} → ${BOOK_STATUS_LABELS[ev.to_status]}`
                  : BOOK_STATUS_LABELS[ev.to_status]}
              </p>
              <p className="text-xs text-forest-muted">{formatDate(ev.created_at)}</p>
              {ev.note ? (
                <p className="mt-2 whitespace-pre-wrap text-charcoal">{ev.note}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
