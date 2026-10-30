import Link from "next/link";
import { AeoAnswer } from "@/components/seo/AeoAnswer";
import {
  JsonLd,
  breadcrumbListSchema,
  faqPageSchema,
  organizationSchema,
} from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import type { SeoAppPage } from "@/lib/seo-app-pages";
import { APP_ORIGIN } from "@/lib/seo";

type Props = {
  page: SeoAppPage;
  related?: ReadonlyArray<{ href: string; label: string }>;
};

export function SeoAppArticle({ page, related = [] }: Props) {
  const faqs = [
    { question: page.question, answer: page.answer },
    {
      question: "Do authors keep 100% royalties?",
      answer:
        "Yes. Authors Pilot does not take a commission on book sales. Readers purchase on Amazon or your website, and you keep the royalties those channels pay.",
    },
    {
      question: "Is the author page free?",
      answer:
        "During launch, creating a profile and listing eligible books on a free author page has no platform fee. Optional services are priced separately.",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(APP_ORIGIN),
          breadcrumbListSchema(APP_ORIGIN, [
            { name: "Home", path: "/publish/" },
            {
              name: page.kind === "compare" ? "Compare" : page.kind === "bookstore" ? "Bookstore" : "Guides",
              path:
                page.kind === "compare"
                  ? "/compare/indie-author-platforms/"
                  : page.kind === "bookstore"
                    ? "/bookstore/"
                    : "/guides/",
            },
            { name: page.h1, path: page.path },
          ]),
          faqPageSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.h1,
            description: page.description,
            author: { "@type": "Organization", name: "Authors Pilot" },
            publisher: { "@id": `${APP_ORIGIN}/#organization` },
            mainEntityOfPage: `${APP_ORIGIN}${page.path}`,
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".aeo-short-answer", "h1"],
            },
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">
          {page.eyebrow}
        </p>
        <h1 className="mt-3 heading-section">{page.h1}</h1>
        <p className="mt-4 text-charcoal leading-relaxed">{page.description}</p>

        <div className="aeo-short-answer mt-10">
          <AeoAnswer question={page.question} answer={page.answer} />
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold text-ink">
          Key takeaways
        </h2>
        <ul className="mt-4 space-y-3">
          {page.bullets.map((item) => (
            <li key={item} className="card-surface text-sm text-charcoal">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/publish/">Get your free author page</Button>
          <Button href="/how-it-works/" variant="ghost">
            How it works
          </Button>
        </div>

        {related.length > 0 ? (
          <nav className="mt-12 border-t border-sand pt-8">
            <h2 className="font-display text-lg font-bold text-ink">
              Related
            </h2>
            <ul className="mt-3 space-y-2">
              {related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-coral hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </article>
    </>
  );
}
