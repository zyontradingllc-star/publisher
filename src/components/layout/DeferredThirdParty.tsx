"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-NLN088L5TN";
const INSPECTLET_WID = 893917768;

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
      <Script id="inspectlet" strategy="lazyOnload">
        {`
          (function() {
            window.__insp = window.__insp || [];
            __insp.push(['wid', ${INSPECTLET_WID}]);
            if (typeof window.__inspld != "undefined") return;
            window.__inspld = 1;
            var insp = document.createElement('script');
            insp.type = 'text/javascript';
            insp.async = true;
            insp.id = "inspsync";
            insp.src = 'https://cdn.inspectlet.com/inspectlet.js?wid=${INSPECTLET_WID}&r=' + Math.floor(new Date().getTime()/3600000);
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(insp, x);
          })();
        `}
      </Script>
    </>
  );
}
