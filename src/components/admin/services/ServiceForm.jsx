
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus, Save, Trash2, Upload, Plus } from "lucide-react";

function createSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputClass =
  "mt-1.5 h-11 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

const textareaClass =
  "mt-1.5 w-full resize-y rounded-lg border border-[#EEEEEE] bg-white p-3 text-sm leading-6 text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

const labelClass = "text-sm font-medium text-[#081828]";

export default function ServiceForm({
  initialService = null,
  services = [],
  onSave,
  isEditing = false,
}) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(() => ({
    id: initialService?.id ?? null,
    title: initialService?.title || "",
    slug: initialService?.slug || "",
    description: initialService?.description || "",
    status: initialService?.status || "draft",
    order: initialService?.order ?? services.length + 1,
    featured: initialService?.featured ?? false,
    image: {
      src: initialService?.image?.src || "",
      alt: initialService?.image?.alt || "",
    },
    content: {
      introduction: initialService?.content?.introduction || "",
      sections: initialService?.content?.sections || [],
    },
    seo: {
      title: initialService?.seo?.title || "",
      description: initialService?.seo?.description || "",
    },
    createdAt: initialService?.createdAt || null,
  }));

  const [slugEdited, setSlugEdited] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");

  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function updateImage(field, value) {
    setImageError("");
    setForm((previous) => ({
      ...previous,
      image: { ...previous.image, [field]: value },
    }));
  }

  function updateContent(field, value) {
    setForm((previous) => ({
      ...previous,
      content: { ...previous.content, [field]: value },
    }));
  }

  function updateSection(index, field, value) {
    setForm((previous) => ({
      ...previous,
      content: {
        ...previous.content,
        sections: previous.content.sections.map((section, i) =>
          i === index ? { ...section, [field]: value } : section
        ),
      },
    }));
  }

  function addSection() {
    updateContent("sections", [
      ...form.content.sections,
      { title: "", description: "" },
    ]);
  }

  function removeSection(index) {
    updateContent(
      "sections",
      form.content.sections.filter((_, i) => i !== index)
    );
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError("Please select an image smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateImage("src", String(reader.result || ""));
      setImageError("");
    };

    reader.onerror = () => {
      setImageError("Unable to read this image. Please try again.");
    };

    reader.readAsDataURL(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const title = form.title.trim();
    const slug = createSlug(form.slug || title);

    if (!title || !slug) {
      setFormError("Please enter a valid service title and URL slug.");
      return;
    }

    if (!form.description.trim() || !form.content.introduction.trim()) {
      setFormError("Please complete the service description and introduction.");
      return;
    }

    if (
      form.status === "published" &&
      form.content.sections.some(
        (section) =>
          !section.title.trim() || !section.description.trim()
      )
    ) {
      setFormError("Complete or remove every empty content section.");
      return;
    }

    const duplicate = services.some(
      (service) =>
        service.slug === slug &&
        String(service.id) !== String(form.id)
    );

    if (duplicate) {
      setFormError("That URL slug is already used by another service.");
      return;
    }

    setSaving(true);

    try {
      await onSave({
        ...form,
        title,
        slug,
        description: form.description.trim(),
        href: `/services/${slug}`,
        order: Math.max(1, Number(form.order) || 1),
        image: {
          src: form.image.src.trim(),
          alt: form.image.alt.trim(),
        },
        content: {
          introduction: form.content.introduction.trim(),
          sections: form.content.sections.map((section) => ({
            title: section.title.trim(),
            description: section.description.trim(),
          })),
        },
        seo: {
          title: form.seo.title.trim() || title,
          description:
            form.seo.description.trim() || form.description.trim(),
        },
      });
    } catch (error) {
      setFormError(
        error?.message || "Unable to save the service. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 text-sm text-[#777777] hover:text-[#2852A0]"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>

          <h1 className="mt-3 text-2xl font-semibold text-[#081828]">
            {isEditing ? "Edit Service" : "Create Service"}
          </h1>

          <p className="mt-1 text-sm text-[#888888]">
            Manage the service page content, image, and SEO.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-5 text-sm font-medium text-white hover:bg-[#1F4386] disabled:opacity-60"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Service"}
        </button>
      </div>

      {formError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {formError}
        </div>
      )}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
            <h2 className="text-base font-semibold text-[#081828]">
              Service Information
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="service-title" className={labelClass}>
                  Service Title *
                </label>
                <input
                  id="service-title"
                  required
                  maxLength={180}
                  value={form.title}
                  onChange={(event) => {
                    const title = event.target.value;

                    setForm((previous) => ({
                      ...previous,
                      title,
                      slug: slugEdited
                        ? previous.slug
                        : createSlug(title),
                      seo: {
                        ...previous.seo,
                        title:
                          !previous.seo.title ||
                          previous.seo.title === previous.title
                            ? title
                            : previous.seo.title,
                      },
                    }));
                  }}
                  className={inputClass}
                  placeholder="Enter service title"
                />
              </div>

              <div>
                <label htmlFor="service-slug" className={labelClass}>
                  URL Slug *
                </label>
                <div className="mt-1.5 flex overflow-hidden rounded-lg border border-[#EEEEEE] focus-within:border-[#2852A0]">
                  <span className="flex items-center bg-[#FAFAFA] px-3 text-xs text-[#888888]">
                    /services/
                  </span>
                  <input
                    id="service-slug"
                    required
                    value={form.slug}
                    onChange={(event) => {
                      setSlugEdited(true);
                      updateField("slug", createSlug(event.target.value));
                    }}
                    className="h-11 min-w-0 flex-1 px-3 text-sm outline-none"
                    placeholder="service-slug"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service-description" className={labelClass}>
                  Short Description *
                </label>
                <textarea
                  id="service-description"
                  required
                  rows={3}
                  maxLength={500}
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  className={textareaClass}
                  placeholder="Description displayed in service cards..."
                />
              </div>

              <div>
                <label htmlFor="service-introduction" className={labelClass}>
                  Page Introduction *
                </label>
                <textarea
                  id="service-introduction"
                  required
                  rows={5}
                  value={form.content.introduction}
                  onChange={(event) =>
                    updateContent("introduction", event.target.value)
                  }
                  className={textareaClass}
                  placeholder="Write the introduction for the service detail page..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-[#081828]">
                  Content Sections
                </h2>
                <p className="mt-1 text-sm text-[#888888]">
                  Add the headings and descriptions shown on the detail page.
                </p>
              </div>

              <button
                type="button"
                onClick={addSection}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[#EEEEEE] px-3 text-sm font-medium text-[#2852A0] hover:bg-[#F4F6FA]"
              >
                <Plus size={15} />
                Add Section
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {form.content.sections.map((section, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#EEEEEE] p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#081828]">
                      Section {index + 1}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      aria-label={`Remove section ${index + 1}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <label
                    htmlFor={`section-title-${index}`}
                    className={labelClass}
                  >
                    Heading
                  </label>
                  <input
                    id={`section-title-${index}`}
                    value={section.title}
                    onChange={(event) =>
                      updateSection(index, "title", event.target.value)
                    }
                    className={inputClass}
                    placeholder="Section heading"
                  />

                  <label
                    htmlFor={`section-description-${index}`}
                    className={`${labelClass} mt-4 block`}
                  >
                    Description
                  </label>
                  <textarea
                    id={`section-description-${index}`}
                    rows={4}
                    value={section.description}
                    onChange={(event) =>
                      updateSection(
                        index,
                        "description",
                        event.target.value
                      )
                    }
                    className={textareaClass}
                    placeholder="Write this section's content..."
                  />
                </div>
              ))}

              {form.content.sections.length === 0 && (
                <p className="rounded-lg bg-[#FAFAFA] p-5 text-sm text-[#888888]">
                  No content sections yet. Select Add Section to create one.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
            <h2 className="text-base font-semibold text-[#081828]">
              SEO Metadata
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="seo-title" className={labelClass}>
                  SEO Title
                </label>
                <input
                  id="seo-title"
                  maxLength={70}
                  value={form.seo.title}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      seo: {
                        ...previous.seo,
                        title: event.target.value,
                      },
                    }))
                  }
                  className={inputClass}
                  placeholder="Search engine title"
                />
              </div>

              <div>
                <label htmlFor="seo-description" className={labelClass}>
                  SEO Description
                </label>
                <textarea
                  id="seo-description"
                  rows={3}
                  maxLength={170}
                  value={form.seo.description}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      seo: {
                        ...previous.seo,
                        description: event.target.value,
                      },
                    }))
                  }
                  className={textareaClass}
                  placeholder="Search engine description"
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-[#EEEEEE] bg-white p-5">
            <h2 className="text-base font-semibold text-[#081828]">
              Publish Settings
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="service-status" className={labelClass}>
                  Status
                </label>
                <select
                  id="service-status"
                  value={form.status}
                  onChange={(event) =>
                    updateField("status", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label htmlFor="service-order" className={labelClass}>
                  Display Order
                </label>
                <input
                  id="service-order"
                  type="number"
                  min="1"
                  value={form.order}
                  onChange={(event) =>
                    updateField("order", event.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-[#555555]">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    updateField("featured", event.target.checked)
                  }
                  className="h-4 w-4 accent-[#2852A0]"
                />
                Featured service
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-[#EEEEEE] bg-white p-5">
            <h2 className="text-base font-semibold text-[#081828]">
              Featured Image
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="image-url" className={labelClass}>
                  Image URL
                </label>
                <input
                  id="image-url"
                  type="url"
                  value={
                    form.image.src.startsWith("data:")
                      ? ""
                      : form.image.src
                  }
                  onChange={(event) =>
                    updateImage("src", event.target.value)
                  }
                  className={inputClass}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-[#EEEEEE]" />
                <span className="text-xs text-[#999999]">OR UPLOAD</span>
                <div className="h-px flex-1 bg-[#EEEEEE]" />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-24 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#CCCCCC] bg-[#FAFAFA] px-3 py-4 text-sm text-[#555555] transition hover:border-[#2852A0] hover:bg-[#F4F6FA]"
              >
                <ImagePlus size={22} className="text-[#2852A0]" />
                <span className="font-medium">Choose image from device</span>
                <span className="text-xs text-[#888888]">
                  Image files up to 2 MB
                </span>
              </button>

              {imageError && (
                <p role="alert" className="text-sm text-red-600">
                  {imageError}
                </p>
              )}

              {form.image.src && (
                <div className="overflow-hidden rounded-lg border border-[#EEEEEE]">
                  <img
                    src={form.image.src}
                    alt={form.image.alt || ""}
                    className="aspect-video w-full object-cover"
                    onError={() =>
                      setImageError("The image URL could not be loaded.")
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      updateImage("src", "");
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="flex w-full items-center justify-center gap-2 border-t border-[#EEEEEE] px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    Remove image
                  </button>
                </div>
              )}

              <div>
                <label htmlFor="image-alt" className={labelClass}>
                  Image Alt Text
                </label>
                <input
                  id="image-alt"
                  value={form.image.alt}
                  onChange={(event) =>
                    updateImage("alt", event.target.value)
                  }
                  className={inputClass}
                  placeholder="Describe the image"
                />
              </div>

              <p className="text-xs leading-5 text-[#888888]">
                Uploaded images are stored in browser storage in this
                version. Use a URL or upload a small image for testing.
              </p>
            </div>
          </section>
        </aside>
      </div>

      <div className="flex justify-end border-t border-[#EEEEEE] pt-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-5 text-sm font-medium text-white hover:bg-[#1F4386] disabled:opacity-60"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Service"}
        </button>
      </div>
    </form>
  );
}
