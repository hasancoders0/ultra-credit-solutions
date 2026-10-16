"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DataPagination({
  currentPage = 1,
  totalPages = 1,
  totalRecords = 0,
  startRecord = 0,
  endRecord = 0,
  onPageChange,
  itemLabel = "records",
  pageSize = 10,
  onPageSizeChange,
  siblingCount = 1,
  className = "",
}) {
  const pagesCount = Math.max(1, Number(totalPages) || 1);

  const activePage = Math.min(
    Math.max(1, Number(currentPage) || 1),
    pagesCount
  );

  const pageItems = useMemo(() => {
    const pages = new Set([1, pagesCount]);

    for (
      let page = Math.max(1, activePage - siblingCount);
      page <= Math.min(pagesCount, activePage + siblingCount);
      page += 1
    ) {
      pages.add(page);
    }

    const sorted = [...pages].sort((a, b) => a - b);
    const result = [];

    sorted.forEach((page, index) => {
      if (index > 0) {
        const previous = sorted[index - 1];
        const difference = page - previous;

        if (difference === 2) {
          result.push(previous + 1);
        } else if (difference > 2) {
          result.push(`ellipsis-${page}`);
        }
      }

      result.push(page);
    });

    return result;
  }, [activePage, pagesCount, siblingCount]);

  const goToPage = (page) => {
    if (
      typeof onPageChange === "function" &&
      page >= 1 &&
      page <= pagesCount &&
      page !== activePage
    ) {
      onPageChange(page);
    }
  };

  const buttonBase =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg text-sm font-medium transition duration-150 disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <div
      className={`flex flex-col gap-4 border-t border-[#EEEEEE] bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${className}`}
    >
      {/* Left: page size + record count */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {typeof onPageSizeChange === "function" && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="contact-page-size"
              className="text-sm text-[#777777]"
            >
              Show
            </label>

            <select
              id="contact-page-size"
              value={pageSize}
              onChange={(event) =>
                onPageSizeChange(Number(event.target.value))
              }
              className="h-9 rounded-lg border border-[#E5E7EB] bg-white px-2.5 text-sm font-medium text-[#081828] outline-none transition hover:border-[#CBD5E1] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-[#777777]">per page</span>
          </div>
        )}

        <p className="text-sm text-[#888888]">
          Showing{" "}
          <span className="font-semibold text-[#081828]">{startRecord}</span>
          {"–"}
          <span className="font-semibold text-[#081828]">{endRecord}</span>
          {" of "}
          <span className="font-semibold text-[#081828]">{totalRecords}</span>
          {" "}
          {itemLabel}
        </p>
      </div>

      {/* Right: compact pagination */}
      <nav
        aria-label="Pagination"
        className="flex items-center gap-1 self-end sm:self-auto"
      >
        <button
          type="button"
          onClick={() => goToPage(activePage - 1)}
          disabled={activePage <= 1}
          aria-label="Previous page"
          title="Previous page"
          className={`${buttonBase} mr-1 border border-[#EEEEEE] bg-white px-2 text-[#666666] hover:border-[#CBD5E1] hover:bg-[#F9FAFB]`}
        >
          <ChevronLeft size={17} />
        </button>

        {pageItems.map((item) => {
          if (typeof item === "string") {
            return (
              <span
                key={item}
                aria-hidden="true"
                className="flex h-9 w-7 items-center justify-center text-[#999999]"
              >
                …
              </span>
            );
          }

          const isActive = item === activePage;

          return (
            <button
              key={item}
              type="button"
              onClick={() => goToPage(item)}
              aria-label={`Go to page ${item}`}
              aria-current={isActive ? "page" : undefined}
              className={`${buttonBase} px-2.5 ${
                isActive
                  ? "bg-[#2852A0] text-white shadow-sm"
                  : "border border-transparent text-[#666666] hover:border-[#EEEEEE] hover:bg-[#F9FAFB] hover:text-[#081828]"
              }`}
            >
              {item}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => goToPage(activePage + 1)}
          disabled={activePage >= pagesCount}
          aria-label="Next page"
          title="Next page"
          className={`${buttonBase} ml-1 border border-[#EEEEEE] bg-white px-2 text-[#666666] hover:border-[#CBD5E1] hover:bg-[#F9FAFB]`}
        >
          <ChevronRight size={17} />
        </button>
      </nav>
    </div>
  );
}