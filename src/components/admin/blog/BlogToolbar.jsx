"use client";

import Link from "next/link";
import {
  Search,
  Plus,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function BlogToolbar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  categories,
  onReset,
}) {
  const hasFilters =
    search !== "" ||
    category !== "all" ||
    status !== "all";

  return (
    <div className="rounded-2xl border border-[#EEEEEE] bg-white p-4 sm:p-5">
      {/* Toolbar Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#081828]">
            All Blog Posts
          </h2>

          <p className="mt-1 text-sm text-[#888888]">
            Manage your website articles.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2852A0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f4388]"
        >
          <Plus size={18} />
          Create New Post
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, author, or tag..."
            aria-label="Search blog posts"
            className="h-12 w-full rounded-xl border border-[#EEEEEE] bg-[#F9F9F9] pl-11 pr-4 text-sm text-[#081828] outline-none transition placeholder:text-[#999999] focus:border-[#2852A0] focus:bg-white"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <SlidersHorizontal
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
            className="h-12 w-full min-w-44 appearance-none rounded-xl border border-[#EEEEEE] bg-white pl-10 pr-8 text-sm text-[#666666] outline-none focus:border-[#2852A0]"
          >
            <option value="all">All Categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter by status"
          className="h-12 min-w-36 rounded-xl border border-[#EEEEEE] bg-white px-4 text-sm text-[#666666] outline-none focus:border-[#2852A0]"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* Reset Filters */}
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