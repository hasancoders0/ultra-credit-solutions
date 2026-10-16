"use client";

import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export const APPOINTMENT_SERVICES = [
  "Credit Report Review",
  "Credit Repair Services",
  "Credit Score Information",
  "Credit Building Guidance",
  "Other",
];

export const APPOINTMENT_STATUSES = [
  "New",
  "Reviewed",
  "Contacted",
  "Closed",
];

export default function AppointmentFilters({
  search,
  onSearchChange,
  serviceFilter,
  onServiceFilterChange,
  statusFilter,
  onStatusFilterChange,
}) {
  const selectClass =
    "h-10 w-full appearance-none rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-8 text-sm text-[#081828] outline-none transition hover:border-[#D8DDE5] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

  return (
    <div className="flex flex-col gap-3 border-b border-[#EEEEEE] p-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
      <div className="relative w-full sm:max-w-[320px]">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search requests..."
          aria-label="Search appointment requests"
          className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-3 text-sm text-[#081828] outline-none transition placeholder:text-[#999999] hover:border-[#D8DDE5] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:flex">
        <div className="relative sm:w-[205px]">
          <SlidersHorizontal
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />
          <select
            value={serviceFilter}
            onChange={(event) =>
              onServiceFilterChange(event.target.value)
            }
            aria-label="Filter by requested service"
            className={selectClass}
          >
            <option value="All">All services</option>
            {APPOINTMENT_SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />
        </div>

        <div className="relative sm:w-[155px]">
          <SlidersHorizontal
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
          />
          <select
            value={statusFilter}
            onChange={(event) =>
              onStatusFilterChange(event.target.value)
            }
            aria-label="Filter by request status"
            className={selectClass}
          >
            <option value="All">All statuses</option>
            {APPOINTMENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
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