import { notFound } from "next/navigation";

import { locations } from "@/data/locations";
import LocationForm from "@/components/admin/locations/LocationForm";

export const metadata = {
  title: "Edit Location | Ultra Credit Solutions",
  description: "Edit a location page.",
};

export default async function EditLocationPage({ params }) {
  const { id } = await params;

  const location = locations.find(
    (item) =>
      String(item.id) === String(id) ||
      item.slug === id
  );

  if (!location) {
    notFound();
  }

  return <LocationForm initialLocation={location} />;
}