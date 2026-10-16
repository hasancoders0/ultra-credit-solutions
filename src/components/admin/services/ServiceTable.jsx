
"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
  Globe,
  FilePenLine,
  Image as ImageIcon,
  GripVertical,
} from "lucide-react";

const statusStyles = {
  published: "bg-green-50 text-green-700",
  draft: "bg-amber-50 text-amber-700",
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

export default function ServiceTable({
  services,
  onTogglePublish,
  onDelete,
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA]">
            {["SERVICE", "ORDER", "UPDATED", "STATUS"].map((heading) => (
              <th
                key={heading}
                className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#888888]"
              >
                {heading}
              </th>
            ))}
            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-[#888888]">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#EEEEEE]">
          {services.length ? (
            services.map((service) => {
              const published = service.status === "published";

              return (
                <tr
                  key={service.id}
                  className="transition hover:bg-[#FAFBFD]"
                >
                  <td className="max-w-[460px] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-[58px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#EEEEEE] bg-[#F4F6FA]">
                        {service.image?.src ? (
                          <img
                            src={service.image.src}
                            alt={service.image.alt || service.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon
                            size={21}
                            className="text-[#A0A8B5]"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="line-clamp-1 text-sm font-semibold text-[#081828]">
                          {service.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-[#888888]">
                          /services/{service.slug}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#999999]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#F4F6FA] px-2.5 py-1 text-xs font-medium text-[#555F70]">
                      <GripVertical size={13} />
                      {service.order}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#666666]">
                    {formatDate(service.updatedAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[service.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {service.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {published ? (
                        <Link
                          href={`/services/${service.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View published service"
                          aria-label={`View ${service.title}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777777] transition hover:bg-blue-50 hover:text-[#2852A0]"
                        >
                          <Eye size={16} />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          disabled
                          title="Publish this service before viewing it publicly"
                          aria-label={`View unavailable for ${service.title}`}
                          className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg text-gray-300 opacity-60"
                        >
                          <Eye size={16} />
                        </button>
                      )}

                      <Link
                        href={`/admin/services/${service.id}`}
                        title="Edit service"
                        aria-label={`Edit ${service.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777777] transition hover:bg-blue-50 hover:text-[#2852A0]"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onTogglePublish(service)}
                        title={published ? "Unpublish service" : "Publish service"}
                        aria-label={`Change status of ${service.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777777] transition hover:bg-green-50 hover:text-green-700"
                      >
                        {published ? (
                          <FilePenLine size={16} />
                        ) : (
                          <Globe size={16} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(service)}
                        title="Delete service"
                        aria-label={`Delete ${service.title}`}
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
              <td colSpan={5} className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                  <ImageIcon size={22} className="text-[#888888]" />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#081828]">
                  No services found
                </p>
                <p className="mt-1 text-sm text-[#888888]">
                  Try another search or create a new service.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
