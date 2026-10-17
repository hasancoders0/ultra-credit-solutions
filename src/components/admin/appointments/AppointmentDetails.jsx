"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  X,
  Mail,
  CalendarDays,
  UserRound,
  FileText,
  Clock3,
  Save,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

const statusStyles = {
  New: "bg-pink-50 text-[#D94868]",
  Reviewed: "bg-blue-50 text-[#2852A0]",
  Contacted: "bg-sky-50 text-sky-700",
  Closed: "bg-green-50 text-green-700",
};

const availableStatuses = ["New", "Reviewed", "Contacted", "Closed"];

function formatDate(value) {
  if (!value) return "Not recorded";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not recorded";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getInitials(name = "") {
  return String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AppointmentDetails({ appointment, onClose, onUpdate }) {
  const [status, setStatus] = useState(appointment?.status || "New");
  const [adminNotes, setAdminNotes] = useState(appointment?.adminNotes || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!appointment) return;

    setStatus(appointment.status || "New");
    setAdminNotes(appointment.adminNotes || "");
    setSaving(false);
  }, [appointment]);

  useEffect(() => {
    if (!appointment) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !saving) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [appointment, onClose, saving]);

  if (!appointment) return null;

  async function saveChanges(nextStatus = status) {
    if (saving) return;

    setSaving(true);

    try {
      await onUpdate(appointment.id, {
        status: nextStatus,
        adminNotes: adminNotes.trim(),
      });

      setStatus(nextStatus);

      toast.success("Appointment updated", {
        description: "The status and internal notes have been saved.",
      });
    } catch (error) {
      console.error("Saving appointment changes failed:", error);

      toast.error("Unable to save changes", {
        description: error.message || "Please try again in a moment.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function markReviewed() {
    await saveChanges("Reviewed");
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button
        type="button"
        onClick={() => {
          if (!saving) onClose();
        }}
        aria-label="Close appointment details"
        disabled={saving}
        className="absolute inset-0 cursor-default bg-[#081828]/40 backdrop-blur-[2px] disabled:cursor-wait"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-drawer-title"
        className="relative flex h-full w-full max-w-[600px] flex-col bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#EEEEEE] px-5 py-4 sm:px-6">
          <div>
            <h2
              id="appointment-drawer-title"
              className="text-lg font-semibold text-[#081828]"
            >
              Appointment Request
            </h2>

            <p className="mt-1 text-sm text-[#888888]">
              Review the customer&apos;s request and manage its status.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close drawer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#666666] transition hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-base font-semibold text-[#2852A0]">
                {getInitials(appointment.fullName)}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-base font-semibold text-[#081828]">
                  {appointment.fullName || "Unknown customer"}
                </h3>

                <a
                  href={`mailto:${appointment.email || ""}`}
                  className="mt-1 inline-flex max-w-full items-center gap-1.5 break-all text-sm text-[#2852A0] hover:underline"
                >
                  <Mail size={14} className="shrink-0" />
                  {appointment.email || "No email provided"}
                  <ExternalLink size={12} className="shrink-0" />
                </a>

                <div className="mt-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusStyles[status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-4 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <UserRound size={17} className="mt-0.5 text-[#888888]" />

                <div className="min-w-0">
                  <p className="text-xs text-[#888888]">Customer</p>
                  <p className="mt-1 break-words text-sm font-medium text-[#081828]">
                    {appointment.fullName || "Unknown customer"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CalendarDays size={17} className="mt-0.5 text-[#888888]" />

                <div>
                  <p className="text-xs text-[#888888]">Request submitted</p>

                  <p className="mt-1 text-sm font-medium text-[#081828]">
                    {formatDate(
                      appointment.submittedAt || appointment.createdAt,
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#081828]">
              <FileText size={17} />
              Request Details
            </h3>

            <div className="space-y-4 rounded-xl border border-[#EEEEEE] p-4">
              <div>
                <p className="text-xs font-medium text-[#888888]">
                  Requested Service
                </p>

                <p className="mt-1.5 text-sm font-semibold text-[#2852A0]">
                  {appointment.service || "Other"}
                </p>
              </div>

              <div className="border-t border-[#EEEEEE] pt-4">
                <p className="text-xs font-medium text-[#888888]">
                  Customer&apos;s Concerns
                </p>

                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#555555]">
                  {appointment.concerns ||
                    "No additional concerns were provided."}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-[#081828]">
              Request Management
            </h3>

            <div className="space-y-4 rounded-xl border border-[#EEEEEE] p-4">
              <div>
                <label
                  htmlFor="appointment-status"
                  className="mb-2 block text-sm font-medium text-[#081828]"
                >
                  Request Status
                </label>

                <select
                  id="appointment-status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  disabled={saving}
                  className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#081828] outline-none focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                >
                  {availableStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="appointment-admin-notes"
                  className="mb-2 block text-sm font-medium text-[#081828]"
                >
                  Internal Notes
                </label>

                <textarea
                  id="appointment-admin-notes"
                  value={adminNotes}
                  onChange={(event) => setAdminNotes(event.target.value)}
                  disabled={saving}
                  rows={4}
                  maxLength={5000}
                  placeholder="Add follow-up notes for your team..."
                  className="w-full resize-y rounded-lg border border-[#EEEEEE] p-3 text-sm leading-6 text-[#081828] outline-none placeholder:text-[#999999] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                />

                <p className="mt-1 text-right text-xs text-[#999999]">
                  {adminNotes.length}/5000
                </p>
              </div>

              <button
                type="button"
                onClick={() => saveChanges()}
                disabled={saving}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white transition hover:bg-[#1F4386] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </section>

          {status === "New" && (
            <button
              type="button"
              onClick={markReviewed}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 py-2 text-sm font-medium text-[#2852A0] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Clock3 size={16} />
              )}
              Mark as Reviewed
            </button>
          )}
        </div>

        <div className="shrink-0 border-t border-[#EEEEEE] bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="h-11 w-full rounded-lg border border-[#EEEEEE] bg-white text-sm font-medium text-[#081828] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Close
          </button>
        </div>
      </aside>
    </div>
  );
}
