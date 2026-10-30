import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { getMyBooks, MAX_BOOKS_PER_AUTHOR } from "@/lib/books";
import { PublishBookDetailsForm } from "@/components/forms/PublishBookDetailsForm";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Publish Book - Details" };

export default async function PublishBookDetailsPage() {
  const profile = await requireProfile("/dashboard/books/new");
  const books = await getMyBooks(profile.id, profile.email);

  if (books.length >= MAX_BOOKS_PER_AUTHOR) {
    return (
      <div className="space-y-4">
        <header>
          <h1 className="heading-section">Book limit reached</h1>
          <p className="mt-2 max-w-xl text-sm text-forest-muted">
            Each account can upload a maximum of {MAX_BOOKS_PER_AUTHOR} books.
            Manage your existing listings or wait until a slot is available.
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          <Button href="/dashboard/books">My Books</Button>
          <Button href="/dashboard/approved" variant="ghost">
            Approved
          </Button>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-semibold text-coral hover:underline"
          >
            ← Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="heading-section">Book Details</h1>
        <p className="mt-1 max-w-2xl text-sm text-forest-muted">
          Listing details for your catalog page. Sales stay on your store - we
          take no royalty. You can upload up to {MAX_BOOKS_PER_AUTHOR} books (
          {books.length}/{MAX_BOOKS_PER_AUTHOR} used).
        </p>
      </header>

      <PublishBookDetailsForm
        defaultAuthorName={profile.display_name ?? ""}
        authorEmail={profile.email}
      />
    </div>
  );
}
