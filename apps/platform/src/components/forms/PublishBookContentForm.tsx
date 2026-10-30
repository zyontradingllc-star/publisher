"use client";

import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { savePublishContentAction } from "@/app/actions/publish-book";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { PublishBookContentFields } from "@/components/forms/PublishBookContentFields";

const initialState: ActionState = { ok: false };

/** Remaining tip cards from AuthorsPilot CRO / social content (posts 5–9). */
const CONTENT_TIP_CARDS = [
  {
    title: "First-time author?",
    body: "You don't need to wait until you're famous. Present your books professionally, give readers a page to explore, and make your book links easier to share.",
    image: "/publish-tips/5.webp",
    imageAlt: "First-time author building an online presence",
  },
  {
    title: "Promote your book online",
    body: "Share useful topic content, post short excerpts, build an author page readers can revisit, add your link to social profiles, and ask readers to share.",
    image: "/publish-tips/6.webp",
    imageAlt: "Simple ways to promote a book online",
  },
  {
    title: "Build your author brand",
    body: "Readers may discover one book today and look for your next tomorrow. A clear author profile presents your work together in one consistent place.",
    image: "/publish-tips/7.webp",
    imageAlt: "Author brand and profile presence",
  },
  {
    title: "Already published?",
    body: "List your book, create a shareable discovery page, and keep your existing sales channels while giving readers another way to find your work.",
    image: "/publish-tips/8.webp",
    imageAlt: "Published book ready for more discovery",
  },
  {
    title: "Every book has a reader",
    body: "Fiction, fantasy, romance, poetry, business, memoir—every book starts with an idea worth sharing. Your next reader could be one shared link away.",
    image: "/publish-tips/9.webp",
    imageAlt: "Readers discovering indie books",
  },
] as const;

type Props = {
  bookId?: string | null;
  bookTitle?: string;
  submissionId?: string | null;
};

export function PublishBookContentForm({
  bookId,
  bookTitle = "Your book",
  submissionId,
}: Props) {
  const [state, formAction, pending] = useActionState(
    savePublishContentAction,
    initialState
  );
  const [submitIntent, setSubmitIntent] = useState<"draft" | "continue" | null>(
    null
  );

  useEffect(() => {
    if (!pending) setSubmitIntent(null);
  }, [pending]);

  return (
    <div className="space-y-6">
      {state.message ? (
        <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>
      ) : null}

      <form
        action={formAction}
        className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start"
        encType="multipart/form-data"
      >
        {bookId ? <input type="hidden" name="book_id" value={bookId} /> : null}
        {submissionId ? (
          <input type="hidden" name="submission_id" value={submissionId} />
        ) : null}
        <input type="hidden" name="book_title" value={bookTitle} />

        <div className="space-y-5">
          <PublishBookContentFields />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-6">
            <Link
              href="/dashboard/books/new"
              className="inline-flex items-center rounded-none border border-sand bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:border-coral/40"
            >
              ← Back to Details
            </Link>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                name="intent"
                value="draft"
                disabled={pending}
                onClick={() => setSubmitIntent("draft")}
                className="rounded-none border border-sand bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:border-coral/40 disabled:opacity-60"
              >
                {pending && submitIntent === "draft"
                  ? "Saving…"
                  : "Save as Draft"}
              </button>
              <button
                type="submit"
                name="intent"
                value="continue"
                disabled={pending}
                onClick={() => setSubmitIntent("continue")}
                className="inline-flex items-center gap-2 rounded-none bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-cta hover:brightness-105 disabled:opacity-60"
              >
                {pending && submitIntent === "continue"
                  ? "Saving…"
                  : "Save and Continue"}
              </button>
            </div>
          </div>
          <p className="text-right text-xs text-forest-muted">
            Next step: Sales Links
          </p>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-24">
          {CONTENT_TIP_CARDS.map((card) => (
            <TipCard
              key={card.title}
              title={card.title}
              image={card.image}
              imageAlt={card.imageAlt}
            >
              {card.body}
            </TipCard>
          ))}
        </aside>
      </form>
    </div>
  );
}

function TipCard({
  title,
  children,
  image,
  imageAlt = "",
}: {
  title: string;
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-sand bg-[#EDEDED] shadow-soft">
      {image ? (
        <div className="relative aspect-[16/9] w-full bg-sand/40">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="240px"
            className="object-cover object-center"
          />
        </div>
      ) : null}
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink">
          {title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal">{children}</p>
      </div>
    </div>
  );
}
