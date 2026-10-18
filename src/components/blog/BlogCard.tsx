import Link from "next/link";
import Image from "next/image";
import type { BlogArticle } from "@/lib/blog/types";
import { getReadingTime } from "@/lib/blog/utils";

type Props = {
  article: BlogArticle;
  featured?: boolean;
};

export function BlogCard({ article, featured = false }: Props) {
  const readingTime = getReadingTime(article);

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-soft ${
        featured ? "md:grid md:grid-cols-2" : ""
      }`}
    >
      <div className={`relative ${featured ? "min-h-56 md:min-h-full" : "aspect-[16/10]"}`}>
        <Image
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          fill
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#A7C4AB]/30 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
            {article.category}
          </span>
          <span className="font-sans text-xs text-charcoal">{readingTime} min read</span>
        </div>
        <h3 className={`mt-3 font-display font-semibold text-ink ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <Link href={`/blog/${article.slug}`} className="transition hover:text-[#273E2B]">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
          {article.excerpt}
        </p>
        <Link
          href={`/blog/${article.slug}`}
          className="mt-5 inline-flex font-sans text-sm font-semibold text-[#E08A2A]"
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}
