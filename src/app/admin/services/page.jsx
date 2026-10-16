
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ServiceStats from "@/components/admin/services/ServiceStats";
import ServiceToolbar from "@/components/admin/services/ServiceToolbar";
import ServiceTable from "@/components/admin/services/ServiceTable";
import ServiceDeleteDialog from "@/components/admin/services/ServiceDeleteDialog";
import DataPagination from "@/components/admin/shared/DataPagination";

import {
  deleteAdminService,
  getAdminServices,
  saveAdminServices,
  SERVICE_STORAGE_KEY,
  SERVICE_UPDATED_EVENT,
} from "@/lib/admin-services";

const DEFAULT_PAGE_SIZE = 10;

export default function ServicesPage() {
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("order");
  const [deletingService, setDeletingService] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const refreshServices = useCallback(() => {
    setServices(getAdminServices());
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshServices();

    const handleStorage = (event) => {
      if (event.key === SERVICE_STORAGE_KEY) {
        refreshServices();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(SERVICE_UPDATED_EVENT, refreshServices);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(SERVICE_UPDATED_EVENT, refreshServices);
    };
  }, [refreshServices]);

  const stats = useMemo(
    () => ({
      total: services.length,
      published: services.filter(
        (service) => service.status === "published"
      ).length,
      draft: services.filter(
        (service) => service.status === "draft"
      ).length,
    }),
    [services]
  );

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services
      .filter((service) => {
        const matchesSearch =
          !query ||
          (service.title || "").toLowerCase().includes(query) ||
          (service.slug || "").toLowerCase().includes(query) ||
          (service.description || "").toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "all" || service.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "title") {
          return (a.title || "").localeCompare(b.title || "");
        }

        if (sortBy === "updated") {
          return (
            new Date(b.updatedAt || 0).getTime() -
            new Date(a.updatedAt || 0).getTime()
          );
        }

        return (Number(a.order) || 0) - (Number(b.order) || 0);
      });
  }, [services, search, statusFilter, sortBy]);

  // Reset to the first page when the search or filters change.
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredServices.length / pageSize)
  );

  // Keep the current page valid when services are removed or filtered.
  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return filteredServices.slice(startIndex, startIndex + pageSize);
  }, [filteredServices, currentPage, pageSize]);

  function handleTogglePublish(service) {
    const nextStatus =
      service.status === "published" ? "draft" : "published";

    if (
      nextStatus === "published" &&
      !service.content?.introduction?.trim()
    ) {
      toast.error("Add a page introduction before publishing.");
      router.push(`/admin/services/${service.id}`);
      return;
    }

    try {
      const nextServices = services.map((item) =>
        String(item.id) === String(service.id)
          ? {
              ...item,
              status: nextStatus,
              updatedAt: new Date().toISOString(),
            }
          : item
      );

      saveAdminServices(nextServices);
      setServices(nextServices);

      toast.success(
        nextStatus === "published"
          ? "Service published."
          : "Service moved to draft."
      );
    } catch (error) {
      console.error(error);
      toast.error("Could not update the service.");
    }
  }

  function handleDelete() {
    if (!deletingService) return;

    try {
      const nextServices = deleteAdminService(deletingService.id);

      setServices(nextServices);
      setDeletingService(null);

      toast.success("Service deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete the service.");
    }
  }

  function handlePageSizeChange(value) {
    const nextSize = Number(value);

    if (!Number.isFinite(nextSize) || nextSize < 1) return;

    setPageSize(nextSize);
    setCurrentPage(1);
  }

  const showingFrom =
    filteredServices.length === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const showingTo = Math.min(
    currentPage * pageSize,
    filteredServices.length
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#888888]">
          <Link href="/admin" className="hover:text-[#2852A0]">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[#555555]">Services</span>
        </div>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#081828]">
          Services
        </h1>

        <p className="mt-1 text-sm text-[#888888]">
          Manage service pages, content, publishing, and SEO.
        </p>
      </div>

      {/* Statistics */}
      <ServiceStats stats={stats} />

      {/* Services Table */}
      <section className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
        <ServiceToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          total={services.length}
          filteredTotal={filteredServices.length}
          onAdd={() => router.push("/admin/services/new")}
        />

        {loading ? (
          <div className="px-5 py-16 text-center text-sm text-[#888888]">
            Loading services...
          </div>
        ) : (
          <ServiceTable
            services={paginatedServices}
            onTogglePublish={handleTogglePublish}
            onDelete={setDeletingService}
          />
        )}

        {/* Pagination Footer */}
        {!loading && (
          <div className="border-t border-[#EEEEEE]">
            <div className="flex flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#888888]">
                <label htmlFor="service-page-size">Show</label>

                <select
                  id="service-page-size"
                  value={pageSize}
                  onChange={(event) =>
                    handlePageSizeChange(event.target.value)
                  }
                  className="h-9 rounded-lg border border-[#EEEEEE] bg-white px-2 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>

                <span>per page</span>

                <span className="ml-1">
                  Showing{" "}
                  <span className="font-medium text-[#081828]">
                    {showingFrom}–{showingTo}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-[#081828]">
                    {filteredServices.length}
                  </span>{" "}
                  services
                </span>
              </div>

              {/* Page Navigation */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  aria-label="Previous page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EEEEEE] text-[#555555] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={
                      currentPage === page ? "page" : undefined
                    }
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#2852A0] text-white"
                        : "border border-[#EEEEEE] text-[#555555] hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  aria-label="Next page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EEEEEE] text-[#555555] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Delete Confirmation */}
      <ServiceDeleteDialog
        service={deletingService}
        onCancel={() => setDeletingService(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
