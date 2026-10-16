
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";

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

  const currentPage =
    pageInfo
      .filter(
        (page) =>
          page.path === "/admin"
            ? pathname === "/admin"
            : pathname === page.path ||
              pathname.startsWith(`${page.path}/`)
      )
      .sort((a, b) => b.path.length - a.path.length)[0] || {
      title: "Admin Dashboard",
      description: "Manage your website and business content",
    };

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#EEEEEE] bg-white/95 px-5 backdrop-blur sm:px-8">
      {/* Page Title */}
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

      {/* Header Actions */}
      <div className="ml-3 flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications are not configured yet"
          className="relative rounded-xl border border-[#EEEEEE] p-2.5 text-[#666666] transition hover:bg-[#F9F9F9]"
        >
          <Bell size={19} />
        </button>

        <div className="flex items-center gap-3 border-l border-[#EEEEEE] pl-3 sm:pl-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2852A0]/10 font-bold text-[#2852A0]">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#081828]">
              Administrator
            </p>

            <p className="mt-1 text-xs text-[#888888]">
              Admin Panel
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
