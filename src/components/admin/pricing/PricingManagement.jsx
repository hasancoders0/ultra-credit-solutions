"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

import PricingToolbar from "@/components/admin/pricing/PricingToolbar";
import PricingTable from "@/components/admin/pricing/PricingTable";

export default function PricingManagement({
  initialPlans = [],
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredPlans = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialPlans.filter((plan) => {
      const searchableText = [
        plan.name,
        plan.slug,
        plan.description,
        plan.note,
        ...plan.features,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      // The existing pricing data has no status field.
      // Until the data model includes one, treat plans as demo items.
      const planStatus = plan.status || "draft";

      const matchesStatus =
        status === "all" || planStatus === status;

      return matchesSearch && matchesStatus;
    });
  }, [initialPlans, search, status]);

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
              <CreditCard size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl">
                Pricing
              </h1>

              <p className="mt-1 text-sm text-[#888888]">
                Manage your existing pricing plans.
              </p>
            </div>
          </div>
        </div>

        <PricingToolbar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          onReset={resetFilters}
        />

        <PricingTable plans={filteredPlans} />
      </div>
    </div>
  );
}