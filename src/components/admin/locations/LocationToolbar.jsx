import { Plus, Search } from "lucide-react";

export default function LocationToolbar({
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
    <div className="space-y-4 border-b border-[#EEEEEE] p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-[#081828]">All Locations</h2>
          <p className="mt-1 text-xs text-[#888888]">
            Showing {filteredTotal} of {total} locations
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white hover:bg-[#214688]"
        >
          <Plus size={16} /> Add Location
        </button>
      </div>

      <div className="flex flex-col gap-2 md:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search title, city, state or slug..."
            className="h-10 w-full rounded-lg border border-[#EEEEEE] pl-9 pr-3 text-sm outline-none focus:border-[#2852A0]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          className="h-10 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-10 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm"
        >
          <option value="order">Display Order</option>
          <option value="title">Title</option>
          <option value="updated">Last Updated</option>
        </select>
      </div>
    </div>
  );
}