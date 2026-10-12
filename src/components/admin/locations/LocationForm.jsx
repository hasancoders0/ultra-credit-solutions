"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Send,
  X,
  MapPin,
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

export default function LocationForm({
  initialLocation = null,
}) {
  const [title, setTitle] = useState(
    initialLocation?.title || ""
  );

  const [slug, setSlug] = useState(
    initialLocation?.slug || ""
  );

  const [state, setState] = useState(
    initialLocation?.state || ""
  );

  const [city, setCity] = useState(
    initialLocation?.city || ""
  );

  const [description, setDescription] = useState(
    initialLocation?.description || ""
  );

  const [content, setContent] = useState(
    initialLocation?.content || ""
  );

  const [seoTitle, setSeoTitle] = useState(
    initialLocation?.seo?.title || ""
  );

  const [seoDescription, setSeoDescription] = useState(
    initialLocation?.seo?.description || ""
  );

  const [featured, setFeatured] = useState(
    initialLocation?.featured || false
  );

  const [message, setMessage] = useState("");

  const isEditing = Boolean(initialLocation);

  function handleTitleChange(value) {
    setTitle(value);

    if (!isEditing || !slug) {
      setSlug(createSlug(value));
    }
  }

  function handleSubmit(event, nextStatus) {
    event.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter a location title.");
      return;
    }

    if (!slug.trim()) {
      setMessage("Please enter a URL slug.");
      return;
    }

    if (!state.trim()) {
      setMessage("Please enter a state.");
      return;
    }

    if (!description.trim()) {
      setMessage("Please enter a location description.");
      return;
    }

    const locationData = {
      id: initialLocation?.id || Date.now(),
      title,
      slug,
      state,
      city,
      description,
      content,
      status: nextStatus,
      featured,
      seo: {
        title: seoTitle,
        description: seoDescription,
      },
    };

    console.log(
      isEditing
        ? "Demo location update:"
        : "Demo new location:",
      locationData
    );

    setMessage(
      `Demo ${nextStatus} action completed. Changes are not saved permanently because the database is not connected.`
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="mx-auto max-w-[1200px] p-4 sm:p-6 xl:p-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/locations"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#888888] transition hover:text-[#2852A0]"
          >
            <ArrowLeft size={16} />
            Back to Locations
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
              <MapPin size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#081828] sm:text-3xl">
                {isEditing
                  ? "Edit Location"
                  : "Add New Location"}
              </h1>

              <p className="mt-1 text-sm text-[#888888]">
                {isEditing
                  ? "Update your location page."
                  : "Create a service-area or location page."}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(event) =>
            handleSubmit(event, "published")
          }
        >
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* Main Form */}
            <div className="space-y-6">
              {/* Basic Information */}
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-[#081828]">
                  Location Information
                </h2>

                <p className="mt-1 text-sm text-[#888888]">
                  Add the main details for this location page.
                </p>

                <div className="mt-5 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#081828]">
                      Page Title *
                    </label>

                    <input
                      value={title}
                      onChange={(event) =>
                        handleTitleChange(event.target.value)
                      }
                      placeholder="e.g. Credit Repair Services in New York"
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
                      placeholder="new-york"
                      className={inputClass}
                      required
                    />

                    <p className="mt-2 break-all text-xs text-[#888888]">
                      /locations/{slug || "location-slug"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#081828]">
                        State *
                      </label>

                      <input
                        value={state}
                        onChange={(event) =>
                          setState(event.target.value)
                        }
                        placeholder="e.g. New York"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#081828]">
                        City
                      </label>

                      <input
                        value={city}
                        onChange={(event) =>
                          setCity(event.target.value)
                        }
                        placeholder="e.g. New York City"
                        className={inputClass}
                      />
                    </div>
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
                      placeholder="Write a short description for this location page..."
                      className={`${inputClass} resize-y leading-6`}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#081828]">
                      Page Content
                    </label>

                    <textarea
                      rows={10}
                      value={content}
                      onChange={(event) =>
                        setContent(event.target.value)
                      }
                      placeholder="Write the main content for this location page..."
                      className={`${inputClass} resize-y leading-7`}
                    />

                    <p className="mt-2 text-xs text-[#888888]">
                      You can add paragraphs and headings as plain text.
                      A rich text editor can be added later if needed.
                    </p>
                  </div>
                </div>
              </section>

              {/* SEO */}
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-[#081828]">
                  SEO Settings
                </h2>

                <p className="mt-1 text-sm text-[#888888]">
                  Customize search engine metadata for this page.
                </p>

                <div className="mt-5 space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label className="text-sm font-medium text-[#081828]">
                        SEO Title
                      </label>

                      <span className="text-xs text-[#888888]">
                        {seoTitle.length}/60
                      </span>
                    </div>

                    <input
                      value={seoTitle}
                      maxLength={60}
                      onChange={(event) =>
                        setSeoTitle(event.target.value)
                      }
                      placeholder="Enter SEO title"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label className="text-sm font-medium text-[#081828]">
                        Meta Description
                      </label>

                      <span className="text-xs text-[#888888]">
                        {seoDescription.length}/160
                      </span>
                    </div>

                    <textarea
                      rows={4}
                      maxLength={160}
                      value={seoDescription}
                      onChange={(event) =>
                        setSeoDescription(event.target.value)
                      }
                      placeholder="Write a concise page description..."
                      className={`${inputClass} resize-y leading-6`}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5">
                <h2 className="text-base font-semibold text-[#081828]">
                  Publish
                </h2>

                <p className="mt-1 text-sm text-[#888888]">
                  Manage page visibility.
                </p>

                <div className="mt-5 space-y-3">
                  <button
                    type="button"
                    onClick={(event) =>
                      handleSubmit(event, "draft")
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#EEEEEE] px-4 py-3 text-sm font-semibold text-[#081828] transition hover:bg-[#F9F9F9]"
                  >
                    <Save size={17} />
                    Save Draft
                  </button>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2852A0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f4388]"
                  >
                    <Send size={17} />
                    {isEditing ? "Update Location" : "Publish Location"}
                  </button>

                  <Link
                    href="/admin/locations"
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[#666666] transition hover:bg-[#F9F9F9]"
                  >
                    <X size={16} />
                    Cancel
                  </Link>
                </div>

                <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                  Demo mode: Changes are not saved permanently.
                </p>
              </section>

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
                      Featured Location
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-[#888888]">
                      Highlight this location on the website.
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