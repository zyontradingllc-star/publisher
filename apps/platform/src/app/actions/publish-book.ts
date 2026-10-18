"use server";

import { redirect } from "next/navigation";
import { isLeadOnlySession, requireProfile } from "@/lib/auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import {
  createBookDraft,
  setSalesLinks,
  updateBook,
  uploadAuthorFile,
} from "@/lib/firebase/books";
import { dropInfoToInbox } from "@/lib/notify-inbox";
import { notifyAuthorSubmissionReceived } from "@/lib/email";
import { recordLeadPublishSubmission } from "@/lib/lead-session";
import { slugify } from "@/lib/utils";
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
 * KDP-style Book Details step — saves draft (DB or inbox) then optionally continues.
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
  const slugInput = String(formData.get("slug") || title);

  if (!title || title.length < 1) {
    return { ok: false, message: "Book title is required." };
  }
  if (!authorFirst || !authorLast) {
    return { ok: false, message: "Author first and last name are required." };
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

  const detailLines = [
    "Publish Book — Details step (Authors Pilot)",
    "",
    `Author account: ${profile.display_name ?? ""} <${profile.email ?? ""}>`,
    `Title: ${title}`,
    `Subtitle: ${subtitle || "—"}`,
    `Slug: ${slugify(slugInput)}`,
    `Language: ${language}`,
    `Series: ${seriesName || "—"}`,
    `Edition: ${edition || "—"}`,
    `Author: ${authorDisplayName}`,
    `Contributor: ${
      contributorFirst || contributorLast
        ? `${contributorRole} — ${contributorFirst} ${contributorLast}`.trim()
        : "—"
    }`,
    `Publishing rights: ${publishingRights}`,
    `Explicit content: ${explicitContent}`,
    `Reading age: ${ageMin || "—"} – ${ageMax || "—"}`,
    `Primary sales channel: ${primaryMarketplace}`,
    `Category / genre id: ${genreId}`,
    `Keywords: ${keywords.length ? keywords.join("; ") : "—"}`,
    "",
    "Description:",
    description,
    "",
    `Submitted at: ${new Date().toISOString()}`,
    `Intent: ${intent}`,
  ];

  // Always notify inbox
  const inbox = await dropInfoToInbox({
    subject: `Publish Book details — ${title}`,
    lines: detailLines,
  });

  const leadOnly =
    (await isLeadOnlySession()) ||
    !isFirebaseConfigured() ||
    profile.id === "lead-session";

  if (leadOnly) {
    if (!inbox.ok) {
      return {
        ok: false,
        message:
          inbox.error ||
          "Could not send details to no-reply@authorspilot.com. Try again.",
      };
    }
    if (intent === "continue") {
      redirect("/dashboard/books/new/content?lead=1");
    }
    return {
      ok: true,
      message:
        "Draft details sent to no-reply@authorspilot.com. Click Save and Continue for the Content step.",
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
 * KDP-style Book Content step — manuscript/cover metadata + disclosures → inbox / storage.
 */
export async function savePublishContentAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books/new/content");
  const intent = String(formData.get("intent") || "draft") as "draft" | "continue";
  const bookId = String(formData.get("book_id") || "").trim();
  const bookTitle = String(formData.get("book_title") || "Untitled").trim();
  const drm = String(formData.get("drm") || "no");
  const aiUsed = String(formData.get("ai_used") || "no");
  const isbn = String(formData.get("isbn") || "").trim();
  const publisher = String(formData.get("publisher") || "").trim();
  const imageAccessibility = String(
    formData.get("image_accessibility") || "none"
  );
  const coverSource = String(formData.get("cover_source") || "upload");

  const manuscript = formData.get("manuscript");
  const cover = formData.get("cover");
  const manuscriptFile =
    manuscript && typeof manuscript !== "string" && manuscript.size > 0
      ? manuscript
      : null;
  const coverFile =
    cover && typeof cover !== "string" && cover.size > 0 ? cover : null;

  const lines = [
    "Publish Book — Content step (Authors Pilot)",
    "",
    `Author: ${profile.display_name ?? ""} <${profile.email ?? ""}>`,
    `Book title: ${bookTitle}`,
    `Book id: ${bookId || "(lead / not saved to DB yet)"}`,
    `Manuscript file: ${manuscriptFile?.name ?? "—"} (${manuscriptFile ? `${Math.round(manuscriptFile.size / 1024)} KB` : "n/a"})`,
    `Cover file: ${coverFile?.name ?? "—"} (${coverFile ? `${Math.round(coverFile.size / 1024)} KB` : "n/a"})`,
    `Cover source: ${coverSource}`,
    `DRM preference: ${drm}`,
    `AI tools used: ${aiUsed}`,
    `ISBN: ${isbn || "—"}`,
    `Publisher: ${publisher || "—"}`,
    `Image accessibility: ${imageAccessibility}`,
    "",
    `Submitted at: ${new Date().toISOString()}`,
    `Intent: ${intent}`,
    "",
    "Note: Binary files are uploaded to Firebase Storage when configured;",
    "otherwise this email records the author's content-step answers and file names.",
  ];

  const inbox = await dropInfoToInbox({
    subject: `Publish Book content — ${bookTitle}`,
    lines,
  });

  if (bookId && isFirebaseConfigured() && profile.id !== "lead-session") {
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
        await updateBook(bookId, patch);
      }
    } catch (err) {
      console.warn(
        "[publish-content] storage upload:",
        err instanceof Error ? err.message : err
      );
    }
  }

  if (!inbox.ok && (await isLeadOnlySession())) {
    return {
      ok: false,
      message:
        inbox.error ||
        "Could not send content step to no-reply@authorspilot.com.",
    };
  }

  if (intent === "continue") {
    if (bookId) {
      redirect(`/dashboard/books/${bookId}`);
    }
    redirect("/dashboard/books/new/sales");
  }

  return {
    ok: true,
    message: inbox.ok
      ? "Content step saved — details sent to no-reply@authorspilot.com."
      : "Content answers saved locally for this session. Inbox notify skipped or failed.",
  };
}

/**
 * Step 3 — Pricing / sales links / publish request (no platform checkout or royalty cut).
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
  const territories = String(formData.get("territories") || "worldwide");
  const primaryMarketplace = String(
    formData.get("primary_marketplace") || "author_website"
  );
  const linkAuthor = String(formData.get("link_author_website") || "").trim();
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
      if (u.protocol !== "http:" && u.protocol !== "https:") {
        return { ok: false, message: "Purchase links must use http:// or https://" };
      }
    } catch {
      return { ok: false, message: `Invalid URL: ${url}` };
    }
  }

  const lines = [
    "Publish Book — Pricing / Sales step (Authors Pilot)",
    "",
    `Author: ${profile.display_name ?? ""} <${profile.email ?? ""}>`,
    `Book title: ${bookTitle}`,
    `Book id: ${bookId || "(lead / not in DB yet)"}`,
    `Catalog enrollment: ${catalogEnroll ? "yes" : "no"}`,
    `Territories: ${territories}`,
    `Primary channel: ${primaryMarketplace}`,
    `Author website link: ${linkAuthor || "—"}`,
    `Amazon link: ${linkAmazon || "—"}`,
    `Other link: ${linkOther || "—"}`,
    `Terms accepted: ${termsAccepted ? "yes" : "no"}`,
    "",
    "NOTE: Authors Pilot takes 0% royalty. No checkout on platform.",
    `Submitted at: ${new Date().toISOString()}`,
    `Intent: ${intent}`,
  ];

  const inbox = await dropInfoToInbox({
    subject:
      intent === "publish"
        ? `Publish request — ${bookTitle}`
        : `Sales/pricing draft — ${bookTitle}`,
    lines,
  });

  // Persist sales links + pending status in Firestore when configured
  if (bookId && isFirebaseConfigured() && profile.id !== "lead-session") {
    try {
      const linkRows = [];
      if (linkAuthor) {
        linkRows.push({
          link_type: "author_website" as const,
          label: "Author Website",
          url: linkAuthor,
          is_primary: primaryMarketplace === "author_website",
          is_active: true,
          display_order: 0,
        });
      }
      if (linkAmazon) {
        linkRows.push({
          link_type: "amazon" as const,
          label: "Amazon",
          url: linkAmazon,
          is_primary: primaryMarketplace.startsWith("amazon"),
          is_active: true,
          display_order: 1,
        });
      }
      if (linkOther) {
        linkRows.push({
          link_type: "other" as const,
          label: "Other retailer",
          url: linkOther,
          is_primary: primaryMarketplace === "other",
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

  if (!inbox.ok && intent === "publish") {
    return {
      ok: false,
      message:
        inbox.error ||
        "Could not send publish request to no-reply@authorspilot.com.",
    };
  }

  if (intent === "publish") {
    await recordLeadPublishSubmission(bookTitle);

    const authorEmail = profile.email;
    if (authorEmail) {
      const mail = await notifyAuthorSubmissionReceived({
        email: authorEmail,
        title: bookTitle || "Your book",
      });
      // Fallback confirmation via FormSubmit when Resend is unset
      if (mail.skipped) {
        try {
          await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(authorEmail)}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              _subject: `Authors Pilot — request received: ${bookTitle}`,
              from: "no-reply@authorspilot.com",
              message: [
                "Your request has been submitted successfully.",
                "",
                `Book: ${bookTitle}`,
                "Status: Pending Review (1).",
                "After under review, your book will be listed (Published).",
                "You will receive an automated email from no-reply@authorspilot.com when the status changes.",
                "",
                "— Authors Pilot",
              ].join("\n"),
            }),
            signal: AbortSignal.timeout(3000),
          });
        } catch {
          // non-blocking
        }
      }
    }

    redirect("/dashboard?submitted=1");
  }

  return {
    ok: true,
    message: inbox.ok
      ? "Draft sales/pricing saved — emailed to no-reply@authorspilot.com."
      : "Draft saved for this session.",
  };
}
