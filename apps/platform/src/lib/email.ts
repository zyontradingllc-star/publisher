import { Resend } from "resend";
import { getAppUrl, getEmailFrom } from "@/lib/env";
import { withTimeout } from "@/lib/with-timeout";

const EMAIL_TIMEOUT_MS = 6000;

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
};

export type SendEmailResult = {
  ok: boolean;
  skipped?: boolean;
  error?: string;
};

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && getEmailFrom());
}

/**
 * Send transactional email via Resend.
 * If the provider is not configured, returns `{ ok: true, skipped: true }` —
 * callers must not claim delivery occurred.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (!isEmailConfigured()) {
    console.info(
      "[email] skipped (provider not configured):",
      input.subject,
      "→",
      Array.isArray(input.to) ? input.to.join(",") : input.to
    );
    return { ok: true, skipped: true };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await withTimeout(
      resend.emails.send({
        from: getEmailFrom()!,
        to: input.to,
        subject: input.subject,
        html: input.html,
      }),
      EMAIL_TIMEOUT_MS
    );
    if (error) {
      console.warn("[email] provider error:", error.message);
      return { ok: false, error: error.message };
    }
    console.info("[email] accepted by provider:", input.subject);
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Email send failed";
    console.warn("[email] exception:", message);
    return { ok: false, error: message };
  }
}

function dashboardBooksUrl() {
  return `${getAppUrl()}/dashboard/books`;
}

function adminBookUrl(bookId: string) {
  return `${getAppUrl()}/admin/books/${bookId}`;
}

export async function notifyAuthorSubmissionReceived(opts: {
  email: string;
  title: string;
}) {
  return sendEmail({
    to: opts.email,
    subject: `Authors Pilot — request received: ${opts.title}`,
    html: `
      <p>Hello,</p>
      <p><strong>Request successfully submitted</strong></p>
      <p>Your request has been submitted successfully. Pending Review shows
      <strong>1</strong>. After we finish under review, your book
      <strong>${escapeHtml(opts.title)}</strong> will be listed and Published
      will become <strong>1</strong>.</p>
      <p>You will receive another automated email from
      no-reply@authorspilot.com when the status changes.</p>
      <p><a href="${getAppUrl()}/dashboard">Open your dashboard</a></p>
      <p>— Authors Pilot</p>
    `,
  });
}

export async function notifyAuthorStatusChange(opts: {
  email: string;
  title: string;
  status: "published" | "changes_requested" | "rejected" | "unpublished" | string;
  statusLabel: string;
  note?: string | null;
}) {
  const subjectByStatus: Record<string, string> = {
    published: `Your book is published: ${opts.title}`,
    changes_requested: `Changes requested: ${opts.title}`,
    rejected: `Submission update: ${opts.title}`,
    unpublished: `Listing unpublished: ${opts.title}`,
  };

  return sendEmail({
    to: opts.email,
    subject:
      subjectByStatus[opts.status] ??
      `Authors Pilot: "${opts.title}" is now ${opts.statusLabel}`,
    html: `
      <p>Hello,</p>
      <p>Your book <strong>${escapeHtml(opts.title)}</strong> status is now
      <strong>${escapeHtml(opts.statusLabel)}</strong>.</p>
      ${
        opts.note
          ? `<p><strong>Note from review:</strong> ${escapeHtml(opts.note)}</p>`
          : ""
      }
      <p><a href="${dashboardBooksUrl()}">Open your dashboard</a></p>
      <p>— Authors Pilot</p>
    `,
  });
}

export async function notifyAdminNewSubmission(opts: {
  title: string;
  authorName: string;
  bookId: string;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!adminEmail) {
    console.info("[email] admin notification skipped (ADMIN_NOTIFICATION_EMAIL unset)");
    return { ok: true, skipped: true } satisfies SendEmailResult;
  }

  return sendEmail({
    to: adminEmail,
    subject: `New book submission: ${opts.title}`,
    html: `
      <p>A new book was submitted for review.</p>
      <p><strong>Title:</strong> ${escapeHtml(opts.title)}<br/>
      <strong>Author:</strong> ${escapeHtml(opts.authorName)}</p>
      <p><a href="${adminBookUrl(opts.bookId)}">Review in admin</a></p>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
