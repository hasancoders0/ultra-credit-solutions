"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  Code2,
  ExternalLink,
  FileCode2,
  LoaderCircle,
  Plus,
  Search,
  Tags,
  Webhook,
  AlertCircle,
  CheckCircle2,
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

function normalizeIntegration(item) {
  return {
    providerId: item.providerId,
    name: item.name,
    enabled: item.enabled === true,
    configuration: {
      code: item.configuration?.code || "",
      placement: item.configuration?.placement || "body-end",
      codeType: item.configuration?.codeType || "html",
    },
    createdAt: item.createdAt || null,
    updatedAt: item.updatedAt || null,
  };
}

export default function IntegrationsSettings() {
  const [integrations, setIntegrations] = useState([]);
  const [customIntegrations, setCustomIntegrations] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [notice, setNotice] = useState(null);

  const providers = [
    ...integrationProviders.filter((provider) => provider.id !== "custom-api"),
    ...customIntegrations,
    ...integrationProviders.filter((provider) => provider.id === "custom-api"),
  ];

  const loadIntegrations = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await fetch("/api/admin/integrations", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Unable to load marketing integrations.",
        );
      }

      const saved = Array.isArray(data.integrations)
        ? data.integrations.map(normalizeIntegration)
        : [];

      // Keep defaults for display compatibility only.
      // Database records take priority over local defaults.
      const merged = defaultIntegrationSettings.map((item) => {
        const savedItem = saved.find(
          (entry) => entry.providerId === item.providerId,
        );

        return savedItem || item;
      });

      const additional = saved.filter(
        (item) =>
          !defaultIntegrationSettings.some(
            (defaultItem) => defaultItem.providerId === item.providerId,
          ),
      );

      setIntegrations([...merged, ...additional]);

      const custom = additional
        .filter((item) => item.providerId.startsWith("custom-"))
        .map((item) => ({
          id: item.providerId,
          name: item.name,
          description: "Custom marketing integration.",
          category: "Custom",
          icon: "code",
          connectionMethod: "custom",
        }));

      setCustomIntegrations(custom);
    } catch (error) {
      setLoadError(error.message || "Unable to load marketing integrations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIntegrations();
  }, [loadIntegrations]);

  function getIntegration(providerId) {
    return integrations.find(
      (integration) => integration.providerId === providerId,
    );
  }

  function openCustomIntegration() {
    const provider = createCustomIntegration();

    setCustomIntegrations((previous) => [...previous, provider]);
    setSelectedProvider(provider);
    setNotice(null);
  }

  async function saveIntegration(provider, values) {
    setSaving(true);
    setNotice(null);

    try {
      const payload = {
        providerId: provider.id,
        name: values.name.trim(),
        enabled: values.enabled,
        configuration: {
          code: values.configuration.code,
          placement: values.configuration.placement,
          codeType: values.configuration.codeType || "html",
        },
      };

      const response = await fetch("/api/admin/integrations", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to save integration.");
      }

      const saved = normalizeIntegration(data.integration || payload);

      setIntegrations((previous) => {
        const exists = previous.some(
          (item) => item.providerId === saved.providerId,
        );

        if (exists) {
          return previous.map((item) =>
            item.providerId === saved.providerId ? saved : item,
          );
        }

        return [...previous, saved];
      });

      setCustomIntegrations((previous) =>
        previous.map((item) =>
          item.id === provider.id ? { ...item, name: saved.name } : item,
        ),
      );

      setSelectedProvider(null);

      setNotice({
        type: "success",
        message: data.message || "Integration saved successfully.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        message: error.message || "Unable to save integration.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 rounded-xl border border-[#EEEEEE] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-base font-semibold text-[#081828]">
            Marketing Integrations
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#888888]">
            Manage marketing tools and save tracking or embed configuration to
            your database.
          </p>
        </div>

        <button
          type="button"
          onClick={openCustomIntegration}
          disabled={saving || loading}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#204584] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus size={16} />
          Add Integration
        </button>
      </section>

      {notice && (
        <div
          role={notice.type === "error" ? "alert" : "status"}
          className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${
            notice.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
          )}
          <span>{notice.message}</span>
        </div>
      )}

      {loadError && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-2">
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            <span>{loadError}</span>
          </div>

          <button
            type="button"
            onClick={loadIntegrations}
            className="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-2 font-semibold hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex min-h-48 items-center justify-center gap-3 rounded-xl border border-[#EEEEEE] bg-white text-sm text-[#777777]">
          <LoaderCircle size={20} className="animate-spin" />
          Loading integrations from database...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {providers.map((provider) => {
            const Icon = iconMap[provider.icon] || FileCode2;
            const integration = getIntegration(provider.id);

            const configured = Boolean(
              integration?.configuration?.code?.trim(),
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
                    disabled={saving}
                    onClick={() => {
                      setNotice(null);
                      setSelectedProvider(provider);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 py-2 text-xs font-semibold text-[#2852A0] transition hover:border-[#2852A0]/30 hover:bg-[#2852A0]/5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Configure
                    <ExternalLink size={13} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selectedProvider && (
        <IntegrationEditor
          key={selectedProvider.id}
          provider={selectedProvider}
          initialValues={getIntegration(selectedProvider.id)}
          onClose={() => {
            if (!saving) {
              setSelectedProvider(null);
            }
          }}
          onSave={(values) => saveIntegration(selectedProvider, values)}
        />
      )}

      {saving && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[110] flex items-center gap-2 rounded-xl bg-[#081828] px-4 py-3 text-sm font-medium text-white shadow-xl"
        >
          <LoaderCircle size={17} className="animate-spin" />
          Saving integration...
        </div>
      )}
    </div>
  );
}
