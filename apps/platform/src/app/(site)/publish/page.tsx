import type { Metadata } from "next";
import { PublishLanding } from "@/components/PublishLanding";
import { getPublicAuthors, getPublishedBooks } from "@/lib/books";

export const metadata: Metadata = {
  title: "Publish Your Book",
  description:
    "Publish book listings on Authors Pilot, keep 100% of your earnings, and send readers to your own sales channels.",
};

export default async function PublishLandingPage() {
  const [{ books, count }, { authors }] = await Promise.all([
    getPublishedBooks({ pageSize: 8, sort: "newest" }),
    getPublicAuthors({ pageSize: 6 }),
  ]);

  return (
    <PublishLanding books={books} authors={authors} publishedCount={count} />
  );
}
