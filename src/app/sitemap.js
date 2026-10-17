
import { blogs } from "@/data/blog";
import { locations } from "@/data/locations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

if (!SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not configured.");
}

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
  const staticPages = routes.map((route) => ({
    url: `${SITE_URL.replace(/\/$/, "")}${route || "/"}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const publishedBlogs = blogs
    .filter((post) => post.status === "published")
    .map((post) => ({
      url: `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
      ...(post.updatedAt
        ? { lastModified: new Date(post.updatedAt) }
        : {}),
    }));

  const publishedLocations = locations
    .filter((location) => location.status === "published")
    .map((location) => ({
      url: `${SITE_URL.replace(/\/$/, "")}/locations/${location.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticPages, ...publishedBlogs, ...publishedLocations];
}
