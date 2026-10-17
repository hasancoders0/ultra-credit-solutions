
"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Globe,
  Trash2,
  BriefcaseBusiness,
  Star,
} from "lucide-react";

export default function ServiceTable({
  services = [],
  onTogglePublish,
  onDelete,
}) {
  if (!services.length) {
    return (
      <div className="px-5 py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] text-[#2852A0]">
          <BriefcaseBusiness size={22} />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-[#081828]">
          No services found
        </h3>
        <p className="mt-1 text-sm text-[#888888]">
          Add a service or adjust your search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] text-left">
        <thead className="bg-[#FAFAFA]">
          <tr className="border-y border-[#EEEEEE]">
            <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              Service
            </th>
            <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              Category
            </th>
            <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              Updated
            </th>
            <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              Status
            </th>
            <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#EEEEEE]">
          {services.map((service) => {
            const published = service.status === "published";
            const description = (service.description || "")
              .replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim();

            return (
              <tr
                key={service.id}
                className="group transition-colors hover:bg-[#FAFBFD]"
              >
                <td className="px-5 py-3.5">
                  <div className="flex min-w-0 items-center gap-3">
                    {service.image?.src ? (
                      <img
                        src={service.image.src}
                        alt={service.image.alt || service.title}
                        loading="lazy"
                        className="h-12 w-12 shrink-0 rounded-lg border border-[#EEEEEE] object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#E7ECF5] bg-[#F3F6FC] text-[#2852A0]">
                        <BriefcaseBusiness size={19} />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-[#081828]">
                          {service.title}
                        </p>
                        {service.featured && (
                          <span
                            title="Featured service"
                            className="inline-flex shrink-0 rounded bg-amber-50 p-1 text-amber-600"
                          >
                            <Star size={12} fill="currentColor" />
                          </span>
                        )}
                      </div>
                      <p className="mt-1 max-w-[380px] truncate text-xs text-[#888888]">
                        {description || "No description added yet"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  {service.category ? (
                    <span className="inline-flex max-w-[190px] truncate rounded-md bg-[#F3F5F9] px-2.5 py-1.5 text-xs font-medium text-[#52627A]">
                      {service.category}
                    </span>
                  ) : (
                    <span className="text-xs text-[#AAAAAA]">
                      Uncategorized
                    </span>
                  )}
                </td>

                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-[#666666]">
                  {service.updatedAt &&
                  !Number.isNaN(new Date(service.updatedAt).getTime())
                    ? new Date(service.updatedAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )
                    : "—"}
                </td>

                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      published
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        published ? "bg-green-600" : "bg-amber-500"
                      }`}
                    />
                    {published ? "Published" : "Draft"}
                  </span>
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    {published && (
                      <Link
                        href={service.href || `/services/${service.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View public service"
                        aria-label={`View ${service.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] hover:bg-blue-50 hover:text-[#2852A0]"
                      >
                        <Eye size={16} />
                      </Link>
                    )}

                    <Link
                      href={`/admin/services/${service.id}`}
                      title="Edit service"
                      aria-label={`Edit ${service.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] hover:bg-blue-50 hover:text-[#2852A0]"
                    >
                      <Pencil size={15} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onTogglePublish?.(service)}
                      title={published ? "Move to draft" : "Publish service"}
                      aria-label={`${published ? "Unpublish" : "Publish"} ${service.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] hover:bg-blue-50 hover:text-[#2852A0]"
                    >
                      <Globe size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(service)}
                      title="Delete service"
                      aria-label={`Delete ${service.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
