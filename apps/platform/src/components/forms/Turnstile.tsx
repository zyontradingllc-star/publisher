"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import Script from "next/script";

type TurnstileWidgetId = string;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
      action?: string;
      size?: "normal" | "flexible" | "compact";
    }
  ) => TurnstileWidgetId;
  reset: (widgetId?: TurnstileWidgetId) => void;
  remove: (widgetId?: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = {
  reset: () => void;
};

const DUMMY_SITE_KEYS = new Set([
  "1x00000000000000000000AA",
  "2x00000000000000000000AB",
  "1x00000000000000000000BB",
  "2x00000000000000000000BB",
  "3x00000000000000000000FF",
]);

export function getTurnstileSiteKey(): string {
  const key = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();
  if (!key || DUMMY_SITE_KEYS.has(key)) return "";
  return key;
}

export function isTurnstileEnabled(): boolean {
  return getTurnstileSiteKey().length > 0;
}

type TurnstileProps = {
  onChange: (token: string | null) => void;
  action?: string;
  className?: string;
};

export const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  function Turnstile({ onChange, action = "signup", className = "" }, ref) {
    const siteKey = getTurnstileSiteKey();
    const containerId = useId().replace(/:/g, "");
    const widgetId = useRef<TurnstileWidgetId | null>(null);
    const onChangeRef = useRef(onChange);
    const actionRef = useRef(action);
    onChangeRef.current = onChange;
    actionRef.current = action;

    function renderWidget() {
      if (!siteKey || !window.turnstile || widgetId.current !== null) return;
      const el = document.getElementById(containerId);
      if (!el || el.childElementCount > 0) return;

      widgetId.current = window.turnstile.render(el, {
        sitekey: siteKey,
        action: actionRef.current,
        theme: "light",
        size: "flexible",
        callback: (token) => onChangeRef.current(token),
        "expired-callback": () => onChangeRef.current(null),
        "error-callback": () => onChangeRef.current(null),
      });
    }

    useImperativeHandle(ref, () => ({
      reset() {
        if (widgetId.current !== null && window.turnstile) {
          window.turnstile.reset(widgetId.current);
        }
        onChangeRef.current(null);
      },
    }));

    useEffect(() => {
      if (!siteKey) return;
      renderWidget();
      return () => {
        if (widgetId.current !== null && window.turnstile) {
          try {
            window.turnstile.remove(widgetId.current);
          } catch {
            // already gone
          }
        }
        widgetId.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerId, siteKey]);

    if (!siteKey) return null;

    return (
      <div className={className}>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderWidget}
        />
        <div id={containerId} />
      </div>
    );
  }
);
