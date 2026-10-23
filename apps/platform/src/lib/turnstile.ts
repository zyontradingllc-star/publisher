export type TurnstileVerifyResult = {
  success: boolean;
  message?: string;
};

/**
 * Server-side Cloudflare Turnstile siteverify.
 * Skips when TURNSTILE_SECRET_KEY is unset (local/dev).
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteip?: string | null
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { success: true };
  }

  if (!token?.trim()) {
    return { success: false, message: "Please complete the security check." };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token.trim(),
    });
    if (remoteip) body.set("remoteip", remoteip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }
    );
    const data = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    if (!res.ok || data.success !== true) {
      return {
        success: false,
        message: "Security check failed. Please try again.",
      };
    }
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Could not verify security check. Please try again.",
    };
  }
}
