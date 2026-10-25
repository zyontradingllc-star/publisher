"use server";

import { after } from "next/server";
import { redirect } from "next/navigation";
import { isLeadOnlySession, requireProfile } from "@/lib/auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import {
  createBookDraft,
  setSalesLinks,
  updateBook,
  uploadAuthorFile,
} from "@/lib/firebase/books";
import {
  notifyAdminNewSubmission,
  notifyAuthorSubmissionReceived,
} from "@/lib/email";
import {
  recordLeadPublishSubmission,
  updateAuthorLeadContact,
} from "@/lib/lead-session";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";
import type { ActionState } from "@/app/actions/auth";

function keywordsFromForm(formData: FormData): string[] {
  const out: string[] = [];
  for (let i = 1; i <= 7; i++) {
    const v = String(formData.get(`keyword_${i}`) || "").trim();
    if (v) out.push(v);
  }
  return out;
}

/**
 * KDP-style Book Details step - saves draft (DB or inbox) then optionally continues.
 */
export async function savePublishDetailsAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books/new");
  const intent = String(formData.get("intent") || "draft") as "draft" | "continue";

  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const language = String(formData.get("language") || "en").trim();
  const seriesName = String(formData.get("series_name") || "").trim();
  const edition = String(formData.get("edition_number") || "").trim();
  const authorFirst = String(formData.get("author_first") || "").trim();
  const authorLast = String(formData.get("author_last") || "").trim();
  const authorEmail = String(formData.get("author_email") || "").trim();
  const contributorRole = String(formData.get("contributor_role") || "").trim();
  const contributorFirst = String(formData.get("contributor_first") || "").trim();
  const contributorLast = String(formData.get("contributor_last") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const publishingRights = String(formData.get("publishing_rights") || "").trim();
  const explicitContent = String(formData.get("explicit_content") || "no").trim();
  const ageMin = String(formData.get("age_min") || "").trim();
  const ageMax = String(formData.get("age_max") || "").trim();
  const primaryMarketplace = String(
    formData.get("primary_marketplace") || "author_website"
  ).trim();
  const genreId = String(formData.get("genre_id") || "").trim();
  const contentPolicy = formData.get("content_policy_accepted") === "on";
  const keywords = keywordsFromForm(formData);
  const authorDisplayName = `${authorFirst} ${authorLast}`.trim();

  if (!title || title.length < 1) {
    return { ok: false, message: "Book title is required." };
  }
  if (!authorFirst || !authorLast) {
    return { ok: false, message: "Author first and last name are required." };
  }
  if (!authorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
    return { ok: false, message: "A valid author email is required." };
  }
  if (description.length < 40) {
    return {
      ok: false,
      message: "Description must be at least 40 characters.",
    };
  }
  if (!genreId) {
    return { ok: false, message: "Select a category / genre." };
  }
  if (!publishingRights) {
    return { ok: false, message: "Select publishing rights." };
  }
  if (!contentPolicy) {
    return { ok: false, message: "Please accept the content policy." };
  }

  const rightsConfirmed = publishingRights === "own_copyright";

  // No email on this step - confirmation is sent only after final Publish
  // (Pending Review on the dashboard).
  await updateAuthorLeadContact({
    email: authorEmail,
    displayName: authorDisplayName,
  });

  // Primary path: Payload BookSubmissions (MongoDB)
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient();
      const contributors =
        contributorFirst || contributorLast
          ? [
              {
                role: contributorRole || "editor",
                firstName: contributorFirst || undefined,
                lastName: contributorLast || undefined,
              },
            ]
          : [];

      const created = await payload.create({
        collection: "book-submissions",
        data: {
          language,
          title,
          subtitle: subtitle || undefined,
          seriesName: seriesName || undefined,
          editionNumber: edition || undefined,
          author: {
            firstName: authorFirst,
            lastName: authorLast,
            email: authorEmail,
          },
          authorDisplay: authorDisplayName,
          authorEmail,
          contributors,
          description,
          publishingRights:
            publishingRights === "public_domain"
              ? "public_domain"
              : "own_copyright",
          primaryAudience: explicitContent || "no",
          readingAgeMin: ageMin ? Number(ageMin) : undefined,
          readingAgeMax: ageMax ? Number(ageMax) : undefined,
          primarySalesChannel: primaryMarketplace,
          genreId: genreId || undefined,
          keywords: keywords.map((value) => ({ value })),
          status: "pending",
        },
        overrideAccess: true,
      });

      if (intent === "continue") {
        redirect(
          `/dashboard/books/new/content?submission=${encodeURIComponent(String(created.id))}`
        );
      }

      return {
        ok: true,
        message:
          "Book details saved. Click Save and Continue for the Content step.",
      };
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "digest" in err &&
        String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
      ) {
        throw err;
      }
      console.warn(
        "[publish-details][payload]",
        err instanceof Error ? err.message : err
      );
      return {
        ok: false,
        message:
          err instanceof Error
            ? err.message
            : "Could not save submission to Payload. Check MongoDB / PAYLOAD_SECRET.",
      };
    }
  }

  const { usePayloadData: usePayloadForDraft } = await import(
    "@/lib/data/flags"
  );
  const leadOnly =
    (await isLeadOnlySession()) ||
    (!usePayloadForDraft() && !isFirebaseConfigured()) ||
    profile.id === "lead-session";

  if (leadOnly) {
    if (intent === "continue") {
      redirect("/dashboard/books/new/content?lead=1");
    }
    return {
      ok: true,
      message:
        "Draft details saved. Click Save and Continue for the Content step. (Configure DATABASE_URL + PAYLOAD_SECRET, or set USE_PAYLOAD_DATA=true.)",
    };
  }

  try {
    const book = await createBookDraft({
      authorId: profile.id,
      title,
      subtitle: subtitle || null,
      description,
      authorDisplayName,
      genreId: genreId || null,
      language,
    });

    await updateBook(book.id, {
      rights_confirmed:
        rightsConfirmed || publishingRights === "public_domain",
      content_policy_accepted: true,
    });

    if (intent === "continue") {
      redirect(`/dashboard/books/${book.id}/content`);
    }

    redirect(`/dashboard/books/${book.id}`);
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    console.warn(
      "[publish-details]",
      err instanceof Error ? err.message : err
    );
    if (intent === "continue") {
      redirect("/dashboard/books/new/content?lead=1");
    }
    return {
      ok: false,
      message:
        err instanceof Error
          ? err.message
          : "Could not save draft. Check Firebase config.",
    };
  }
}

/**
 * KDP-style Book Content step - manuscript/cover/avatar (no email; email on final Publish only).
 */
export async function savePublishContentAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books/new/content");
  const intent = String(formData.get("intent") || "draft") as "draft" | "continue";
  const bookId = String(formData.get("book_id") || "").trim();
  const submissionId = String(formData.get("submission_id") || "").trim();
  const bookTitle = String(formData.get("book_title") || "Untitled").trim();

  const manuscript = formData.get("manuscript");
  const cover = formData.get("cover");
  const avatar = formData.get("avatar");
  const manuscriptFile =
    manuscript && typeof manuscript !== "string" && manuscript.size > 0
      ? manuscript
      : null;
  const coverFile =
    cover && typeof cover !== "string" && cover.size > 0 ? cover : null;
  const avatarFile =
    avatar && typeof avatar !== "string" && avatar.size > 0 ? avatar : null;

  // Payload: attach cover + avatar to Book Submission (shown after admin approve)
  if (
    isPayloadConfigured() &&
    (coverFile || avatarFile) &&
    (submissionId || profile.email)
  ) {
    try {
      const payload = await getPayloadClient();

      let targetSubmissionId = submissionId;
      if (!targetSubmissionId && profile.email) {
        const found = await payload.find({
          collection: "book-submissions",
          where: {
            and: [
              { "author.email": { equals: profile.email } },
              { status: { in: ["pending", "under_review", "changes_requested"] } },
            ],
          },
          sort: "-createdAt",
          limit: 1,
          overrideAccess: true,
        });
        targetSubmissionId = found.docs[0] ? String(found.docs[0].id) : "";
      }

      const patch: Record<string, string | number> = {};

      const uploadMedia = async (
        file: File,
        alt: string,
        fallbackName: string
      ) => {
        const bytes = Buffer.from(await file.arrayBuffer());
        return payload.create({
          collection: "media",
          data: { alt },
          file: {
            data: bytes,
            mimetype: file.type || "image/jpeg",
            name: file.name.replace(/[^a-zA-Z0-9._-]/g, "_") || fallbackName,
            size: bytes.length,
          },
          overrideAccess: true,
        });
      };

      // Upload cover + avatar in parallel (image resize is the slow part)
      const [coverMedia, avatarMedia] = await Promise.all([
        coverFile
          ? uploadMedia(coverFile, `${bookTitle} cover`, "cover.jpg")
          : Promise.resolve(null),
        avatarFile
          ? uploadMedia(
              avatarFile,
              `${profile.display_name || "Author"} profile picture`,
              "avatar.jpg"
            )
          : Promise.resolve(null),
      ]);
      if (coverMedia) patch.cover = coverMedia.id;
      if (avatarMedia) patch.avatar = avatarMedia.id;

      if (targetSubmissionId && Object.keys(patch).length) {
        await payload.update({
          collection: "book-submissions",
          id: targetSubmissionId,
          data: patch,
          overrideAccess: true,
          context: { skipApproveHook: true },
        });
      }
    } catch (err) {
      console.warn(
        "[publish-content][payload-media]",
        err instanceof Error ? err.message : err
      );
      return {
        ok: false,
        message:
          err instanceof Error
            ? err.message
            : "Could not upload images to Payload media.",
      };
    }
  }

  const { usePayloadData: usePayloadDataContent } = await import(
    "@/lib/data/flags"
  );
  if (
    bookId &&
    profile.id !== "lead-session" &&
    (usePayloadDataContent() || isFirebaseConfigured())
  ) {
    try {
      const patch: Record<string, unknown> = {};
      if (coverFile) {
        patch.cover_path = await uploadAuthorFile({
          authorId: profile.id,
          bookId,
          kind: "cover",
          file: coverFile,
        });
      }
      if (manuscriptFile) {
        patch.manuscript_path = await uploadAuthorFile({
          authorId: profile.id,
          bookId,
          kind: "manuscript",
          file: manuscriptFile,
        });
        patch.manuscript_filename = manuscriptFile.name.replace(
          /[^a-zA-Z0-9._-]/g,
          "_"
        );
        patch.manuscript_mime = manuscriptFile.type;
        patch.manuscript_size_bytes = manuscriptFile.size;
      }
      if (Object.keys(patch).length) {
        await updateBook(bookId, patch as Parameters<typeof updateBook>[1]);
      }
    } catch (err) {
      console.warn(
        "[publish-content] storage upload:",
        err instanceof Error ? err.message : err
      );
    }
  }

  if (intent === "continue") {
    if (bookId) {
      redirect(`/dashboard/books/${bookId}`);
    }
    redirect("/dashboard/books/new/sales");
  }

  const savedBits = [
    coverFile ? "cover" : null,
    avatarFile ? "profile picture" : null,
    manuscriptFile ? "manuscript" : null,
  ].filter(Boolean);

  return {
    ok: true,
    message: savedBits.length
      ? `${savedBits.join(", ")} saved. Continue to Sales Links when ready.`
      : "Content step saved. Continue to Sales Links when ready.",
  };
}

/**
 * Step 3 - Pricing / sales links / publish request (no platform checkout or royalty cut).
 */
export async function savePublishPricingAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books/new/sales");
  const intent = String(formData.get("intent") || "draft") as "draft" | "publish";
  const bookId = String(formData.get("book_id") || "").trim();
  const bookTitle = String(formData.get("book_title") || "Untitled").trim();
  const catalogEnroll = formData.get("catalog_enroll") === "on";
  const primaryMarketplace = String(
    formData.get("primary_marketplace") || "author_website"
  );
  const hasAuthorWebsite = formData.get("has_author_website") !== "no";
  const linkAuthor = hasAuthorWebsite
    ? String(formData.get("link_author_website") || "").trim()
    : "";
  const linkAmazon = String(formData.get("link_amazon") || "").trim();
  const linkOther = String(formData.get("link_other") || "").trim();
  const termsAccepted = formData.get("terms_accepted") === "on";

  if (intent === "publish" && !termsAccepted) {
    return {
      ok: false,
      message: "Please accept the Terms & Conditions before publishing.",
    };
  }

  if (
    intent === "publish" &&
    !linkAuthor &&
    !linkAmazon &&
    !linkOther
  ) {
    return {
      ok: false,
      message:
        "Add at least one purchase link (author website, Amazon, or other) before publishing.",
    };
  }

  for (const url of [linkAuthor, linkAmazon, linkOther]) {
    if (!url) continue;
    try {
      const u = new URL(url);
      if (u.protocol !== "https:") {
        return { ok: false, message: "Purchase links must use https://" };
      }
    } catch {
      return { ok: false, message: `Invalid URL: ${url}` };
    }
  }

  // Persist sales links + pending status (Payload when USE_PAYLOAD_DATA, else Firestore)
  const { usePayloadData } = await import("@/lib/data/flags");
  if (
    bookId &&
    profile.id !== "lead-session" &&
    (usePayloadData() || isFirebaseConfigured())
  ) {
    try {
      const linkRows = [];
      const selectAll = primaryMarketplace === "all";
      if (linkAuthor) {
        linkRows.push({
          link_type: "author_website" as const,
          label: "Author Website",
          url: linkAuthor,
          is_primary:
            selectAll || primaryMarketplace === "author_website",
          is_active: true,
          display_order: 0,
        });
      }
      if (linkAmazon) {
        linkRows.push({
          link_type: "amazon" as const,
          label: "Amazon",
          url: linkAmazon,
          is_primary:
            selectAll || primaryMarketplace.startsWith("amazon"),
          is_active: true,
          display_order: 1,
        });
      }
      if (linkOther) {
        linkRows.push({
          link_type: "other" as const,
          label: "Other retailer",
          url: linkOther,
          is_primary: selectAll || primaryMarketplace === "other",
          is_active: true,
          display_order: 2,
        });
      }

      if (linkRows.length) await setSalesLinks(bookId, linkRows);

      if (intent === "publish") {
        await updateBook(bookId, {
          status: "pending_review",
          submitted_at: new Date().toISOString(),
          rights_confirmed: true,
          content_policy_accepted: true,
          is_public: catalogEnroll,
        });
      }
    } catch (err) {
      console.warn(
        "[publish-pricing] db:",
        err instanceof Error ? err.message : err
      );
    }
  }

  // Draft save: no email
  if (intent !== "publish") {
    return {
      ok: true,
      message: "Draft sales/pricing saved. Publish when you are ready.",
    };
  }

  // Final step: mark Pending Review, then redirect immediately.
  // Emails run after the response so Publish is not blocked by Resend.
  await recordLeadPublishSubmission(bookTitle);

  const authorEmail =
    profile.email && !profile.email.endsWith("@authorspilot.guest")
      ? profile.email
      : null;
  const title = bookTitle || "Your book";
  const authorName = profile.display_name || authorEmail || "Author";
  const notifyBookId = bookId || "submission";

  after(async () => {
    await Promise.allSettled([
      notifyAdminNewSubmission({
        title,
        authorName,
        bookId: notifyBookId,
      }),
      authorEmail
        ? notifyAuthorSubmissionReceived({ email: authorEmail, title })
        : Promise.resolve(),
    ]);
  });

  redirect("/dashboard/books?submitted=1");
}
