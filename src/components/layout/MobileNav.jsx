"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

import { mainNavigation } from "@/data/navigation";
import { siteSettings } from "@/data/site";

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

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
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

      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] bg-[#081828]/45 transition-opacity duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* Right Side Offcanvas */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[70] flex h-[100dvh] w-[min(86vw,360px)] flex-col border-l border-[#E8EDF5] bg-white shadow-[-12px_0_40px_rgba(8,24,40,0.12)] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex min-h-[76px] shrink-0 items-center justify-between border-b border-[#E8EDF5] px-5">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Ultra Credit Solutions - Home"
            tabIndex={isOpen ? 0 : -1}
          >
            <Image
              src={siteSettings.logo}
              alt="Ultra Credit Solutions"
              width={180}
              height={60}
              priority
              className="h-auto w-[155px] object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            tabIndex={isOpen ? 0 : -1}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E8EDF5] text-[#2852A0] transition hover:bg-[#F3F6FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2852A0]"
          >
            <X size={21} strokeWidth={1.8} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Mobile navigation links"
          className="flex-1 overflow-y-auto px-4 py-6"
        >
          <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8994A5]">
            Navigation
          </p>

          <ul className="space-y-1.5">
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
                    tabIndex={isOpen ? 0 : -1}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-[#EEF3FC] text-[#2852A0]"
                        : "text-[#5F6B7A] hover:bg-[#F5F7FB] hover:text-[#2852A0]"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
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

          {/* Client Login */}
          <div className="mt-6 border-t border-[#E8EDF5] pt-5">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8994A5]">
              Client Access
            </p>

            <a
              href="https://www.secureclientaccess.com/login"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              onClick={closeMenu}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#E8EDF5] px-4 py-4 text-sm font-semibold text-[#2852A0] transition-colors hover:border-[#2852A0]/30 hover:bg-[#F3F6FC]"
            >
              <span>Already a client? Login</span>

              <ArrowUpRight
                size={18}
                className="shrink-0"
                aria-hidden="true"
              />
            </a>
          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#E8EDF5] px-5 py-4">
          <p className="text-center text-xs leading-5 text-[#8994A5]">
            Ultra Credit Solutions Inc.
          </p>
        </div>
      </aside>
    </div>
  );
}