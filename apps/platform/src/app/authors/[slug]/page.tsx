import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { RecordAuthorView } from "@/components/RecordView";
import { getAuthorBooks, getAuthorBySlug } from "@/lib/books";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { avatarUrl } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isSupabaseConfigured()) return { title: "Author" };
  try {
    const { author } = await getAuthorBySlug(slug);
    if (!author) return { title: "Author not found" };
    return {
      title: author.display_name ?? "Author",
      description: author.bio?.slice(0, 160) ?? undefined,
    };
  } catch {
    return { title: "Author" };
  }
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isSupabaseConfigured()) notFound();

  const { author, error } = await getAuthorBySlug(slug).catch(() => ({
    author: null,
    error: "Failed to load profile",
  }));

  if (!author) notFound();

  const books = await getAuthorBooks(author.id).catch(() => []);
  const avatar = avatarUrl(author.avatar_path);

  const socials = [
    { label: "Website", href: author.website_url },
    { label: "Facebook", href: author.social_facebook },
    { label: "Instagram", href: author.social_instagram },
    { label: "X", href: author.social_twitter },
    { label: "LinkedIn", href: author.social_linkedin },
    { label: "TikTok", href: author.social_tiktok || author.social_whatsapp },
  ].filter((s) => s.href);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <RecordAuthorView profileId={author.id} />
      <nav className="text-sm text-forest-muted">
        <Link href="/authors" className="hover:text-coral">
          Authors
        </Link>
      </nav>

      <header className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-sand bg-ivory">
          {avatar ? (
            <Image src={avatar} alt="" fill className="object-cover" sizes="96px" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-coral text-2xl font-bold text-white">
              {(author.display_name ?? "A").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h1 className="heading-display text-3xl">{author.display_name ?? "Author"}</h1>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          {author.bio ? (
            <p className="mt-4 max-w-2xl whitespace-pre-wrap text-charcoal leading-relaxed">
              {author.bio}
            </p>
          ) : (
            <p className="mt-4 text-forest-muted">This author has not added a biography yet.</p>
          )}
          {socials.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-sand bg-white px-3 py-1.5 text-xs font-semibold text-charcoal hover:border-coral/40"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      <section className="mt-12">
        <h2 className="heading-display text-xl">Published books</h2>
        {books.length === 0 ? (
          <p className="mt-4 text-forest-muted">No public listings yet.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
