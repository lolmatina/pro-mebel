export type SeoConfig = {
  title: string;
  description?: string;
  /**
   * Canonical path, e.g. "/" or "/catalog".
   * If omitted, we will use the current location pathname + search.
   */
  canonicalPath?: string;
  /**
   * Absolute URL is preferred, but relative is acceptable.
   */
  imageUrl?: string;
  /**
   * If true, sets robots to noindex,nofollow.
   */
  noindex?: boolean;
};

export function getSiteOrigin(): string {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

export function buildCanonicalUrl(canonicalPath?: string): string | undefined {
  const origin = getSiteOrigin();
  if (!origin) return undefined;

  const path =
    canonicalPath ??
    `${window.location.pathname}${window.location.search}${window.location.hash}`;
  try {
    return new URL(path, origin).toString();
  } catch {
    return undefined;
  }
}




