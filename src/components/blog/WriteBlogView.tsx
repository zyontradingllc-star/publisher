"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import { isValidAuthorEmail, normalizeEmail } from "@/lib/blog-author/session";
import { submitBlogPost } from "@/lib/blog-author/email";

const fieldClass =
  "mt-1 w-full rounded-lg border border-sand bg-ivory px-3 py-2.5 text-sm text-ink outline-none transition focus:border-[#273E2B] focus:ring-2 focus:ring-[#273E2B]/25";
const labelClass = "block font-sans text-xs font-medium text-ink sm:text-sm";

export function WriteBlogView() {
  const [email, setEmail] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(BLOG_CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmitBlog(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!isValidAuthorEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!authorName.trim() || authorName.trim().length < 2) {
      setError("Enter your name.");
      return;
    }
    if (!title.trim() || title.trim().length < 10) {
      setError("Title should be at least 10 characters.");
      return;
    }
    if (!excerpt.trim() || excerpt.trim().length < 40) {
      setError("Excerpt should be at least 40 characters.");
      return;
    }
    if (!content.trim() || content.trim().length < 200) {
      setError("Article body should be at least 200 characters.");
      return;
    }

    setLoading(true);
    const result = await submitBlogPost({
      email: normalizeEmail(email),
      authorName: authorName.trim(),
      title: title.trim(),
      category,
      excerpt: excerpt.trim(),
      content: content.trim(),
    });
    setLoading(false);

    if (!result.success) {
      setError(result.message || "Could not submit your article. Try again.");
      return;
    }

    setSubmitted(true);
  }

  function handleWriteAnother() {
    setSubmitted(false);
    setEmail("");
    setAuthorName("");
    setTitle("");
    setExcerpt("");
    setContent("");
    setError("");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <FadeIn>
        <span className="badge-pill">Writing Resources</span>
        <h1 className="mt-4 heading-section">
          Writing Resources for Authors — Tips, Tools &amp; Guides
        </h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-charcoal">
          Start with the writing craft, then submit your own insight if you want
          to contribute. These guides stay focused on writing — publishing steps
          live on their own pages.
        </p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-forest">
          Getting Started With Writing Your Book
        </h2>
        <p className="mt-3 font-sans text-base leading-relaxed text-charcoal">
          Begin with a clear idea, a workable outline, and a draft you can
          finish. The guide below walks through that path for first-time authors.
        </p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-forest">
          Related Guides
        </h2>
        <ul className="mt-6 space-y-2 font-sans text-sm text-charcoal sm:text-base">
          <li>
            <Link href="/blog/how-to-write-a-book" className="font-semibold text-[#E08A2A] hover:underline">
              How to Write a Book: A Beginner&apos;s Step-by-Step Guide
            </Link>
            {" "}
            — idea, outline, draft, and a finished manuscript.
          </li>
          <li>
            <Link href="/blog/how-to-find-a-ghostwriter" className="font-semibold text-[#E08A2A] hover:underline">
              How to Find a Ghostwriter
            </Link>
            {" "}
            — if you want a writing partner instead of drafting alone.
          </li>
          <li>
            <Link href="/blog/how-to-publish-a-book" className="font-semibold text-[#E08A2A] hover:underline">
              How to Publish a Book
            </Link>
            {" "}
            — after the manuscript is finished.
          </li>
        </ul>
        <p className="mt-6 font-sans text-base leading-relaxed text-charcoal">
          Want to contribute? Fill in the form below and we&apos;ll receive your
          draft by email for editorial review.
        </p>
      </FadeIn>

      <FadeIn className="mt-8 rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8">
        {submitted ? (
          <div className="text-center">
            <p className="font-display text-2xl font-semibold text-forest">
              Draft received
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              Thank you — we received your blog draft. Our editorial team will
              review it and email you at{" "}
              <span className="font-semibold text-ink">{email}</span> within a
              few business days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/blog/author-publishing-blog-resources">Back to Blog</Button>
              <Button type="button" variant="ghost" onClick={handleWriteAnother}>
                Write another article
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitBlog} noValidate>
            <h3 className="font-display text-xl font-semibold text-ink">
              Submit your article
            </h3>
            <p className="mt-2 font-sans text-sm text-charcoal">
              Your draft goes straight to hello@authorspilot.com — no verification
              code.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="author-name" className={labelClass}>
                  Your name *
                </label>
                <input
                  id="author-name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Full name"
                  className={fieldClass}
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="author-email" className={labelClass}>
                  Email address *
                </label>
                <input
                  id="author-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={fieldClass}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="blog-category" className={labelClass}>
                Category *
              </label>
              <select
                id="blog-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={fieldClass}
                required
              >
                {BLOG_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="blog-title" className={labelClass}>
                Article title *
              </label>
              <input
                id="blog-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="How to publish your first book on Amazon KDP"
                className={fieldClass}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="blog-excerpt" className={labelClass}>
                Short excerpt *
              </label>
              <textarea
                id="blog-excerpt"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary that will appear on the blog listing…"
                className={`${fieldClass} resize-y`}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="blog-content" className={labelClass}>
                Article body *
              </label>
              <textarea
                id="blog-content"
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article here. Use clear headings and short paragraphs."
                className={`${fieldClass} resize-y`}
                required
              />
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <p className="mt-4 font-sans text-xs text-charcoal">
              By submitting, you agree that Authors Pilot may edit or decline
              posts that do not meet our editorial guidelines.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Sending…" : "Submit for review"}
              </Button>
              <Button href="/blog/author-publishing-blog-resources" variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        )}
      </FadeIn>

      <p className="mt-6 text-center font-sans text-sm text-charcoal">
        <Link href="/blog/author-publishing-blog-resources" className="font-semibold text-[#E08A2A] hover:underline">
          ← Back to blog
        </Link>
      </p>
    </div>
  );
}
