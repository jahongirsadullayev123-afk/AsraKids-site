type AnalyticsEventProps = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: AnalyticsEventProps }) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function initAnalytics() {
  if (!isBrowser()) return;

  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
  const plausibleSrc = (import.meta.env.VITE_PLAUSIBLE_SRC as string | undefined) ?? 'https://plausible.io/js/script.js';

  if (plausibleDomain && plausibleSrc && !document.querySelector('script[data-analytics="plausible"]')) {
    const s = document.createElement('script');
    s.defer = true;
    s.src = plausibleSrc;
    s.setAttribute('data-domain', plausibleDomain);
    s.setAttribute('data-analytics', 'plausible');
    document.head.appendChild(s);
  }

  const gaId = import.meta.env.VITE_GA_ID as string | undefined;
  if (gaId && !document.querySelector('script[data-analytics="ga4"]')) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    s.setAttribute('data-analytics', 'ga4');
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function (...args: any[]) {
        window.dataLayer?.push(args);
      };
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }
}

export function track(eventName: string, props?: AnalyticsEventProps) {
  if (!isBrowser()) return;

  if (typeof window.plausible === 'function') {
    window.plausible(eventName, props ? { props } : undefined);
  }

  const gaId = import.meta.env.VITE_GA_ID as string | undefined;
  if (gaId && typeof window.gtag === 'function') {
    window.gtag('event', eventName, props ?? {});
  }
}

