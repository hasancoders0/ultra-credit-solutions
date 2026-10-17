
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  Bell,
  LogOut,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

const pageInfo = [
  {
    path: "/admin",
    title: "Dashboard",
    description: "Overview of your website and business activity",
  },
  {
    path: "/admin/blog",
    title: "Blog Posts",
    description: "Manage your website articles and blog content",
  },
  {
    path: "/admin/services",
    title: "Services",
    description: "Manage your company services",
  },
  {
    path: "/admin/locations",
    title: "Locations",
    description: "Manage your service areas and locations",
  },
  {
    path: "/admin/categories",
    title: "Categories",
    description: "Manage categories for blogs, services and locations",
  },
  {
    path: "/admin/pricing",
    title: "Pricing",
    description: "Manage your service pricing",
  },
  {
    path: "/admin/appointments",
    title: "Appointment Requests",
    description: "Review and manage appointment inquiries",
  },
  {
    path: "/admin/contacts",
    title: "Contacts",
    description: "Manage messages submitted through your website",
  },
  {
    path: "/admin/settings",
    title: "Settings",
    description: "Manage your dashboard configuration",
  },
];

export default function Header({ onMenuClick }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const currentPage =
    pageInfo
      .filter((page) =>
        page.path === "/admin"
          ? pathname === "/admin"
          : pathname === page.path ||
            pathname.startsWith(`${page.path}/`),
      )
      .sort((a, b) => b.path.length - a.path.length)[0] || {
      title: "Admin Dashboard",
      description: "Manage your website and business content",
    };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Logout failed.");
      }

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : "Unable to log out. Please try again.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-3 border-b border-[#EEEEEE] bg-white/95 px-4 py-3 backdrop-blur sm:px-8">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="shrink-0 rounded-lg border border-[#EEEEEE] p-2 text-[#081828] transition hover:bg-[#F9F9F9] lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-[#081828] sm:text-base">
            {currentPage.title}
          </h1>
          <p className="mt-1 hidden truncate text-xs text-[#888888] sm:block">
            {currentPage.description}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications are not configured yet"
          className="rounded-xl border border-[#EEEEEE] p-2.5 text-[#666666] transition hover:bg-[#F9F9F9]"
        >
          <Bell size={19} />
        </button>

        <div className="flex items-center gap-2 border-l border-[#EEEEEE] pl-3 sm:gap-3 sm:pl-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2852A0]/10 font-bold text-[#2852A0] sm:h-10 sm:w-10">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#081828]">
              Administrator
            </p>
            <p className="mt-1 text-xs text-[#888888]">Admin Panel</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          aria-label="Log out"
          title="Log out"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-100 px-3 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
        >
          {isLoggingOut ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : (
            <LogOut size={18} />
          )}

          <span className="hidden md:inline">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>

      {logoutError && (
        <div
          role="alert"
          className="absolute right-4 top-full mt-2 flex max-w-sm items-start gap-2 rounded-xl border border-red-100 bg-white p-3 text-sm text-red-600 shadow-lg sm:right-8"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{logoutError}</span>
        </div>
      )}
    </header>
  );
}
