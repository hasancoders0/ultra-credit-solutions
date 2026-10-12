"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Save,
  Send,
  X,
  Plus,
  Trash2,
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

export default function ServiceForm({ initialService = null }) {
  const [title, setTitle] = useState(initialService?.title || "");
  const [slug, setSlug] = useState(initialService?.slug || "");

  const [description, setDescription] = useState(
    initialService?.description || ""
  );

  const [introduction, setIntroduction] = useState(
    initialService?.content?.introduction || ""
  );

  const [sections, setSections] = useState(
    initialService?.content?.sections?.map((section) => ({
      heading: section.heading || "",
      content: section.content || section.paragraphs?.join("\n\n") || "",
    })) || [{ heading: "", content: "" }]
  );

  const [imageUrl, setImageUrl] = useState(
    initialService?.image?.src || ""
  );

  const [imageAlt, setImageAlt] = useState(
    initialService?.image?.alt || ""
  );

  const [seoTitle, setSeoTitle] = useState(
    initialService?.seo?.title || ""
  );

  const [seoDescription, setSeoDescription] = useState(
    initialService?.seo?.description || ""
  );

  const [featured, setFeatured] = useState(
    initialService?.featured || false
  );

  const [message, setMessage] = useState("");

  const isEditing = Boolean(initialService);

  function handleTitleChange(value) {
    setTitle(value);

    if (!isEditing || !slug) {
      setSlug(createSlug(value));
    }
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Please select an image smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result);
      setMessage("");
    };

    reader.readAsDataURL(file);
  }

  function updateSection(index, field, value) {
    setSections((previous) =>
      previous.map((section, currentIndex) =>
        currentIndex === index
          ? { ...section, [field]: value }
          : section
      )
    );
  }

  function addSection() {
    setSections((previous) => [
      ...previous,
      { heading: "", content: "" },
    ]);
  }

  function removeSection(index) {
    setSections((previous) =>
      previous.filter((_, currentIndex) => currentIndex !== index)
    );
  }

  function handleSubmit(event, nextStatus) {
    event.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter a service title.");
      return;
    }

    if (!slug.trim()) {
      setMessage("Please enter a service URL slug.");
      return;
    }

    if (!description.trim()) {
      setMessage("Please enter a service description.");
      return;
    }

    const serviceData = {
      id: initialService?.id || Date.now(),
      title,
      slug,
      description,
      image: {
        src: imageUrl,
        alt: imageAlt,
      },
      featured,
      status: nextStatus,
      content: {
        introduction,
        sections: sections
          .filter(
            (section) =>
              section.heading.trim() || section.content.trim()
          )
          .map((section) => ({
            heading: section.heading,
            paragraphs: section.content
              .split("\n\n")
              .map((paragraph) => paragraph.trim())
              .filter(Boolean),
          })),
      },
      seo: {
        title: seoTitle,
        description: seoDescription,
      },
    };

    console.log(
      isEditing ? "Demo service update:" : "Demo new service:",
      serviceData
    );

    setMessage(
      `Demo ${nextStatus} action completed. Changes are not saved permanently because the database is not connected.`
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="mx-auto max-w-[1200px] p-4 sm:p-6 xl:p-8">
        <div className="mb-6">
          <Link
            href="/admin/services"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#888888] transition hover:text-[#2852A0]"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>

          <h1 className="text-2xl font-bold text-[#081828] sm:text-3xl">
            {isEditing ? "Edit Service" : "Add New Service"}
          </h1>

          <p className="mt-1 text-sm text-[#888888]">
            {isEditing
              ? "Update your service information."
              : "Add a new service to your website."}
          </p>
        </div>

        <form
          onSubmit={(event) => handleSubmit(event, "active")}
        >
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              {/* Basic Information */}
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-[#081828]">
                  Basic Information
                </h2>

                <div className="mt-5 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#081828]">
                      Service Title *
                    </label>

                    <input
                      value={title}
                      onChange={(event) =>
                        handleTitleChange(event.target.value)
                      }
                      placeholder="Enter service title"
                      className={inputClass}
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
                      placeholder="service-url-slug"
                      className={inputClass}
                      required
                    />

                    <p className="mt-2 break-all text-xs text-[#888888]">
                      /services/{slug || "service-url-slug"}
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#081828]">
                      Short Description *
                    </label>

                    <textarea
                      rows={4}
                      value={description}
                      onChange={(event) =>
                        setDescription(event.target.value)
                      }
                      placeholder="Write a short service description..."
                      className={`${inputClass} resize-y`}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#081828]">
                      Introduction
                    </label>

                    <textarea
                      rows={5}
                      value={introduction}
                      onChange={(event) =>
                        setIntroduction(event.target.value)
                      }
                      placeholder="Write the service introduction..."
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </div>
              </section>

              {/* Content Sections */}
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[#081828]">
                      Content Sections
                    </h2>

                    <p className="mt-1 text-sm text-[#888888]">
                      Organize the detailed service content.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addSection}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EEEEEE] px-3 py-2.5 text-sm font-medium text-[#2852A0] transition hover:bg-[#F9F9F9]"
                  >
                    <Plus size={16} />
                    Add Section
                  </button>
                </div>

                <div className="mt-5 space-y-5">
                  {sections.map((section, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-[#EEEEEE] p-4"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-[#081828]">
                          Section {index + 1}
                        </h3>

                        {sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSection(index)}
                            aria-label={`Remove section ${index + 1}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        )}
                      </div>

                      <input
                        value={section.heading}
                        onChange={(event) =>
                          updateSection(
                            index,
                            "heading",
                            event.target.value
                          )
                        }
                        placeholder="Section heading"
                        className={inputClass}
                      />

                      <textarea
                        rows={5}
                        value={section.content}
                        onChange={(event) =>
                          updateSection(
                            index,
                            "content",
                            event.target.value
                          )
                        }
                        placeholder="Write section content. Separate paragraphs with a blank line."
                        className={`${inputClass} mt-3 resize-y`}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* SEO */}
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-[#081828]">
                  SEO Settings
                </h2>

                <div className="mt-5 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#081828]">
                      SEO Title
                    </label>

                    <input
                      value={seoTitle}
                      maxLength={60}
                      onChange={(event) =>
                        setSeoTitle(event.target.value)
                      }
                      placeholder="Enter SEO title"
                      className={inputClass}
                    />

                    <p className="mt-1 text-right text-xs text-[#888888]">
                      {seoTitle.length}/60
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#081828]">
                      Meta Description
                    </label>

                    <textarea
                      rows={4}
                      maxLength={160}
                      value={seoDescription}
                      onChange={(event) =>
                        setSeoDescription(event.target.value)
                      }
                      placeholder="Write an SEO meta description..."
                      className={`${inputClass} resize-y`}
                    />

                    <p className="mt-1 text-right text-xs text-[#888888]">
                      {seoDescription.length}/160
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5">
                <h2 className="text-base font-semibold text-[#081828]">
                  Save Service
                </h2>

                <div className="mt-5 space-y-3">
                  <button
                    type="button"
                    onClick={(event) =>
                      handleSubmit(event, "inactive")
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#EEEEEE] px-4 py-3 text-sm font-semibold text-[#081828] transition hover:bg-[#F9F9F9]"
                  >
                    <Save size={17} />
                    Save as Inactive
                  </button>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2852A0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f4388]"
                  >
                    <Send size={17} />
                    {isEditing ? "Update Service" : "Save Service"}
                  </button>

                  <Link
                    href="/admin/services"
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[#666666] transition hover:bg-[#F9F9F9]"
                  >
                    <X size={16} />
                    Cancel
                  </Link>
                </div>

                <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                  Demo mode: Changes will not be saved permanently.
                </p>
              </section>

              {/* Image */}
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5">
                <h2 className="text-base font-semibold text-[#081828]">
                  Service Image
                </h2>

                <label
                  htmlFor="service-image"
                  className="mt-4 flex min-h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#D5D5D5] bg-[#F9F9F9] p-4 transition hover:border-[#2852A0]"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={imageAlt || "Service image preview"}
                      className="max-h-56 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <ImagePlus
                        size={30}
                        className="mx-auto text-[#888888]"
                      />

                      <p className="mt-3 text-sm font-medium text-[#081828]">
                        Upload an image
                      </p>

                      <p className="mt-1 text-xs text-[#888888]">
                        Image only · Maximum 5 MB
                      </p>
                    </div>
                  )}
                </label>

                <input
                  id="service-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />

                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="mt-3 text-sm text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                )}

                <label className="mb-2 mt-4 block text-sm font-medium text-[#081828]">
                  Image Alt Text
                </label>

                <input
                  value={imageAlt}
                  onChange={(event) =>
                    setImageAlt(event.target.value)
                  }
                  placeholder="Describe the image"
                  className={inputClass}
                />
              </section>

              {/* Featured */}
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5">
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
                      Featured Service
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-[#888888]">
                      Highlight this service on your website.
                    </span>
                  </span>
                </label>
              </section>
            </aside>
          </div>

          {message && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-[#EEEEEE] bg-white p-4 text-sm leading-6 text-[#2852A0]"
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}