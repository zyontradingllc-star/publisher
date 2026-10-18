import Link from "next/link";
import Image from "next/image";
import type { Profile } from "@/types/database";
import { avatarUrl, truncate } from "@/lib/utils";

export function AuthorCard({ author }: { author: Profile }) {
  if (!author.slug) return null;
  const avatar = avatarUrl(author.avatar_path);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-sand bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-ivory">
          {avatar ? (
            <Image
              src={avatar}
              alt=""
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-coral text-lg font-bold text-white">
              {(author.display_name ?? "A").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-ink">
            <Link href={`/authors/${author.slug}`} className="hover:underline">
              {author.display_name ?? "Author"}
            </Link>
          </h3>
          {author.website_url ? (
            <p className="text-xs text-forest-muted">Has author website</p>
          ) : null}
        </div>
      </div>
      {author.bio ? (
        <p className="mt-4 text-sm text-charcoal">{truncate(author.bio, 160)}</p>
      ) : (
        <p className="mt-4 text-sm text-forest-muted">No biography yet.</p>
      )}
      <div className="mt-auto pt-4">
        <Link
          href={`/authors/${author.slug}`}
          className="text-sm font-semibold text-coral hover:underline"
        >
          View profile →
        </Link>
      </div>
    </article>
  );
}
