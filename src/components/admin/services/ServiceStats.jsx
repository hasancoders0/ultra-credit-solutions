
"use client";

import {
  BriefcaseBusiness,
  Globe,
  FilePenLine,
  Star,
} from "lucide-react";

const statItems = [
  {
    key: "total",
    label: "Total Services",
    icon: BriefcaseBusiness,
    iconColor: "text-[#2852A0]",
    iconBg: "bg-blue-50",
  },
  {
    key: "published",
    label: "Published",
    icon: Globe,
    iconColor: "text-green-700",
    iconBg: "bg-green-50",
  },
  {
    key: "drafts",
    label: "Drafts",
    icon: FilePenLine,
    iconColor: "text-[#FF6B81]",
    iconBg: "bg-pink-50",
  },
  {
    key: "featured",
    label: "Featured Services",
    icon: Star,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
];

export default function ServiceStats({ stats = {} }) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="flex min-h-[78px] items-center justify-between gap-3 rounded-xl border border-[#EEEEEE] bg-white px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-[#888888] sm:text-sm">
                {item.label}
              </p>

              <p className="mt-1 text-xl font-semibold text-[#081828]">
                {stats[item.key] ?? 0}
              </p>
            </div>

            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
            >
              <Icon size={18} className={item.iconColor} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
