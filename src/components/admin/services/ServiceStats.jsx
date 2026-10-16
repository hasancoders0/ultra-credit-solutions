
import {
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
} from "lucide-react";

const cards = [
  {
    key: "total",
    label: "Total Services",
    description: "All service records",
    icon: BriefcaseBusiness,
  },
  {
    key: "published",
    label: "Published",
    description: "Visible service status",
    icon: CheckCircle2,
  },
  {
    key: "draft",
    label: "Drafts",
    description: "Unpublished services",
    icon: FileText,
  },
];

export default function ServiceStats({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map(({ key, label, description, icon: Icon }) => (
        <div
          key={key}
          className="rounded-xl border border-[#EEEEEE] bg-white p-4 sm:p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-[#888888]">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-[#081828]">
                {stats[key]}
              </p>
              <p className="mt-1 text-xs text-[#999999]">
                {description}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FC] text-[#2852A0]">
              <Icon size={19} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
