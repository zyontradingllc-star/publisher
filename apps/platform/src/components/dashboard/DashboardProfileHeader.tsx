"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  uploadAvatarAction,
  uploadBannerAction,
} from "@/app/actions/profile";
import type { ActionState } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { DASHBOARD_TABS } from "@/components/dashboard/DashboardTabs";
import { avatarUrl, bannerUrl, platformPublicPath } from "@/lib/utils";
import type { Profile } from "@/types/database";

const initialState: ActionState = { ok: false };

type SocialItem = {
  label: string;
  href: string;
  color: string;
};

type Props = {
  profile: Profile;
  booksCount?: number;
  publishedCount?: number;
  draftTitle?: string | null;
};

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "AP";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function collectSocials(profile: Profile): SocialItem[] {
  const items: SocialItem[] = [];
  if (profile.social_facebook) {
    items.push({
      label: "Facebook",
      href: profile.social_facebook,
      color: "bg-[#1877F2]",
    });
  }
  if (profile.social_instagram) {
    items.push({
      label: "Instagram",
      href: profile.social_instagram,
      color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    });
  }
  if (profile.social_twitter) {
    items.push({
      label: "X",
      href: profile.social_twitter,
      color: "bg-[#111111]",
    });
  }
  if (profile.social_linkedin) {
    items.push({
      label: "LinkedIn",
      href: profile.social_linkedin,
      color: "bg-[#0A66C2]",
    });
  }
  const tiktok = profile.social_tiktok || profile.social_whatsapp;
  if (tiktok) {
    items.push({ label: "TikTok", href: tiktok, color: "bg-[#010101]" });
  }
  if (profile.social_reddit) {
    items.push({
      label: "Reddit",
      href: profile.social_reddit,
      color: "bg-[#FF4500]",
    });
  }
  return items;
}

/** Dashboard home header — cream banner, circular avatar, social dots, tabs. */
export function DashboardProfileHeader({
  profile,
  booksCount = 0,
  publishedCount = 0,
  draftTitle = null,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [avatarState, avatarAction, avatarPending] = useActionState(
    uploadAvatarAction,
    initialState
  );
  const [bannerState, bannerAction, bannerPending] = useActionState(
    uploadBannerAction,
    initialState
  );

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    avatarUrl(profile.avatar_path)
  );
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    bannerUrl(profile.banner_path)
  );

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarFormRef = useRef<HTMLFormElement>(null);
  const bannerFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setAvatarPreview(avatarUrl(profile.avatar_path));
  }, [profile.avatar_path]);

  useEffect(() => {
    setBannerPreview(bannerUrl(profile.banner_path));
  }, [profile.banner_path]);

  useEffect(() => {
    if (!avatarState.ok) return;
    // Prefer server URL (already absolute + cache-busted). Keep blob if upload
    // succeeded but URL missing so the UI never flashes empty.
    if (avatarState.url) {
      const next = platformPublicPath(avatarState.url);
      setAvatarPreview((prev) => {
        if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
        return next;
      });
    }
    router.refresh();
  }, [avatarState, router]);

  useEffect(() => {
    if (!bannerState.ok) return;
    if (bannerState.url) {
      const next = platformPublicPath(bannerState.url);
      setBannerPreview((prev) => {
        if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
        return next;
      });
    }
    router.refresh();
  }, [bannerState, router]);

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  useEffect(() => {
    return () => {
      if (bannerPreview?.startsWith("blob:")) URL.revokeObjectURL(bannerPreview);
    };
  }, [bannerPreview]);

  const name = profile.display_name || "Author";
  const initials = initialsFrom(name);
  const socials = collectSocials(profile);
  const visibleSocials = socials.slice(0, 4);
  const extraSocials = Math.max(0, socials.length - 4);
  const error =
    (!avatarState.ok && avatarState.message) ||
    (!bannerState.ok && bannerState.message) ||
    null;

  const metaParts = [
    "Author",
    `${publishedCount} Book${publishedCount === 1 ? "" : "s"} Published`,
    booksCount > publishedCount
      ? `${booksCount - publishedCount} In Progress`
      : null,
  ].filter(Boolean);

  return (
    <section className="overflow-hidden rounded-none border border-sand bg-white shadow-soft">
      {/* Cream cover */}
      <div className="relative h-[168px] w-full overflow-hidden bg-gradient-to-br from-[#F6EBD8] via-[#F3E4C8] to-[#E8D4A8] sm:h-[200px]">
        {bannerPreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bannerPreview}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            {/* Bookshelf card */}
            <div
              className="absolute left-5 top-5 hidden rounded-none bg-[#3D2B1F] p-3 shadow-soft sm:block"
              aria-hidden
            >
              <div className="flex gap-1.5">
                {["#F2C14D", "#E8A0BF", "#A7C4AB", "#7EB8DA", "#E08A2A"].map(
                  (c) => (
                    <span
                      key={c}
                      className="block h-14 w-2.5 rounded-sm"
                      style={{ backgroundColor: c }}
                    />
                  )
                )}
              </div>
              <div className="mt-2 flex gap-1.5">
                {["#C4B5A0", "#F2C14D", "#A7C4AB", "#E8A0BF"].map((c) => (
                  <span
                    key={c}
                    className="block h-10 w-2.5 rounded-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Draft focus card */}
            <div
              className="absolute right-5 top-5 hidden w-[200px] rounded-none border border-sand/60 bg-white/95 p-3 shadow-soft backdrop-blur sm:block"
              aria-hidden
            >
              <div className="space-y-1.5">
                <div className="h-2 w-[75%] rounded-sm bg-sand/80" />
                <div className="h-2 w-[50%] rounded-sm bg-sand/60" />
              </div>
              <div className="mt-3 rounded-none bg-[#3D2B1F] px-2.5 py-2">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#F2C14D]">
                  Draft
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs font-semibold leading-snug text-white">
                  {draftTitle || "Your next chapter"}
                </p>
              </div>
              <p className="mt-2 inline-flex rounded-none bg-[#F2C14D]/35 px-2 py-0.5 text-[10px] font-semibold text-ink">
                Focus session
              </p>
            </div>
          </>
        )}

        <form ref={bannerFormRef} action={bannerAction} className="contents">
          <input
            ref={bannerInputRef}
            type="file"
            name="banner"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = URL.createObjectURL(file);
              setBannerPreview((prev) => {
                if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
                return url;
              });
              bannerFormRef.current?.requestSubmit();
            }}
          />
          <button
            type="button"
            onClick={() => bannerInputRef.current?.click()}
            disabled={bannerPending}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-none border border-sand bg-white/95 px-3 py-2 text-xs font-bold uppercase tracking-wide text-ink shadow-soft backdrop-blur transition hover:bg-white disabled:opacity-60"
            aria-label="Edit cover photo"
          >
            <PencilIcon className="h-3.5 w-3.5" />
            {bannerPending ? "Uploading…" : "Edit Cover"}
          </button>
        </form>
      </div>

      {/* Identity row */}
      <div className="relative px-4 pb-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-1 gap-4 sm:gap-5">
            <form
              ref={avatarFormRef}
              action={avatarAction}
              className="-mt-12 shrink-0 sm:-mt-14"
            >
              <input
                ref={avatarInputRef}
                type="file"
                name="avatar"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setAvatarPreview((prev) => {
                    if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
                    return url;
                  });
                  avatarFormRef.current?.requestSubmit();
                }}
              />
              {/* Outer white ring (not clipped by overflow) */}
              <span className="inline-flex rounded-full bg-white p-[5px] shadow-soft">
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={avatarPending}
                  className="relative h-[96px] w-[96px] overflow-hidden rounded-full bg-[#1A1A1A] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E08A2A] disabled:opacity-60 sm:h-[112px] sm:w-[112px]"
                  aria-label="Edit profile photo"
                >
                  {avatarPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarPreview}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-display text-2xl font-bold tracking-wide text-white sm:text-3xl">
                      {avatarPending ? "…" : initials}
                    </span>
                  )}
                </button>
              </span>
            </form>

            <div className="min-w-0 pt-2 sm:pt-3">
              <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[30px]">
                {name}
              </h1>
              <p className="mt-1 text-sm text-forest-muted">
                {metaParts.join(" · ")}
              </p>

              {visibleSocials.length > 0 ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {visibleSocials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-soft transition hover:scale-105 ${s.color}`}
                    >
                      <span className="sr-only">{s.label}</span>
                      {s.label.slice(0, 1)}
                    </a>
                  ))}
                  {extraSocials > 0 ? (
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-sand px-1.5 text-[11px] font-bold text-ink">
                      +{extraSocials}
                    </span>
                  ) : null}
                </div>
              ) : null}

              {error ? (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:pb-1">
            <Button href="/dashboard/books/new" className="!px-4 !py-2.5 text-xs">
              + New Book Project
            </Button>
            <Button
              href="/dashboard/profile"
              variant="ghost"
              className="!px-4 !py-2.5 text-xs"
            >
              Edit Author Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs sit under name / profile photo */}
      <nav
        className="overflow-x-auto border-t border-sand px-2 sm:px-4"
        aria-label="Dashboard sections"
      >
        <ul className="flex gap-0.5">
          {DASHBOARD_TABS.map((item) => {
            const exact = "exact" in item && item.exact;
            const active = exact
              ? pathname === item.href || pathname === `${item.href}/`
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex shrink-0 border-b-2 px-3 py-3.5 text-sm font-semibold transition sm:px-4 ${
                    active
                      ? "border-[#E08A2A] text-ink"
                      : "border-transparent text-forest-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        d="M16.5 3.5 20.5 7.5 8 20H4v-4L16.5 3.5Z"
        strokeLinejoin="round"
      />
      <path d="M13.5 6.5 17.5 10.5" strokeLinecap="round" />
    </svg>
  );
}

