"use client";

import { Mail, MailOpen, MessageCircle } from "lucide-react";

const statsConfig = [
  {
    key: "total",
    label: "Total Contacts",
    icon: Mail,
    iconColor: "text-[#2852A0]",
    iconBg: "bg-blue-50",
  },
  {
    key: "new",
    label: "New Messages",
    icon: MailOpen,
    iconColor: "text-[#FF6B81]",
    iconBg: "bg-pink-50",
  },
  {
    key: "awaitingReply",
    label: "Awaiting Reply",
    icon: MessageCircle,
    iconColor: "text-[#007AFF]",
    iconBg: "bg-sky-50",
  },
];

export default function ContactStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {statsConfig.map((item) => {
        const StatIcon = item.icon;

        return (
          <div
            key={item.key}
            className="flex min-h-[78px] items-center justify-between gap-3 rounded-xl border border-[#EEEEEE] bg-white px-4 py-3 transition-colors hover:border-[#E0E5ED]"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-[#888888] sm:text-sm">
                {item.label}
              </p>

              <p className="mt-1 text-xl font-semibold leading-tight tracking-tight text-[#081828]">
                {stats[item.key]}
              </p>
            </div>

            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
            >
              <StatIcon size={18} className={item.iconColor} />
            </div>
          </div>
        );
      })}
    </div>
  );
}