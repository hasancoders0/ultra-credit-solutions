"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import LocationStats from "@/components/admin/locations/LocationStats";
import LocationToolbar from "@/components/admin/locations/LocationToolbar";
import LocationTable from "@/components/admin/locations/LocationTable";
import LocationDeleteDialog from "@/components/admin/locations/LocationDeleteDialog";

import {
  deleteAdminLocation,
  getAdminLocations,
  saveAdminLocations,
  LOCATION_STORAGE_KEY,
  LOCATION_UPDATED_EVENT,
} from "@/lib/admin-locations";

const PAGE_SIZES = [10, 20, 50, 100];

export default function LocationsPage() {
  const router = useRouter();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("order");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletingLocation, setDeletingLocation] = useState(null);

  const refreshLocations = useCallback(() => {
    setLocations(getAdminLocations());
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshLocations();

    const onStorage = (event) => {
      if (event.key === LOCATION_STORAGE_KEY) refreshLocations();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(LOCATION_UPDATED_EVENT, refreshLocations);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(LOCATION_UPDATED_EVENT, refreshLocations);
    };
  }, [refreshLocations]);

  const stats = useMemo(
    () => ({
      total: locations.length,
      published: locations.filter((item) => item.status === "published").length,
      draft: locations.filter((item) => item.status === "draft").length,
    }),
    [locations]
  );

  const filteredLocations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return locations
      .filter((item) => {
        const matchesSearch =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.slug.toLowerCase().includes(query) ||
          item.city.toLowerCase().includes(query) ||
          item.state.toLowerCase().includes(query);

        return (
          matchesSearch &&
          (statusFilter === "all" || item.status === statusFilter)
        );
      })
      .sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "updated") {
          return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
        }
        return a.order - b.order;
      });
  }, [locations, search, statusFilter, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy, pageSize]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLocations.length / pageSize)
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedLocations = filteredLocations.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  function togglePublish(location) {
    const status =
      location.status === "published" ? "draft" : "published";

    if (status === "published" && !location.introduction?.trim()) {
      toast.error("Add a location introduction before publishing.");
      router.push(`/admin/locations/${location.id}`);
      return;
    }

    try {
      const next = locations.map((item) =>
        String(item.id) === String(location.id)
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item
      );

      saveAdminLocations(next);
      setLocations(next);
      toast.success(
        status === "published" ? "Location published." : "Location moved to draft."
      );
    } catch {
      toast.error("Could not update location.");
    }
  }

  function confirmDelete() {
    if (!deletingLocation) return;

    try {
      setLocations(deleteAdminLocation(deletingLocation.id));
      setDeletingLocation(null);
      toast.success("Location deleted.");
    } catch {
      toast.error("Could not delete location.");
    }
  }

  const from = filteredLocations.length
    ? (safePage - 1) * pageSize + 1
    : 0;
  const to = Math.min(safePage * pageSize, filteredLocations.length);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#888888]">
          <a href="/admin" className="hover:text-[#2852A0]">Dashboard</a>
          <span>/</span>
          <span className="text-[#555555]">Locations</span>
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#081828]">
          Locations
        </h1>
        <p className="mt-1 text-sm text-[#888888]">
          Manage location pages, content, featured images and SEO metadata.
        </p>
      </div>

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
          <div className="px-5 py-16 text-center text-sm text-[#888888]">
            Loading locations...
          </div>
        ) : (
          <LocationTable
            locations={paginatedLocations}
            onTogglePublish={togglePublish}
            onDelete={setDeletingLocation}
          />
        )}

        {!loading && (
          <div className="flex flex-col gap-3 border-t border-[#EEEEEE] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#888888]">
              <label htmlFor="location-page-size">Show</label>
              <select
                id="location-page-size"
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
                className="h-9 rounded-lg border border-[#EEEEEE] bg-white px-2 text-sm"
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <span>per page</span>
              <span>Showing {from}–{to} of {filteredLocations.length}</span>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="h-9 rounded-lg border border-[#EEEEEE] px-3 text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-[#555555]">
                Page {safePage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                className="h-9 rounded-lg border border-[#EEEEEE] px-3 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      <LocationDeleteDialog
        location={deletingLocation}
        onCancel={() => setDeletingLocation(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}