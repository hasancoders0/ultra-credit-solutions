"use client";

import { Search, Filter } from "lucide-react";

export default function LeadFilters({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
}) {
  return (
    <div className="rounded-xl border border-[#EEEEEE] bg-white p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative xl:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="h-11 w-full rounded-lg border border-[#EEEEEE] pl-10 pr-4 text-sm text-[#081828] outline-none transition focus:border-[#2852A0]"
          />
        </div>

        <div className="relative">
          <Filter
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 w-full appearance-none rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-3 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="h-11 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
        >
          <option value="all">All Sources</option>
          <option value="Website">Website</option>
          <option value="Blog">Blog</option>
          <option value="Landing Page">Landing Page</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}