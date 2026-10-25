import { redirect } from "next/navigation";
import { getAuthorLead } from "@/lib/lead-session";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { getSessionUser as getFirebaseSessionUser } from "@/lib/firebase/session";
import { getProfileById } from "@/lib/firebase/profiles";
import type { Profile } from "@/types/database";

function leadAsProfile(lead: {
  email: string;
  displayName: string;
  createdAt: string;
}): Profile {
  return {
    id: "lead-session",
    role: "author",
    email: lead.email,
    display_name: lead.displayName,
    slug: null,
    bio: null,
    avatar_path: null,
    banner_path: null,
    website_url: null,
    has_author_website: false,
    social_facebook: null,
    social_instagram: null,
    social_twitter: null,
    social_linkedin: null,
    social_whatsapp: null,
    social_tiktok: null,
    social_reddit: null,
    is_public: false,
    profile_complete: false,
    created_at: lead.createdAt,
    updated_at: lead.createdAt,
  };
}

export async function getSessionUser() {
  if (isFirebaseConfigured()) {
    try {
      const user = await getFirebaseSessionUser();
      if (user) {
        return {
          id: user.uid,
          email: user.email,
          picture: user.picture ?? null,
        };
      }
    } catch {
      // fall through
    }
  }
  return null;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  if (isFirebaseConfigured()) {
    try {
      const user = await getFirebaseSessionUser();
      if (user) {
        const profile = await getProfileById(user.uid);
        const googlePhoto = user.picture || null;
        if (profile) {
          // Prefer uploaded avatar; fall back to Google profile photo
          if (!profile.avatar_path && googlePhoto) {
            return { ...profile, avatar_path: googlePhoto };
          }
          return profile;
        }
        // Auth exists but profile missing - synthesize minimal profile
        return {
          id: user.uid,
          role: "author",
          email: user.email,
          display_name:
            user.name || user.email?.split("@")[0] || "Author",
          slug: null,
          bio: null,
          avatar_path: googlePhoto,
          banner_path: null,
          website_url: null,
          has_author_website: false,
          social_facebook: null,
          social_instagram: null,
          social_twitter: null,
          social_linkedin: null,
          social_whatsapp: null,
          social_tiktok: null,
          social_reddit: null,
          is_public: false,
          profile_complete: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
    } catch {
      // fall through to lead cookie
    }
  }

  const lead = await getAuthorLead();
  if (lead) return leadAsProfile(lead);
  return null;
}

export async function requireUser(nextPath = "/dashboard") {
  const user = await getSessionUser();
  if (user) return user;
  const lead = await getAuthorLead();
  if (lead) return { id: "lead-session", email: lead.email } as never;
  redirect(`/login?next=${encodeURIComponent(nextPath)}`);
}

export async function requireProfile(nextPath = "/dashboard") {
  const profile = await getCurrentProfile();
  const needsSignup =
    nextPath.startsWith("/dashboard/books/new") &&
    (!profile || profile.id === "lead-session");

  if (needsSignup) {
    redirect(
      `/signup?next=${encodeURIComponent(nextPath)}&google=1`
    );
  }
  if (!profile) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return profile;
}

export async function requireAdmin() {
  const profile = await requireProfile("/admin");
  if (profile.role !== "admin" || profile.id === "lead-session") {
    redirect("/dashboard");
  }
  return profile;
}

export async function isLeadOnlySession(): Promise<boolean> {
  if (await getSessionUser()) return false;
  return Boolean(await getAuthorLead());
}
