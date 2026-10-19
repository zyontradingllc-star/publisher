import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MARKETING_HOME_URL, platformPublicPath } from "@/lib/utils";
import type { Profile } from "@/types/database";

export function SiteHeader({ profile }: { profile?: Profile | null }) {
  const loggedIn = Boolean(profile && profile.id !== "lead-session");

  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-5 sm:gap-8">
          <a
            href={MARKETING_HOME_URL}
            className="relative block h-12 w-[52px] shrink-0 sm:h-14 sm:w-[60px]"
            aria-label="Authors Pilot home"
          >
            <Image
              src={platformPublicPath("/logo-authors-pilot.webp")}
              alt="Authors Pilot"
              width={400}
              height={400}
              className="h-full w-full object-contain object-left"
              priority
              unoptimized
            />
          </a>
          <nav className="hidden items-center gap-4 text-sm font-semibold text-charcoal md:flex">
            <Link href="/how-publishing-works" className="hover:text-coral">
              How It Works
            </Link>
            <Link href="/books" className="hover:text-coral">
              Books
            </Link>
            <Link href="/publish" className="hover:text-coral">
              Submit Your Book
            </Link>
          </nav>
        </div>

        {loggedIn ? (
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            {profile?.role === "admin" ? (
              <Link
                href="/admin"
                className="hidden text-sm font-semibold text-charcoal hover:text-coral sm:inline"
              >
                Admin
              </Link>
            ) : null}
            <Button href="/dashboard" variant="ghost" className="!px-4 !py-2 text-xs">
              Dashboard
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
