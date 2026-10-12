"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Plus } from "lucide-react";

export default function PricingToolbar({ onSearch, onFilter }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  function handleSearch(value) {
    setSearch(value);
    onSearch?.(value);
  }

  function handleFilter(value) {
    setFilter(value);
    onFilter?.(value);
  }

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-[#EEEEEE] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search pricing plans..."
            className="h-11 w-full rounded-lg border border-[#EEEEEE] bg-white pl-10 pr-4 text-sm text-[#081828] outline-none transition focus:border-[#2852A0]"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => handleFilter(e.target.value)}
          className="h-11 rounded-lg border border-[#EEEEEE] bg-white px-4 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
        >
          <option value="all">All Plans</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="featured">Featured</option>
        </select>
      </div>

      <Link
        href="/admin/pricing/new"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-5 text-sm font-medium text-white transition hover:bg-[#1F4385]"
      >
        <Plus size={18} />
        Add Pricing Plan
      </Link>
    </div>
  );
}