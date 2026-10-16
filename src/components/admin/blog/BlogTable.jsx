"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
  Globe,
  FilePenLine,
  CalendarClock,
  Image as ImageIcon,
  Star,
} from "lucide-react";

const statusStyles = {
  published: "bg-green-50 text-green-700",
  draft: "bg-amber-50 text-amber-700",
  scheduled: "bg-blue-50 text-[#2852A0]",
};

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function BlogTable({ posts, onTogglePublish, onDelete }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[950px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA]">
            {["POST", "CATEGORY", "AUTHOR", "UPDATED", "STATUS"].map(
              (heading) => (
                <th
                  key={heading}
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#888888]"
                >
                  {heading}
                </th>
              ),
            )}

            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-[#888888]">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#EEEEEE]">
          {posts.length > 0 ? (
            posts.map((post) => {
              const postStatus = post.status?.toLowerCase();
              const isPublished = postStatus === "published";
              const isDraft = postStatus === "draft";
              const isScheduled = postStatus === "scheduled";
              const canView = isPublished;

              return (
                <tr key={post.id} className="transition hover:bg-[#FAFBFD]">
                  {/* Post details */}
                  <td className="max-w-[400px] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-[58px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#EEEEEE] bg-[#F4F6FA]">
                        {post.featuredImage?.src ? (
                          <img
                            src={post.featuredImage.src}
                            alt={post.featuredImage.alt || post.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={21} className="text-[#A0A8B5]" />
                        )}

                        {post.featured && (
                          <span className="absolute right-1 top-1 rounded bg-white/95 p-1 text-amber-500 shadow-sm">
                            <Star size={11} fill="currentColor" />
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold leading-5 text-[#081828]">
                          {post.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-[#888888]">
                          /{post.slug}
                        </p>

                        <p className="mt-1 line-clamp-1 text-xs text-[#999999]">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-md bg-[#F4F6FA] px-2.5 py-1 text-xs font-medium text-[#555F70]">
                      {post.category || "Uncategorized"}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#555555]">
                    {post.author || "Admin"}
                  </td>

                  {/* Updated date */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#666666]">
                    {formatDate(post.updatedAt || post.publishedAt)}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[postStatus] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {postStatus || "unknown"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {/* View published post only */}
                      {canView ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View published post"
                          aria-label={`View ${post.title}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777777] transition hover:bg-blue-50 hover:text-[#2852A0]"
                        >
                          <Eye size={16} />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          disabled
                          title={
                            isDraft
                              ? "Publish this draft to view it publicly"
                              : isScheduled
                                ? "This post is scheduled and not yet available publicly"
                                : "Only published posts can be viewed publicly"
                          }
                          aria-label={`View unavailable for ${post.title}`}
                          className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg text-gray-300 opacity-60"
                        >
                          <Eye size={16} />
                        </button>
                      )}

                      {/* Edit */}
                      <Link
                        href={`/admin/blog/${post.id}`}
                        title="Edit post"
                        aria-label={`Edit ${post.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777777] transition hover:bg-blue-50 hover:text-[#2852A0]"
                      >
                        <Pencil size={16} />
                      </Link>

                      {/* Publish / Unpublish */}
                      <button
                        type="button"
                        onClick={() => onTogglePublish(post)}
                        title={
                          isPublished
                            ? "Unpublish post"
                            : isScheduled
                              ? "Publish post"
                              : "Publish post"
                        }
                        aria-label={`Change status of ${post.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777777] transition hover:bg-green-50 hover:text-green-700"
                      >
                        {isPublished ? (
                          <FilePenLine size={16} />
                        ) : isScheduled ? (
                          <CalendarClock size={16} />
                        ) : (
                          <Globe size={16} />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(post)}
                        title="Delete post"
                        aria-label={`Delete ${post.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777777] transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                  <FilePenLine size={22} className="text-[#888888]" />
                </div>

                <p className="mt-3 text-sm font-semibold text-[#081828]">
                  No blog posts found
                </p>

                <p className="mt-1 text-sm text-[#888888]">
                  Try another search or create a new post.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
