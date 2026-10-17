"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ServiceStats from "@/components/admin/services/ServiceStats";
import ServiceToolbar from "@/components/admin/services/ServiceToolbar";
import ServiceTable from "@/components/admin/services/ServiceTable";
import ServiceDeleteDialog from "@/components/admin/services/ServiceDeleteDialog";

import categoriesData from "@/data/categories";
import {
  deleteAdminService,
  getAdminServices,
  saveAdminServices,
  SERVICE_STORAGE_KEY,
  SERVICE_UPDATED_EVENT,
} from "@/lib/admin-services";

const PAGE_SIZES = [10, 20, 50, 100];

export default function ServicesPage() {
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletingService, setDeletingService] = useState(null);

  const serviceCategories = useMemo(
    () =>
      (categoriesData.services || []).filter(
        (item) => item.status === "active",
      ),
    [],
  );

  const refreshServices = useCallback(() => {
    setServices(getAdminServices());
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshServices();

    const onStorage = (event) => {
      if (event.key === SERVICE_STORAGE_KEY) refreshServices();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(SERVICE_UPDATED_EVENT, refreshServices);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(SERVICE_UPDATED_EVENT, refreshServices);
    };
  }, [refreshServices]);

  const stats = useMemo(
    () => ({
      total: services.length,
      published: services.filter((item) => item.status === "published").length,
      drafts: services.filter((item) => item.status === "draft").length,
      featured: services.filter((item) => item.featured).length,
    }),
    [services],
  );

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services
      .filter((service) => {
        const matchesSearch =
          !query ||
          (service.title || "").toLowerCase().includes(query) ||
          (service.description || "").toLowerCase().includes(query) ||
          (service.slug || "").toLowerCase().includes(query) ||
          (service.category || "").toLowerCase().includes(query);

        const matchesCategory =
          category === "all" || service.category === category;

        const matchesStatus =
          statusFilter === "all" || service.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  }, [services, search, category, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, statusFilter, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredServices.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedServices = filteredServices.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function togglePublish(service) {
    const status = service.status === "published" ? "draft" : "published";

    if (status === "published" && !service.content?.introduction?.trim()) {
      toast.error("Add a service introduction before publishing.");
      router.push(`/admin/services/${service.id}`);
      return;
    }

    try {
      const next = services.map((item) =>
        String(item.id) === String(service.id)
          ? {
              ...item,
              status,
              updatedAt: new Date().toISOString().slice(0, 10),
            }
          : item,
      );

      saveAdminServices(next);
      setServices(next);
      toast.success(
        status === "published"
          ? "Service published."
          : "Service moved to draft.",
      );
    } catch {
      toast.error("Could not update service.");
    }
  }

  function confirmDelete() {
    if (!deletingService) return;

    try {
      const next = deleteAdminService(deletingService.id);
      setServices(Array.isArray(next) ? next : getAdminServices());
      setDeletingService(null);
      toast.success("Service deleted.");
    } catch {
      toast.error("Could not delete service.");
    }
  }

  const from = filteredServices.length ? (safePage - 1) * pageSize + 1 : 0;
  const to = Math.min(safePage * pageSize, filteredServices.length);

  return (
    <div className="space-y-5">
      <ServiceStats stats={stats} />

      <section className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
        <ServiceToolbar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={serviceCategories}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {loading ? (
          <div className="px-5 py-16 text-center text-sm text-[#888888]">
            Loading services...
          </div>
        ) : (
          <ServiceTable
            services={paginatedServices}
            onTogglePublish={togglePublish}
            onDelete={setDeletingService}
          />
        )}

        {!loading && (
          <div className="flex flex-col gap-3 border-t border-[#EEEEEE] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#888888]">
              <label htmlFor="service-page-size">Show</label>
              <select
                id="service-page-size"
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
                className="h-9 rounded-lg border border-[#EEEEEE] bg-white px-2 text-sm"
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>per page</span>
              <span>
                Showing {from}–{to} of {filteredServices.length}
              </span>
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
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="h-9 rounded-lg border border-[#EEEEEE] px-3 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      <ServiceDeleteDialog
        service={deletingService}
        onCancel={() => setDeletingService(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
