import Link from "next/link";
import { redirect } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { getAuthorLead } from "@/lib/lead-session";
import { getMyBooks, MAX_BOOKS_PER_AUTHOR } from "@/lib/books";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { DashboardProfileHeader } from "@/components/dashboard/DashboardProfileHeader";
import {
  DashboardBookPreview,
  MAX_DASHBOARD_PREVIEWS,
} from "@/components/dashboard/DashboardBookPreview";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardRightRail } from "@/components/dashboard/DashboardRightRail";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; published?: string }>;
}) {
  const profile = await requireProfile("/dashboard");
  const params = await searchParams;
  if (params.submitted === "1" || params.published === "1") {
    redirect("/dashboard/books?submitted=1");
  }

  const books = await getMyBooks(profile.id, profile.email);
  const lead = await getAuthorLead();

  // One row per listing (prefer public/published over duplicate submission).
  const uniqueBooks = dedupeBooks(books).slice(0, MAX_DASHBOARD_PREVIEWS);
  const publishedCount = uniqueBooks.filter(
    (b) => b.status === "published" || b.is_public
  ).length;
  const draftOrPending =
    uniqueBooks.find(
      (b) => b.status === "draft" || b.status === "pending_review"
    ) ?? null;
  const atBookLimit = books.length >= MAX_BOOKS_PER_AUTHOR;
  const hasPreview =
    uniqueBooks.length > 0 || Boolean(lead?.lastBookTitle);

  return (
    <DashboardShell books={books} variant="home" showRightRail={false}>
      {!profile.profile_complete ? (
        <Alert variant="warning">
          <p className="font-semibold">Complete your author profile</p>
          <p className="mt-1">
            Add a display name, public URL, and a short bio.{" "}
            <Link href="/dashboard/profile" className="font-semibold underline">
              Edit profile
            </Link>
          </p>
        </Alert>
      ) : null}

      <DashboardProfileHeader
        profile={profile}
        booksCount={Math.min(books.length, MAX_BOOKS_PER_AUTHOR)}
        publishedCount={publishedCount}
        draftTitle={
          draftOrPending?.title ?? lead?.lastBookTitle ?? null
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-4">
          {hasPreview ? (
            <DashboardBookPreview
              books={uniqueBooks}
              fallbackTitle={lead?.lastBookTitle ?? "Your book submission"}
            />
          ) : (
            <section className="rounded-none border border-sand bg-white p-5 shadow-soft">
              <h2 className="font-display text-lg font-bold text-ink">
                Welcome home
              </h2>
              <p className="mt-2 text-sm text-forest-muted">
                Start a book project or polish your author profile so readers
                can find you. You can upload up to {MAX_BOOKS_PER_AUTHOR}{" "}
                books.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {atBookLimit ? (
                  <p className="text-sm font-semibold text-amber-800">
                    Book limit reached ({MAX_BOOKS_PER_AUTHOR}/{MAX_BOOKS_PER_AUTHOR}).
                  </p>
                ) : (
                  <Button href="/dashboard/books/new">+ New Book Project</Button>
                )}
                <Button href="/dashboard/profile" variant="ghost">
                  Edit Author Profile
                </Button>
              </div>
            </section>
          )}

          {profile.bio?.trim() ? (
            <section className="rounded-none border border-sand bg-white p-5 shadow-soft">
              <h2 className="font-display text-lg font-bold text-ink">About</h2>
              <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-relaxed text-charcoal">
                {profile.bio}
              </p>
            </section>
          ) : null}
        </div>

        <div className="w-full shrink-0 lg:w-[260px]">
          <DashboardRightRail books={uniqueBooks} forceVisible />
        </div>
      </div>
    </DashboardShell>
  );
}

function dedupeBooks(books: Awaited<ReturnType<typeof getMyBooks>>) {
  const bySlug = new Map<string, (typeof books)[number]>();
  for (const book of books) {
    const key = book.slug || book.id;
    const existing = bySlug.get(key);
    if (!existing) {
      bySlug.set(key, book);
      continue;
    }
    // Prefer approved / public listing when duplicates exist.
    const preferNew =
      (book.status === "published" || book.is_public) &&
      !(existing.status === "published" || existing.is_public);
    if (preferNew) bySlug.set(key, book);
  }
  return Array.from(bySlug.values());
}
