/**
 * Server-side env helpers. Never import secrets into client components.
 */

function read(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

/** Public app URL (platform). Prefer NEXT_PUBLIC_APP_URL, fall back to SITE_URL. */
export function getAppUrl(): string {
  return (
    read("NEXT_PUBLIC_APP_URL") ||
    read("NEXT_PUBLIC_SITE_URL") ||
    "http://localhost:3000"
  );
}

/** Marketing / public site URL */
export function getPublicSiteUrl(): string {
  return (
    read("PUBLIC_SITE_URL") ||
    read("NEXT_PUBLIC_MARKETING_URL") ||
    "https://www.authorspilot.com"
  );
}

export function getEmailFrom(): string | undefined {
  return read("EMAIL_FROM") || read("RESEND_FROM_EMAIL");
}

export function assertServerSecretsPresent(): {
  ok: boolean;
  missing: string[];
  warnings: string[];
} {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!read("NEXT_PUBLIC_FIREBASE_API_KEY")) {
    missing.push("NEXT_PUBLIC_FIREBASE_API_KEY");
  }
  if (!read("NEXT_PUBLIC_FIREBASE_PROJECT_ID")) {
    missing.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  }
  if (!read("FIREBASE_CLIENT_EMAIL")) missing.push("FIREBASE_CLIENT_EMAIL");
  if (!read("FIREBASE_PRIVATE_KEY")) missing.push("FIREBASE_PRIVATE_KEY");

  if (!read("RESEND_API_KEY") || !getEmailFrom()) {
    warnings.push(
      "Email provider unset — transactional emails will be skipped (not claimed as delivered)"
    );
  }

  return { ok: missing.length === 0, missing, warnings };
}

export function logEnvStatus(): void {
  if (typeof window !== "undefined") return;
  const status = assertServerSecretsPresent();
  if (!status.ok) {
    console.warn(
      "[authorspilot] Missing required env:",
      status.missing.join(", ")
    );
  }
  for (const w of status.warnings) {
    console.info("[authorspilot]", w);
  }
}
