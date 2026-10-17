
"use client";

import { useState } from "react";
import {
  Activity,
  BarChart3,
  Code2,
  ExternalLink,
  FileCode2,
  Plus,
  Search,
  Tags,
  Webhook,
} from "lucide-react";

import {
  defaultIntegrationSettings,
  integrationProviders,
} from "@/data/settings";

import IntegrationEditor from "@/components/admin/settings/IntegrationEditor";

const iconMap = {
  search: Search,
  chart: BarChart3,
  activity: Activity,
  webhook: Webhook,
  tags: Tags,
  code: Code2,
};

function createCustomIntegration() {
  return {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "New Custom Integration",
    description: "Add custom HTML, JavaScript or embed code.",
    category: "Custom",
    icon: "code",
    connectionMethod: "custom",
  };
}

export default function IntegrationsSettings() {
  const [integrations, setIntegrations] = useState(
    defaultIntegrationSettings
  );

  const [customIntegrations, setCustomIntegrations] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const providers = [
    ...integrationProviders.filter(
      (provider) => provider.id !== "custom-api"
    ),
    ...customIntegrations,
    ...integrationProviders.filter(
      (provider) => provider.id === "custom-api"
    ),
  ];

  function getIntegration(providerId) {
    return integrations.find(
      (integration) => integration.providerId === providerId
    );
  }

  function openCustomIntegration() {
    const provider = createCustomIntegration();

    setCustomIntegrations((previous) => [...previous, provider]);
    setSelectedProvider(provider);
  }

  function saveIntegration(provider, values) {
    setIntegrations((previous) => {
      const existing = previous.find(
        (item) => item.providerId === provider.id
      );

      const saved = {
        providerId: provider.id,
        name: values.name,
        enabled: values.enabled,
        status: "not-connected",
        configuration: values.configuration,
        updatedAt: new Date().toISOString(),
      };

      if (existing) {
        return previous.map((item) =>
          item.providerId === provider.id
            ? { ...item, ...saved }
            : item
        );
      }

      return [
        ...previous,
        {
          ...saved,
          createdAt: new Date().toISOString(),
        },
      ];
    });

    setCustomIntegrations((previous) =>
      previous.map((item) =>
        item.id === provider.id
          ? { ...item, name: values.name }
          : item
      )
    );

    setSelectedProvider(null);
  }

  return (
    <div className="space-y-5">
      {/* Intro */}
      <section className="flex flex-col gap-4 rounded-xl border border-[#EEEEEE] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-base font-semibold text-[#081828]">
            Marketing Integrations
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#888888]">
            Manage marketing tools and paste tracking or embed code
            provided by your platform.
          </p>
        </div>

        <button
          type="button"
          onClick={openCustomIntegration}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#204584]"
        >
          <Plus size={16} />
          Add Integration
        </button>
      </section>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {providers.map((provider) => {
          const Icon = iconMap[provider.icon] || FileCode2;
          const integration = getIntegration(provider.id);
          const configured = Boolean(
            integration?.configuration?.code?.trim()
          );

          return (
            <article
              key={provider.id}
              className="min-w-0 rounded-xl border border-[#EEEEEE] bg-white p-5 transition hover:border-[#DCE4F2] sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#2852A0]">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#081828]">
                      {integration?.name || provider.name}
                    </h3>

                    <span className="rounded-full bg-[#F5F5F5] px-2 py-1 text-[10px] font-semibold text-[#777777]">
                      {provider.category}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm leading-6 text-[#888888]">
                    {provider.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#EEEEEE] pt-4">
                <div className="flex items-center gap-2 text-xs text-[#777777]">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      integration?.enabled
                        ? "bg-green-500"
                        : configured
                          ? "bg-amber-500"
                          : "bg-[#BBBBBB]"
                    }`}
                  />

                  {integration?.enabled
                    ? "Enabled"
                    : configured
                      ? "Saved · Disabled"
                      : "Not configured"}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProvider(provider)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 py-2 text-xs font-semibold text-[#2852A0] transition hover:border-[#2852A0]/30 hover:bg-[#2852A0]/5"
                >
                  Configure
                  <ExternalLink size={13} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Editor */}
      {selectedProvider && (
        <IntegrationEditor
          key={selectedProvider.id}
          provider={selectedProvider}
          initialValues={getIntegration(selectedProvider.id)}
          onClose={() => setSelectedProvider(null)}
          onSave={(values) =>
            saveIntegration(selectedProvider, values)
          }
        />
      )}
    </div>
  );
}
