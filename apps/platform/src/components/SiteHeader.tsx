import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MARKETING_URL } from "@/lib/utils";
import type { Profile } from "@/types/database";

export function SiteHeader({ profile }: { profile?: Profile | null }) {
  const loggedIn = Boolean(profile && profile.id !== "lead-session");

  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-5 sm:gap-8">
          <Link
            href="/"
            className="relative block h-12 w-[52px] shrink-0 sm:h-14 sm:w-[60px]"
            aria-label="Authors Pilot home"
          >
            <Image
              src="/logo-authors-pilot.webp"
              alt="Authors Pilot"
              width={400}
              height={400}
              className="h-full w-full object-contain object-left"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-semibold text-charcoal md:flex">
            <Link href="/how-publishing-works" className="hover:text-coral">
              How It Works
            </Link>
            <a
              href={MARKETING_URL}
              className="hover:text-coral"
              target="_blank"
              rel="noopener noreferrer"
            >
              Marketing Site
            </a>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {loggedIn ? (
            <>
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
            </>
          ) : (
            <div className="flex flex-col items-end gap-1">
              <Button href="/signup" className="!px-5 !py-2 text-xs">
                Create account
              </Button>
              <p className="text-xs text-ink sm:text-sm">
                Have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-coral underline underline-offset-2 hover:text-coral-deep"
                >
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
