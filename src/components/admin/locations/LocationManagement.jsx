"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  MapPin,
} from "lucide-react";

import LocationToolbar from "@/components/admin/locations/LocationToolbar";
import LocationTable from "@/components/admin/locations/LocationTable";

export default function LocationManagement({
  initialLocations = [],
}) {
  const [locations] = useState(initialLocations);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredLocations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return locations.filter((location) => {
      const searchableText = [
        location.title,
        location.slug,
        location.state,
        location.city,
        location.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesStatus =
        status === "all" || location.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [locations, search, status]);

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 xl:p-8">
        <div>
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#888888] transition hover:text-[#2852A0]"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
              <MapPin size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl">
                Locations
              </h1>

              <p className="mt-1 text-sm text-[#888888]">
                Manage service-area and location pages.
              </p>
            </div>
          </div>
        </div>

        <LocationToolbar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          onReset={resetFilters}
        />

        <LocationTable locations={filteredLocations} />
      </div>
    </div>
  );
}