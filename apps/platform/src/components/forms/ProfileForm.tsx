"use client";

import { useActionState, useState } from "react";
import { updateProfileAction } from "@/app/actions/profile";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import type { Profile } from "@/types/database";
import { MARKETING_URL, slugify } from "@/lib/utils";

const initialState: ActionState = { ok: false };

const AUTHOR_WEBSITE_HREF = `${MARKETING_URL}/author-website-design-agency-usa/`;

function FieldError({
  errors,
  name,
}: {
  errors?: Record<string, string[]>;
  name: string;
}) {
  const msg = errors?.[name]?.[0];
  if (!msg) return null;
  return <p className="error-text">{msg}</p>;
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialState
  );
  // Default Yes on the profile page (URL field shown until they pick No).
  const [hasWebsite, setHasWebsite] = useState<"yes" | "no">("yes");
  const [displayName, setDisplayName] = useState(profile.display_name ?? "");

  return (
    <div className="space-y-4">
      {!state.ok && state.message ? (
        <Alert variant="error">{state.message}</Alert>
      ) : null}

      <form action={formAction} className="card-surface space-y-5">
        <div>
          <label className="label-field" htmlFor="display_name">
            Display name
          </label>
          <input
            id="display_name"
            name="display_name"
            className="input-field"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <FieldError errors={state.fieldErrors} name="display_name" />
        </div>

        <div>
          <label className="label-field" htmlFor="slug">
            Public author URL
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-forest-muted">/authors/</span>
            <input
              id="slug"
              name="slug"
              className="input-field flex-1"
              required
              defaultValue={profile.slug ?? slugify(displayName)}
            />
          </div>
          {profile.slug ? (
            <p className="mt-2 text-sm">
              <a
                href={`/authors/${profile.slug}`}
                className="font-semibold text-coral hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open public author page
              </a>
            </p>
          ) : null}
          <FieldError errors={state.fieldErrors} name="slug" />
        </div>

        <div>
          <label className="label-field" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={5}
            className="input-field"
            defaultValue={profile.bio ?? ""}
            placeholder="Tell readers about yourself (20+ characters helps complete your profile)."
          />
          <FieldError errors={state.fieldErrors} name="bio" />
        </div>

        <fieldset className="space-y-3">
          <legend className="label-field mb-2">
            Do you have an author website?
          </legend>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="has_author_website"
              value="yes"
              checked={hasWebsite === "yes"}
              onChange={() => setHasWebsite("yes")}
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="has_author_website"
              value="no"
              checked={hasWebsite === "no"}
              onChange={() => setHasWebsite("no")}
            />
            No
          </label>
        </fieldset>

        {hasWebsite === "yes" ? (
          <div>
            <label className="label-field" htmlFor="website_url">
              Website URL
            </label>
            <input
              id="website_url"
              name="website_url"
              type="url"
              className="input-field"
              defaultValue={profile.website_url ?? ""}
              placeholder="https://"
            />
            <FieldError errors={state.fieldErrors} name="website_url" />
          </div>
        ) : (
          <div
            className="space-y-3 rounded-none border border-sand bg-ivory/80 p-4"
            role="region"
            aria-label="Author website suggestion"
          >
            <p className="text-sm text-charcoal">
              A professional author site helps readers find your books and brand.
            </p>
            <Button href={AUTHOR_WEBSITE_HREF} external>
              Interested in Author Website?
            </Button>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field" htmlFor="social_facebook">
              Facebook
            </label>
            <input
              id="social_facebook"
              name="social_facebook"
              className="input-field"
              defaultValue={profile.social_facebook ?? ""}
            />
          </div>
          <div>
            <label className="label-field" htmlFor="social_instagram">
              Instagram
            </label>
            <input
              id="social_instagram"
              name="social_instagram"
              className="input-field"
              defaultValue={profile.social_instagram ?? ""}
            />
          </div>
          <div>
            <label className="label-field" htmlFor="social_twitter">
              X / Twitter
            </label>
            <input
              id="social_twitter"
              name="social_twitter"
              className="input-field"
              defaultValue={profile.social_twitter ?? ""}
            />
          </div>
          <div>
            <label className="label-field" htmlFor="social_linkedin">
              LinkedIn
            </label>
            <input
              id="social_linkedin"
              name="social_linkedin"
              className="input-field"
              defaultValue={profile.social_linkedin ?? ""}
            />
          </div>
          <div>
            <label className="label-field" htmlFor="social_tiktok">
              TikTok link
            </label>
            <input
              id="social_tiktok"
              name="social_tiktok"
              className="input-field"
              type="url"
              defaultValue={profile.social_tiktok ?? profile.social_whatsapp ?? ""}
              placeholder="https://www.tiktok.com/@username"
            />
          </div>
          <div>
            <label className="label-field" htmlFor="social_reddit">
              Reddit link
            </label>
            <input
              id="social_reddit"
              name="social_reddit"
              className="input-field"
              type="url"
              defaultValue={profile.social_reddit ?? ""}
              placeholder="https://www.reddit.com/user/username"
            />
          </div>
        </div>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="is_public"
            value="true"
            defaultChecked={profile.is_public}
            className="mt-1"
          />
          <span className="text-sm text-charcoal">
            Show my public author profile when I have published listings.
          </span>
        </label>
        <input type="hidden" name="is_public" value="false" />

        <Button type="submit" disabled={pending}>
          Save profile
        </Button>

        {state.ok && state.message ? (
          <p
            className="flex items-center gap-2 text-sm font-semibold text-green-700"
            role="status"
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M4 10.5 8 14.5 16 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Profile saved
          </p>
        ) : null}
      </form>
    </div>
  );
}
