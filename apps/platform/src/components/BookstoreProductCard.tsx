import Image from "next/image";
import Link from "next/link";
import type { BookWithRelations } from "@/types/database";
import { coverUrl } from "@/lib/utils";

export function BookstoreProductCard({
  book,
  featured,
}: {
  book: BookWithRelations;
  featured?: boolean;
}) {
  const cover = coverUrl(book.cover_path);
  const href = `/books/${book.slug}`;
  const authorSlug = book.profiles?.slug;

  return (
    <article className="flex h-full flex-col rounded-lg border border-sand bg-white p-3 shadow-soft">
      <Link href={href} className="relative mx-auto block w-full max-w-[160px]">
        {featured ? (
          <span className="absolute -left-1 top-2 z-10 rounded-sm bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink shadow-cta">
            Featured
          </span>
        ) : null}
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-ivory shadow-book ring-1 ring-sand/70">
          {cover ? (
            <Image
              src={cover}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover object-center"
              sizes="160px"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-cta-wash px-2 text-center text-xs font-semibold text-white">
              {book.title}
            </div>
          )}
        </div>
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#2162a1] hover:text-coral hover:underline">
          <Link href={href}>{book.title}</Link>
        </h3>
        <p className="mt-1 text-xs text-charcoal">
          by{" "}
          {authorSlug ? (
            <Link
              href={`/authors/${authorSlug}`}
              className="text-[#2162a1] hover:underline"
            >
              {book.author_display_name}
            </Link>
          ) : (
            <span>{book.author_display_name}</span>
          )}
        </p>
        {book.genre?.name ? (
          <p className="mt-1 text-xs text-forest-muted">{book.genre.name}</p>
        ) : null}
        <p className="mt-2 text-xs font-bold text-ink">
          {book.language ? book.language.toUpperCase() : "EN"} listing
        </p>
        <p className="mt-auto pt-3 text-[11px] text-forest-muted">
          Buy on author&apos;s store - no cart on Authors Pilot
        </p>
        <Link
          href={href}
          className="mt-2 inline-flex items-center justify-center rounded-full border border-sand bg-ivory px-3 py-1.5 text-center text-[11px] font-bold uppercase tracking-wide text-ink transition hover:border-coral/40"
        >
          View listing
        </Link>
      </div>
    </article>
  );
}
