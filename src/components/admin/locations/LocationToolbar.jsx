"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, ChevronDown, Plus } from "lucide-react";

export default function LocationToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  total = 0,
  filteredTotal = 0,
  onAdd,
}) {
  const selectClass =
    "h-10 w-full appearance-none rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-8 text-sm text-[#081828] outline-none transition hover:border-[#D8DDE5] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

  return (
    <div className="border-b border-[#EEEEEE] p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search and filters */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-[340px] sm:flex-1 lg:flex-none">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search locations..."
              aria-label="Search locations"
              className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-3 text-sm text-[#081828] outline-none placeholder:text-[#999999] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status filter */}
          <div className="relative w-full sm:w-[170px] sm:shrink-0">
            <SlidersHorizontal
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
            />

            <select
              value={statusFilter}
              onChange={(event) => onStatusChange(event.target.value)}
              aria-label="Filter locations by status"
              className={selectClass}
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
            />
          </div>

          {/* Sort */}
          <div className="relative w-full sm:w-[190px] sm:shrink-0">
            <SlidersHorizontal
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
            />

            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              aria-label="Sort locations"
              className={selectClass}
            >
              <option value="order">Default Order</option>
              <option value="title">Title A–Z</option>
              <option value="updated">Recently Updated</option>
              <option value="state">State A–Z</option>
              <option value="city">City A–Z</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
            />
          </div>
        </div>

        {/* Add Location */}
        {onAdd ? (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white transition hover:bg-[#1F4386]"
          >
            <Plus size={17} />
            Add Location
          </button>
        ) : (
          <Link
            href="/admin/locations/new"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white transition hover:bg-[#1F4386]"
          >
            <Plus size={17} />
            Add Location
          </Link>
        )}
      </div>
    </div>
  );
}
