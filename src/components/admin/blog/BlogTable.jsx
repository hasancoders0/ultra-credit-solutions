"use client";

import { useState } from "react";
import Link from "next/link";

import {
  MoreHorizontal,
  Pencil,
  Eye,
  Star,
  CalendarDays,
  FileText,
} from "lucide-react";

function StatusBadge({ status }) {
  const isPublished = status === "published";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
        isPublished
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isPublished
            ? "bg-emerald-500"
            : "bg-amber-500"
        }`}
      />

      {isPublished ? "Published" : "Draft"}
    </span>
  );
}

function formatDate(date) {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostActions({ blog }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={`Actions for ${blog.title}`}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#888888] transition hover:bg-[#F9F9F9] hover:text-[#081828]"
      >
        <MoreHorizontal size={20} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close actions menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-[#EEEEEE] bg-white p-1.5 shadow-xl">
            <Link
              href={`/admin/blog/${blog.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#666666] transition hover:bg-[#F9F9F9] hover:text-[#2852A0]"
            >
              <Pencil size={16} />
              Edit Article
            </Link>

            <Link
              href={`/blog/${blog.slug}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#666666] transition hover:bg-[#F9F9F9] hover:text-[#2852A0]"
            >
              <Eye size={16} />
              Preview Article
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function BlogTable({ blogs }) {
  if (!blogs.length) {
    return (
      <div className="rounded-2xl border border-[#EEEEEE] bg-white px-5 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2852A0]/10 text-[#2852A0]">
          <FileText size={25} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-[#081828]">
          No articles found
        </h3>

        <p className="mt-2 text-sm text-[#888888]">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#EEEEEE] bg-[#F9F9F9]">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Article
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Category
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Last Updated
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Featured
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EEEEEE]">
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="transition hover:bg-[#F9F9F9]/70"
              >
                {/* Article */}
                <td className="px-5 py-4">
                  <div className="flex min-w-[280px] items-center gap-3">
                    <div className="h-[58px] w-[76px] shrink-0 overflow-hidden rounded-lg bg-[#F9F9F9]">
                      {blog.featuredImage?.src ? (
                        <img
                          src={blog.featuredImage.src}
                          alt={
                            blog.featuredImage.alt ||
                            blog.title
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#888888]">
                          <FileText size={22} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/admin/blog/${blog.id}`}
                        className="line-clamp-2 text-sm font-semibold text-[#081828] transition hover:text-[#2852A0]"
                      >
                        {blog.title}
                      </Link>

                      <p className="mt-1 text-xs text-[#888888]">
                        By {blog.author || "Administrator"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-4">
                  <span className="rounded-lg bg-[#F9F9F9] px-3 py-1.5 text-xs font-medium text-[#666666]">
                    {blog.category || "Uncategorized"}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <StatusBadge status={blog.status} />
                </td>

                {/* Updated Date */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 whitespace-nowrap text-sm text-[#666666]">
                    <CalendarDays
                      size={15}
                      className="text-[#888888]"
                    />

                    {formatDate(
                      blog.updatedAt || blog.publishedAt
                    )}
                  </div>
                </td>

                {/* Featured */}
                <td className="px-5 py-4">
                  {blog.featured ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600">
                      <Star
                        size={15}
                        fill="currentColor"
                      />
                      Featured
                    </span>
                  ) : (
                    <span className="text-xs text-[#888888]">
                      Standard
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <PostActions blog={blog} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#EEEEEE] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#888888]">
          Showing {blogs.length}{" "}
          {blogs.length === 1 ? "article" : "articles"}
        </p>

        <p className="text-xs text-[#999999]">
          Demo data · Database not connected
        </p>
      </div>
    </div>
  );
}