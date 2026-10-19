import { cookies } from "next/headers";

export const LEAD_COOKIE = "ap_author_lead";

export type AuthorLead = {
  email: string;
  displayName: string;
  createdAt: string;
  /** Books submitted for review (lead mode without DB) */
  pendingCount?: number;
  /** After admin would publish — demo / future count */
  publishedCount?: number;
  lastBookTitle?: string;
};

export async function setAuthorLeadCookie(lead: AuthorLead) {
  const store = await cookies();
  store.set(LEAD_COOKIE, JSON.stringify(lead), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getAuthorLead(): Promise<AuthorLead | null> {
  const store = await cookies();
  const raw = store.get(LEAD_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AuthorLead;
    if (!parsed.email || !parsed.displayName) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function clearAuthorLeadCookie() {
  const store = await cookies();
  store.delete(LEAD_COOKIE);
}

/** Start guest publish (no signup) so /dashboard/books/new is reachable. */
export async function ensureGuestPublishLead() {
  const existing = await getAuthorLead();
  if (existing) return existing;
  const lead: AuthorLead = {
    email: "pending@authorspilot.guest",
    displayName: "Author",
    createdAt: new Date().toISOString(),
  };
  await setAuthorLeadCookie(lead);
  return lead;
}

/** Update lead contact details from the book details form. */
export async function updateAuthorLeadContact(input: {
  email: string;
  displayName: string;
}) {
  const existing = await getAuthorLead();
  const next: AuthorLead = {
    email: input.email,
    displayName: input.displayName,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    pendingCount: existing?.pendingCount,
    publishedCount: existing?.publishedCount,
    lastBookTitle: existing?.lastBookTitle,
  };
  await setAuthorLeadCookie(next);
  return next;
}

/** Mark a successful Publish Your Book submission in lead session. */
export async function recordLeadPublishSubmission(bookTitle: string) {
  const existing = await getAuthorLead();
  if (!existing) return null;
  const next: AuthorLead = {
    ...existing,
    pendingCount: (existing.pendingCount ?? 0) + 1,
    lastBookTitle: bookTitle,
  };
  await setAuthorLeadCookie(next);
  return next;
}
