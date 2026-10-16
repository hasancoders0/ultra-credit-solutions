import Link from "next/link";
import { Eye, Pencil, Globe, Trash2, MapPin } from "lucide-react";

export default function LocationTable({
  locations,
  onTogglePublish,
  onDelete,
}) {
  if (!locations.length) {
    return (
      <div className="px-5 py-16 text-center">
        <MapPin size={28} className="mx-auto text-[#AAAAAA]" />
        <h3 className="mt-3 font-semibold text-[#081828]">
          No locations found
        </h3>
        <p className="mt-1 text-sm text-[#888888]">
          Add a location or adjust the search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] text-left">
        <thead className="bg-[#FAFAFA] text-[11px] uppercase tracking-wide text-[#888888]">
          <tr>
            <th className="px-5 py-3">Location</th>
            <th className="px-4 py-3">City / State</th>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr
              key={location.id}
              className="border-t border-[#EEEEEE] hover:bg-[#FAFBFD]"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  {location.image?.src ? (
                    <img
                      src={location.image.src}
                      alt={location.image.alt || ""}
                      className="h-11 w-11 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F4F6FA] text-[#2852A0]">
                      <MapPin size={18} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#081828]">
                      {location.title}
                    </p>
                    <p className="mt-1 text-xs text-[#888888]">
                      /locations/{location.slug}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-[#555555]">
                {location.city}, {location.state}
              </td>
              <td className="px-4 py-4 text-sm text-[#555555]">
                {location.order}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    location.status === "published"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {location.status}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-1">
                  {location.status === "published" && (
                    <Link
                      href={`/locations/${location.slug}`}
                      title="View public page"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#777777] hover:bg-blue-50 hover:text-[#2852A0]"
                    >
                      <Eye size={16} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/locations/${location.id}`}
                    title="Edit location"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#777777] hover:bg-blue-50 hover:text-[#2852A0]"
                  >
                    <Pencil size={15} />
                  </Link>
                  <button
                    type="button"
                    title="Publish / Unpublish"
                    onClick={() => onTogglePublish(location)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#777777] hover:bg-blue-50 hover:text-[#2852A0]"
                  >
                    <Globe size={15} />
                  </button>
                  <button
                    type="button"
                    title="Delete location"
                    onClick={() => onDelete(location)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#777777] hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}