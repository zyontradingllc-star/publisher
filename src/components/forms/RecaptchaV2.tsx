"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: string | HTMLElement,
        parameters: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark";
        },
      ) => number;
      reset: (widgetId?: number) => void;
    };
    __recaptchaOnLoad?: () => void;
  }
}

export type RecaptchaV2Handle = {
  reset: () => void;
};

type RecaptchaV2Props = {
  onChange: (token: string | null) => void;
  className?: string;
};

export const RecaptchaV2 = forwardRef<RecaptchaV2Handle, RecaptchaV2Props>(
  function RecaptchaV2({ onChange, className = "" }, ref) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
    const containerId = useId().replace(/:/g, "");
    const widgetId = useRef<number | null>(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    useImperativeHandle(ref, () => ({
      reset() {
        if (widgetId.current !== null && window.grecaptcha) {
          window.grecaptcha.reset(widgetId.current);
        }
        onChangeRef.current(null);
      },
    }));

    useEffect(() => {
      if (!siteKey) return;

      function render() {
        if (!window.grecaptcha || widgetId.current !== null) return;
        const el = document.getElementById(containerId);
        if (!el || el.childElementCount > 0) return;

        widgetId.current = window.grecaptcha.render(el, {
          sitekey: siteKey,
          callback: (token) => onChangeRef.current(token),
          "expired-callback": () => onChangeRef.current(null),
          "error-callback": () => onChangeRef.current(null),
          theme: "light",
        });
      }

      window.__recaptchaOnLoad = render;
      if (window.grecaptcha) render();

      return () => {
        widgetId.current = null;
      };
    }, [containerId, siteKey]);

    if (!siteKey) {
      return (
        <p className="text-xs text-coral-soft">
          Add <code className="font-mono">NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code>{" "}
          in <code className="font-mono">.env.local</code> to enable Google
          reCAPTCHA.
        </p>
      );
    }

    return (
      <div className={className}>
        <Script
          src="https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit"
          strategy="afterInteractive"
        />
        <div id={containerId} />
      </div>
    );
  },
);
