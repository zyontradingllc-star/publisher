import type { Payload } from "payload";
import { revalidatePath } from "next/cache";
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
    const existingDisplay = (existing.docs[0] as { displayName?: string | null })
      .displayName;
    await payload.update({
      collection: "authors",
      id: authorId,
      data: {
        approvalStatus: "APPROVED",
        isPublic: true,
        // Keep profile display name if author already saved one in dashboard
        ...(!existingDisplay && displayName ? { displayName } : {}),
        ...(avatarId && !existingAvatar ? { avatar: avatarId } : {}),
      },
      overrideAccess: true,
    });
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
        approvalStatus: "APPROVED",
        isPublic: true,
        ...(avatarId ? { avatar: avatarId } : {}),
      },
      overrideAccess: true,
    });
    authorId = created.id;
  }

  const coverId = relationId(submission.cover);

  // Reuse a book already created for this submission (e.g. prior partial approve).
  const existingBySubmission = await payload.find({
    collection: "books",
    where: { submission: { equals: submission.id } },
    limit: 1,
    overrideAccess: true,
  });

  let book = existingBySubmission.docs[0];
  let bookSlug =
    (book as { slug?: string } | undefined)?.slug ||
    uniqueSlug(submission.title, submission.id);

  if (!book) {
    const bySlug = await payload.find({
      collection: "books",
      where: { slug: { equals: bookSlug } },
      limit: 1,
      overrideAccess: true,
    });
    book = bySlug.docs[0];
  }

  if (!book) {
    try {
      book = await payload.create({
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
          approvalStatus: "APPROVED",
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
    } catch {
      // Unique slug race — attach a longer suffix and retry once.
      bookSlug = uniqueSlug(submission.title, `${submission.id}-${Date.now()}`);
      book = await payload.create({
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
          approvalStatus: "APPROVED",
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
    }
  } else {
    bookSlug = (book as { slug?: string }).slug || bookSlug;
    await payload.update({
      collection: "books",
      id: book.id,
      data: {
        author: authorId,
        status: "published",
        approvalStatus: "APPROVED",
        submission: submission.id,
        ...(coverId ? { cover: coverId } : {}),
      },
      overrideAccess: true,
    });
  }

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

  const authorSlug =
    (authorDoc as { slug?: string | null }).slug ||
    uniqueSlug(displayName, submission.id);
  revalidatePath("/books");
  revalidatePath("/authors");
  revalidatePath(`/books/${bookSlug}`);
  revalidatePath(`/authors/${authorSlug}`);

  return { authorId, bookId: book.id, bookSlug, authorSlug };
}
