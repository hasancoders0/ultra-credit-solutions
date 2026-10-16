
"use client";

import { Children, useEffect, useState } from "react";

export default function Pagination({
  children,
  pageSize = 12,
  className = "",
  gridClassName = "",
}) {
  const items = Children.toArray(children);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems, pageSize]);

  const startIndex = (currentPage - 1) * pageSize;
  const visibleItems = items.slice(startIndex, startIndex + pageSize);

  if (pageSize < 1 || totalItems === 0) {
    return null;
  }

  const showPagination = totalItems > pageSize;

  function goToPage(page) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }

  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    return pages;
  }

  return (
    <div className={className}>
      <div className={gridClassName}>
        {visibleItems}
      </div>

      {showPagination && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#EEEEEE] pt-6 sm:flex-row"
        >
          <p className="text-sm text-[#777777]">
            Showing{" "}
            <span className="font-semibold text-[#081828]">
              {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#081828]">
              {totalItems}
            </span>{" "}
            items
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium text-[#2852A0] transition-colors hover:bg-[#EEF3FC] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span aria-hidden="true">←</span>
              <span className="hidden sm:inline">Previous</span>
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition-colors ${
                  currentPage === page
                    ? "border-[#2852A0] bg-[#2852A0] text-white"
                    : "border-[#E5E7EB] bg-white text-[#2852A0] hover:bg-[#EEF3FC]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium text-[#2852A0] transition-colors hover:bg-[#EEF3FC] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="hidden sm:inline">Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
