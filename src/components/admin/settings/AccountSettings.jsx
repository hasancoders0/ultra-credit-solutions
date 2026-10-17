
"use client";

import { useState } from "react";
import { LockKeyhole, Mail, Save, ShieldCheck } from "lucide-react";

export default function AccountSettings() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      window.alert("Please enter your email address.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      window.alert("The new passwords do not match.");
      return;
    }

    window.alert(
      "Account settings UI is ready. Connect the secure authentication API before saving changes."
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
      <div className="border-b border-[#EEEEEE] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#2852A0]">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-[#081828]">
              User Account
            </h2>
            <p className="mt-1 text-sm text-[#888888]">
              Update your administrator login details.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
        <div className="max-w-2xl space-y-5">
          <div>
            <label
              htmlFor="account-email"
              className="mb-2 block text-sm font-medium text-[#333333]"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
              />

              <input
                id="account-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                className="h-11 w-full rounded-lg border border-[#EEEEEE] pl-10 pr-3 text-sm outline-none focus:border-[#2852A0]"
              />
            </div>
          </div>

          <div className="border-t border-[#EEEEEE] pt-5">
            <h3 className="text-sm font-semibold text-[#081828]">
              Change Password
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#888888]">
              Leave the password fields empty if you do not want to change
              your password.
            </p>
          </div>

          <div>
            <label
              htmlFor="current-password"
              className="mb-2 block text-sm font-medium text-[#333333]"
            >
              Current Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
              />

              <input
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="Enter current password"
                className="h-11 w-full rounded-lg border border-[#EEEEEE] pl-10 pr-3 text-sm outline-none focus:border-[#2852A0]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block text-sm font-medium text-[#333333]"
            >
              New Password
            </label>

            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              minLength={12}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Enter new password"
              className="h-11 w-full rounded-lg border border-[#EEEEEE] px-3 text-sm outline-none focus:border-[#2852A0]"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-medium text-[#333333]"
            >
              Confirm New Password
            </label>

            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              className="h-11 w-full rounded-lg border border-[#EEEEEE] px-3 text-sm outline-none focus:border-[#2852A0]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#EEEEEE] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-[#888888]">
            Password changes require server-side verification and secure
            password hashing.
          </p>

          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#204584]"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}
