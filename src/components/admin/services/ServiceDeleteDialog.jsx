
"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";

export default function ServiceDeleteDialog({
  service,
  onCancel,
  onConfirm,
  deleting = false,
}) {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#081828]/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) {
          onCancel();
        }
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-service-title"
        aria-describedby="delete-service-description"
        className="w-full max-w-md rounded-2xl border border-[#EEEEEE] bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle size={21} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            aria-label="Close dialog"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777777] hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <h2
          id="delete-service-title"
          className="mt-4 text-lg font-semibold text-[#081828]"
        >
          Delete service?
        </h2>

        <p
          id="delete-service-description"
          className="mt-2 text-sm leading-6 text-[#777777]"
        >
          You are about to delete{" "}
          <span className="font-semibold text-[#081828]">
            {service.title}
          </span>
          . This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="h-10 rounded-lg border border-[#EEEEEE] px-4 text-sm font-medium text-[#555555] hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={15} />
            {deleting ? "Deleting..." : "Delete Service"}
          </button>
        </div>
      </div>
    </div>
  );
}
