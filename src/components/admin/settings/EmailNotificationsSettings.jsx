"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Server,
  ShieldCheck,
  Users,
  BellRing,
  Send,
  Save,
  Plus,
  Trash2,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const initialSettings = {
  host: "",
  port: 465,
  secure: true,
  username: "",
  password: "",
  senderEmail: "",
  senderName: "Ultra Credit Solutions USA",
  recipients: [""],
  contactNotificationsEnabled: false,
  appointmentNotificationsEnabled: false,
  configured: false,
  hasPassword: false,
};

function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
          <Icon size={19} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  help,
  min,
  max,
  autoComplete,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />

      {help && (
        <span className="mt-1.5 block text-xs leading-5 text-slate-500">
          {help}
        </span>
      )}
    </label>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-slate-200 p-4">
      <span>
        <span className="block text-sm font-medium text-slate-800">
          {label}
        </span>
        <span className="mt-1 block text-sm leading-5 text-slate-500">
          {description}
        </span>
      </span>

      <span className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={Boolean(checked)}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="block h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-slate-900 peer-focus-visible:ring-4 peer-focus-visible:ring-slate-200" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function EmailNotificationsSettings() {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testRecipient, setTestRecipient] = useState("");
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadSettings() {
      try {
        const response = await fetch("/api/admin/email-settings", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.message || "Unable to load email settings.",
          );
        }

        if (!active) return;

        const saved = data.settings ?? {};
        const recipients =
          Array.isArray(saved.recipients) && saved.recipients.length
            ? saved.recipients
            : [""];

        setSettings({
          ...initialSettings,
          ...saved,
          password: "",
          recipients,
        });

        setTestRecipient(recipients.find(Boolean) || "");
      } catch (error) {
        if (active) {
          setNotice({
            type: "error",
            message: error.message || "Unable to load email settings.",
          });
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadSettings();

    return () => {
      active = false;
    };
  }, []);

  function updateSetting(key, value) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function updateRecipient(index, value) {
    setSettings((current) => ({
      ...current,
      recipients: current.recipients.map((recipient, i) =>
        i === index ? value : recipient,
      ),
    }));
  }

  function addRecipient() {
    if (settings.recipients.length >= 5) return;

    updateSetting("recipients", [...settings.recipients, ""]);
  }

  function removeRecipient(index) {
    if (settings.recipients.length <= 1) {
      setNotice({
        type: "error",
        message: "Keep at least one recipient email address.",
      });
      return;
    }

    updateSetting(
      "recipients",
      settings.recipients.filter((_, i) => i !== index),
    );
  }

  async function handleSave(event) {
    event.preventDefault();
    setNotice(null);

    const recipients = [
      ...new Set(
        settings.recipients
          .map((email) => email.trim().toLowerCase())
          .filter(Boolean),
      ),
    ];

    if (recipients.length < 1 || recipients.length > 5) {
      setNotice({
        type: "error",
        message: "Enter at least one and no more than five recipient emails.",
      });
      return;
    }

    if (recipients.some((email) => !isValidEmail(email))) {
      setNotice({
        type: "error",
        message: "Please check the recipient email addresses.",
      });
      return;
    }

    const hasExistingPassword = settings.hasPassword;
    const isFirstConfiguration = !settings.configured;

    if (
      isFirstConfiguration &&
      (!settings.host.trim() ||
        !String(settings.port).trim() ||
        !settings.username.trim() ||
        !settings.senderName.trim() ||
        !isValidEmail(settings.senderEmail) ||
        (!settings.password.trim() && !hasExistingPassword))
    ) {
      setNotice({
        type: "error",
        message:
          "For initial setup, enter the SMTP host, port, username, password, sender name, and a valid sender email.",
      });
      return;
    }

    if (
      settings.host.trim() &&
      (!Number.isInteger(Number(settings.port)) ||
        Number(settings.port) < 1 ||
        Number(settings.port) > 65535)
    ) {
      setNotice({
        type: "error",
        message: "SMTP port must be between 1 and 65535.",
      });
      return;
    }

    if (settings.senderEmail.trim() && !isValidEmail(settings.senderEmail)) {
      setNotice({
        type: "error",
        message: "Please enter a valid sender email address.",
      });
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/admin/email-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...settings,
          port: Number(settings.port),
          recipients,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Unable to save email settings.",
        );
      }

      const saved = data.settings ?? {};

      setSettings((current) => ({
        ...current,
        ...saved,
        password: "",
        recipients: saved.recipients?.length ? saved.recipients : recipients,
      }));

      setTestRecipient((current) => current || recipients[0]);

      setNotice({
        type: "success",
        message: "Email notification settings saved successfully.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        message: error.message || "Unable to save email settings.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleTestEmail() {
    setNotice(null);

    if (!settings.configured) {
      setNotice({
        type: "error",
        message: "Save your SMTP settings before sending a test email.",
      });
      return;
    }

    if (!isValidEmail(testRecipient)) {
      setNotice({
        type: "error",
        message: "Enter a valid test recipient email address.",
      });
      return;
    }

    setTesting(true);

    try {
      const response = await fetch("/api/admin/email-settings/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient: testRecipient.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Unable to send the test email.",
        );
      }

      setNotice({
        type: "success",
        message: data.message || "Test email sent successfully.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        message: error.message || "Unable to send the test email.",
      });
    } finally {
      setTesting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <LoaderCircle className="animate-spin text-slate-500" size={24} />
        <span className="ml-3 text-sm text-slate-500">
          Loading email settings...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Email Notifications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Configure email delivery and choose which alerts you need.
          </p>
        </div>

        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
            settings.configured
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              settings.configured ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {settings.configured ? "SMTP Configured" : "Setup Required"}
        </span>
      </div>

      {notice && (
        <div
          role="status"
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
            notice.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
          )}
          <span>{notice.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <Section
          icon={Server}
          title="SMTP Configuration"
          description="Required to send email. If SMTP is already configured, leave the saved password blank."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="SMTP Host"
              value={settings.host}
              onChange={(value) => updateSetting("host", value)}
              placeholder="smtp.example.com"
              required={!settings.configured}
              autoComplete="url"
            />

            <Field
              label="SMTP Port"
              type="number"
              value={settings.port}
              onChange={(value) => updateSetting("port", value)}
              min={1}
              max={65535}
              required={!settings.configured}
              help="Usually 465 for SSL or 587 for STARTTLS."
            />

            <Field
              label="SMTP Username"
              value={settings.username}
              onChange={(value) => updateSetting("username", value)}
              placeholder="your-email@example.com"
              required={!settings.configured}
              autoComplete="username"
            />

            <Field
              label="SMTP Password"
              type="password"
              value={settings.password}
              onChange={(value) => updateSetting("password", value)}
              placeholder={
                settings.hasPassword
                  ? "Leave blank to keep saved password"
                  : "Enter SMTP password"
              }
              required={!settings.hasPassword}
              autoComplete="new-password"
              help={
                settings.hasPassword
                  ? "A password is already saved securely."
                  : "Required for the initial setup."
              }
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4">
            <input
              type="checkbox"
              checked={settings.secure}
              onChange={(event) =>
                updateSetting("secure", event.target.checked)
              }
              className="h-4 w-4 accent-slate-900"
            />
            <span>
              <span className="block text-sm font-medium text-slate-800">
                Use secure SMTP connection
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                Usually enabled for port 465 and disabled for port 587.
              </span>
            </span>
          </label>
        </Section>

        <Section
          icon={ShieldCheck}
          title="Sender Information"
          description="Set the name and email address recipients see in their inbox."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Sender Name"
              value={settings.senderName}
              onChange={(value) => updateSetting("senderName", value)}
              placeholder="Ultra Credit Solutions USA"
              required={!settings.configured}
            />

            <Field
              label="Sender Email"
              type="email"
              value={settings.senderEmail}
              onChange={(value) => updateSetting("senderEmail", value)}
              placeholder="reply@example.com"
              required={!settings.configured}
            />
          </div>
        </Section>

        <Section
          icon={Users}
          title="Notification Recipients"
          description="Add one or more email addresses to receive new submission alerts. Only one is required."
        >
          <div className="space-y-3">
            {settings.recipients.map((recipient, index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="flex-1">
                  <Field
                    label={`Recipient ${index + 1}`}
                    type="email"
                    value={recipient}
                    onChange={(value) => updateRecipient(index, value)}
                    placeholder="admin@example.com"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeRecipient(index)}
                  disabled={settings.recipients.length <= 1}
                  aria-label={`Remove recipient ${index + 1}`}
                  className="mb-0.5 rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addRecipient}
            disabled={settings.recipients.length >= 5}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-950 disabled:opacity-40"
          >
            <Plus size={17} />
            Add recipient
          </button>

          <p className="mt-3 text-xs text-slate-500">
            Maximum 5 recipients. Empty additional fields are ignored.
          </p>
        </Section>

        <Section
          icon={BellRing}
          title="Notification Rules"
          description="Enable only the alerts your team needs."
        >
          <div className="space-y-3">
            <Toggle
              label="Contact Form Notifications"
              description="Notify recipients when someone submits the contact form."
              checked={settings.contactNotificationsEnabled}
              onChange={(value) =>
                updateSetting("contactNotificationsEnabled", value)
              }
            />

            <Toggle
              label="Appointment Notifications"
              description="Notify recipients when someone requests an appointment."
              checked={settings.appointmentNotificationsEnabled}
              onChange={(value) =>
                updateSetting("appointmentNotificationsEnabled", value)
              }
            />
          </div>
        </Section>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            SMTP credentials are encrypted and stored on the server.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>

      <Section
        icon={Send}
        title="Test Email Delivery"
        description="Send a test message to verify your saved SMTP configuration."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Field
              label="Test Recipient Email"
              type="email"
              value={testRecipient}
              onChange={setTestRecipient}
              placeholder="you@example.com"
            />
          </div>

          <button
            type="button"
            onClick={handleTestEmail}
            disabled={testing || !settings.configured}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {testing ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Mail size={17} />
            )}
            {testing ? "Sending..." : "Send Test Email"}
          </button>
        </div>

        {!settings.configured && (
          <p className="mt-3 text-xs text-slate-500">
            Save SMTP settings before sending a test email.
          </p>
        )}
      </Section>
    </div>
  );
}
