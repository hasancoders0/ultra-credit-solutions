"use client";

import {
  Eye,
  Trash2,
  Mail,
  Users,
} from "lucide-react";

const statusStyles = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-amber-50 text-amber-700",
  qualified: "bg-purple-50 text-purple-700",
  converted: "bg-green-50 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

const statusLabels = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  converted: "Converted",
  closed: "Closed",
};

export default function LeadTable({ leads, onView, onDelete }) {
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  }

  if (!leads.length) {
    return (
      <div className="rounded-xl border border-[#EEEEEE] bg-white px-5 py-16 text-center">
        <Users
          size={36}
          className="mx-auto mb-3 text-[#888888]"
        />

        <h3 className="font-semibold text-[#081828]">
          No leads found
        </h3>

        <p className="mt-1 text-sm text-[#888888]">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-[#F9F9F9]">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#888888]">
                Customer
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#888888]">
                Source
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#888888]">
                Date
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#888888]">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#888888]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EEEEEE]">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="transition hover:bg-[#FAFBFD]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2852A0]/10 text-sm font-semibold text-[#2852A0]">
                      {lead.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium text-[#081828]">
                        {lead.name}
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-sm text-[#888888]">
                        <Mail size={13} />
                        {lead.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-md bg-[#F3F5F9] px-3 py-1.5 text-xs font-medium text-[#2852A0]">
                    {lead.source}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-[#666666]">
                  {formatDate(lead.createdAt)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                      statusStyles[lead.status] ||
                      statusStyles.new
                    }`}
                  >
                    {statusLabels[lead.status] || "New"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(lead)}
                      aria-label={`View ${lead.name}`}
                      className="rounded-lg border border-[#EEEEEE] p-2.5 text-[#2852A0] transition hover:bg-blue-50"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(lead)}
                      aria-label={`Delete ${lead.name}`}
                      className="rounded-lg border border-[#EEEEEE] p-2.5 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#EEEEEE] px-5 py-4 text-sm text-[#888888]">
        Showing {leads.length} lead{leads.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}