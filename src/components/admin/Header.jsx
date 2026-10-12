"use client";

import { Menu, Bell } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#EEEEEE] bg-white/95 px-5 backdrop-blur sm:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg border border-[#EEEEEE] p-2 text-[#081828] transition hover:bg-[#F9F9F9] lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <p className="text-sm font-semibold text-[#081828] sm:text-base">
            Admin Dashboard
          </p>

          <p className="mt-1 hidden text-xs text-[#888888] sm:block">
            Manage your website and business content
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
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