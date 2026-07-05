"use client";

import Script from "next/script";

// Loads Google Analytics only if a Measurement ID is actually configured.
// Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env.local (and Netlify) once you
// have a GA4 property set up — nothing needs to change here, this
// component picks it up automatically. No ID set = nothing loads, same
// pattern as the Google Maps integration.
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
