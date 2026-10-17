
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import LocationStats from "@/components/admin/locations/LocationStats";
import LocationToolbar from "@/components/admin/locations/LocationToolbar";
import LocationTable from "@/components/admin/locations/LocationTable";
import LocationDeleteDialog from "@/components/admin/locations/LocationDeleteDialog";
import DataPagination from "@/components/admin/shared/DataPagination";

import {
  deleteAdminLocation,
  getAdminLocations,
  saveAdminLocation,
  LOCATION_UPDATED_EVENT,
} from "@/lib/admin-locations";

const PAGE_SIZES = [10, 20, 50];

export default function LocationsPage() {
  const router = useRouter();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("order");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [deletingLocation, setDeletingLocation] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const refreshLocations = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await getAdminLocations();
      setLocations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load locations:", error);
      setLoadError("Could not load locations. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshLocations();
  }, [refreshLocations]);

  useEffect(() => {
    const handleLocationUpdate = () => {
      refreshLocations();
    };

    window.addEventListener(LOCATION_UPDATED_EVENT, handleLocationUpdate);

    return () => {
      window.removeEventListener(
        LOCATION_UPDATED_EVENT,
        handleLocationUpdate,
      );
    };
  }, [refreshLocations]);

  const stats = useMemo(
    () => ({
      total: locations.length,
      published: locations.filter(
        (location) => location.status === "published",
      ).length,
      drafts: locations.filter(
        (location) => location.status === "draft",
      ).length,
      featured: locations.filter(
        (location) => Boolean(location.featured),
      ).length,
    }),
    [locations],
  );

  const filteredLocations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return locations
      .filter((location) => {
        const searchableFields = [
          location.title,
          location.slug,
          location.city,
          location.state,
        ];

        const matchesSearch =
          !query ||
          searchableFields.some((field) =>
            String(field || "").toLowerCase().includes(query),
          );

        const matchesStatus =
          statusFilter === "all" ||
          location.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "title":
            return String(a.title || "").localeCompare(
              String(b.title || ""),
            );

          case "updated":
            return (
              new Date(b.updatedAt || 0).getTime() -
              new Date(a.updatedAt || 0).getTime()
            );

          case "state":
            return String(a.state || "").localeCompare(
              String(b.state || ""),
            );

          case "city":
            return String(a.city || "").localeCompare(
              String(b.city || ""),
            );

          case "order":
          default:
            return (Number(a.order) || 0) - (Number(b.order) || 0);
        }
      });
  }, [locations, search, statusFilter, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy, pageSize]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLocations.length / pageSize),
  );

  const safePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage !== safePage) {
      setCurrentPage(safePage);
    }
  }, [currentPage, safePage]);

  const startIndex = (safePage - 1) * pageSize;

  const paginatedLocations = filteredLocations.slice(
    startIndex,
    startIndex + pageSize,
  );

  const startRecord = filteredLocations.length > 0 ? startIndex + 1 : 0;

  const endRecord = Math.min(
    startIndex + pageSize,
    filteredLocations.length,
  );

  const togglePublish = async (location) => {
    if (updatingId !== null) return;

    const nextStatus =
      location.status === "published" ? "draft" : "published";

    if (
      nextStatus === "published" &&
      !String(location.introduction || "").trim()
    ) {
      toast.error("Add a location introduction before publishing.");
      router.push(`/admin/locations/${location.id}`);
      return;
    }

    setUpdatingId(String(location.id));

    try {
      const updatedLocation = await saveAdminLocation({
        ...location,
        status: nextStatus,
        updatedAt: new Date().toISOString(),
      });

      setLocations((previous) =>
        previous.map((item) =>
          String(item.id) === String(location.id)
            ? { ...item, ...updatedLocation }
            : item,
        ),
      );

      toast.success(
        nextStatus === "published"
          ? "Location published."
          : "Location moved to draft.",
      );
    } catch (error) {
      console.error("Failed to update location:", error);

      toast.error(
        error?.message || "Could not update location. Please try again.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deletingLocation || deleting) return;

    setDeleting(true);

    try {
      await deleteAdminLocation(deletingLocation.id);

      setLocations((previous) =>
        previous.filter(
          (location) =>
            String(location.id) !== String(deletingLocation.id),
        ),
      );

      setDeletingLocation(null);

      toast.success("Location deleted.");
    } catch (error) {
      console.error("Failed to delete location:", error);

      toast.error(
        error?.message || "Could not delete location. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <LocationStats stats={stats} />

      <section className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
        <LocationToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          total={locations.length}
          filteredTotal={filteredLocations.length}
          onAdd={() => router.push("/admin/locations/new")}
        />

        {loading ? (
          <div
            className="px-5 py-16 text-center text-sm text-[#888888]"
            role="status"
          >
            Loading locations...
          </div>
        ) : loadError ? (
          <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
            <p className="text-sm text-red-600">{loadError}</p>

            <button
              type="button"
              onClick={refreshLocations}
              className="rounded-lg border border-[#EEEEEE] px-4 py-2 text-sm font-medium text-[#081828] transition hover:bg-[#F9F9F9]"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <LocationTable
              locations={paginatedLocations}
              onTogglePublish={togglePublish}
              onDelete={setDeletingLocation}
            />

            <DataPagination
              currentPage={safePage}
              totalPages={totalPages}
              totalRecords={filteredLocations.length}
              startRecord={startRecord}
              endRecord={endRecord}
              onPageChange={setCurrentPage}
              itemLabel="locations"
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </>
        )}
      </section>

      <LocationDeleteDialog
        location={deletingLocation}
        onCancel={() => {
          if (!deleting) {
            setDeletingLocation(null);
          }
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
