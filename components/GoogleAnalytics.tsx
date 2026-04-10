\"use client\";

import Script from \"next/script\";
import { useEffect } from \"react\";
import { usePathname, useSearchParams } from \"next/navigation\";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = \"G-S7653BCC23\";

function pageview(url: string) {
  if (typeof window === \"undefined\") return;
  if (!window.gtag) return;
  window.gtag(\"config\", GA_MEASUREMENT_ID, { page_path: url });
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    pageview(url);
  }, [pathname, searchParams]);

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script id=\"gtag-init\" strategy=\"afterInteractive\">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

