import Image from "next/image";
import Link from "next/link";
import { avatarUrl, bannerUrl, platformPublicPath } from "@/lib/utils";

type Props = {
  name: string;
  avatarPath?: string | null;
  bannerPath?: string | null;
  authorHref?: string | null;
  meta?: string | null;
};

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "AP";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

/**
 * Public share header — same banner + overlapping avatar look as dashboard,
 * without edit controls.
 */
export function PublicShareHeader({
  name,
  avatarPath,
  bannerPath,
  authorHref,
  meta,
}: Props) {
  const banner = bannerUrl(bannerPath);
  const avatar = avatarUrl(avatarPath);
  const initials = initialsFrom(name);

  const avatarEl = (
    <span className="inline-flex rounded-full bg-white p-[5px] shadow-soft">
      <span className="relative block h-[96px] w-[96px] overflow-hidden rounded-full bg-[#1A1A1A] sm:h-[112px] sm:w-[112px]">
        {avatar ? (
          <Image
            src={platformPublicPath(avatar)}
            alt=""
            fill
            className="object-cover"
            sizes="112px"
            priority
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-display text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {initials}
          </span>
        )}
      </span>
    </span>
  );

  return (
    <section className="overflow-hidden border border-sand bg-white shadow-soft">
      <div className="relative h-[168px] w-full overflow-hidden bg-gradient-to-br from-[#F6EBD8] via-[#F3E4C8] to-[#E8D4A8] sm:h-[200px]">
        {banner ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={platformPublicPath(banner)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="relative px-4 pb-5 sm:px-6">
        <div className="flex min-w-0 items-end gap-4 sm:gap-5">
          <div className="-mt-12 shrink-0 sm:-mt-14">
            {authorHref ? (
              <Link
                href={authorHref}
                className="block transition hover:brightness-95"
                aria-label={`${name} profile`}
              >
                {avatarEl}
              </Link>
            ) : (
              avatarEl
            )}
          </div>
          <div className="min-w-0 flex-1 pb-1 pt-2 sm:pt-3">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[30px]">
              {authorHref ? (
                <Link href={authorHref} className="hover:underline">
                  {name}
                </Link>
              ) : (
                name
              )}
            </h1>
            {meta ? (
              <p className="mt-1 text-sm text-forest-muted">{meta}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
