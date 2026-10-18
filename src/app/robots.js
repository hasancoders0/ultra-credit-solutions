
export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

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
    ...(siteUrl
      ? {
          sitemap: `${siteUrl}/sitemap.xml`,
          host: siteUrl,
        }
      : {}),
  };
}
