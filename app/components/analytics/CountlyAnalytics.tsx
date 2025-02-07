// components/analytics/CountlyAnalytics.tsx
'use client';

import Script from 'next/script';
import { COUNTLY_CONFIG } from '@/lib/analytics/config';

export function CountlyAnalytics() {
  const initScript = `
    var Countly = Countly || {};
    Countly.q = Countly.q || [];

    Countly.app_key = '${COUNTLY_CONFIG.app_key}';
    Countly.url = '${COUNTLY_CONFIG.url}';

    ${COUNTLY_CONFIG.tracking_features.map(feature => `Countly.q.push(['${feature}']);`).join('\n')}

    (function() {
      var cly = document.createElement('script');
      cly.type = 'text/javascript';
      cly.async = true;
      cly.src = 'https://cdn.jsdelivr.net/npm/countly-sdk-web@latest/lib/countly.min.js';
      cly.onload = function(){Countly.init()};
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(cly, s);
    })();
  `;

  return (
    <Script id="countly-init" strategy="afterInteractive">
      {initScript}
    </Script>
  );
}