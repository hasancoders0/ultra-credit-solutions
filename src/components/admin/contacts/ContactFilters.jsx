"use client";

import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ContactFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-[#EEEEEE] p-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
      {/* Search — left */}
      <div className="relative w-full sm:max-w-[340px]">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search contacts or replies..."
          aria-label="Search contacts and replies"
          className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-3 text-sm text-[#081828] outline-none transition placeholder:text-[#999999] hover:border-[#D8DDE5] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Status filter — right */}
      <div className="relative w-full sm:w-[176px]">
        <SlidersHorizontal
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
        />

        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          aria-label="Filter contacts by status"
          className="h-10 w-full appearance-none rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-9 text-sm text-[#081828] outline-none transition hover:border-[#D8DDE5] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All statuses</option>
          <option value="New">New</option>
          <option value="Read">Read</option>
          <option value="Reply Drafted">Reply Drafted</option>
          <option value="Replied">Replied</option>
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
        />
      </div>
    </div>
  );
}