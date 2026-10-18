"use client";

import { useState } from "react";
import { UserRound, Plug, Mail } from "lucide-react";

import SettingsTabs from "@/components/admin/settings/SettingsTabs";
import AccountSettings from "@/components/admin/settings/AccountSettings";
import IntegrationsSettings from "@/components/admin/settings/IntegrationsSettings";
import EmailNotificationsSettings from "@/components/admin/settings/EmailNotificationsSettings";

const tabs = [
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
  {
    id: "email",
    label: "Email Notifications",
    icon: Mail,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings />;

      case "integrations":
        return <IntegrationsSettings />;

      case "email":
        return <EmailNotificationsSettings />;

      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account, marketing integrations, and email notifications.
        </p>
      </div>

      {/* Settings Navigation */}
      <SettingsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Active Settings Content */}
      <div className="min-w-0">{renderActiveTab()}</div>
    </div>
  );
}
