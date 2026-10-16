"use client";

import {
  CalendarDays,
  Clock3,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

const statItems = [
  {
    key: "total",
    label: "Total Requests",
    icon: CalendarDays,
    iconColor: "text-[#2852A0]",
    iconBg: "bg-blue-50",
  },
  {
    key: "new",
    label: "New Requests",
    icon: Clock3,
    iconColor: "text-[#FF6B81]",
    iconBg: "bg-pink-50",
  },
  {
    key: "contacted",
    label: "Contacted",
    icon: MessageCircle,
    iconColor: "text-[#007AFF]",
    iconBg: "bg-sky-50",
  },
  {
    key: "closed",
    label: "Closed Requests",
    icon: CheckCircle2,
    iconColor: "text-green-700",
    iconBg: "bg-green-50",
  },
];

export default function AppointmentStats({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="flex min-h-[78px] items-center justify-between gap-3 rounded-xl border border-[#EEEEEE] bg-white px-4 py-3 transition-colors hover:border-[#E0E5ED]"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-[#888888] sm:text-sm">
                {item.label}
              </p>
              <p className="mt-1 text-xl font-semibold leading-tight text-[#081828]">
                {stats[item.key]}
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