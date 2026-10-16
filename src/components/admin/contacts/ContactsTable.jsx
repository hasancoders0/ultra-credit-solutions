"use client";

import { Eye, Mail, MessageSquareText } from "lucide-react";

const statusStyles = {
  New: "bg-pink-50 text-[#D94868]",
  Read: "bg-blue-50 text-[#2852A0]",
  "Reply Drafted": "bg-amber-50 text-amber-700",
  Replied: "bg-green-50 text-green-700",
};

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ContactsTable({ contacts, onView }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA]">
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#888888]">
              Contact
            </th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#888888]">
              Message
            </th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#888888]">
              Date
            </th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#888888]">
              Status
            </th>
            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-[#888888]">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#EEEEEE]">
          {contacts.length ? (
            contacts.map((contact) => {
              const replyCount = (contact.replies || []).length;

              return (
                <tr
                  key={contact.id}
                  className="transition hover:bg-[#FAFBFD]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-[#2852A0]">
                        {getInitials(contact.fullName)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#081828]">
                          {contact.fullName}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#888888]">
                          <Mail size={13} className="shrink-0" />
                          <span className="truncate">{contact.email}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="max-w-xs px-5 py-4">
                    <p className="line-clamp-2 text-sm leading-5 text-[#666666]">
                      {contact.message}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#666666]">
                    {formatDate(contact.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[contact.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onView(contact)}
                      aria-label={`View message from ${contact.fullName}`}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm font-medium text-[#2852A0] transition hover:border-[#2852A0] hover:bg-blue-50"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                  <Mail size={22} className="text-[#888888]" />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#081828]">
                  No contacts found
                </p>
                <p className="mt-1 text-sm text-[#888888]">
                  Try another search term or status filter.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}