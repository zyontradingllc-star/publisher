import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { setAuthorPublicAction } from "@/app/actions/admin";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin · Authors" };

export default async function AdminAuthorsPage() {
  async function toggleAuthorPublic(formData: FormData) {
    "use server";
    await setAuthorPublicAction(formData);
  }

  await requireAdmin();
  const supabase = await createClient();

  const { data: authors } = await supabase
    .from("profiles")
    .select("id, display_name, email, slug, role, is_public, profile_complete, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-section">Authors</h1>
        <p className="mt-2 text-forest-muted">
          Manage public author profile visibility. Book earnings stay with authors
          - no royalty ledger here.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-sand bg-ivory/80 text-xs uppercase tracking-wide text-forest-muted">
            <tr>
              <th className="px-4 py-3 font-bold">Name</th>
              <th className="hidden px-4 py-3 font-bold md:table-cell">Email</th>
              <th className="px-4 py-3 font-bold">Public</th>
              <th className="hidden px-4 py-3 font-bold sm:table-cell">Joined</th>
              <th className="px-4 py-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {(authors ?? []).map((author) => (
              <tr key={author.id}>
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">
                    {author.display_name ?? "-"}
                  </p>
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
                  {author.role === "admin" ? (
                    <span className="ml-2 text-xs font-bold uppercase text-coral">
                      Admin
                    </span>
                  ) : null}
                </td>
                <td className="hidden px-4 py-3 text-forest-muted md:table-cell">
                  {author.email ?? "-"}
                </td>
                <td className="px-4 py-3">
                  {author.is_public ? (
                    <span className="text-green-800 font-semibold">Yes</span>
                  ) : (
                    <span className="text-forest-muted">Hidden</span>
                  )}
                </td>
                <td className="hidden px-4 py-3 text-forest-muted sm:table-cell">
                  {formatDate(author.created_at)}
                </td>
                <td className="px-4 py-3">
                  <form action={toggleAuthorPublic} className="inline">
                    <input type="hidden" name="author_id" value={author.id} />
                    <input
                      type="hidden"
                      name="is_public"
                      value={author.is_public ? "false" : "true"}
                    />
                    <Button type="submit" variant="ghost" className="px-4 py-2 text-xs">
                      {author.is_public ? "Hide profile" : "Make public"}
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
