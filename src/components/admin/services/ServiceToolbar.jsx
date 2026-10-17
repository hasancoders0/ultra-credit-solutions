
"use client";

import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Plus,
} from "lucide-react";

export default function ServiceToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories = [],
  statusFilter,
  onStatusChange,
}) {
  const selectClass =
    "h-10 w-full appearance-none rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-8 text-sm text-[#081828] outline-none transition hover:border-[#D8DDE5] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

  return (
    <div className="border-b border-[#EEEEEE] p-3 sm:p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative w-full sm:min-w-[200px] sm:flex-1 xl:max-w-[300px]">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search services..."
              aria-label="Search services"
              className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-3 text-sm outline-none placeholder:text-[#999999] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative w-full sm:w-[190px]">
            <SlidersHorizontal
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
            />
            <select
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
              aria-label="Filter services by category"
              className={selectClass}
            >
              <option value="all">All Categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
            />
          </div>

          <div className="relative w-full sm:w-[160px]">
            <SlidersHorizontal
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
            />
            <select
              value={statusFilter}
              onChange={(event) => onStatusChange(event.target.value)}
              aria-label="Filter services by status"
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
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white transition hover:bg-[#1F4386]"
        >
          <Plus size={17} />
          Add Service
        </Link>
      </div>
    </div>
  );
}
