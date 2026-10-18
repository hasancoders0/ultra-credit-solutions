
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setLoading(false);
    setProgress(0);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleClick(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a[href]");

      if (
        !link ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.getAttribute("aria-disabled") === "true"
      ) {
        return;
      }

      const url = new URL(link.href, window.location.href);

      if (
        url.origin !== window.location.origin ||
        (url.pathname === window.location.pathname &&
          url.search === window.location.search)
      ) {
        return;
      }

      setLoading(true);
      setProgress(25);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setProgress(70);
      }, 200);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999]"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="h-1 w-full bg-[#2852A0]/10">
        <div
          className="h-full bg-[#2852A0] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="fixed right-4 top-20 flex items-center gap-2 rounded-full border border-[#E8EDF5] bg-white/95 px-3 py-2 text-xs font-medium text-[#2852A0] shadow-lg">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#2852A0]/25 border-t-[#2852A0]" />
        Loading page...
      </div>
    </div>
  );
}
