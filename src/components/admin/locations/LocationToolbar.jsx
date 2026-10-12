"use client";

import Link from "next/link";
import { Search, Plus, X } from "lucide-react";

export default function LocationToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onReset,
}) {
  const hasFilters = search !== "" || status !== "all";

  return (
    <div className="rounded-2xl border border-[#EEEEEE] bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#081828]">
            All Locations
          </h2>

          <p className="mt-1 text-sm text-[#888888]">
            Manage your service-area pages.
          </p>
        </div>

        <Link
          href="/admin/locations/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2852A0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f4388]"
        >
          <Plus size={18} />
          Add New Location
        </Link>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by location, state, or slug..."
            aria-label="Search locations"
            className="h-12 w-full rounded-xl border border-[#EEEEEE] bg-[#F9F9F9] pl-11 pr-4 text-sm text-[#081828] outline-none transition placeholder:text-[#999999] focus:border-[#2852A0] focus:bg-white"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter locations by status"
          className="h-12 min-w-40 rounded-xl border border-[#EEEEEE] bg-white px-4 text-sm text-[#666666] outline-none focus:border-[#2852A0]"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-3 text-sm font-medium text-[#666666] transition hover:bg-[#F9F9F9] hover:text-[#081828]"
          >
            <X size={16} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}