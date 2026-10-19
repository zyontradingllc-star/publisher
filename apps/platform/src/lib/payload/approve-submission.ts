import type { Payload } from "payload";
import { slugify } from "@/lib/utils";

type SubmissionDoc = {
  id: string | number;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  language?: string | null;
  seriesName?: string | null;
  editionNumber?: string | null;
  publishingRights?: string | null;
  primaryAudience?: string | null;
  readingAgeMin?: number | null;
  readingAgeMax?: number | null;
  primarySalesChannel?: string | null;
  author?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  cover?: string | number | { id: string | number } | null;
  avatar?: string | number | { id: string | number } | null;
  approvedAuthor?: string | number | { id: string | number } | null;
  approvedBook?: string | number | { id: string | number } | null;
};

function relationId(
  value: string | number | { id: string | number } | null | undefined
): string | number | undefined {
  if (!value) return undefined;
  return typeof value === "object" ? value.id : value;
}

function uniqueSlug(base: string, suffix?: string | number) {
  const root = slugify(base) || "item";
  if (!suffix) return root;
  return `${root}-${String(suffix).slice(-6)}`;
}

/**
 * On Admin Approve: find/create Author, create published Book, link both.
 * Keeps the original Book Submission as an audit record.
 */
export async function approveBookSubmission(args: {
  payload: Payload;
  submission: SubmissionDoc;
  reviewer?: { id: string | number } | null;
}) {
  const { payload, submission, reviewer } = args;

  if (submission.approvedBook) {
    return null;
  }

  const email = submission.author?.email?.trim().toLowerCase();
  if (!email) {
    throw new Error("Submission is missing author email.");
  }

  const firstName = submission.author?.firstName?.trim() || "";
  const lastName = submission.author?.lastName?.trim() || "";
  const displayName = `${firstName} ${lastName}`.trim() || email.split("@")[0];

  const existing = await payload.find({
    collection: "authors",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });

  const avatarId = relationId(submission.avatar);

  let authorId: string | number;
  if (existing.docs[0]) {
    authorId = existing.docs[0].id;
    const existingAvatar = (existing.docs[0] as { avatar?: unknown }).avatar;
    if (avatarId && !existingAvatar) {
      await payload.update({
        collection: "authors",
        id: authorId,
        data: { avatar: avatarId },
        overrideAccess: true,
      });
    }
  } else {
    const authorSlug = uniqueSlug(displayName, submission.id);
    const created = await payload.create({
      collection: "authors",
      data: {
        displayName,
        firstName,
        lastName,
        email,
        slug: authorSlug,
        ...(avatarId ? { avatar: avatarId } : {}),
      },
      overrideAccess: true,
    });
    authorId = created.id;
  }

  const coverId = relationId(submission.cover);

  const bookSlug = uniqueSlug(submission.title, submission.id);
  const book = await payload.create({
    collection: "books",
    data: {
      title: submission.title,
      slug: bookSlug,
      subtitle: submission.subtitle || undefined,
      description: submission.description || undefined,
      language: submission.language || undefined,
      seriesName: submission.seriesName || undefined,
      editionNumber: submission.editionNumber || undefined,
      author: authorId,
      status: "published",
      publishingRights: submission.publishingRights || undefined,
      primaryAudience: submission.primaryAudience || undefined,
      readingAgeMin: submission.readingAgeMin ?? undefined,
      readingAgeMax: submission.readingAgeMax ?? undefined,
      primarySalesChannel: submission.primarySalesChannel || undefined,
      submission: submission.id,
      publishedAt: new Date().toISOString(),
      ...(coverId ? { cover: coverId } : {}),
    },
    overrideAccess: true,
  });

  const authorDoc = await payload.findByID({
    collection: "authors",
    id: authorId,
    overrideAccess: true,
  });

  const currentBooks = Array.isArray(authorDoc.books)
    ? authorDoc.books.map((b: string | number | { id: string | number }) =>
        typeof b === "object" && b !== null ? b.id : b
      )
    : [];

  if (!currentBooks.includes(book.id)) {
    await payload.update({
      collection: "authors",
      id: authorId,
      data: {
        books: [...currentBooks, book.id],
      },
      overrideAccess: true,
    });
  }

  await payload.update({
    collection: "book-submissions",
    id: submission.id,
    data: {
      approvedAuthor: authorId,
      approvedBook: book.id,
      publicSlug: bookSlug,
      reviewedAt: new Date().toISOString(),
      ...(reviewer?.id ? { reviewedBy: reviewer.id } : {}),
    },
    overrideAccess: true,
    context: { skipApproveHook: true },
  });

  return { authorId, bookId: book.id, bookSlug };
}
