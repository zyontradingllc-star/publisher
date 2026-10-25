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
  title: "Free Author Page & Book Link to Sell Your Book | Authors Pilot",
  description:
    "List your book on Authors Pilot, get your own author page and a shareable link, and send readers to Amazon or your website. Keep 100% of your sales.",
  path: "/publish/",
});

export default async function PublishLandingPage() {
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
