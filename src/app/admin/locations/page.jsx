import { locations } from "@/data/locations";

import LocationManagement from "@/components/admin/locations/LocationManagement";

export const metadata = {
  title: "Locations | Ultra Credit Solutions",
  description: "Manage website location pages.",
};

export default function AdminLocationsPage() {
  return (
    <LocationManagement initialLocations={locations} />
  );
}