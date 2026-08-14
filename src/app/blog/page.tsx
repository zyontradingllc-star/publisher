import type { Metadata } from "next";
import Link from "next/link";
import { blog } from "@/content/site";
import { PageHero } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export const metadata: Metadata = {
  title: "The Author Forges Library | Writing, Publishing & Author Resources",
  description: blog.hero.description,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <PageHero title={blog.hero.title} description={blog.hero.description} />

      <div className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {blog.posts.map((post, i) => (
          <FadeIn key={post.slug} delay={Math.min(i * 0.03, 0.3)}>
            <article id={post.slug} className="h-full scroll-mt-24">
              <Card className="flex h-full flex-col !p-0 overflow-hidden">
                <PlaceholderImage
                  alt={post.imageAlt}
                  className="aspect-[16/10] w-full"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-[20px] font-medium uppercase tracking-wider text-coral">
                    <span>{post.category}</span>
                    <span className="text-sand">•</span>
                    <time
                      dateTime={post.date}
                      className="text-charcoal normal-case tracking-normal"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-semibold text-forest">
                    <Link
                      href={`/blog#${post.slug}`}
                      className="transition hover:text-coral"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal">
                    {post.excerpt}
                  </p>
                  {post.related?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.related.map((href) => (
                        <Link
                          key={href}
                          href={href}
                          className="text-[20px] font-medium text-coral hover:text-coral-soft"
                        >
                          {href.replace(/^\//, "").replace(/#/, " · ")} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
