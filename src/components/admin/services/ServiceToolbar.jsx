
"use client";

import { Plus, Search, ArrowUpDown } from "lucide-react";

export default function ServiceToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  total,
  filteredTotal,
  onAdd,
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#EEEEEE] p-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-base font-semibold text-[#081828]">
          All Services
        </h2>
        <p className="mt-1 text-xs text-[#888888]">
          Showing {filteredTotal} of {total} services
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <div className="relative min-w-0 sm:w-56">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search services..."
            aria-label="Search services"
            className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-3 text-sm outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          aria-label="Filter services by status"
          className="h-10 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#555555] outline-none focus:border-[#2852A0]"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <label className="flex h-10 items-center gap-2 rounded-lg border border-[#EEEEEE] px-3">
          <ArrowUpDown size={15} className="text-[#888888]" />
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Sort services"
            className="min-w-0 bg-transparent text-sm text-[#555555] outline-none"
          >
            <option value="order">Display Order</option>
            <option value="title">Title</option>
            <option value="updated">Recently Updated</option>
          </select>
        </label>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white transition hover:bg-[#1F4386]"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>
    </div>
  );
}
