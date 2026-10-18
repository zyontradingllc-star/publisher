import { createClient } from "@/lib/supabase/server";

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
 */
export async function getAuthorActivity(
  authorId: string
): Promise<AuthorActivitySummary> {
  const supabase = await createClient();

  const { data: books } = await supabase
    .from("books")
    .select("id, title, slug")
    .eq("author_id", authorId)
    .order("updated_at", { ascending: false })
    .limit(50);

  const bookIds = (books ?? []).map((b) => b.id);

  let bookViews = 0;
  let outboundClicks = 0;
  const perBook = new Map<string, { views: number; outboundClicks: number }>();

  for (const id of bookIds) {
    perBook.set(id, { views: 0, outboundClicks: 0 });
  }

  if (bookIds.length > 0) {
    const { count: viewsCount } = await supabase
      .from("book_views")
      .select("id", { count: "exact", head: true })
      .in("book_id", bookIds);
    bookViews = viewsCount ?? 0;

    const { data: viewRows } = await supabase
      .from("book_views")
      .select("book_id")
      .in("book_id", bookIds)
      .limit(5000);

    for (const row of viewRows ?? []) {
      const entry = perBook.get(row.book_id);
      if (entry) entry.views += 1;
    }

    const { data: clickRows } = await supabase
      .from("outbound_clicks")
      .select("book_id")
      .in("book_id", bookIds)
      .limit(5000);

    outboundClicks = clickRows?.length ?? 0;
    for (const row of clickRows ?? []) {
      const entry = perBook.get(row.book_id);
      if (entry) entry.outboundClicks += 1;
    }

    // Prefer sales_links.click_count sum when available (capped analytics)
    const { data: links } = await supabase
      .from("sales_links")
      .select("book_id, click_count")
      .in("book_id", bookIds);

    if (links && links.length > 0) {
      outboundClicks = links.reduce((sum, l) => sum + (l.click_count ?? 0), 0);
      for (const id of bookIds) {
        const entry = perBook.get(id);
        if (entry) {
          entry.outboundClicks = links
            .filter((l) => l.book_id === id)
            .reduce((s, l) => s + (l.click_count ?? 0), 0);
        }
      }
    }
  }

  const { count: profileViews } = await supabase
    .from("author_profile_views")
    .select("id", { count: "exact", head: true })
    .eq("profile_id", authorId);

  const { count: ctaClicks } = await supabase
    .from("cta_clicks")
    .select("id", { count: "exact", head: true })
    .eq("profile_id", authorId)
    .eq("cta_kind", "author_website_design");

  return {
    bookViews,
    profileViews: profileViews ?? 0,
    outboundClicks,
    websiteDesignCtaClicks: ctaClicks ?? 0,
    books: (books ?? []).map((b) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      views: perBook.get(b.id)?.views ?? 0,
      outboundClicks: perBook.get(b.id)?.outboundClicks ?? 0,
    })),
  };
}
