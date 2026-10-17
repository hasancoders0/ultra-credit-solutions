"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";

import RichTextEditor from "@/components/admin/shared/RichTextEditor";
import ImagePicker from "@/components/admin/media/ImagePicker";

import FormSidebar, {
  SidebarCard,
  SidebarField,
  SidebarInput,
  FormActions,
} from "@/components/admin/shared/FormSidebar";

import {
  createSlug,
  getAdminLocations,
  saveAdminLocation,
} from "@/lib/admin-locations";

const inputClass =
  "mt-1.5 h-11 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

const textareaClass =
  "mt-1.5 w-full resize-y rounded-lg border border-[#EEEEEE] bg-white p-3 text-sm leading-6 text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

const labelClass = "text-sm font-medium text-[#081828]";

const cardClass = "rounded-xl border border-[#EEEEEE] bg-white p-4 sm:p-5";

function createSection() {
  return {
    heading: "",
    paragraphs: [""],
  };
}

function createFaq() {
  return {
    question: "",
    answer: "",
  };
}

function createEmptyLocation() {
  return {
    id: null,
    title: "",
    slug: "",
    state: "",
    city: "",
    description: "",
    introduction: "",
    serviceAreas: [],
    content: [createSection()],
    faqs: [],
    internalLinks: [],
    status: "draft",
    featured: false,
    image: {
      src: "",
      alt: "",
    },
    seo: {
      title: "",
      description: "",
    },
    updatedAt: null,
  };
}

function normalizeLocation(location = {}) {
  const empty = createEmptyLocation();

  return {
    ...empty,
    ...location,

    image: {
      ...empty.image,
      ...(location.image || {}),
      ...(location.featuredImage
        ? {
            src: location.featuredImage.src || location.image?.src || "",
            alt: location.featuredImage.alt || location.image?.alt || "",
          }
        : {}),
    },

    seo: {
      ...empty.seo,
      ...(location.seo || {}),
    },

    serviceAreas: Array.isArray(location.serviceAreas)
      ? location.serviceAreas
      : [],

    content:
      Array.isArray(location.content) && location.content.length
        ? location.content.map((section) => ({
            heading: section.heading || section.title || "",
            paragraphs: Array.isArray(section.paragraphs)
              ? section.paragraphs.map((paragraph) => String(paragraph ?? ""))
              : section.description
                ? [section.description]
                : [""],
          }))
        : [createSection()],

    faqs: Array.isArray(location.faqs)
      ? location.faqs.map((faq) => ({
          question: faq.question || "",
          answer: faq.answer || "",
        }))
      : [],

    internalLinks: Array.isArray(location.internalLinks)
      ? location.internalLinks.map((link) => ({
          label: link.label || "",
          href: link.href || "",
        }))
      : [],
  };
}

export default function LocationForm({ initialLocation = null }) {
  const router = useRouter();
  const isEditing = Boolean(initialLocation);

  const [form, setForm] = useState(() =>
    normalizeLocation(initialLocation || createEmptyLocation()),
  );

  const [serviceAreaInput, setServiceAreaInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [slugEdited, setSlugEdited] = useState(Boolean(initialLocation?.slug));

  useEffect(() => {
    setForm(normalizeLocation(initialLocation || createEmptyLocation()));

    setSlugEdited(Boolean(initialLocation?.slug));
  }, [initialLocation]);

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function updateSeo(field, value) {
    setForm((previous) => ({
      ...previous,
      seo: {
        ...previous.seo,
        [field]: value,
      },
    }));
  }

  function updateImage(field, value) {
    setForm((previous) => ({
      ...previous,
      image: {
        ...previous.image,
        [field]: value,
      },
    }));
  }

  function updateSection(index, field, value) {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) =>
        i === index ? { ...section, [field]: value } : section,
      ),
    }));
  }

  function updateParagraph(sectionIndex, paragraphIndex, value) {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              paragraphs: section.paragraphs.map((paragraph, j) =>
                j === paragraphIndex ? value : paragraph,
              ),
            }
          : section,
      ),
    }));
  }

  function addSection() {
    setForm((previous) => ({
      ...previous,
      content: [...previous.content, createSection()],
    }));
  }

  function removeSection(index) {
    setForm((previous) => ({
      ...previous,
      content: previous.content.filter((_, i) => i !== index),
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
          : section,
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
              paragraphs:
                section.paragraphs.length > 1
                  ? section.paragraphs.filter((_, j) => j !== paragraphIndex)
                  : [""],
            }
          : section,
      ),
    }));
  }

  function updateFaq(index, field, value) {
    setForm((previous) => ({
      ...previous,
      faqs: previous.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq,
      ),
    }));
  }

  function updateInternalLink(index, field, value) {
    setForm((previous) => ({
      ...previous,
      internalLinks: previous.internalLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link,
      ),
    }));
  }

  function addServiceArea() {
    const area = serviceAreaInput.trim();

    if (!area) return;

    const exists = form.serviceAreas.some(
      (item) => item.toLowerCase() === area.toLowerCase(),
    );

    if (exists) {
      toast.error("This service area has already been added.");
      return;
    }

    updateField("serviceAreas", [...form.serviceAreas, area]);
    setServiceAreaInput("");
  }

  function removeServiceArea(areaToRemove) {
    updateField(
      "serviceAreas",
      form.serviceAreas.filter((area) => area !== areaToRemove),
    );
  }

  async function saveLocation(requestedStatus) {
    if (saving) return;

    const title = form.title.trim();
    const slug = createSlug(form.slug || title);
    const state = form.state.trim();
    const city = form.city.trim();

    if (!title || !slug || !state || !city) {
      toast.error("Title, slug, state, and city are required.");
      return;
    }

    if (requestedStatus === "published" && !form.introduction.trim()) {
      toast.error("Add a location introduction before publishing.");
      return;
    }

    setSaving(true);

    try {
      const existingLocations = await getAdminLocations();

      const duplicate = existingLocations.some(
        (location) =>
          String(location.slug || "").toLowerCase() === slug.toLowerCase() &&
          String(location.id) !== String(initialLocation?.id),
      );

      if (duplicate) {
        toast.error("A location with this URL slug already exists.");
        setSaving(false);
        return;
      }

      const now = new Date().toISOString();

      const nextLocation = {
        ...form,

        // Keep the existing MongoDB ID when editing.
        // For a new location, let the API create the ID.
        ...(initialLocation?.id ? { id: initialLocation.id } : {}),

        title,
        slug,
        state,
        city,
        description: form.description.trim(),
        introduction: form.introduction.trim(),

        serviceAreas: form.serviceAreas
          .map((area) => area.trim())
          .filter(Boolean),

        content: form.content
          .map((section) => ({
            heading: section.heading.trim(),
            paragraphs: section.paragraphs
              .map((paragraph) => paragraph.trim())
              .filter(Boolean),
          }))
          .filter(
            (section) => section.heading || section.paragraphs.length > 0,
          ),

        faqs: form.faqs
          .map((faq) => ({
            question: faq.question.trim(),
            answer: faq.answer.trim(),
          }))
          .filter((faq) => faq.question && faq.answer),

        internalLinks: form.internalLinks
          .map((link) => ({
            label: link.label.trim(),
            href: link.href.trim(),
          }))
          .filter((link) => link.label && link.href),

        status: requestedStatus,
        featured: Boolean(form.featured),

        image: {
          src: form.image.src.trim(),
          alt: form.image.alt.trim(),
        },

        seo: {
          title: form.seo.title.trim() || title,
          description: form.seo.description.trim() || form.description.trim(),
        },

        updatedAt: now,
      };

      // Save one location record, not the entire locations array.
      await saveAdminLocation(nextLocation);

      toast.success(
        requestedStatus === "published"
          ? "Location published successfully."
          : "Location draft saved successfully.",
      );

      router.push("/admin/locations");
      router.refresh();
    } catch (error) {
      console.error("Failed to save location:", error);

      toast.error(
        error?.message || "Unable to save location. Please try again.",
      );

      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Page heading and actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/locations"
            aria-label="Back to locations"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#EEEEEE] text-[#555555] hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-[#081828]">
              {isEditing ? "Edit Location" : "Create Location"}
            </h1>

            <p className="mt-1 text-sm text-[#888888]">
              Manage location content, featured image and SEO metadata.
            </p>
          </div>
        </div>

        <FormActions
          saving={saving}
          onSaveDraft={() => saveLocation("draft")}
          onPublish={() => saveLocation("published")}
          publishLabel="Publish"
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main content */}
        <div className="min-w-0 space-y-4">
          <section className={cardClass}>
            <h2 className="text-base font-semibold text-[#081828]">
              Location Content
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="location-title" className={labelClass}>
                  Title *
                </label>

                <input
                  id="location-title"
                  required
                  maxLength={180}
                  value={form.title}
                  onChange={(event) => {
                    const title = event.target.value;

                    setForm((previous) => ({
                      ...previous,
                      title,
                      slug: slugEdited ? previous.slug : createSlug(title),
                      seo: {
                        ...previous.seo,
                        title: previous.seo.title || title,
                      },
                    }));
                  }}
                  placeholder="Credit Repair Services in New York"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="location-slug" className={labelClass}>
                  URL Slug *
                </label>

                <div className="mt-1.5 flex overflow-hidden rounded-lg border border-[#EEEEEE] focus-within:border-[#2852A0] focus-within:ring-2 focus-within:ring-blue-100">
                  <span className="shrink-0 bg-[#FAFAFA] px-3 py-3 text-xs text-[#888888]">
                    /locations/
                  </span>

                  <input
                    id="location-slug"
                    required
                    value={form.slug}
                    onChange={(event) => {
                      setSlugEdited(true);
                      updateField("slug", createSlug(event.target.value));
                    }}
                    placeholder="new-york"
                    className="h-11 min-w-0 flex-1 px-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Excerpt / Description</label>

                <RichTextEditor
                  value={form.description}
                  onChange={(html) => updateField("description", html)}
                  placeholder="Write a unique description for this location..."
                  minHeight={170}
                />
              </div>

              <div>
                <label className={labelClass}>Introduction *</label>

                <RichTextEditor
                  value={form.introduction}
                  onChange={(html) => updateField("introduction", html)}
                  placeholder="Introduce your services for this location..."
                  minHeight={220}
                />
              </div>
            </div>
          </section>

          {/* Location content sections */}
          <section className={cardClass}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-[#081828]">
                  Page Content Sections
                </h2>

                <p className="mt-1 text-sm text-[#888888]">
                  Add headings and paragraphs for the location page.
                </p>
              </div>

              <button
                type="button"
                onClick={addSection}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 text-sm font-medium text-[#2852A0] hover:bg-blue-50"
              >
                <Plus size={15} />
                Add Section
              </button>
            </div>

            <div className="space-y-4">
              {form.content.map((section, index) => (
                <div
                  key={`content-section-${index}`}
                  className="space-y-4 rounded-xl border border-[#EEEEEE] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#888888]">
                      Section {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      aria-label={`Remove section ${index + 1}`}
                      className="inline-flex items-center gap-1 text-xs text-[#888888] hover:text-red-600"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>

                  <div>
                    <label
                      htmlFor={`location-section-heading-${index}`}
                      className={labelClass}
                    >
                      Heading
                    </label>

                    <input
                      id={`location-section-heading-${index}`}
                      value={section.heading}
                      onChange={(event) =>
                        updateSection(index, "heading", event.target.value)
                      }
                      placeholder="Why choose our services in this area?"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className={labelClass}>Paragraphs</label>

                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <div
                        key={`paragraph-${index}-${paragraphIndex}`}
                        className="w-full min-w-0"
                      >
                        <RichTextEditor
                          value={paragraph}
                          onChange={(html) =>
                            updateParagraph(index, paragraphIndex, html)
                          }
                          placeholder="Write paragraph content..."
                          minHeight={220}
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addParagraph(index)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#2852A0] hover:underline"
                    >
                      <Plus size={15} />
                      Add Paragraph
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Service areas */}
          <section className={cardClass}>
            <h2 className="font-semibold text-[#081828]">Service Areas</h2>

            <p className="mt-1 text-sm leading-6 text-[#888888]">
              Add cities or neighborhoods your business genuinely serves.
            </p>

            <div className="mt-4 flex gap-2">
              <input
                value={serviceAreaInput}
                onChange={(event) => setServiceAreaInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addServiceArea();
                  }
                }}
                placeholder="Enter a city or neighborhood"
                className="h-11 min-w-0 flex-1 rounded-lg border border-[#EEEEEE] px-3 text-sm outline-none focus:border-[#2852A0]"
              />

              <button
                type="button"
                onClick={addServiceArea}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 text-sm font-medium text-[#2852A0] hover:bg-blue-50"
              >
                <Plus size={15} />
                Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {form.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 rounded-md bg-[#F3F5F9] px-2.5 py-1.5 text-xs text-[#52627A]"
                >
                  {area}

                  <button
                    type="button"
                    onClick={() => removeServiceArea(area)}
                    aria-label={`Remove ${area}`}
                    className="hover:text-red-600"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className={cardClass}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-semibold text-[#081828]">
                Frequently Asked Questions
              </h2>

              <button
                type="button"
                onClick={() => updateField("faqs", [...form.faqs, createFaq()])}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 text-sm font-medium text-[#2852A0] hover:bg-blue-50"
              >
                <Plus size={15} />
                Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {form.faqs.map((faq, index) => (
                <div
                  key={`location-faq-${index}`}
                  className="space-y-3 rounded-xl border border-[#EEEEEE] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#888888]">
                      FAQ {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          "faqs",
                          form.faqs.filter((_, i) => i !== index),
                        )
                      }
                      className="text-xs text-[#888888] hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div>
                    <label
                      htmlFor={`location-faq-question-${index}`}
                      className={labelClass}
                    >
                      Question
                    </label>

                    <input
                      id={`location-faq-question-${index}`}
                      value={faq.question}
                      onChange={(event) =>
                        updateFaq(index, "question", event.target.value)
                      }
                      placeholder="Enter a frequently asked question"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Answer</label>

                    <RichTextEditor
                      value={faq.answer}
                      onChange={(html) => updateFaq(index, "answer", html)}
                      placeholder="Write the answer..."
                      minHeight={140}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className={cardClass}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-semibold text-[#081828]">Internal Links</h2>

              <button
                type="button"
                onClick={() =>
                  updateField("internalLinks", [
                    ...form.internalLinks,
                    { label: "", href: "" },
                  ])
                }
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 text-sm font-medium text-[#2852A0] hover:bg-blue-50"
              >
                <Plus size={15} />
                Add Link
              </button>
            </div>

            <div className="space-y-3">
              {form.internalLinks.map((link, index) => (
                <div
                  key={`location-link-${index}`}
                  className="grid gap-3 rounded-lg border border-[#EEEEEE] p-3 sm:grid-cols-2"
                >
                  <div>
                    <label
                      htmlFor={`location-link-label-${index}`}
                      className={labelClass}
                    >
                      Link Label
                    </label>

                    <input
                      id={`location-link-label-${index}`}
                      value={link.label}
                      onChange={(event) =>
                        updateInternalLink(index, "label", event.target.value)
                      }
                      placeholder="Our credit repair services"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor={`location-link-href-${index}`}
                        className={labelClass}
                      >
                        URL
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          updateField(
                            "internalLinks",
                            form.internalLinks.filter((_, i) => i !== index),
                          )
                        }
                        className="text-xs text-[#888888] hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>

                    <input
                      id={`location-link-href-${index}`}
                      value={link.href}
                      onChange={(event) =>
                        updateInternalLink(index, "href", event.target.value)
                      }
                      placeholder="/services/how-it-works"
                      className={inputClass}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEO metadata */}
          <section className={cardClass}>
            <h2 className="font-semibold text-[#081828]">SEO Metadata</h2>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="location-seo-title" className={labelClass}>
                  SEO Title
                </label>

                <input
                  id="location-seo-title"
                  maxLength={70}
                  value={form.seo.title}
                  onChange={(event) => updateSeo("title", event.target.value)}
                  placeholder="SEO title for this location"
                  className={inputClass}
                />

                <p className="mt-1 text-right text-xs text-[#888888]">
                  {form.seo.title.length}/70
                </p>
              </div>

              <div>
                <label
                  htmlFor="location-seo-description"
                  className={labelClass}
                >
                  Meta Description
                </label>

                <textarea
                  id="location-seo-description"
                  rows={4}
                  maxLength={170}
                  value={form.seo.description}
                  onChange={(event) =>
                    updateSeo("description", event.target.value)
                  }
                  placeholder="Write a unique search result description..."
                  className={textareaClass}
                />

                <p className="mt-1 text-right text-xs text-[#888888]">
                  {form.seo.description.length}/170
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Shared sidebar */}
        <FormSidebar
          status={form.status}
          onStatusChange={(status) => updateField("status", status)}
          statuses={[
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
          ]}
          featured={form.featured}
          onFeaturedChange={(featured) => updateField("featured", featured)}
          featuredLabel="Featured location"
          disabled={saving}
        >
          <SidebarCard title="Organization">
            <div className="space-y-4">
              <SidebarField label="State">
                <SidebarInput
                  required
                  value={form.state}
                  disabled={saving}
                  onChange={(event) => updateField("state", event.target.value)}
                  placeholder="New York"
                />
              </SidebarField>

              <SidebarField label="City">
                <SidebarInput
                  required
                  value={form.city}
                  disabled={saving}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="New York City"
                />
              </SidebarField>
            </div>
          </SidebarCard>

          <SidebarCard
            title="Featured Image"
            description="Select an image and add descriptive alt text."
          >
            <div className="space-y-4">
              <ImagePicker
                value={form.image.src}
                onChange={(src) => updateImage("src", src)}
                disabled={saving}
                label="Featured Image"
              />

              <SidebarField
                label="Image Alt Text"
                hint="Describe the image for accessibility and SEO."
              >
                <SidebarInput
                  value={form.image.alt}
                  disabled={saving}
                  onChange={(event) => updateImage("alt", event.target.value)}
                  placeholder="Describe the image"
                />
              </SidebarField>

              {form.image.src && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => updateImage("src", "")}
                  className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Remove featured image
                </button>
              )}
            </div>
          </SidebarCard>
        </FormSidebar>
      </div>
    </div>
  );
}
