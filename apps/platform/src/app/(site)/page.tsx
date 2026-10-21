import { PublishLanding } from "@/components/PublishLanding";
import { getPublicAuthors, getPublishedBooks } from "@/lib/books";

export default async function HomePage() {
  const [{ books, count }, { authors }] = await Promise.all([
    getPublishedBooks({ pageSize: 8, sort: "newest" }),
    getPublicAuthors({ pageSize: 6 }),
  ]);

  return (
    <PublishLanding books={books} authors={authors} publishedCount={count} />
  );
}
