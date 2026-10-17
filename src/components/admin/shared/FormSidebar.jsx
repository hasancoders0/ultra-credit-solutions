"use client";

import { Save, Globe, Star, LoaderCircle } from "lucide-react";

const cardClass = "rounded-xl border border-[#EEEEEE] bg-white p-4";

const labelClass = "mb-1.5 block text-sm font-medium text-[#081828]";

const inputClass =
  "h-11 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400";

// --------------------------------------------------
// SIDEBAR CARD
// --------------------------------------------------

export function SidebarCard({
  title,
  description,
  children,
  className = "",
  headerAction,
}) {
  return (
    <section className={`${cardClass} ${className}`}>
      {(title || description || headerAction) && (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title && (
              <h2 className="text-base font-semibold text-[#081828]">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-xs leading-5 text-[#888888]">
                {description}
              </p>
            )}
          </div>

          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}

      <div className={title || description || headerAction ? "mt-4" : ""}>
        {children}
      </div>
    </section>
  );
}

// --------------------------------------------------
// SIDEBAR FIELD
// --------------------------------------------------

export function SidebarField({
  label,
  htmlFor,
  hint,
  error,
  children,
  className = "",
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className={labelClass}>
          {label}
        </label>
      )}

      {children}

      {hint && !error && (
        <p className="mt-1.5 text-xs leading-5 text-[#888888]">{hint}</p>
      )}

      {error && (
        <p className="mt-1.5 text-xs leading-5 text-red-600">{error}</p>
      )}
    </div>
  );
}

// --------------------------------------------------
// SIDEBAR INPUT
// --------------------------------------------------

export function SidebarInput({ className = "", ...props }) {
  return <input {...props} className={`${inputClass} ${className}`} />;
}

// --------------------------------------------------
// SIDEBAR SELECT
// --------------------------------------------------

export function SidebarSelect({ className = "", children, ...props }) {
  return (
    <select {...props} className={`${inputClass} ${className}`}>
      {children}
    </select>
  );
}

// --------------------------------------------------
// SIDEBAR TEXTAREA
// --------------------------------------------------

export function SidebarTextarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`min-h-24 w-full resize-y rounded-lg border border-[#EEEEEE] bg-white p-3 text-sm leading-6 text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50 ${className}`}
    />
  );
}

// --------------------------------------------------
// SIDEBAR CHECKBOX
// --------------------------------------------------

export function SidebarCheckbox({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className = "",
}) {
  return (
    <label
      className={`flex gap-2.5 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${className}`}
    >
      <input
        type="checkbox"
        checked={Boolean(checked)}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[#2852A0]"
      />

      <span className="min-w-0">
        <span className="block text-sm text-[#081828]">{label}</span>

        {description && (
          <span className="mt-1 block text-xs leading-5 text-[#888888]">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

// --------------------------------------------------
// FORM SIDEBAR
// --------------------------------------------------

export default function FormSidebar({
  status,
  onStatusChange,

  statuses = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ],

  featured = false,
  onFeaturedChange,
  featuredLabel = "Featured",
  featuredDescription,

  title = "Publishing",
  showStatus = true,
  disabled = false,

  children,
  className = "",
}) {
  return (
    <aside className={`min-w-0 space-y-4 ${className}`}>
      <SidebarCard title={title}>
        {showStatus && (
          <SidebarField label="Status" htmlFor="form-sidebar-status">
            <SidebarSelect
              id="form-sidebar-status"
              value={status ?? "draft"}
              disabled={disabled}
              onChange={(event) => onStatusChange?.(event.target.value)}
            >
              {statuses.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </SidebarSelect>
          </SidebarField>
        )}

        {onFeaturedChange && (
          <div className={showStatus ? "mt-4" : ""}>
            <SidebarCheckbox
              checked={featured}
              onChange={onFeaturedChange}
              label={
                <span className="flex items-center gap-2">
                  <Star size={15} className="text-amber-500" />
                  {featuredLabel}
                </span>
              }
              description={featuredDescription}
              disabled={disabled}
            />
          </div>
        )}
      </SidebarCard>

      {children}
    </aside>
  );
}

// --------------------------------------------------
// FORM ACTIONS
// --------------------------------------------------

export function FormActions({
  onSaveDraft,
  onPublish,
  saving = false,
  disabled = false,
  publishLabel = "Publish",
  draftLabel = "Save Draft",
  showDraft = true,
  className = "",
}) {
  const isDisabled = saving || disabled;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {showDraft && (
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isDisabled}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm font-medium text-[#555555] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <LoaderCircle size={15} className="animate-spin" />
          ) : (
            <Save size={15} />
          )}

          {saving ? "Saving..." : draftLabel}
        </button>
      )}

      <button
        type="button"
        onClick={onPublish}
        disabled={isDisabled}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white transition hover:bg-[#1F4386] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? (
          <LoaderCircle size={15} className="animate-spin" />
        ) : (
          <Globe size={15} />
        )}

        {saving ? "Saving..." : publishLabel}
      </button>
    </div>
  );
}
