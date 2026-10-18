import { locations } from "@/data/locations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

const routes = [
  "",
  "/about",
  "/services",
  "/pricing",
  "/appointment",
  "/contact",
  "/faq",
  "/blog",
  "/locations",
  "/privacy-policy",
  "/sms-terms",
  "/terms-and-conditions",
];

export default function sitemap() {
  if (!SITE_URL) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not configured. Add it to your environment variables.",
    );
  }

  const staticPages = routes.map((route) => ({
    url: `${SITE_URL}${route || "/"}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const publishedLocations = locations
    .filter((location) => location.status === "published")
    .map((location) => ({
      url: `${SITE_URL}/locations/${location.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticPages, ...publishedLocations];
}
