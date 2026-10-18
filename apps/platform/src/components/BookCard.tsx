import Link from "next/link";
import Image from "next/image";
import type { BookWithRelations } from "@/types/database";
import { coverUrl, truncate } from "@/lib/utils";

export function BookCard({ book }: { book: BookWithRelations }) {
  const cover = coverUrl(book.cover_path);
  const authorSlug = book.profiles?.slug;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
      <Link href={`/books/${book.slug}`} className="relative block aspect-[2/3] bg-ivory">
        {cover ? (
          <Image
            src={cover}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-cta-wash px-4 text-center text-sm font-semibold text-white">
            {book.title}
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        {book.genre?.name ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-coral">
            {book.genre.name}
          </p>
        ) : null}
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-ink">
          <Link href={`/books/${book.slug}`} className="hover:underline">
            {book.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-forest-muted">
          {authorSlug ? (
            <Link href={`/authors/${authorSlug}`} className="hover:underline">
              {book.author_display_name}
            </Link>
          ) : (
            book.author_display_name
          )}
        </p>
        {book.description ? (
          <p className="mt-2 line-clamp-3 text-sm text-charcoal">
            {truncate(book.description, 140)}
          </p>
        ) : null}
      </div>
    </article>
  );
}
