"use client";

import { CalendarDays, Eye, Mail } from "lucide-react";

const statusStyles = {
  New: "bg-pink-50 text-[#D94868]",
  Reviewed: "bg-blue-50 text-[#2852A0]",
  Contacted: "bg-sky-50 text-sky-700",
  Closed: "bg-green-50 text-green-700",
};

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AppointmentsTable({ appointments, onView }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[850px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA]">
            {["CUSTOMER", "REQUESTED SERVICE", "SUBMITTED", "STATUS"].map(
              (heading) => (
                <th
                  key={heading}
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#888888]"
                >
                  {heading}
                </th>
              )
            )}
            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-[#888888]">
              ACTION
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#EEEEEE]">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="transition hover:bg-[#FAFBFD]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-[#2852A0]">
                      {getInitials(appointment.fullName)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#081828]">
                        {appointment.fullName}
                      </p>
                      <a
                        href={`mailto:${appointment.email}`}
                        className="mt-1 flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#2852A0]"
                      >
                        <Mail size={13} className="shrink-0" />
                        <span className="truncate">{appointment.email}</span>
                      </a>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="max-w-[260px] text-sm font-medium text-[#081828]">
                    {appointment.service}
                  </p>
                  <p className="mt-1 line-clamp-1 max-w-[260px] text-xs text-[#888888]">
                    {appointment.concerns || "No additional details provided"}
                  </p>
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-[#666666]">
                    <CalendarDays size={14} className="text-[#999999]" />
                    {formatDate(appointment.submittedAt)}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusStyles[appointment.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onView(appointment)}
                    aria-label={`View request from ${appointment.fullName}`}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm font-medium text-[#2852A0] transition hover:border-[#2852A0] hover:bg-blue-50"
                  >
                    <Eye size={15} />
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                  <CalendarDays size={22} className="text-[#888888]" />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#081828]">
                  No appointment requests found
                </p>
                <p className="mt-1 text-sm text-[#888888]">
                  Try changing your search or filters.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}