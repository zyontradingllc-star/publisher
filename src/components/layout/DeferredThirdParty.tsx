"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-NLN088L5TN";

export function DeferredThirdParty() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    const timer = window.setTimeout(enable, 4000);
    window.addEventListener("scroll", enable, { once: true, passive: true });
    window.addEventListener("pointerdown", enable, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", enable);
      window.removeEventListener("pointerdown", enable);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
