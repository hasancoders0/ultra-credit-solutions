"use client";

import { useEffect, useState } from "react";
import {
  X,
  Mail,
  Phone,
  CalendarDays,
  Globe,
  Save,
} from "lucide-react";

const statuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
];

export default function LeadDetails({
  lead,
  onClose,
  onSave,
}) {
  const [status, setStatus] = useState(lead?.status || "new");
  const [notes, setNotes] = useState(lead?.notes || "");

  useEffect(() => {
    setStatus(lead?.status || "new");
    setNotes(lead?.notes || "");
  }, [lead]);

  if (!lead) return null;

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  function handleSave() {
    onSave({
      ...lead,
      status,
      notes,
    });
  }

  const labelClass =
    "mb-2 block text-sm font-medium text-[#666666]";

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <button
        type="button"
        aria-label="Close lead details"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <aside className="relative flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#EEEEEE] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#081828]">
              Lead Details
            </h2>

            <p className="mt-1 text-sm text-[#888888]">
              Review and manage this inquiry.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-[#666666] hover:bg-[#F9F9F9]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#2852A0]/10 text-lg font-bold text-[#2852A0]">
              {lead.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-[#081828]">
                {lead.name}
              </h3>

              <p className="break-all text-sm text-[#888888]">
                {lead.email}
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-[#EEEEEE] p-4">
            <div className="flex items-start gap-3">
              <Mail
                size={18}
                className="mt-0.5 text-[#888888]"
              />

              <div className="min-w-0">
                <p className={labelClass}>Email Address</p>

                <a
                  href={`mailto:${lead.email}`}
                  className="break-all text-sm text-[#2852A0] hover:underline"
                >
                  {lead.email}
                </a>
              </div>
            </div>

            {lead.phone && (
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 text-[#888888]"
                />

                <div>
                  <p className={labelClass}>Phone</p>

                  <a
                    href={`tel:${lead.phone}`}
                    className="text-sm text-[#2852A0] hover:underline"
                  >
                    {lead.phone}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Globe
                size={18}
                className="mt-0.5 text-[#888888]"
              />

              <div>
                <p className={labelClass}>Lead Source</p>

                <p className="text-sm text-[#081828]">
                  {lead.source}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays
                size={18}
                className="mt-0.5 text-[#888888]"
              />

              <div>
                <p className={labelClass}>Submitted On</p>

                <p className="text-sm text-[#081828]">
                  {formatDate(lead.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-[#081828]">
              Inquiry Message
            </h3>

            <div className="rounded-xl bg-[#F9F9F9] p-4 text-sm leading-7 text-[#666666]">
              {lead.message || "No message provided."}
            </div>
          </div>

          <div>
            <label htmlFor="lead-status" className={labelClass}>
              Lead Status
            </label>

            <select
              id="lead-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-12 w-full rounded-lg border border-[#EEEEEE] bg-white px-4 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
            >
              {statuses.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lead-notes" className={labelClass}>
              Admin Notes
            </label>

            <textarea
              id="lead-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add internal notes about this lead..."
              className="w-full resize-y rounded-lg border border-[#EEEEEE] px-4 py-3 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
            />

            <p className="mt-2 text-xs leading-5 text-[#888888]">
              Internal notes should only be visible to authorized administrators.
            </p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-[#EEEEEE] p-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#EEEEEE] px-4 py-3 text-sm font-medium text-[#081828] hover:bg-[#F9F9F9]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1F4385]"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </aside>
    </div>
  );
}