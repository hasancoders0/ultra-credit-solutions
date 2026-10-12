"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Users,
  BriefcaseBusiness,
  BadgeDollarSign,
  Newspaper,
  CircleHelp,
  Mail,
} from "lucide-react";

import { mainNavigation } from "@/data/navigation";

const navigationIcons = {
  house: House,
  users: Users,
  "briefcase-business": BriefcaseBusiness,
  "badge-dollar-sign": BadgeDollarSign,
  newspaper: Newspaper,
  "circle-help": CircleHelp,
  mail: Mail,
};

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-4 xl:gap-5">
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
                aria-current={isActive ? "page" : undefined}
                className={`group inline-flex items-center gap-1.5 whitespace-nowrap rounded-md py-2 text-sm font-medium transition-colors duration-200 xl:gap-2 xl:text-base ${
                  isActive
                    ? "text-[#2852A0]"
                    : "text-[#5F6B7A] hover:text-[#2852A0]"
                }`}
              >
                {Icon && (
                  <Icon
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "text-[#2852A0]"
                        : "text-[#8994A5] group-hover:text-[#2852A0]"
                    }`}
                    strokeWidth={1.8}
                  />
                )}

                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}