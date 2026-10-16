"use client";

import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Plus,
} from "lucide-react";

export default function BlogToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  categories,
}) {
  const selectClass =
    "h-10 w-full appearance-none rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-8 text-sm text-[#081828] outline-none transition hover:border-[#D8DDE5] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

  return (
    <div className="space-y-3 border-b border-[#EEEEEE] p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[340px]">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search blog posts..."
            aria-label="Search blog posts"
            className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-3 text-sm text-[#081828] outline-none placeholder:text-[#999999] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white transition hover:bg-[#1F4386]"
        >
          <Plus size={17} />
          Create Post
        </Link>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative sm:w-[220px]">
          <SlidersHorizontal
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />

          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            aria-label="Filter by category"
            className={selectClass}
          >
            <option value="All">All categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />
        </div>

        <div className="relative sm:w-[170px]">
          <SlidersHorizontal
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />

          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            aria-label="Filter by post status"
            className={selectClass}
          >
            <option value="All">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />
        </div>
      </div>
    </div>
  );
}