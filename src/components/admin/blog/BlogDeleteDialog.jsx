"use client";

import { AlertTriangle, X, Trash2 } from "lucide-react";

export default function BlogDeleteDialog({
  post,
  onCancel,
  onConfirm,
}) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#081828]/40 p-4 backdrop-blur-[2px]">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-blog-title"
        className="w-full max-w-[420px] rounded-2xl border border-[#EEEEEE] bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle size={21} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close delete confirmation"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#777777] hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <h2
          id="delete-blog-title"
          className="mt-4 text-lg font-semibold text-[#081828]"
        >
          Delete blog post?
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#666666]">
          You are about to delete{" "}
          <span className="font-semibold text-[#081828]">
            {post.title}
          </span>
          . This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 rounded-lg border border-[#EEEEEE] px-4 text-sm font-medium text-[#555555] hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700"
          >
            <Trash2 size={15} />
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
}