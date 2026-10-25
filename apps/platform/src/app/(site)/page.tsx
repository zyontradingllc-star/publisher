import type { Metadata } from "next";
import { PublishLanding } from "@/components/PublishLanding";
import {
  JsonLd,
  faqPageSchema,
  organizationSchema,
  webSiteSchema,
} from "@/components/seo/JsonLd";
import { getPublicAuthors, getPublishedBooks } from "@/lib/books";
import { APP_ORIGIN, buildAppMetadata } from "@/lib/seo";
import { LAUNCH_FAQS } from "@/lib/seo-content";

export const metadata: Metadata = buildAppMetadata({
  title:
    "Free Author Page with Amazon Link | Keep 100% Royalties | Authors Pilot",
  description:
    "Free author page with Amazon link and one link to sell your book everywhere. Keep 100% book royalties—no commission. A free Booklinker / Books2Read alternative with click tracking.",
  path: "/",
});

export default async function HomePage() {
  const [{ books, count }, { authors }] = await Promise.all([
    getPublishedBooks({ pageSize: 8, sort: "newest" }),
    getPublicAuthors({ pageSize: 6 }),
  ]);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(APP_ORIGIN),
          webSiteSchema(APP_ORIGIN),
          faqPageSchema([...LAUNCH_FAQS]),
        ]}
      />
      <PublishLanding books={books} authors={authors} publishedCount={count} />
    </>
  );
}
