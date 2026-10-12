import { notFound } from "next/navigation";

import { locations } from "@/data/locations";
import LocationDetails from "@/components/locations/LocationDetails";

export function generateStaticParams() {
  return locations
    .filter((location) => location.status === "published")
    .map((location) => ({
      slug: location.slug,
    }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const location = locations.find(
    (item) =>
      item.slug === slug &&
      item.status === "published"
  );

  if (!location) {
    return {
      title: "Location Not Found | Ultra Credit Solutions",
    };
  }

  return {
    title:
      location.seo?.title ||
      location.title ||
      "Service Location | Ultra Credit Solutions",

    description:
      location.seo?.description ||
      location.description,

    alternates: {
      canonical: `/locations/${location.slug}`,
    },

    openGraph: {
      title:
        location.seo?.title ||
        location.title,

      description:
        location.seo?.description ||
        location.description,

      url: `/locations/${location.slug}`,
      type: "website",
    },
  };
}

export default async function LocationPage({ params }) {
  const { slug } = await params;

  const location = locations.find(
    (item) =>
      item.slug === slug &&
      item.status === "published"
  );

  if (!location) {
    notFound();
  }

  return <LocationDetails location={location} />;
}