"use client";

import Link from "next/link";
import { Eye, Pencil, Globe, Trash2, MapPin, Star } from "lucide-react";

export default function LocationTable({
  locations = [],
  onTogglePublish,
  onDelete,
}) {
  if (!locations.length) {
    return (
      <div className="px-5 py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] text-[#2852A0]">
          <MapPin size={22} />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-[#081828]">
          No locations found
        </h3>

        <p className="mt-1 text-sm text-[#888888]">
          Add a location or adjust your search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        <thead className="bg-[#FAFAFA]">
          <tr className="border-y border-[#EEEEEE]">
            <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              Location
            </th>

            <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              City / State
            </th>

            <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              Service Areas
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
          {locations.map((location) => {
            const isPublished = location.status === "published";
            const serviceAreaCount = Array.isArray(location.serviceAreas)
              ? location.serviceAreas.length
              : 0;

            return (
              <tr
                key={location.id}
                className="group transition-colors hover:bg-[#FAFBFD]"
              >
                {/* Location title and description */}
                <td className="px-5 py-3.5">
                  <div className="flex min-w-0 items-center gap-3">
                    {location.image?.src ? (
                      <img
                        src={location.image.src}
                        alt={location.image.alt || location.title}
                        loading="lazy"
                        className="h-12 w-12 shrink-0 rounded-lg border border-[#EEEEEE] object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#E7ECF5] bg-[#F3F6FC] text-[#2852A0]">
                        <MapPin size={19} />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-[#081828]">
                          {location.title}
                        </p>

                        {location.featured && (
                          <span
                            title="Featured location"
                            className="inline-flex shrink-0 items-center justify-center rounded bg-amber-50 p-1 text-amber-600"
                          >
                            <Star size={12} fill="currentColor" />
                          </span>
                        )}
                      </div>

                      <p className="mt-1 max-w-[420px] truncate text-xs text-[#888888]">
                        {location.description
                          ?.replace(/<[^>]*>/g, " ")
                          .replace(/\s+/g, " ")
                          .trim() || "No description added yet"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* City and state */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2 text-sm text-[#555555]">
                    <MapPin size={14} className="shrink-0 text-[#999999]" />
                    <span>
                      {[location.city, location.state]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </span>
                  </div>
                </td>

                {/* Service areas */}
                <td className="px-4 py-3.5">
                  {serviceAreaCount > 0 ? (
                    <span className="inline-flex items-center rounded-md bg-[#F3F5F9] px-2.5 py-1.5 text-xs font-medium text-[#52627A]">
                      {serviceAreaCount}{" "}
                      {serviceAreaCount === 1 ? "area" : "areas"}
                    </span>
                  ) : (
                    <span className="text-sm text-[#AAAAAA]">Not added</span>
                  )}
                </td>

                {/* Publishing status */}
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      isPublished
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isPublished ? "bg-green-600" : "bg-amber-500"
                      }`}
                    />
                    {isPublished ? "Published" : "Draft"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    {isPublished && (
                      <Link
                        href={`/locations/${location.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View public page"
                        aria-label={`View ${location.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] transition hover:bg-blue-50 hover:text-[#2852A0]"
                      >
                        <Eye size={16} />
                      </Link>
                    )}

                    <Link
                      href={`/admin/locations/${location.id}`}
                      title="Edit location"
                      aria-label={`Edit ${location.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] transition hover:bg-blue-50 hover:text-[#2852A0]"
                    >
                      <Pencil size={15} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onTogglePublish?.(location)}
                      title={isPublished ? "Move to draft" : "Publish location"}
                      aria-label={
                        isPublished
                          ? `Move ${location.title} to draft`
                          : `Publish ${location.title}`
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] transition hover:bg-blue-50 hover:text-[#2852A0]"
                    >
                      <Globe size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(location)}
                      title="Delete location"
                      aria-label={`Delete ${location.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] transition hover:bg-red-50 hover:text-red-600"
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
