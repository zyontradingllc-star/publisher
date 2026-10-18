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
