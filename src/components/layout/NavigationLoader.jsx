"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationLoader() {
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressTimerRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  // Hide the loader when the destination pathname changes.
  useEffect(() => {
    setLoading(false);
    setProgress(0);

    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current);
      progressTimerRef.current = null;
    }

    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, [pathname]);

  // Detect internal link clicks across the website.
  useEffect(() => {
    function clearTimers() {
      if (progressTimerRef.current) {
        clearTimeout(progressTimerRef.current);
        progressTimerRef.current = null;
      }

      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    }

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
        link.getAttribute("aria-disabled") === "true" ||
        link.hasAttribute("data-no-navigation-loader")
      ) {
        return;
      }

      let url;

      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      if (
        url.origin !== window.location.origin ||
        url.pathname === window.location.pathname
      ) {
        return;
      }

      clearTimers();

      setLoading(true);
      setProgress(25);

      progressTimerRef.current = setTimeout(() => {
        setProgress(70);
      }, 200);

      // Avoid leaving the loader visible indefinitely if navigation fails.
      fallbackTimerRef.current = setTimeout(() => {
        setLoading(false);
        setProgress(0);
        clearTimers();
      }, 10000);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      clearTimers();
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
      {/* Top progress bar */}
      <div className="h-1 w-full bg-[#2852A0]/10">
        <div
          className="h-full bg-[#2852A0] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading indicator */}
      <div className="fixed right-4 top-20 flex items-center gap-2 rounded-full border border-[#E8EDF5] bg-white/95 px-3 py-2 text-xs font-medium text-[#2852A0] shadow-lg">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#2852A0]/25 border-t-[#2852A0]" />
        Loading page...
      </div>
    </div>
  );
}
