import { locations } from "@/data/locations";

import LocationHero from "@/components/locations/LocationHero";
import LocationList from "@/components/locations/LocationList";

export const metadata = {
  title: "Service Locations | Ultra Credit Solutions",
  description:
    "Explore location-specific information about credit report review and dispute assistance from Ultra Credit Solutions.",
  alternates: {
    canonical: "/locations",
  },
};

export default function LocationsPage() {
  const publishedLocations = locations.filter(
    (location) => location.status === "published"
  );

  return (
    <>
      <LocationHero />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2852A0]">
              Explore Locations
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#081828] sm:text-4xl">
              Find Information for Your Area
            </h2>

            <p className="mt-4 text-base leading-8 text-[#666666]">
              Browse our published location pages to learn about
              relevant services and credit-related information.
            </p>
          </div>

          <LocationList locations={publishedLocations} />
        </div>
      </section>
    </>
  );
}