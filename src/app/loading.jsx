
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#2852A0]/15 border-t-[#2852A0]" />

          <div className="h-3 w-3 animate-pulse rounded-full bg-[#2852A0]" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-[#081828]">
            Loading
          </p>

          <p className="mt-1 text-xs text-[#666666]">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
}
