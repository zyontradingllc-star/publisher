import Link from "next/link";
import Image from "next/image";
import { coverUrl, platformPublicPath } from "@/lib/utils";
import type { Book } from "@/types/database";

type Props = {
  books: Book[];
  /** Always show (e.g. home layout stacks this below content on small screens) */
  forceVisible?: boolean;
};

export function DashboardRightRail({ books, forceVisible = false }: Props) {
  const preview = books.slice(0, 3);

  return (
    <aside
      className={
        forceVisible
          ? "w-full space-y-4"
          : "hidden w-[260px] shrink-0 space-y-4 xl:block"
      }
    >
      <section className="rounded-none border border-sand bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-ink">My Books</h2>
          <Link
            href="/dashboard/books"
            className="text-xs font-semibold text-coral hover:underline"
          >
            See all
          </Link>
        </div>
        {preview.length === 0 ? (
          <p className="mt-3 text-sm text-forest-muted">No books yet.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {preview.map((book) => {
              const cover = coverUrl(book.cover_path);
              return (
                <li key={book.id}>
                  <Link
                    href={`/dashboard/books/${book.id}`}
                    className="flex gap-3 transition hover:opacity-90"
                  >
                    <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-none bg-ivory">
                      {cover ? (
                        <Image
                          src={platformPublicPath(cover)}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {book.title}
                      </p>
                      <p className="text-[11px] capitalize text-forest-muted">
                        {book.status.replace(/_/g, " ")}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="rounded-none border border-sand bg-white p-4 shadow-soft">
        <h2 className="text-sm font-bold text-ink">Quick Actions</h2>
        <ul className="mt-3 space-y-1">
          <QuickLink href="/dashboard/books/new" label="Add a New Book" />
          <QuickLink href="/dashboard/profile" label="Add a Photo" />
        </ul>
      </section>
    </aside>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 rounded-none px-2 py-2 text-sm font-medium text-charcoal transition hover:bg-ivory"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-none bg-[#E08A2A]/15 text-sm font-bold text-ink">
          +
        </span>
        {label}
      </Link>
    </li>
  );
}
