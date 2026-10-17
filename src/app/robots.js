
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

if (!SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not configured.");
}

export default function robots() {
  const siteUrl = SITE_URL.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/thank-you",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
