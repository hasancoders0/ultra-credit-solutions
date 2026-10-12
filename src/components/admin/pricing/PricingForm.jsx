"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Send,
  X,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-[#EEEEEE] px-4 py-3 text-sm text-[#081828] outline-none transition placeholder:text-[#AAAAAA] focus:border-[#2852A0]";

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PricingForm({ initialPlan = null }) {
  const [name, setName] = useState(initialPlan?.name || "");
  const [slug, setSlug] = useState(initialPlan?.slug || "");
  const [price, setPrice] = useState(
    String(initialPlan?.price ?? "")
  );

  const [currency, setCurrency] = useState(
    initialPlan?.currency || "USD"
  );

  const [billingPeriod, setBillingPeriod] = useState(
    initialPlan?.billingPeriod || "month"
  );

  const [billingLabel, setBillingLabel] = useState(
    initialPlan?.billingLabel || "/mo"
  );

  const [note, setNote] = useState(initialPlan?.note || "");
  const [description, setDescription] = useState(
    initialPlan?.description || ""
  );

  const [buttonLabel, setButtonLabel] = useState(
    initialPlan?.buttonLabel || "Choose Plan"
  );

  const [href, setHref] = useState(
    initialPlan?.href || ""
  );

  const [features, setFeatures] = useState(
    initialPlan?.features?.length
      ? initialPlan.features
      : [""]
  );

  const [featured, setFeatured] = useState(
    initialPlan?.featured || false
  );

  const [message, setMessage] = useState("");

  const isEditing = Boolean(initialPlan);

  function handleNameChange(value) {
    setName(value);

    if (!isEditing || !slug) {
      setSlug(createSlug(value));
    }

    if (!isEditing || !href) {
      setHref(`/get-started?plan=${createSlug(value)}`);
    }

    if (!isEditing || !buttonLabel) {
      setButtonLabel(`Choose ${value}`);
    }
  }

  function updateFeature(index, value) {
    setFeatures((previous) =>
      previous.map((feature, currentIndex) =>
        currentIndex === index ? value : feature
      )
    );
  }

  function addFeature() {
    setFeatures((previous) => [...previous, ""]);
  }

  function removeFeature(index) {
    setFeatures((previous) =>
      previous.filter((_, currentIndex) => currentIndex !== index)
    );
  }

  function handleSubmit(event, nextStatus) {
    event.preventDefault();
    setMessage("");

    if (!name.trim() || !slug.trim() || !description.trim()) {
      setMessage("Please complete the required plan information.");
      return;
    }

    if (
      price === "" ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0
    ) {
      setMessage("Please enter a valid plan price.");
      return;
    }

    const planData = {
      id: initialPlan?.id || slug,
      slug,
      name,
      price: Number(price),
      currency,
      billingPeriod,
      billingLabel,
      note,
      buttonLabel,
      href,
      description,
      featured,
      features: features
        .map((feature) => feature.trim())
        .filter(Boolean),
      status: nextStatus,
    };

    console.log(
      isEditing ? "Demo pricing update:" : "Demo new pricing plan:",
      planData
    );

    setMessage(
      `Demo ${nextStatus} action completed. Changes are not saved permanently because the database is not connected.`
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="mx-auto max-w-[1100px] p-4 sm:p-6 xl:p-8">
        <div className="mb-6">
          <Link
            href="/admin/pricing"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#2852A0]"
          >
            <ArrowLeft size={16} />
            Back to Pricing
          </Link>

          <h1 className="text-2xl font-bold text-[#081828] sm:text-3xl">
            {isEditing ? "Edit Pricing Plan" : "Add Pricing Plan"}
          </h1>

          <p className="mt-1 text-sm text-[#888888]">
            Edit the same pricing fields used by your website.
          </p>
        </div>

        <form
          onSubmit={(event) => handleSubmit(event, "published")}
          className="space-y-6"
        >
          <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-[#081828]">
              Plan Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  Plan Name *
                </label>

                <input
                  value={name}
                  onChange={(event) =>
                    handleNameChange(event.target.value)
                  }
                  className={inputClass}
                  placeholder="Basic Plan"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  URL Slug *
                </label>

                <input
                  value={slug}
                  onChange={(event) =>
                    setSlug(createSlug(event.target.value))
                  }
                  className={inputClass}
                  placeholder="basic"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  Price *
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(event) =>
                    setCurrency(event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="USD">USD ($)</option>
                  <option value="CAD">CAD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  Billing Period
                </label>

                <select
                  value={billingPeriod}
                  onChange={(event) =>
                    setBillingPeriod(event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="quarter">Quarter</option>
                  <option value="year">Year</option>
                  <option value="one-time">One-time</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  Billing Label
                </label>

                <input
                  value={billingLabel}
                  onChange={(event) =>
                    setBillingLabel(event.target.value)
                  }
                  className={inputClass}
                  placeholder="/mo"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  Description *
                </label>

                <textarea
                  rows={3}
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  className={`${inputClass} resize-y`}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  Pricing Note
                </label>

                <input
                  value={note}
                  onChange={(event) =>
                    setNote(event.target.value)
                  }
                  className={inputClass}
                  placeholder="Pricing note"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  Button Label
                </label>

                <input
                  value={buttonLabel}
                  onChange={(event) =>
                    setButtonLabel(event.target.value)
                  }
                  className={inputClass}
                  placeholder="Choose Basic Plan"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#081828]">
                  Button URL
                </label>

                <input
                  value={href}
                  onChange={(event) =>
                    setHref(event.target.value)
                  }
                  className={inputClass}
                  placeholder="/get-started?plan=basic"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#081828]">
                  Plan Features
                </h2>

                <p className="mt-1 text-sm text-[#888888]">
                  Add, edit, or remove individual features.
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EEEEEE] px-4 py-2.5 text-sm font-medium text-[#2852A0] hover:bg-[#F9F9F9]"
              >
                <Plus size={16} />
                Add Feature
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <input
                    value={feature}
                    onChange={(event) =>
                      updateFeature(index, event.target.value)
                    }
                    placeholder={`Feature ${index + 1}`}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    disabled={features.length === 1}
                    aria-label={`Remove feature ${index + 1}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) =>
                  setFeatured(event.target.checked)
                }
                className="mt-1 h-4 w-4 accent-[#2852A0]"
              />

              <span>
                <span className="block text-sm font-medium text-[#081828]">
                  Featured Plan
                </span>

                <span className="mt-1 block text-xs leading-5 text-[#888888]">
                  Highlight this plan on the public pricing page.
                </span>
              </span>
            </label>
          </section>

          <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-[#081828]">
              Actions
            </h2>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={(event) =>
                  handleSubmit(event, "draft")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EEEEEE] px-5 py-3 text-sm font-semibold text-[#081828] hover:bg-[#F9F9F9]"
              >
                <Save size={17} />
                Save Draft
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2852A0] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1f4388]"
              >
                <Send size={17} />
                {isEditing ? "Update Plan" : "Publish Plan"}
              </button>

              <Link
                href="/admin/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-[#666666] hover:bg-[#F9F9F9]"
              >
                <X size={17} />
                Cancel
              </Link>
            </div>

            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
              Demo mode: Form submissions are not saved permanently.
            </p>
          </section>

          {message && (
            <div
              role="status"
              className="rounded-xl border border-[#EEEEEE] bg-white p-4 text-sm leading-6 text-[#2852A0]"
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}