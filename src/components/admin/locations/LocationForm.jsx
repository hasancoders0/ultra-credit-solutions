
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Save,
  Globe,
  Star,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

import { emptyLocation } from "@/data/locations";
import {
  createSlug,
  saveAdminLocation,
} from "@/lib/admin-locations";

const inputClass =
  "w-full rounded-lg border border-[#EEEEEE] bg-white px-3 py-2.5 text-sm text-[#081828] outline-none transition focus:border-[#2852A0]";

const labelClass =
  "mb-1.5 block text-sm font-medium text-[#081828]";

const cardClass =
  "rounded-xl border border-[#EEEEEE] bg-white p-4 sm:p-5";

const createSection = () => ({
  heading: "",
  paragraphs: [""],
});

const createFaq = () => ({
  question: "",
  answer: "",
});

export default function LocationForm({ initialLocation = null }) {
  const router = useRouter();

  const [form, setForm] = useState(() => ({
    ...emptyLocation,
    ...initialLocation,
    image: {
      ...emptyLocation.image,
      ...(initialLocation?.image || {}),
    },
    seo: {
      ...emptyLocation.seo,
      ...(initialLocation?.seo || {}),
    },
    content: initialLocation?.content?.length
      ? initialLocation.content.map((section) => ({
          heading: section.heading || "",
          paragraphs: Array.isArray(section.paragraphs)
            ? [...section.paragraphs]
            : section.body
              ? [section.body]
              : [""],
        }))
      : [createSection()],
    faqs: initialLocation?.faqs || [],
    internalLinks: initialLocation?.internalLinks || [],
  }));

  const [serviceAreasText, setServiceAreasText] = useState(
    (initialLocation?.serviceAreas || []).join("\n")
  );

  const [areaInput, setAreaInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState(
    initialLocation?.image?.src?.startsWith("data:")
      ? ""
      : initialLocation?.image?.src || ""
  );
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function updateNested(group, field, value) {
    setForm((previous) => ({
      ...previous,
      [group]: {
        ...previous[group],
        [field]: value,
      },
    }));
  }

  function updateSection(index, field, value) {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) =>
        i === index
          ? { ...section, [field]: value }
          : section
      ),
    }));
  }

  function updateParagraph(sectionIndex, paragraphIndex, value) {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) =>
        i !== sectionIndex
          ? section
          : {
              ...section,
              paragraphs: section.paragraphs.map((paragraph, j) =>
                j === paragraphIndex ? value : paragraph
              ),
            }
      ),
    }));
  }

  function addParagraph(sectionIndex) {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              paragraphs: [...section.paragraphs, ""],
            }
          : section
      ),
    }));
  }

  function removeParagraph(sectionIndex, paragraphIndex) {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              paragraphs: section.paragraphs.filter(
                (_, j) => j !== paragraphIndex
              ),
            }
          : section
      ),
    }));
  }

  function updateFaq(index, field, value) {
    setForm((previous) => ({
      ...previous,
      faqs: previous.faqs.map((faq, i) =>
        i === index
          ? { ...faq, [field]: value }
          : faq
      ),
    }));
  }

  function updateInternalLink(index, field, value) {
    setForm((previous) => ({
      ...previous,
      internalLinks: previous.internalLinks.map((link, i) =>
        i === index
          ? { ...link, [field]: value }
          : link
      ),
    }));
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be 2 MB or less.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateNested("image", "src", String(reader.result));
      setImageUrlInput("");
      toast.success("Featured image uploaded.");
    };

    reader.onerror = () => {
      toast.error("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  }

  function handleImageUrl() {
    const value = imageUrlInput.trim();

    if (!value) {
      toast.error("Enter an image URL first.");
      return;
    }

    try {
      const parsed = new URL(value);

      if (
        parsed.protocol !== "https:" &&
        parsed.protocol !== "http:"
      ) {
        toast.error("Use a valid HTTP or HTTPS image URL.");
        return;
      }

      updateNested("image", "src", value);
      toast.success("Featured image URL added.");
    } catch {
      toast.error("Enter a valid image URL.");
    }
  }

  function addServiceArea() {
    const value = areaInput.trim();

    if (!value) return;

    const currentAreas = serviceAreasText
      .split("\n")
      .map((area) => area.trim())
      .filter(Boolean);

    const exists = currentAreas.some(
      (area) => area.toLowerCase() === value.toLowerCase()
    );

    if (!exists) {
      setServiceAreasText(
        [...currentAreas, value].join("\n")
      );
    }

    setAreaInput("");
  }

  function removeServiceArea(areaToRemove) {
    setServiceAreasText((previous) =>
      previous
        .split("\n")
        .filter((area) => area.trim() !== areaToRemove)
        .join("\n")
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

    const status =
      event.nativeEvent?.submitter?.value || "draft";

    if (
      !form.title.trim() ||
      !form.city.trim() ||
      !form.state.trim()
    ) {
      toast.error("Title, city, and state are required.");
      return;
    }

    if (
      status === "published" &&
      !form.introduction.trim()
    ) {
      toast.error(
        "Add a location introduction before publishing."
      );
      return;
    }

    const content = form.content
      .map((section) => ({
        heading: section.heading.trim(),
        paragraphs: section.paragraphs
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
      }))
      .filter(
        (section) =>
          section.heading && section.paragraphs.length > 0
      );

    const faqs = form.faqs
      .map((faq) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      }))
      .filter((faq) => faq.question && faq.answer);

    const internalLinks = form.internalLinks
      .map((link) => ({
        label: link.label.trim(),
        href: link.href.trim(),
      }))
      .filter((link) => link.label && link.href);

    const serviceAreas = serviceAreasText
      .split("\n")
      .map((area) => area.trim())
      .filter(Boolean);

    setSaving(true);

    try {
      const saved = saveAdminLocation({
        ...form,
        slug: createSlug(form.slug || form.title),
        status,
        serviceAreas,
        content,
        faqs,
        internalLinks,
        image: {
          ...form.image,
          src: form.image.src || "",
          alt: form.image.alt.trim(),
        },
        seo: {
          ...form.seo,
          title:
            form.seo.title.trim() || form.title.trim(),
          description:
            form.seo.description.trim() ||
            form.description.trim(),
          ogImage:
            form.seo.ogImage ||
            (form.image.src.startsWith("http")
              ? form.image.src
              : ""),
          robots:
            status === "draft"
              ? "noindex,follow"
              : form.seo.robots || "index,follow",
          canonical: form.seo.canonical || "",
        },
      });

      toast.success(
        status === "published"
          ? "Location published successfully."
          : "Location draft saved successfully."
      );

      router.push("/admin/locations");
    } catch (error) {
      toast.error(
        error.message || "Unable to save location."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Page heading and actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/locations")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#EEEEEE] bg-white hover:bg-[#F9F9F9]"
            aria-label="Back to locations"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-lg font-semibold text-[#081828]">
              {initialLocation
                ? "Edit Location"
                : "New Location"}
            </h1>
            <p className="text-sm text-[#888888]">
              Manage location content, featured image and SEO metadata.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            value="draft"
            disabled={saving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#555555] hover:bg-[#F9F9F9] disabled:opacity-50"
          >
            <Save size={15} />
            Save Draft
          </button>

          <button
            type="submit"
            value="published"
            disabled={saving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white hover:bg-[#214688] disabled:opacity-50"
          >
            <Globe size={15} />
            Publish
          </button>
        </div>
      </div>

      {/* Main editor and sidebar */}
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* Main content column */}
        <div className="min-w-0 space-y-4">
          <section className={cardClass}>
            <h2 className="mb-5 font-semibold text-[#081828]">
              Location Content
            </h2>

            <label className={labelClass}>
              Title *
            </label>
            <input
              required
              value={form.title}
              onChange={(event) => {
                const title = event.target.value;

                setForm((previous) => ({
                  ...previous,
                  title,
                  slug: initialLocation
                    ? previous.slug
                    : createSlug(title),
                  seo: {
                    ...previous.seo,
                    title:
                      previous.seo.title ===
                      previous.title
                        ? title
                        : previous.seo.title || title,
                  },
                }));
              }}
              className={inputClass}
              placeholder="Credit Repair Services in New York"
            />

            <label className={`${labelClass} mt-4`}>
              URL Slug *
            </label>
            <div className="flex overflow-hidden rounded-lg border border-[#EEEEEE] focus-within:border-[#2852A0]">
              <span className="flex items-center border-r border-[#EEEEEE] bg-[#FAFAFA] px-3 text-sm text-[#888888]">
                /locations/
              </span>
              <input
                required
                value={form.slug}
                onChange={(event) =>
                  update(
                    "slug",
                    createSlug(event.target.value)
                  )
                }
                className="min-w-0 flex-1 px-3 py-2.5 text-sm outline-none"
                placeholder="new-york"
              />
            </div>

            <label className={`${labelClass} mt-4`}>
              Excerpt / Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) =>
                update("description", event.target.value)
              }
              className={inputClass}
              placeholder="Briefly describe this location page..."
            />

            <label className={`${labelClass} mt-4`}>
              Introduction
            </label>
            <textarea
              rows={5}
              value={form.introduction}
              onChange={(event) =>
                update("introduction", event.target.value)
              }
              className={inputClass}
              placeholder="Write a unique introduction for this location..."
            />
          </section>

          {/* Location sections */}
          <section className={cardClass}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-semibold text-[#081828]">
                Location Page Sections
              </h2>

              <button
                type="button"
                onClick={() =>
                  update("content", [
                    ...form.content,
                    createSection(),
                  ])
                }
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 text-sm text-[#2852A0] hover:bg-[#F9F9F9]"
              >
                <Plus size={15} />
                Add Section
              </button>
            </div>

            <div className="space-y-4">
              {form.content.map((section, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#EEEEEE] p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
                      Section {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        update(
                          "content",
                          form.content.filter(
                            (_, i) => i !== index
                          )
                        )
                      }
                      className="text-[#999999] hover:text-red-600"
                      aria-label="Remove section"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <label className={labelClass}>
                    Heading
                  </label>
                  <input
                    value={section.heading}
                    onChange={(event) =>
                      updateSection(
                        index,
                        "heading",
                        event.target.value
                      )
                    }
                    className={inputClass}
                    placeholder="Section heading"
                  />

                  <div className="mt-4 flex items-center justify-between">
                    <label className={labelClass}>
                      Paragraphs
                    </label>

                    <button
                      type="button"
                      onClick={() => addParagraph(index)}
                      className="text-xs text-[#2852A0] hover:underline"
                    >
                      + Add Paragraph
                    </button>
                  </div>

                  {section.paragraphs.map(
                    (paragraph, paragraphIndex) => (
                      <div
                        key={paragraphIndex}
                        className="mt-2"
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-[#888888]">
                            Paragraph {paragraphIndex + 1}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              removeParagraph(
                                index,
                                paragraphIndex
                              )
                            }
                            className="text-xs text-[#888888] hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>

                        <textarea
                          rows={4}
                          value={paragraph}
                          onChange={(event) =>
                            updateParagraph(
                              index,
                              paragraphIndex,
                              event.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="Write useful, location-specific content..."
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Service areas */}
          <section className={cardClass}>
            <h2 className="mb-2 font-semibold text-[#081828]">
              Service Areas
            </h2>
            <p className="mb-3 text-xs leading-5 text-[#888888]">
              Add only cities and neighborhoods your business genuinely serves.
            </p>

            <div className="flex gap-2">
              <input
                value={areaInput}
                onChange={(event) =>
                  setAreaInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addServiceArea();
                  }
                }}
                placeholder="Add a city or neighborhood"
                className={`${inputClass} min-w-0 flex-1`}
              />

              <button
                type="button"
                onClick={addServiceArea}
                className="rounded-lg border border-[#EEEEEE] px-3 text-sm hover:bg-[#F9F9F9]"
              >
                Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {serviceAreasText
                .split("\n")
                .map((area) => area.trim())
                .filter(Boolean)
                .map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-2 rounded-md bg-[#F3F5F9] px-2.5 py-1.5 text-xs text-[#52627A]"
                  >
                    {area}
                    <button
                      type="button"
                      onClick={() => removeServiceArea(area)}
                      aria-label={`Remove ${area}`}
                      className="text-[#777777] hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
          </section>

          {/* FAQs */}
          <section className={cardClass}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-semibold text-[#081828]">
                Frequently Asked Questions
              </h2>

              <button
                type="button"
                onClick={() =>
                  update("faqs", [
                    ...form.faqs,
                    createFaq(),
                  ])
                }
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 text-sm text-[#2852A0]"
              >
                <Plus size={15} />
                Add FAQ
              </button>
            </div>

            {form.faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-4 rounded-lg border border-[#EEEEEE] p-4 last:mb-0"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#888888]">
                    FAQ {index + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      update(
                        "faqs",
                        form.faqs.filter(
                          (_, i) => i !== index
                        )
                      )
                    }
                    className="text-xs text-[#888888] hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>

                <label className={labelClass}>
                  Question
                </label>
                <input
                  value={faq.question}
                  onChange={(event) =>
                    updateFaq(
                      index,
                      "question",
                      event.target.value
                    )
                  }
                  className={inputClass}
                />

                <label className={`${labelClass} mt-3`}>
                  Answer
                </label>
                <textarea
                  rows={3}
                  value={faq.answer}
                  onChange={(event) =>
                    updateFaq(
                      index,
                      "answer",
                      event.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>
            ))}
          </section>

          {/* Internal links */}
          <section className={cardClass}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-semibold text-[#081828]">
                Internal Links
              </h2>

              <button
                type="button"
                onClick={() =>
                  update("internalLinks", [
                    ...form.internalLinks,
                    { label: "", href: "" },
                  ])
                }
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 text-sm text-[#2852A0]"
              >
                <Plus size={15} />
                Add Link
              </button>
            </div>

            {form.internalLinks.map((link, index) => (
              <div
                key={index}
                className="mb-3 grid gap-2 sm:grid-cols-2"
              >
                <input
                  value={link.label}
                  onChange={(event) =>
                    updateInternalLink(
                      index,
                      "label",
                      event.target.value
                    )
                  }
                  placeholder="Link label"
                  className={inputClass}
                />

                <div className="flex gap-2">
                  <input
                    value={link.href}
                    onChange={(event) =>
                      updateInternalLink(
                        index,
                        "href",
                        event.target.value
                      )
                    }
                    placeholder="/services"
                    className={`${inputClass} min-w-0`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      update(
                        "internalLinks",
                        form.internalLinks.filter(
                          (_, i) => i !== index
                        )
                      )
                    }
                    className="px-2 text-[#888888] hover:text-red-600"
                    aria-label="Remove internal link"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* SEO at bottom, like Blog editor */}
          <section className={cardClass}>
            <h2 className="mb-5 font-semibold text-[#081828]">
              SEO Metadata
            </h2>

            <label className={labelClass}>
              SEO Title
            </label>
            <input
              maxLength={70}
              value={form.seo.title}
              onChange={(event) =>
                updateNested(
                  "seo",
                  "title",
                  event.target.value
                )
              }
              className={inputClass}
              placeholder="SEO title for this location"
            />
            <p className="mt-1 text-right text-xs text-[#999999]">
              {form.seo.title.length}/70
            </p>

            <label className={`${labelClass} mt-4`}>
              Meta Description
            </label>
            <textarea
              rows={4}
              maxLength={170}
              value={form.seo.description}
              onChange={(event) =>
                updateNested(
                  "seo",
                  "description",
                  event.target.value
                )
              }
              className={inputClass}
              placeholder="Write a unique meta description for this location..."
            />
            <p className="mt-1 text-right text-xs text-[#999999]">
              {form.seo.description.length}/170
            </p>
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="min-w-0 space-y-4">
          {/* Publishing */}
          <section className={cardClass}>
            <h2 className="mb-4 font-semibold text-[#081828]">
              Publishing
            </h2>

            <label className={labelClass}>
              Status
            </label>
            <select
              value={form.status}
              onChange={(event) =>
                update("status", event.target.value)
              }
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <label className="mt-4 flex items-center gap-2 text-sm text-[#555555]">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  update("featured", event.target.checked)
                }
                className="h-4 w-4 accent-[#2852A0]"
              />
              <Star
                size={15}
                className="text-orange-500"
              />
              Featured location
            </label>
          </section>

          {/* Organization: only state and city */}
          <section className={cardClass}>
            <h2 className="mb-4 font-semibold text-[#081828]">
              Organization
            </h2>

            <label className={labelClass}>
              State *
            </label>
            <input
              required
              value={form.state}
              onChange={(event) =>
                update("state", event.target.value)
              }
              className={inputClass}
              placeholder="New York"
            />

            <label className={`${labelClass} mt-4`}>
              City *
            </label>
            <input
              required
              value={form.city}
              onChange={(event) =>
                update("city", event.target.value)
              }
              className={inputClass}
              placeholder="New York City"
            />
          </section>

          {/* Featured image: upload OR URL */}
          <section className={cardClass}>
            <h2 className="mb-4 font-semibold text-[#081828]">
              Featured Image
            </h2>

            <label className={labelClass}>
              Upload from device
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#DADADA] p-5 text-center transition hover:bg-[#FAFAFA]">
              <Upload
                size={23}
                className="text-[#2852A0]"
              />
              <span className="mt-2 text-sm font-medium text-[#555555]">
                Choose Image
              </span>
              <span className="mt-1 text-xs text-[#888888]">
                PNG, JPG, WebP · Max 2 MB
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#EEEEEE]" />
              <span className="text-xs text-[#999999]">
                OR
              </span>
              <div className="h-px flex-1 bg-[#EEEEEE]" />
            </div>

            <label className={labelClass}>
              Image URL
            </label>

            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(event) =>
                  setImageUrlInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleImageUrl();
                  }
                }}
                placeholder="https://example.com/image.jpg"
                className={`${inputClass} min-w-0`}
              />

              <button
                type="button"
                onClick={handleImageUrl}
                className="inline-flex items-center justify-center rounded-lg border border-[#EEEEEE] px-3 text-sm hover:bg-[#F9F9F9]"
                aria-label="Apply image URL"
              >
                <LinkIcon size={16} />
              </button>
            </div>

            {form.image.src && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-[#777777]">
                  Image Preview
                </p>

                <img
                  src={form.image.src}
                  alt={form.image.alt || ""}
                  className="max-h-48 w-full rounded-lg border border-[#EEEEEE] object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                  onLoad={(event) => {
                    event.currentTarget.style.display = "block";
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    updateNested("image", "src", "");
                    setImageUrlInput("");
                  }}
                  className="mt-2 text-xs text-red-600 hover:underline"
                >
                  Remove Image
                </button>
              </div>
            )}

            <label className={`${labelClass} mt-4`}>
              Image Alt Text
            </label>
            <input
              value={form.image.alt}
              onChange={(event) =>
                updateNested(
                  "image",
                  "alt",
                  event.target.value
                )
              }
              className={inputClass}
              placeholder="Describe the featured image"
            />
          </section>
        </aside>
      </div>
    </form>
  );
}
