
"use client";

import { useState } from "react";
import {
  Settings2,
  UserRound,
  Plug,
} from "lucide-react";

import SettingsTabs from "@/components/admin/settings/SettingsTabs";
import AccountSettings from "@/components/admin/settings/AccountSettings";
import IntegrationsSettings from "@/components/admin/settings/IntegrationsSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("integrations");

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm text-[#888888]">
          <Settings2 size={16} />
          <span>Admin</span>
          <span>/</span>
          <span className="text-[#2852A0]">Settings</span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777777]">
          Manage your admin account and configure marketing integrations
          from one place.
        </p>
      </div>

      <SettingsTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          {
            id: "account",
            label: "User Account",
            icon: UserRound,
          },
          {
            id: "integrations",
            label: "Marketing Integrations",
            icon: Plug,
          },
        ]}
      />

      {activeTab === "account" && <AccountSettings />}

      {activeTab === "integrations" && <IntegrationsSettings />}
    </div>
  );
}
