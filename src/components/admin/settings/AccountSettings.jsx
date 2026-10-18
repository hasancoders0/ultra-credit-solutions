"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
  X,
  LoaderCircle,
} from "lucide-react";

const INITIAL_FORM = {
  newEmail: "",
  newUsername: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function AccountSettings() {
  const [account, setAccount] = useState({
    email: "",
    username: "",
  });

  const [form, setForm] = useState(INITIAL_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const loadAccount = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/account", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success || !data?.account) {
        throw new Error(data?.message || "Unable to load account details.");
      }

      const currentAccount = {
        email: data.account.email || "",
        username: data.account.username || "",
      };

      setAccount(currentAccount);
      setForm((previous) => ({
        ...previous,
        newEmail: currentAccount.email,
        newUsername: currentAccount.username,
      }));
      setNotice(null);
    } catch (error) {
      setNotice({
        type: "error",
        message: error.message || "Unable to load account details.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function togglePasswordVisibility(field) {
    setVisiblePasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  }

  function openEditor() {
    setForm({
      ...INITIAL_FORM,
      newEmail: account.email,
      newUsername: account.username,
    });

    setNotice(null);
    setIsEditing(true);
  }

  function closeEditor() {
    setForm({
      ...INITIAL_FORM,
      newEmail: account.email,
      newUsername: account.username,
    });

    setNotice(null);
    setIsEditing(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice(null);

    const emailChanged =
      form.newEmail.trim().toLowerCase() !== account.email.trim().toLowerCase();

    const usernameChanged = form.newUsername.trim() !== account.username.trim();

    const passwordChanged = form.newPassword.length > 0;

    if (!emailChanged && !usernameChanged && !passwordChanged) {
      setNotice({
        type: "error",
        message: "Please make at least one change to your account.",
      });
      return;
    }

    if (!form.currentPassword) {
      setNotice({
        type: "error",
        message: "Please enter your current password to continue.",
      });
      return;
    }

    if (passwordChanged) {
      if (form.newPassword.length < 4) {
        setNotice({
          type: "error",
          message: "Your new password must contain at least 4 characters.",
        });
        return;
      }

      if (form.newPassword.length > 128) {
        setNotice({
          type: "error",
          message: "Your new password cannot exceed 128 characters.",
        });
        return;
      }

      if (form.newPassword !== form.confirmPassword) {
        setNotice({
          type: "error",
          message: "The new passwords do not match.",
        });
        return;
      }

      if (form.newPassword === form.currentPassword) {
        setNotice({
          type: "error",
          message: "Your new password must differ from your current password.",
        });
        return;
      }
    }

    if (
      emailChanged &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.newEmail.trim())
    ) {
      setNotice({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (
      usernameChanged &&
      (form.newUsername.trim().length < 3 ||
        form.newUsername.trim().length > 32 ||
        !/^[a-zA-Z0-9_.-]+$/.test(form.newUsername.trim()))
    ) {
      setNotice({
        type: "error",
        message:
          "Username must be 3–32 characters and contain only letters, numbers, dots, underscores, or hyphens.",
      });
      return;
    }

    const payload = {
      currentPassword: form.currentPassword,
    };

    if (emailChanged) {
      payload.newEmail = form.newEmail.trim().toLowerCase();
    }

    if (usernameChanged) {
      payload.newUsername = form.newUsername.trim();
    }

    if (passwordChanged) {
      payload.newPassword = form.newPassword;
      payload.confirmPassword = form.confirmPassword;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Unable to update your account. Please try again.",
        );
      }

      if (data.account) {
        setAccount({
          email: data.account.email || "",
          username: data.account.username || "",
        });
      } else {
        await loadAccount();
      }

      setForm({
        ...INITIAL_FORM,
        newEmail: data.account?.email || account.email,
        newUsername: data.account?.username || account.username,
      });

      setIsEditing(false);
      setNotice({
        type: "success",
        message: data.message || "Your account has been updated successfully.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error.message || "Unable to update your account. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  function PasswordField({
    label,
    name,
    value,
    placeholder,
    visibleKey,
    required = false,
    autoComplete,
    onChange,
  }) {
    const visible = visiblePasswords[visibleKey];

    return (
      <div className="space-y-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-800"
        >
          {label}
        </label>

        <div className="relative">
          <input
            id={name}
            name={name}
            type={visible ? "text" : "password"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          <button
            type="button"
            onClick={() => togglePasswordVisibility(visibleKey)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-900"
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            User Account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your administrator login credentials.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <UserRound className="h-5 w-5" />
        </div>
      </div>

      {notice && (
        <div
          role="alert"
          className={`flex items-start gap-3 rounded-xl border px-4 py-4 text-sm ${
            notice.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          )}

          <span>{notice.message}</span>
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <ShieldCheck className="h-5 w-5 shrink-0 text-slate-600" />

          <div>
            <h3 className="text-base font-medium text-slate-950">
              Account Information
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Your current administrator account details.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-800">
              Login Email
            </label>

            <div className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
              <Mail className="h-4 w-4 shrink-0 text-slate-500" />

              <span className="break-all text-sm text-slate-800">
                {isLoading
                  ? "Loading account details..."
                  : account.email || "No email address configured"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-800">
              Username
            </label>

            <div className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
              <UserRound className="h-4 w-4 shrink-0 text-slate-500" />

              <span className="break-all text-sm text-slate-800">
                {isLoading
                  ? "Loading username..."
                  : account.username || "No username configured"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <LockKeyhole className="h-5 w-5 shrink-0 text-slate-600" />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Login Credentials
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Change your username, email, or password after verifying your
                  current password.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openEditor}
              disabled={isLoading || isSaving}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Pencil className="h-4 w-4" />
              Change Credentials
            </button>
          </div>
        </div>
      </section>

      {isEditing && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
            <div>
              <h3 className="text-base font-medium text-slate-950">
                Change Credentials
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Leave any unchanged field as it is. Leave both new password
                fields empty to keep your current password.
              </p>
            </div>

            <button
              type="button"
              onClick={closeEditor}
              disabled={isSaving}
              aria-label="Close change credentials form"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="space-y-2">
              <label
                htmlFor="newUsername"
                className="block text-sm font-medium text-slate-800"
              >
                New Username
              </label>

              <input
                id="newUsername"
                name="newUsername"
                type="text"
                value={form.newUsername}
                onChange={updateField}
                minLength={3}
                maxLength={32}
                autoComplete="username"
                placeholder="Enter a new username"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <p className="text-xs text-slate-500">
                Use 3–32 letters, numbers, dots, underscores, or hyphens.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="newEmail"
                className="block text-sm font-medium text-slate-800"
              >
                New Login Email
              </label>

              <input
                id="newEmail"
                name="newEmail"
                type="email"
                value={form.newEmail}
                onChange={updateField}
                maxLength={254}
                autoComplete="email"
                placeholder="Enter your login email"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <p className="text-xs text-slate-500">
                Keep your current email if you do not want to change it.
              </p>
            </div>

            <PasswordField
              label="Current Password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={updateField}
              placeholder="Enter your current password"
              visibleKey="current"
              autoComplete="current-password"
              required
            />

            <div className="space-y-5 border-t border-slate-100 pt-6">
              <div>
                <h4 className="text-sm font-medium text-slate-900">
                  Change Password (Optional)
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Enter a new password only if you want to change it.
                </p>
              </div>

              <PasswordField
                label="New Password"
                name="newPassword"
                value={form.newPassword}
                onChange={updateField}
                placeholder="Enter a new password"
                visibleKey="new"
                autoComplete="new-password"
              />

              <p className="-mt-3 text-xs text-slate-500">
                Use 4–128 characters. Passwords longer than 72 UTF-8 bytes may
                not be supported by bcrypt.
              </p>

              <PasswordField
                label="Confirm New Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={updateField}
                placeholder="Re-enter your new password"
                visibleKey="confirm"
                autoComplete="new-password"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeEditor}
                disabled={isSaving}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <LockKeyhole className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
