import Image from "next/image";
import Link from "next/link";
import {
  CATEGORY_BADGE,
  formatBlogDate,
  isNewPost,
  type BlogPost,
} from "@/lib/blog/posts";
import { platformPublicPath } from "@/lib/utils";

type Props = {
  post: BlogPost;
  featured?: boolean;
  compact?: boolean;
};

function displayTitle(raw: string) {
  return raw.replace(/:\s*/g, " ").replace(/\s+/g, " ").trim();
}

export function BlogPostCard({
  post,
  featured = false,
  compact = false,
}: Props) {
  const href = `/blog/${post.slug}/`;
  const showNew = isNewPost(post.publishedAt);
  const title = displayTitle(post.h1 || post.title);

  if (featured) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift"
      >
        <div className="relative h-[240px] w-full overflow-hidden sm:h-[320px] md:h-[380px]">
          <Image
            src={platformPublicPath(post.image)}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
            priority
            unoptimized
          />
          {showNew ? (
            <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
              <span className="rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-2.5 py-0.5 text-[10px] font-bold uppercase text-ink">
                New
              </span>
            </div>
          ) : null}
          <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
            <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
              {post.category}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink transition group-hover:text-coral md:text-[30px]">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-charcoal">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-xs font-bold text-white"
              aria-hidden
            >
              {post.authorInitials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-ink">{post.author}</p>
              <p className="text-xs text-forest-muted">
                {formatBlogDate(post.publishedAt)}
              </p>
            </div>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-sand text-base transition group-hover:bg-coral group-hover:text-white"
              aria-hidden
            >
              ↗
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div
        className={`relative w-full overflow-hidden ${compact ? "h-[160px]" : "aspect-[16/10]"}`}
      >
        <Image
          src={platformPublicPath(post.image)}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          unoptimized
        />
        {showNew ? (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-2 py-0.5 text-[10px] font-bold uppercase text-ink">
              New
            </span>
          </div>
        ) : null}
        <div className="absolute bottom-3 left-3">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.05em] ${CATEGORY_BADGE[post.category]}`}
          >
            {post.category}
          </span>
        </div>
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-5"}`}>
        <h3
          className={`font-display font-bold leading-snug text-ink transition group-hover:text-coral ${compact ? "text-base" : "text-lg sm:text-xl"}`}
        >
          {title}
        </h3>
        {!compact ? (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-charcoal">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-4 flex items-center gap-2 border-t border-sand pt-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white"
            aria-hidden
          >
            {post.authorInitials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-ink">
              {post.author}
            </p>
            <p className="text-[11px] text-forest-muted">
              {formatBlogDate(post.publishedAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
