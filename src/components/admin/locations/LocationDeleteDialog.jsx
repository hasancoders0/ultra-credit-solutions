import { Trash2 } from "lucide-react";

export default function LocationDeleteDialog({
  location,
  onCancel,
  onConfirm,
}) {
  if (!location) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-location-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Trash2 size={20} />
        </div>
        <h2
          id="delete-location-title"
          className="mt-4 text-lg font-semibold text-[#081828]"
        >
          Delete Location?
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#777777]">
          Delete <strong className="text-[#081828]">{location.title}</strong>?
          This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 rounded-lg border border-[#EEEEEE] px-4 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 rounded-lg bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}