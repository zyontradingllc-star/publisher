import { sendEmail } from "@/lib/email";
import { getPublicSiteUrl } from "@/lib/env";

const INBOX = "no-reply@authorspilot.com";

/**
 * Drop signup / lead / publish info to no-reply@authorspilot.com.
 * Order: Resend → Hostinger send-mail.php → FormSubmit.
 * Never includes passwords.
 */
export async function dropInfoToInbox(opts: {
  subject: string;
  lines: string[];
}): Promise<{ ok: boolean; via?: string; error?: string }> {
  const bodyText = opts.lines.join("\n");
  const html = `<pre style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(bodyText)}</pre>`;

  // 1) Resend (needs RESEND_API_KEY in .env.local)
  const resend = await sendEmail({
    to: INBOX,
    subject: opts.subject,
    html,
  });
  if (resend.ok && !resend.skipped) {
    console.info("[inbox] delivered via resend:", opts.subject);
    return { ok: true, via: "resend" };
  }

  // 2) Live Hostinger PHP mailer — prefer non-www (www→non-www 301 drops POST)
  const marketingBases = Array.from(
    new Set([
      getPublicSiteUrl().replace(/\/$/, ""),
      "https://authorspilot.com",
      "https://www.authorspilot.com",
    ])
  ).map((u) => u.replace("https://www.", "https://"));

  for (const base of marketingBases) {
    try {
      const res = await fetch(`${base}/send-mail.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          intent: "create-free-account",
          _subject: opts.subject,
          name: "Authors Pilot Platform",
          message: bodyText,
          source: "platform",
        }),
        redirect: "manual",
        signal: AbortSignal.timeout(15000),
      });

      // Follow one redirect manually with POST preserved
      let finalRes = res;
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (loc) {
          const nextUrl = loc.startsWith("http")
            ? loc
            : new URL(loc, base).toString();
          finalRes = await fetch(nextUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              intent: "create-free-account",
              _subject: opts.subject,
              name: "Authors Pilot Platform",
              message: bodyText,
              source: "platform",
            }),
            signal: AbortSignal.timeout(15000),
          });
        }
      }

      const text = await finalRes.text().catch(() => "");
      if (finalRes.ok) {
        console.info("[inbox] delivered via send-mail.php:", base, opts.subject);
        return { ok: true, via: "send-mail.php" };
      }
      console.warn(
        "[inbox] send-mail.php failed:",
        base,
        finalRes.status,
        text.slice(0, 200)
      );
    } catch (err) {
      console.warn(
        "[inbox] send-mail.php error:",
        base,
        err instanceof Error ? err.message : err
      );
    }
  }

  // 3) FormSubmit (first email may need confirmation in no-reply inbox)
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: opts.subject,
        _template: "box",
        _captcha: "false",
        message: bodyText,
      }),
      signal: AbortSignal.timeout(15000),
    });
    const data = (await res.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;
    if (res.ok) {
      console.info("[inbox] delivered via formsubmit:", opts.subject);
      return { ok: true, via: "formsubmit" };
    }
    console.warn("[inbox] formsubmit failed:", data?.message || res.status);
    return {
      ok: false,
      error: data?.message || "Inbox delivery failed (FormSubmit)",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Inbox delivery failed";
    console.warn("[inbox] formsubmit error:", message);
    return { ok: false, error: message };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
