import { Helmet } from "react-helmet-async";
import { buildCanonicalUrl, type SeoConfig } from "@/lib/seo";

export function Seo({
  title,
  description,
  canonicalPath,
  imageUrl = "/logo.svg",
  noindex = false,
}: SeoConfig) {
  const canonical = buildCanonicalUrl(canonicalPath);
  const robots = noindex
    ? "noindex,nofollow"
    : "index,follow,max-image-preview:large";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="robots" content={robots} />
      {description ? <meta name="description" content={description} /> : null}

      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      {description ? (
        <meta name="twitter:description" content={description} />
      ) : null}
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}





