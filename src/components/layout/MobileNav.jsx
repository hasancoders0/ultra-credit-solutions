"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  House,
  Users,
  BriefcaseBusiness,
  BadgeDollarSign,
  Newspaper,
  CircleHelp,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import { mainNavigation, headerActions } from "@/data/navigation";

const navigationIcons = {
  house: House,
  users: Users,
  "briefcase-business": BriefcaseBusiness,
  "badge-dollar-sign": BadgeDollarSign,
  newspaper: Newspaper,
  "circle-help": CircleHelp,
  mail: Mail,
};

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="relative lg:hidden">
      {/* Menu Toggle Button */}
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((previousState) => !previousState)}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E8EDF5] bg-white text-[#2852A0] transition-colors duration-200 hover:bg-[#F3F6FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2852A0]"
      >
        {isOpen ? (
          <X className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute right-0 top-full z-50 mt-3 w-[min(90vw,360px)] overflow-hidden rounded-xl border border-[#E8EDF5] bg-white p-3 shadow-[0_16px_48px_rgba(8,24,40,0.14)]"
        >
          {/* Navigation Items */}
          <ul className="space-y-1">
            {mainNavigation.map((item) => {
              const Icon = navigationIcons[item.icon];

              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-[#EEF3FC] text-[#2852A0]"
                        : "text-[#5F6B7A] hover:bg-[#F5F7FB] hover:text-[#2852A0]"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-[18px] w-[18px] shrink-0 ${
                          isActive
                            ? "text-[#2852A0]"
                            : "text-[#8994A5] group-hover:text-[#2852A0]"
                        }`}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    )}

                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Header CTA */}
          <div className="hidden shrink-0 sm:flex sm:items-center">
            {headerActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-[#2852A0] bg-[#2852A0] px-6 py-3 text-sm font-semibold !text-white shadow-sm transition-colors duration-200 hover:border-[#1E417F] hover:bg-[#1E417F] hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2852A0]"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
