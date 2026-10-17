
export default function SettingsTabs({
  activeTab,
  onChange,
  tabs = [],
}) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-[#EEEEEE]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center gap-2 rounded-t-lg border-b-2 px-3 py-3 text-sm font-semibold transition sm:px-4 ${
              active
                ? "border-[#2852A0] bg-[#2852A0]/5 text-[#2852A0]"
                : "border-transparent text-[#777777] hover:bg-[#F9F9F9] hover:text-[#2852A0]"
            }`}
          >
            <Icon size={16} strokeWidth={1.8} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
