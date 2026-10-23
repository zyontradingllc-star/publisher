import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin · Authors" };

export default async function AdminAuthorsPage() {
  await requireAdmin();

  const authors: {
    id: string;
    displayName: string;
    email: string;
    slug: string;
    createdAt: string;
  }[] = [];

  if (isPayloadConfigured()) {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "authors",
      limit: 200,
      sort: "-createdAt",
      overrideAccess: true,
      depth: 0,
    });
    for (const doc of result.docs) {
      const a = doc as {
        id: string | number;
        displayName?: string | null;
        email?: string | null;
        slug?: string | null;
        createdAt?: string;
      };
      authors.push({
        id: String(a.id),
        displayName: a.displayName || "-",
        email: a.email || "-",
        slug: a.slug || "",
        createdAt: a.createdAt || new Date().toISOString(),
      });
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-section">Authors</h1>
        <p className="mt-2 text-forest-muted">
          Payload CMS authors. Edit profiles in{" "}
          <Link href="/cms" className="font-semibold text-coral hover:underline">
            /cms
          </Link>
          . Book earnings stay with authors — no royalty ledger here.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-sand bg-ivory/80 text-xs uppercase tracking-wide text-forest-muted">
            <tr>
              <th className="px-4 py-3 font-bold">Name</th>
              <th className="hidden px-4 py-3 font-bold md:table-cell">Email</th>
              <th className="hidden px-4 py-3 font-bold sm:table-cell">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {authors.map((author) => (
              <tr key={author.id}>
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">{author.displayName}</p>
                  {author.slug ? (
                    <Link
                      href={`/authors/${author.slug}`}
                      className="text-xs text-coral hover:underline"
                    >
                      /authors/{author.slug}
                    </Link>
                  ) : (
                    <span className="text-xs text-forest-muted">No slug</span>
                  )}
                </td>
                <td className="hidden px-4 py-3 text-forest-muted md:table-cell">
                  {author.email}
                </td>
                <td className="hidden px-4 py-3 text-forest-muted sm:table-cell">
                  {formatDate(author.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {authors.length === 0 ? (
          <p className="px-4 py-8 text-center text-forest-muted">
            No authors in Payload yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
