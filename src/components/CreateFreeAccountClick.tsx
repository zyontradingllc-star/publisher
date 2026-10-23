"use client";

import { useState } from "react";

/**
 * One click → email goes straight to no-reply@authorspilot.com
 * No form fields, no captcha.
 */
export function CreateFreeAccountClick() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleClick() {
    if (status === "sending" || status === "sent") return;
    setStatus("sending");

    try {
      const res = await fetch("/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "create-free-account",
          _subject: "Create A Free Account",
          name: "Website visitor",
          message:
            "Someone clicked Create A Free Account on the website (no form - one-click interest).",
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      // Fallback: open mail client straight to no-reply@
      window.location.href =
        "mailto:no-reply@authorspilot.com?subject=" +
        encodeURIComponent("Create A Free Account") +
        "&body=" +
        encodeURIComponent(
          "I want to create a free Authors Pilot account."
        );
      setStatus("idle");
    }
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "sending" || status === "sent"}
        className="w-full rounded-none bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-6 py-4 font-sans text-sm font-bold uppercase tracking-wide text-ink shadow-cta transition hover:brightness-105 hover:shadow-cta-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E08A2A] focus-visible:ring-offset-2 disabled:opacity-70"
      >
        {status === "sending"
          ? "Sending…"
          : status === "sent"
            ? "Request sent"
            : "Create A Free Account"}
      </button>

      {status === "sent" ? (
        <p className="mt-3 text-sm text-green-800" role="status">
          Sent to no-reply@authorspilot.com. We will follow up soon.
        </p>
      ) : status === "error" ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          Could not send. Try again or email no-reply@authorspilot.com.
        </p>
      ) : (
        <p className="mt-4 text-xs text-forest-muted">
          One click - no form, no captcha. Goes straight to
          no-reply@authorspilot.com.
        </p>
      )}
    </div>
  );
}
