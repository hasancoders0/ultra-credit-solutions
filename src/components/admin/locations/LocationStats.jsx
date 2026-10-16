import { MapPin, Globe, FileText } from "lucide-react";

export default function LocationStats({ stats }) {
  const cards = [
    { label: "Total Locations", value: stats.total, Icon: MapPin },
    { label: "Published", value: stats.published, Icon: Globe },
    { label: "Drafts", value: stats.draft, Icon: FileText },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map(({ label, value, Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-[#EEEEEE] bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#888888]">{label}</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF4FF] text-[#2852A0]">
              <Icon size={19} />
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-[#081828]">{value}</p>
        </div>
      ))}
    </div>
  );
}