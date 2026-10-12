"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  BriefcaseBusiness,
} from "lucide-react";

import ServiceToolbar from "@/components/admin/services/ServiceToolbar";
import ServiceTable from "@/components/admin/services/ServiceTable";

export default function ServiceManagement({
  initialServices = [],
}) {
  const [services] = useState(initialServices);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const searchableText = [
        service.title,
        service.slug,
        service.description,
        service.content?.introduction,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const serviceStatus =
        service.status === "inactive"
          ? "inactive"
          : "active";

      const matchesStatus =
        status === "all" || serviceStatus === status;

      return matchesSearch && matchesStatus;
    });
  }, [services, search, status]);

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 xl:p-8">
        {/* Page Header */}
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
              <BriefcaseBusiness size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl">
                Services
              </h1>

              <p className="mt-1 text-sm text-[#888888]">
                Manage your website services and descriptions.
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <ServiceToolbar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          onReset={resetFilters}
        />

        {/* Services Table */}
        <ServiceTable services={filteredServices} />
      </div>
    </div>
  );
}