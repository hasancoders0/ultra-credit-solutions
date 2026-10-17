
import { notFound } from "next/navigation";

import { getDb } from "@/lib/mongodb";
import LocationDetails from "@/components/locations/LocationDetails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getPublishedLocation(slug) {
  if (!slug) return null;

  const db = await getDb();

  const location = await db.collection("locations").findOne({
    slug,
    status: "published",
  });

  if (!location) return null;

  const { _id, ...data } = location;

  return {
    ...data,
    id: String(_id),
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let location;

  try {
    location = await getPublishedLocation(slug);
  } catch (error) {
    console.error("Failed to load location metadata:", error);

    return {
      title: "Service Location | Ultra Credit Solutions USA",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  if (!location) {
    return {
      title: "Location Not Found | Ultra Credit Solutions USA",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    location.seo?.title ||
    location.title ||
    `${location.city}, ${location.state} Service Location`;

  const description =
    location.seo?.description ||
    location.description ||
    `Explore credit-related information and available services in ${location.city}, ${location.state}.`;

  const canonical =
    location.seo?.canonical || `/locations/${location.slug}`;

  const robots = location.seo?.robots || "index,follow";

  const shouldIndex = !robots.toLowerCase().includes("noindex");

  const image = location.seo?.ogImage || location.image?.src;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: shouldIndex,
      follow: !robots.toLowerCase().includes("nofollow"),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Ultra Credit Solutions USA",
      type: "website",
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: location.image?.alt || title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function LocationPage({ params }) {
  const { slug } = await params;

  let location;

  try {
    location = await getPublishedLocation(slug);
  } catch (error) {
    console.error("Failed to load public location:", error);
    throw error;
  }

  if (!location) {
    notFound();
  }

  return <LocationDetails location={location} />;
}
