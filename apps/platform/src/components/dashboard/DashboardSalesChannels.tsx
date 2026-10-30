import Image from "next/image";
import Link from "next/link";
import { PLATFORM_LOGO_CHANNELS } from "@/lib/sales-channels";

const FEATURED_IDS = [
  "amazon",
  "barnes_noble",
  "apple_books",
  "kobo",
] as const;

type Props = {
  websiteUrl?: string | null;
  /** Where “Add more” / channel cards should send the author */
  manageHref?: string;
};

/**
 * Profile page strip — same idea as the sales-channels mock:
 * logo cards under Save profile so authors know where readers go.
 */
export function DashboardSalesChannels({
  websiteUrl,
  manageHref = "/dashboard/books/new",
}: Props) {
  const featured = FEATURED_IDS.map((id) =>
    PLATFORM_LOGO_CHANNELS.find((p) => p.id === id)
  ).filter(Boolean) as (typeof PLATFORM_LOGO_CHANNELS)[number][];

  const siteHref =
    websiteUrl && /^https?:\/\//i.test(websiteUrl) ? websiteUrl : manageHref;

  return (
    <section className="border border-sand bg-white p-5 shadow-soft sm:p-6">
      <h2 className="font-display text-xl font-bold text-ink">
        Your Sales Channels
      </h2>
      <p className="mt-1 text-sm text-forest-muted">
        Readers will be redirected to your preferred platforms through your
        unique book link.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {featured.map((channel) => (
          <li key={channel.id}>
            <Link
              href={manageHref}
              className="flex h-full flex-col items-center gap-3 border border-sand bg-ivory/60 px-3 py-5 text-center transition hover:border-coral/40 hover:bg-white"
            >
              <span className="relative flex h-12 w-12 items-center justify-center bg-white shadow-soft">
                <Image
                  src={channel.logo}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <span className="font-display text-sm font-bold text-ink">
                {channel.label}
              </span>
              <span className="text-xs font-semibold text-coral">
                Buy on {channel.label}
              </span>
            </Link>
          </li>
        ))}

        <li>
          <a
            href={siteHref}
            {...(siteHref.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="flex h-full flex-col items-center gap-3 border border-sand bg-ivory/60 px-3 py-5 text-center transition hover:border-coral/40 hover:bg-white"
          >
            <span
              className="flex h-12 w-12 items-center justify-center bg-white text-ink shadow-soft"
              aria-hidden
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9s1.3-6.2 3.8-9z" />
              </svg>
            </span>
            <span className="font-display text-sm font-bold text-ink">
              Your Website
            </span>
            <span className="text-xs font-semibold text-coral">
              Buy on Your Website
            </span>
          </a>
        </li>

        <li>
          <Link
            href={manageHref}
            className="flex h-full flex-col items-center gap-3 border border-dashed border-sand bg-white px-3 py-5 text-center transition hover:border-coral/50"
          >
            <span
              className="flex h-12 w-12 items-center justify-center border border-sand bg-ivory text-2xl font-bold text-ink"
              aria-hidden
            >
              +
            </span>
            <span className="font-display text-sm font-bold text-ink">
              More Platforms
            </span>
            <span className="text-xs font-semibold text-coral">
              Add More Links
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
