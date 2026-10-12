"use client";

import { useState } from "react";
import {
  Globe,
  Mail,
  Share2,
  Palette,
  Save,
  RotateCcw,
} from "lucide-react";

import { siteInfo, siteSettings } from "@/data/site";

const initialSettings = {
  name: siteInfo.name || "",
  shortName: siteInfo.shortName || "",
  description: siteInfo.description || "",
  email: siteInfo.email || "",
  phone: siteInfo.phone || "",
  address: siteInfo.address || "",
  facebook: siteInfo.socials?.facebook || "",
  instagram: siteInfo.socials?.instagram || "",
  logo: siteSettings.logo || "",
  primaryColor: siteSettings.colors?.primary || "#2852A0",
  ctaColor: siteSettings.colors?.cta || "#FF6B81",
  accentColor: siteSettings.colors?.accent || "#007AFF",
};

export default function SettingsManagement() {
  const [settings, setSettings] = useState(initialSettings);
  const [notice, setNotice] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();

    // Demo only: settings are not saved to a database yet.
    console.log("Settings to save:", settings);

    setNotice(
      "Preview updated in this form. Database saving is not configured yet."
    );

    window.setTimeout(() => {
      setNotice("");
    }, 4000);
  }

  function handleReset() {
    const confirmed = window.confirm(
      "Reset all fields to their original values?"
    );

    if (!confirmed) return;

    setSettings(initialSettings);
    setNotice("Settings reset to their original values.");
  }

  const inputClass =
    "mt-2 h-11 w-full rounded-lg border border-[#EEEEEE] bg-white px-4 text-sm text-[#081828] outline-none transition focus:border-[#2852A0]";

  const labelClass = "text-sm font-medium text-[#081828]";

  return (
    <form
      onSubmit={handleSave}
      className="mx-auto max-w-[1100px] space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#081828] sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#888888]">
            Manage your website information, contact details, and branding.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#EEEEEE] px-4 py-3 text-sm font-medium text-[#666666] transition hover:bg-[#F9F9F9]"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1F4385]"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </div>

      {notice && (
        <div
          role="status"
          className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-[#2852A0]"
        >
          {notice}
        </div>
      )}

      {/* General Settings */}
      <section className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
        <div className="flex items-center gap-3 border-b border-[#EEEEEE] px-5 py-5">
          <div className="rounded-lg bg-blue-50 p-2.5 text-[#2852A0]">
            <Globe size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-[#081828]">
              General Settings
            </h2>

            <p className="mt-1 text-sm text-[#888888]">
              Basic information about your website.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Business Name
            </label>

            <input
              id="name"
              name="name"
              value={settings.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="shortName" className={labelClass}>
              Short Name
            </label>

            <input
              id="shortName"
              name="shortName"
              value={settings.shortName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className={labelClass}>
              Website Description
            </label>

            <textarea
              id="description"
              name="description"
              value={settings.description}
              onChange={handleChange}
              rows={3}
              className="mt-2 w-full resize-y rounded-lg border border-[#EEEEEE] px-4 py-3 text-sm leading-6 text-[#081828] outline-none focus:border-[#2852A0]"
            />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
        <div className="flex items-center gap-3 border-b border-[#EEEEEE] px-5 py-5">
          <div className="rounded-lg bg-green-50 p-2.5 text-green-600">
            <Mail size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-[#081828]">
              Contact Information
            </h2>

            <p className="mt-1 text-sm text-[#888888]">
              Business contact details displayed on your website.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Business Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={settings.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={settings.phone}
              onChange={handleChange}
              placeholder="Enter business phone number"
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className={labelClass}>
              Business Address
            </label>

            <textarea
              id="address"
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows={2}
              className="mt-2 w-full resize-y rounded-lg border border-[#EEEEEE] px-4 py-3 text-sm leading-6 text-[#081828] outline-none focus:border-[#2852A0]"
            />
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
        <div className="flex items-center gap-3 border-b border-[#EEEEEE] px-5 py-5">
          <div className="rounded-lg bg-purple-50 p-2.5 text-purple-600">
            <Share2 size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-[#081828]">
              Social Media
            </h2>

            <p className="mt-1 text-sm text-[#888888]">
              Manage your official social media links.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <div>
            <label htmlFor="facebook" className={labelClass}>
              Facebook URL
            </label>

            <input
              id="facebook"
              name="facebook"
              type="url"
              value={settings.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="instagram" className={labelClass}>
              Instagram URL
            </label>

            <input
              id="instagram"
              name="instagram"
              type="url"
              value={settings.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Branding */}
      <section className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
        <div className="flex items-center gap-3 border-b border-[#EEEEEE] px-5 py-5">
          <div className="rounded-lg bg-pink-50 p-2.5 text-[#FF6B81]">
            <Palette size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-[#081828]">
              Branding
            </h2>

            <p className="mt-1 text-sm text-[#888888]">
              Configure your logo path and brand colors.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <label htmlFor="logo" className={labelClass}>
              Logo Path
            </label>

            <input
              id="logo"
              name="logo"
              value={settings.logo}
              onChange={handleChange}
              placeholder="/logo/logo.svg"
              className={inputClass}
            />

            {settings.logo && (
              <div className="mt-4 flex min-h-20 items-center rounded-lg border border-dashed border-[#EEEEEE] bg-[#F9F9F9] p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.logo}
                  alt="Logo preview"
                  className="max-h-14 max-w-[200px] object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                name: "primaryColor",
                label: "Primary Color",
              },
              {
                name: "ctaColor",
                label: "CTA Color",
              },
              {
                name: "accentColor",
                label: "Accent Color",
              },
            ].map((color) => (
              <div key={color.name}>
                <label
                  htmlFor={color.name}
                  className={labelClass}
                >
                  {color.label}
                </label>

                <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-[#EEEEEE] px-3">
                  <input
                    id={`${color.name}-picker`}
                    type="color"
                    value={settings[color.name]}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        [color.name]: e.target.value,
                      }))
                    }
                    aria-label={`${color.label} picker`}
                    className="h-7 w-9 cursor-pointer border-0 bg-transparent p-0"
                  />

                  <input
                    id={color.name}
                    name={color.name}
                    value={settings[color.name]}
                    onChange={handleChange}
                    pattern="^#[0-9A-Fa-f]{6}$"
                    title="Enter a valid hex color, e.g. #2852A0"
                    className="w-full border-0 bg-transparent text-sm uppercase text-[#081828] outline-none"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="flex justify-end border-t border-[#EEEEEE] pt-5">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1F4385]"
        >
          <Save size={17} />
          Save Changes
        </button>
      </div>
    </form>
  );
}