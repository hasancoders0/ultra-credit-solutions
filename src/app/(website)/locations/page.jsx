
import { getDb } from "@/lib/mongodb";

import LocationHero from "@/components/locations/LocationHero";
import LocationList from "@/components/locations/LocationList";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Service Locations | Ultra Credit Solutions USA",
  description:
    "Explore our service locations to learn about credit reports, credit scores, dispute assistance, and available services.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Service Locations | Ultra Credit Solutions USA",
    description:
      "Browse our published service locations and explore location-specific credit education and available services.",
    url: "/locations",
    siteName: "Ultra Credit Solutions USA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Service Locations | Ultra Credit Solutions USA",
    description:
      "Explore our published service locations and learn about available services.",
  },
};

async function getPublishedLocations() {
  const db = await getDb();

  const locations = await db
    .collection("locations")
    .find({ status: "published" })
    .sort({ featured: -1, title: 1 })
    .toArray();

  return locations.map(({ _id, ...location }) => ({
    ...location,
    id: String(_id),
  }));
}

export default async function LocationsPage() {
  let locations = [];
  let hasError = false;

  try {
    locations = await getPublishedLocations();
  } catch (error) {
    console.error("Failed to load public locations:", error);
    hasError = true;
  }

  return (
    <main className="min-h-screen bg-white">
      <LocationHero />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2852A0]">
              Explore Locations
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#081828] sm:text-4xl">
              Find Information for Your Area
            </h1>

            <p className="mt-4 text-base leading-8 text-[#666666]">
              Browse our published location pages to learn about
              relevant services and credit-related information for
              your area.
            </p>
          </div>

          {hasError ? (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-5 py-10 text-center"
            >
              <h2 className="text-lg font-semibold text-[#081828]">
                Unable to Load Locations
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#666666]">
                We could not load location information right now.
                Please try again later.
              </p>
            </div>
          ) : locations.length > 0 ? (
            <LocationList locations={locations} />
          ) : (
            <div className="rounded-xl border border-dashed border-[#EEEEEE] px-5 py-12 text-center">
              <h2 className="text-lg font-semibold text-[#081828]">
                Location Pages Coming Soon
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#666666]">
                We are preparing location-specific information about
                our services. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
