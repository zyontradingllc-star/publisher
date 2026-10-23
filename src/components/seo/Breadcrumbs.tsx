import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { canonicalUrl } from "@/lib/seo";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

function schemaItemUrl(item: BreadcrumbItem): string | undefined {
  // Google expects Home → site root; UI may still link to marketing homeHref.
  if (item.label === "Home") return canonicalUrl("/");
  if (item.href) return canonicalUrl(item.href);
  return undefined;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-charcoal sm:text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span className="text-sand" aria-hidden>
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span className="font-medium text-ink" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition hover:text-[#273E2B]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => {
            const itemUrl = schemaItemUrl(item);
            return {
              "@type": "ListItem",
              position: index + 1,
              name: item.label,
              ...(itemUrl ? { item: itemUrl } : {}),
            };
          }),
        }}
      />
    </>
  );
}
