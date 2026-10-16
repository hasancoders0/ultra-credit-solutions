
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  MapPin,
  CreditCard,
  Settings,
  ExternalLink,
  X,
  CalendarCheck,
  Mail,
  Tags,
} from "lucide-react";

const menu = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Business Management",
    items: [
      {
        name: "Appointment Requests",
        href: "/admin/appointments",
        icon: CalendarCheck,
      },
      {
        name: "Contacts",
        href: "/admin/contacts",
        icon: Mail,
      },
    ],
  },
  {
    label: "Website Management",
    items: [
      {
        name: "Blog Posts",
        href: "/admin/blog",
        icon: FileText,
      },
      {
        name: "Services",
        href: "/admin/services",
        icon: BriefcaseBusiness,
      },
      {
        name: "Locations",
        href: "/admin/locations",
        icon: MapPin,
      },
      {
        name: "Pricing",
        href: "/admin/pricing",
        icon: CreditCard,
      },
      {
        name: "Categories",
        href: "/admin/categories",
        icon: Tags,
      },
    ],
  },
  {
    label: "Configuration",
    items: [
      {
        name: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({ open = false, onClose }) {
  const pathname = usePathname();

  function isActive(href) {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-[#EEEEEE] bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[76px] items-center justify-between border-b border-[#EEEEEE] px-6">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2852A0] text-lg font-bold text-white">
              U
            </span>

            <span>
              <span className="block text-base font-bold text-[#081828]">
                Ultra Credit
              </span>

              <span className="block text-xs text-[#888888]">
                Admin Dashboard
              </span>
            </span>
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-[#666666] hover:bg-[#F9F9F9] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
          {menu.map((group) => (
            <div key={group.label}>
              <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#888888]">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-[#2852A0]/10 text-[#2852A0]"
                          : "text-[#666666] hover:bg-[#F9F9F9] hover:text-[#081828]"
                      }`}
                    >
                      <Icon size={19} strokeWidth={1.8} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* View Website */}
        <div className="border-t border-[#EEEEEE] p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#666666] transition hover:bg-[#F9F9F9] hover:text-[#2852A0]"
          >
            <ExternalLink size={18} />
            View Website
          </Link>
        </div>
      </aside>
    </>
  );
}
