"use client";

import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#E8EDF5] bg-white px-6 py-3 text-sm font-semibold text-[#2852A0] transition-colors hover:bg-[#F7F9FC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2852A0]"
    >
      <ArrowLeft size={17} />
      Go Back
    </button>
  );
}