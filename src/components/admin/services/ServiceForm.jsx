"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Upload, X } from "lucide-react";

import { services as initialServices } from "@/data/services";
import categoriesData from "@/data/categories";
import RichTextEditor from "@/components/admin/shared/RichTextEditor";
import FormSidebar, {
  SidebarCard,
  SidebarField,
  SidebarInput,
  FormActions,
} from "@/components/admin/shared/FormSidebar";
import { getAdminServices, saveAdminServices } from "@/lib/admin-services";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const inputClass =
  "mt-1.5 h-11 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

const textareaClass =
  "mt-1.5 w-full resize-y rounded-lg border border-[#EEEEEE] bg-white p-3 text-sm leading-6 text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

const labelClass = "text-sm font-medium text-[#081828]";

const cardClass = "rounded-xl border border-[#EEEEEE] bg-white p-4 sm:p-5";

function createSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createEmptySection() {
  return {
    title: "",
    description: "",
  };
}

function createEmptyService() {
  return {
    id: null,
    slug: "",
    title: "",
    description: "",
    category: "",
    href: "",
    number: "",
    featured: false,
    status: "draft",
    image: {
      src: "",
      alt: "",
    },
    content: {
      introduction: "",
      sections: [createEmptySection()],
    },
    seo: {
      title: "",
      description: "",
    },
  };
}

function normalizeService(service = {}) {
  const empty = createEmptyService();

  return {
    ...empty,
    ...service,
    category: service.category || "",
    image: {
      ...empty.image,
      ...(service.image || {}),
    },
    seo: {
      ...empty.seo,
      ...(service.seo || {}),
    },
    content: {
      ...empty.content,
      ...(service.content || {}),
      sections:
        Array.isArray(service.content?.sections) &&
        service.content.sections.length
          ? service.content.sections.map((section) => ({
              title: section.title || "",
              description: section.description || "",
            }))
          : [createEmptySection()],
    },
  };
}

export default function ServiceForm({ initialService = null }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const isEditing = Boolean(initialService);

  const [form, setForm] = useState(() =>
    normalizeService(initialService || createEmptyService()),
  );

  const [imageUrlInput, setImageUrlInput] = useState(() => {
    const src = initialService?.image?.src || "";
    return src.startsWith("data:") ? "" : src;
  });

  const [saving, setSaving] = useState(false);
  const [slugEdited, setSlugEdited] = useState(Boolean(initialService?.slug));

  const serviceCategories = Array.isArray(categoriesData?.services)
    ? categoriesData.services.filter(
        (category) => category.status !== "inactive",
      )
    : [];

  useEffect(() => {
    if (!initialService) {
      setForm(normalizeService(createEmptyService()));
      setImageUrlInput("");
      setSlugEdited(false);
      return;
    }

    setForm(normalizeService(initialService));

    const src = initialService.image?.src || "";
    setImageUrlInput(src.startsWith("data:") ? "" : src);
    setSlugEdited(true);
  }, [initialService]);

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function updateContent(field, value) {
    setForm((previous) => ({
      ...previous,
      content: {
        ...previous.content,
        [field]: value,
      },
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
      content: {
        ...previous.content,
        sections: previous.content.sections.map((section, i) =>
          i === index ? { ...section, [field]: value } : section,
        ),
      },
    }));
  }

  function addSection() {
    setForm((previous) => ({
      ...previous,
      content: {
        ...previous.content,
        sections: [...previous.content.sections, createEmptySection()],
      },
    }));
  }

  function removeSection(index) {
    setForm((previous) => {
      const remainingSections = previous.content.sections.filter(
        (_, i) => i !== index,
      );

      return {
        ...previous,
        content: {
          ...previous.content,
          sections: remainingSections.length
            ? remainingSections
            : [createEmptySection()],
        },
      };
    });
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        file.type,
      )
    ) {
      toast.error("Choose a JPG, PNG, WebP or GIF image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be 2 MB or less.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        toast.error("Could not read this image.");
        return;
      }

      updateImage("src", reader.result);
      setImageUrlInput("");
      toast.success("Featured image uploaded.");
    };

    reader.onerror = () => {
      toast.error("Unable to read this image.");
    };

    reader.readAsDataURL(file);
  }

  function applyImageUrl() {
    const url = imageUrlInput.trim();

    if (!url) {
      toast.error("Enter an image URL first.");
      return;
    }

    try {
      const parsed = new URL(url);

      if (!["http:", "https:"].includes(parsed.protocol)) {
        toast.error("Use a valid HTTP or HTTPS image URL.");
        return;
      }

      updateImage("src", parsed.href);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Featured image URL added.");
    } catch {
      toast.error("Enter a valid image URL.");
    }
  }

  function removeImage() {
    updateImage("src", "");
    setImageUrlInput("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function saveService(requestedStatus) {
    if (saving) return;

    const status = requestedStatus;
    const title = form.title.trim();
    const slug = createSlug(form.slug || title);

    if (!title || !slug) {
      toast.error("Service title and URL slug are required.");
      return;
    }

    if (!form.category) {
      toast.error("Please select a service category.");
      return;
    }

    const selectedCategory = serviceCategories.find(
      (category) => category.slug === form.category,
    );

    if (!selectedCategory) {
      toast.error("Please select a valid service category.");
      return;
    }

    if (status === "published" && !form.content.introduction.trim()) {
      toast.error("Add a service introduction before publishing.");
      return;
    }

    let existingServices = [];

    try {
      existingServices = getAdminServices() || [];
    } catch {
      toast.error("Unable to load existing services.");
      return;
    }

    const duplicate = existingServices.some(
      (service) =>
        service.slug === slug &&
        String(service.id) !== String(initialService?.id),
    );

    if (duplicate) {
      toast.error("A service with this URL slug already exists.");
      return;
    }

    const original = initialService
      ? existingServices.find(
          (service) => String(service.id) === String(initialService.id),
        ) || initialService
      : null;

    const originalStatic = initialService
      ? initialServices.find(
          (service) =>
            service.slug === initialService.slug ||
            String(service.id) === String(initialService.id),
        )
      : null;

    const id =
      initialService?.id ??
      Math.max(
        0,
        ...existingServices.map((service) => Number(service.id) || 0),
      ) + 1;

    const nextService = {
      ...original,
      ...form,
      id,
      title,
      slug,
      category: selectedCategory.slug,
      description: form.description.trim(),
      href: `/services/${slug}`,
      featured: Boolean(form.featured),
      status,
      number:
        form.number || String(existingServices.length + 1).padStart(2, "0"),
      image: {
        ...form.image,
        src: form.image.src.trim(),
        alt: form.image.alt.trim(),
      },
      content: {
        introduction: form.content.introduction.trim(),
        sections: form.content.sections
          .map((section) => ({
            title: section.title.trim(),
            description: section.description.trim(),
          }))
          .filter((section) => section.title || section.description),
      },
      seo: {
        title: form.seo.title.trim() || title,
        description: form.seo.description.trim() || form.description.trim(),
      },
      // Preserve the original Lucide icon component.
      icon: original?.icon || originalStatic?.icon,
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    const alreadyExists = existingServices.some(
      (service) => String(service.id) === String(id),
    );

    const nextServices = initialService
      ? alreadyExists
        ? existingServices.map((service) =>
            String(service.id) === String(id) ? nextService : service,
          )
        : [...existingServices, nextService]
      : [...existingServices, nextService];

    setSaving(true);

    try {
      saveAdminServices(nextServices);

      toast.success(
        status === "published"
          ? "Service published successfully."
          : "Service draft saved successfully.",
      );

      router.push("/admin/services");
    } catch (error) {
      toast.error(error?.message || "Unable to save service.");
      setSaving(false);
    }
  }

  if (!form) {
    return (
      <div className={cardClass}>
        <p className="text-sm text-[#888888]">Loading service editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Page heading and actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services"
            aria-label="Back to services"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EEEEEE] text-[#555555] hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-[#081828]">
              {isEditing ? "Edit Service" : "Create Service"}
            </h1>
            <p className="mt-1 text-sm text-[#888888]">
              Manage service content, category, image and SEO metadata.
            </p>
          </div>
        </div>

        <FormActions
          saving={saving}
          onSaveDraft={() => saveService("draft")}
          onPublish={() => saveService("published")}
          publishLabel="Publish"
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main content */}
        <div className="min-w-0 space-y-4">
          <section className={cardClass}>
            <h2 className="text-base font-semibold text-[#081828]">
              Service Content
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="service-title" className={labelClass}>
                  Title *
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
                      slug: slugEdited ? previous.slug : createSlug(title),
                      seo: {
                        ...previous.seo,
                        title: previous.seo.title || title,
                      },
                    }));
                  }}
                  placeholder="Enter service title"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="service-slug" className={labelClass}>
                  URL Slug *
                </label>
                <div className="mt-1.5 flex overflow-hidden rounded-lg border border-[#EEEEEE] focus-within:border-[#2852A0] focus-within:ring-2 focus-within:ring-blue-100">
                  <span className="shrink-0 bg-[#FAFAFA] px-3 py-3 text-xs text-[#888888]">
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
                    placeholder="service-slug"
                    className="h-11 min-w-0 flex-1 px-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service-category" className={labelClass}>
                  Service Category *
                </label>
                <select
                  id="service-category"
                  required
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">Select a category</option>
                  {serviceCategories.map((category) => (
                    <option
                      key={category.id ?? category.slug}
                      value={category.slug}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
                {serviceCategories.length === 0 && (
                  <p className="mt-1.5 text-xs text-amber-600">
                    No active service categories were found in
                    src/data/categories.js.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="service-description" className={labelClass}>
                  Description
                </label>
                <RichTextEditor
                  value={form.description}
                  onChange={(html) => updateField("description", html)}
                  placeholder="Write a concise service description..."
                  minHeight={160}
                />
              </div>

              <div>
                <label className={labelClass}>Introduction</label>
                <RichTextEditor
                  value={form.content.introduction}
                  onChange={(html) => updateContent("introduction", html)}
                  placeholder="Introduce this service and explain how it helps clients..."
                  minHeight={220}
                />
              </div>
            </div>
          </section>

          {/* Service content sections */}
          <section className={cardClass}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-semibold text-[#081828]">Service Sections</h2>

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
              {form.content.sections.map((section, index) => (
                <div
                  key={`service-section-${index}`}
                  className="space-y-3 rounded-xl border border-[#EEEEEE] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#888888]">
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

                  <div>
                    <label
                      htmlFor={`service-section-title-${index}`}
                      className={labelClass}
                    >
                      Heading
                    </label>
                    <input
                      id={`service-section-title-${index}`}
                      value={section.title}
                      onChange={(event) =>
                        updateSection(index, "title", event.target.value)
                      }
                      placeholder="Section heading"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Content</label>
                    <RichTextEditor
                      value={section.description}
                      onChange={(html) =>
                        updateSection(index, "description", html)
                      }
                      placeholder="Write and format this section's content..."
                      minHeight={200}
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
                <label htmlFor="service-seo-title" className={labelClass}>
                  SEO Title
                </label>
                <input
                  id="service-seo-title"
                  maxLength={70}
                  value={form.seo.title}
                  onChange={(event) => updateSeo("title", event.target.value)}
                  placeholder="Search engine title"
                  className={inputClass}
                />
                <p className="mt-1 text-right text-xs text-[#888888]">
                  {form.seo.title.length}/70
                </p>
              </div>

              <div>
                <label htmlFor="service-seo-description" className={labelClass}>
                  SEO Description
                </label>
                <textarea
                  id="service-seo-description"
                  rows={4}
                  maxLength={170}
                  value={form.seo.description}
                  onChange={(event) =>
                    updateSeo("description", event.target.value)
                  }
                  placeholder="Search result description"
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
          featuredLabel="Featured service"
        >
          <SidebarCard title="Service Details">
            <div className="mt-4 space-y-4">
              <SidebarField label="Service Category *">
                <select
                  required
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">Select a category</option>

                  {serviceCategories.map((category) => (
                    <option
                      key={category.id ?? category.slug}
                      value={category.slug}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </SidebarField>

              <SidebarField label="Service URL">
                <div className="mt-1.5 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-3 py-3 text-sm break-all text-[#777777]">
                  /services/{form.slug || "service-slug"}
                </div>
              </SidebarField>
            </div>
          </SidebarCard>

          <SidebarCard title="Featured Image">
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="service-image-upload" className={labelClass}>
                  Upload from device
                </label>

                <input
                  ref={fileInputRef}
                  id="service-image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="sr-only"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1.5 flex min-h-28 w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#D6DCE8] bg-[#FAFBFD] px-3 py-4 text-center transition hover:border-[#2852A0] hover:bg-blue-50"
                >
                  <Upload size={23} className="text-[#2852A0]" />
                  <span className="mt-2 text-sm font-medium text-[#2852A0]">
                    Choose Image
                  </span>
                  <span className="mt-1 text-xs text-[#888888]">
                    PNG, JPG, WebP or GIF · Max 2 MB
                  </span>
                </button>
              </div>

              {form.image.src && (
                <div className="overflow-hidden rounded-lg border border-[#EEEEEE]">
                  <div className="relative">
                    <img
                      src={form.image.src}
                      alt={form.image.alt || "Service image preview"}
                      className="aspect-video w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      aria-label="Remove featured image"
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm hover:bg-red-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="px-3 py-2 text-xs text-[#888888]">
                    Image preview
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-[#EEEEEE]" />
                <span className="text-xs text-[#999999]">OR</span>
                <span className="h-px flex-1 bg-[#EEEEEE]" />
              </div>

              <SidebarField label="Image URL">
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(event) => setImageUrlInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      applyImageUrl();
                    }
                  }}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={applyImageUrl}
                  className="mt-2 h-9 w-full rounded-lg border border-[#EEEEEE] px-3 text-sm font-medium text-[#2852A0] hover:bg-blue-50"
                >
                  Apply Image URL
                </button>
              </SidebarField>

              <SidebarField label="Image Alt Text">
                <SidebarInput
                  value={form.image.alt}
                  onChange={(event) => updateImage("alt", event.target.value)}
                  placeholder="Describe the image"
                />
              </SidebarField>
            </div>
          </SidebarCard>
        </FormSidebar>
      </div>
    </div>
  );
}
