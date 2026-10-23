import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";

export type AuthorActivitySummary = {
  bookViews: number;
  profileViews: number;
  outboundClicks: number;
  websiteDesignCtaClicks: number;
  books: {
    id: string;
    title: string;
    slug: string;
    views: number;
    outboundClicks: number;
  }[];
};

/**
 * Activity for the signed-in author only.
 * Outbound clicks and views are NOT purchases or revenue.
 * Analytics tables lived in Supabase and were removed — list books from Payload only.
 */
export async function getAuthorActivity(
  authorId: string,
  authorEmail?: string | null
): Promise<AuthorActivitySummary> {
  const empty: AuthorActivitySummary = {
    bookViews: 0,
    profileViews: 0,
    outboundClicks: 0,
    websiteDesignCtaClicks: 0,
    books: [],
  };

  if (!isPayloadConfigured() || !authorEmail) {
    void authorId;
    return empty;
  }

  try {
    const payload = await getPayloadClient();
    const email = authorEmail.trim().toLowerCase();
    const result = await payload.find({
      collection: "book-submissions",
      where: { "author.email": { equals: email } },
      limit: 50,
      sort: "-updatedAt",
      overrideAccess: true,
      depth: 0,
    });

    return {
      ...empty,
      books: result.docs.map((doc) => {
        const d = doc as {
          id: string | number;
          title?: string | null;
          publicSlug?: string | null;
        };
        return {
          id: String(d.id),
          title: d.title || "Untitled",
          slug: d.publicSlug || String(d.id),
          views: 0,
          outboundClicks: 0,
        };
      }),
    };
  } catch {
    return empty;
  }
}
