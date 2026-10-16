"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  Globe,
  Plus,
  Trash2,
  Star,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";

import blogs from "@/data/blog";
import initialCategories from "@/data/categories";

const STORAGE_KEY = "ucs-admin-blog-posts";
const CATEGORY_STORAGE_KEY = "ucs-admin-categories";
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const emptyPost = {
  id: null,
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  tags: [],
  featuredImage: { src: "", alt: "" },
  author: "Ultra Credit Solutions Team",
  publishedAt: null,
  updatedAt: null,
  status: "draft",
  featured: false,
  seo: { title: "", description: "" },
  content: [{ heading: "", paragraphs: [""] }],
};

function createSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSavedPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : blogs;
  } catch {
    return blogs;
  }
}

function getSavedCategories() {
  try {
    const saved = localStorage.getItem(CATEGORY_STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : initialCategories;

    return Array.isArray(data?.blog) ? data.blog : [];
  } catch {
    return Array.isArray(initialCategories.blog) ? initialCategories.blog : [];
  }
}

export default function BlogPostForm({ postId = null }) {
  const router = useRouter();
  const isEditing = postId !== null;
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(emptyPost);
  const [tagInput, setTagInput] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState(() =>
    getSavedCategories(),
  );

  const refreshCategories = useCallback(() => {
    setCategoryOptions(getSavedCategories());
  }, []);

  useEffect(() => {
    refreshCategories();

    window.addEventListener("focus", refreshCategories);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshCategories();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleCategoriesUpdated = () => {
      refreshCategories();
    };

    window.addEventListener("ucs-categories-updated", handleCategoriesUpdated);

    return () => {
      window.removeEventListener("focus", refreshCategories);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener(
        "ucs-categories-updated",
        handleCategoriesUpdated,
      );
    };
  }, [refreshCategories]);

  // Load existing post when editing.
  useEffect(() => {
    const allPosts = getSavedPosts();

    if (isEditing) {
      const post = allPosts.find((item) => String(item.id) === String(postId));

      if (!post) {
        toast.error("Blog post not found.");
        router.replace("/admin/blog");
        setLoading(false);
        return;
      }

      setForm({
        ...emptyPost,
        ...post,
        featuredImage: {
          ...emptyPost.featuredImage,
          ...(post.featuredImage || {}),
        },
        seo: {
          ...emptyPost.seo,
          ...(post.seo || {}),
        },
        tags: Array.isArray(post.tags) ? post.tags : [],
        content:
          Array.isArray(post.content) && post.content.length
            ? post.content.map((section) => ({
                heading: section.heading || "",
                paragraphs:
                  Array.isArray(section.paragraphs) && section.paragraphs.length
                    ? section.paragraphs
                    : [""],
              }))
            : [{ heading: "", paragraphs: [""] }],
      });

      setSlugEdited(true);
    }

    setLoading(false);
  }, [isEditing, postId, router]);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateSeo = (field, value) => {
    setForm((previous) => ({
      ...previous,
      seo: {
        ...previous.seo,
        [field]: value,
      },
    }));
  };

  const updateImage = (field, value) => {
    setForm((previous) => ({
      ...previous,
      featuredImage: {
        ...previous.featuredImage,
        [field]: value,
      },
    }));
  };

  // Upload an image from the user's device.
  const handleFeaturedImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG, WebP or GIF image.");
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
        toast.error("Could not read this image. Please try again.");
        return;
      }

      setForm((previous) => ({
        ...previous,
        featuredImage: {
          ...previous.featuredImage,
          src: reader.result,
          alt: previous.featuredImage?.alt || "",
        },
      }));

      toast.success("Featured image added.");
    };

    reader.onerror = () => {
      toast.error("Unable to read this image. Please try another file.");
    };

    reader.readAsDataURL(file);
  };

  const removeFeaturedImage = () => {
    setForm((previous) => ({
      ...previous,
      featuredImage: {
        ...previous.featuredImage,
        src: "",
      },
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const updateSection = (index, field, value) => {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) =>
        i === index ? { ...section, [field]: value } : section,
      ),
    }));
  };

  const updateParagraph = (sectionIndex, paragraphIndex, value) => {
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
  };

  const addSection = () => {
    setForm((previous) => ({
      ...previous,
      content: [...previous.content, { heading: "", paragraphs: [""] }],
    }));
  };

  const removeSection = (index) => {
    setForm((previous) => ({
      ...previous,
      content: previous.content.filter((_, i) => i !== index),
    }));
  };

  const addParagraph = (sectionIndex) => {
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
  };

  const removeParagraph = (sectionIndex, paragraphIndex) => {
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
  };

  const addTag = () => {
    const tag = tagInput.trim().replace(/,$/, "");

    if (!tag) return;

    if (form.tags.some((item) => item.toLowerCase() === tag.toLowerCase())) {
      setTagInput("");
      return;
    }

    updateField("tags", [...form.tags, tag]);
    setTagInput("");
  };

  const savePost = (event, requestedStatus) => {
    event.preventDefault();

    const status = requestedStatus || form.status;
    const slug = createSlug(form.slug || form.title);

    if (!form.title.trim() || !slug || !form.category) {
      toast.error("Title, slug and category are required.");
      return;
    }

    if (
      status === "published" &&
      (!form.excerpt.trim() ||
        !form.content.some(
          (section) =>
            section.heading.trim() &&
            section.paragraphs.some((paragraph) => paragraph.trim()),
        ))
    ) {
      toast.error("Add an excerpt and at least one complete content section.");
      return;
    }

    const allPosts = getSavedPosts();

    if (
      allPosts.some(
        (post) => post.slug === slug && String(post.id) !== String(postId),
      )
    ) {
      toast.error("This slug is already in use.");
      return;
    }

    const now = new Date().toISOString().slice(0, 10);

    const existing = allPosts.find(
      (post) => String(post.id) === String(postId),
    );

    const nextPost = {
      ...form,
      id: isEditing
        ? existing.id
        : Math.max(0, ...allPosts.map((post) => Number(post.id) || 0)) + 1,
      slug,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      category: form.category,
      tags: form.tags,
      featuredImage: {
        src: form.featuredImage.src.trim(),
        alt: form.featuredImage.alt.trim(),
      },
      author: form.author.trim() || "Ultra Credit Solutions Team",
      status,
      featured: Boolean(form.featured),
      publishedAt:
        status === "published"
          ? existing?.publishedAt || form.publishedAt || now
          : status === "scheduled"
            ? form.publishedAt
            : null,
      updatedAt: now,
      seo: {
        title: form.seo.title.trim() || form.title.trim(),
        description: form.seo.description.trim() || form.excerpt.trim(),
      },
      content: form.content
        .map((section) => ({
          heading: section.heading.trim(),
          paragraphs: section.paragraphs
            .map((paragraph) => paragraph.trim())
            .filter(Boolean),
        }))
        .filter((section) => section.heading || section.paragraphs.length),
    };

    const nextPosts = isEditing
      ? allPosts.map((post) =>
          String(post.id) === String(postId) ? nextPost : post,
        )
      : [nextPost, ...allPosts];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts));

      toast.success(
        status === "published" ? "Post saved as published" : "Blog post saved",
      );

      router.push("/admin/blog");
    } catch {
      toast.error(
        "Could not save this post. Browser storage may be full. Try a smaller image.",
      );
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-[#EEEEEE] bg-white p-8 text-sm text-[#888888]">
        Loading blog editor...
      </div>
    );
  }

  const inputClass =
    "mt-1.5 h-11 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

  const textareaClass =
    "mt-1.5 w-full resize-y rounded-lg border border-[#EEEEEE] bg-white p-3 text-sm leading-6 text-[#081828] outline-none placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100";

  const labelClass = "text-sm font-medium text-[#081828]";

  // Keep categories selectable for existing posts, even if inactive.
  const availableCategories = categoryOptions.filter(
    (category) =>
      category.status === "active" || category.name === form.category,
  );

  const existingCategoryMissing =
    form.category &&
    !availableCategories.some((category) => category.name === form.category);

  return (
    <form className="space-y-4" onSubmit={(event) => savePost(event)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            aria-label="Back to blog posts"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EEEEEE] text-[#555555] hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-[#081828]">
              {isEditing ? "Edit Blog Post" : "Create Blog Post"}
            </h1>
            <p className="mt-1 text-sm text-[#888888]">
              Manage article content, featured image and SEO metadata.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={(event) => savePost(event, "draft")}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm font-medium text-[#555555] hover:bg-gray-50"
          >
            <Save size={15} />
            Save Draft
          </button>

          <button
            type="button"
            onClick={(event) => savePost(event, "published")}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white hover:bg-[#1F4386]"
          >
            <Globe size={15} />
            Publish
          </button>
        </div>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {/* Post Content */}
          <section className="rounded-xl border border-[#EEEEEE] bg-white p-4 sm:p-5">
            <h2 className="text-base font-semibold text-[#081828]">
              Post Content
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="blog-title" className={labelClass}>
                  Title *
                </label>
                <input
                  id="blog-title"
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
                  placeholder="Enter blog post title"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="blog-slug" className={labelClass}>
                  URL Slug *
                </label>
                <div className="mt-1.5 flex overflow-hidden rounded-lg border border-[#EEEEEE] focus-within:border-[#2852A0] focus-within:ring-2 focus-within:ring-blue-100">
                  <span className="shrink-0 bg-[#FAFAFA] px-3 py-3 text-xs text-[#888888]">
                    /blog/
                  </span>
                  <input
                    id="blog-slug"
                    required
                    value={form.slug}
                    onChange={(event) => {
                      setSlugEdited(true);
                      updateField("slug", createSlug(event.target.value));
                    }}
                    placeholder="your-post-slug"
                    className="h-11 min-w-0 flex-1 px-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="blog-excerpt" className={labelClass}>
                  Excerpt
                </label>
                <textarea
                  id="blog-excerpt"
                  rows={3}
                  maxLength={350}
                  value={form.excerpt}
                  onChange={(event) =>
                    updateField("excerpt", event.target.value)
                  }
                  placeholder="Short summary of the article..."
                  className={textareaClass}
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-[#081828]">
                  Article Sections
                </h3>
                <button
                  type="button"
                  onClick={addSection}
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 text-sm font-medium text-[#2852A0] hover:bg-blue-50"
                >
                  <Plus size={15} />
                  Add Section
                </button>
              </div>

              {form.content.map((section, sectionIndex) => (
                <div
                  key={`section-${sectionIndex}`}
                  className="space-y-3 rounded-xl border border-[#EEEEEE] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#888888]">
                      Section {sectionIndex + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      title="Remove section"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#888888] hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div>
                    <label
                      htmlFor={`section-heading-${sectionIndex}`}
                      className={labelClass}
                    >
                      Heading
                    </label>
                    <input
                      id={`section-heading-${sectionIndex}`}
                      value={section.heading}
                      onChange={(event) =>
                        updateSection(
                          sectionIndex,
                          "heading",
                          event.target.value,
                        )
                      }
                      placeholder="Section heading"
                      className={inputClass}
                    />
                  </div>

                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <div key={`paragraph-${sectionIndex}-${paragraphIndex}`}>
                      <div className="mb-1 flex items-center justify-between">
                        <label
                          htmlFor={`paragraph-${sectionIndex}-${paragraphIndex}`}
                          className={labelClass}
                        >
                          Paragraph {paragraphIndex + 1}
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            removeParagraph(sectionIndex, paragraphIndex)
                          }
                          className="text-xs text-[#888888] hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        id={`paragraph-${sectionIndex}-${paragraphIndex}`}
                        rows={4}
                        value={paragraph}
                        onChange={(event) =>
                          updateParagraph(
                            sectionIndex,
                            paragraphIndex,
                            event.target.value,
                          )
                        }
                        placeholder="Write this paragraph..."
                        className={textareaClass}
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addParagraph(sectionIndex)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2852A0] hover:underline"
                  >
                    <Plus size={14} />
                    Add Paragraph
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Metadata */}
          <section className="rounded-xl border border-[#EEEEEE] bg-white p-4 sm:p-5">
            <h2 className="text-base font-semibold text-[#081828]">
              SEO Metadata
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="seo-title" className={labelClass}>
                  SEO Title
                </label>
                <input
                  id="seo-title"
                  maxLength={70}
                  value={form.seo.title}
                  onChange={(event) => updateSeo("title", event.target.value)}
                  placeholder="Search engine title"
                  className={inputClass}
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
                    updateSeo("description", event.target.value)
                  }
                  placeholder="Search result description"
                  className={textareaClass}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Publishing */}
          <section className="rounded-xl border border-[#EEEEEE] bg-white p-4">
            <h2 className="text-base font-semibold text-[#081828]">
              Publishing
            </h2>

            <div className="mt-4">
              <label htmlFor="blog-status" className={labelClass}>
                Status
              </label>
              <select
                id="blog-status"
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
                className={inputClass}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            {form.status === "scheduled" && (
              <div className="mt-4">
                <label htmlFor="scheduled-date" className={labelClass}>
                  Publication Date
                </label>
                <input
                  id="scheduled-date"
                  type="date"
                  value={form.publishedAt || ""}
                  onChange={(event) =>
                    updateField("publishedAt", event.target.value || null)
                  }
                  className={inputClass}
                />
              </div>
            )}

            <div className="mt-4">
              <label htmlFor="blog-author" className={labelClass}>
                Author
              </label>
              <input
                id="blog-author"
                value={form.author}
                onChange={(event) => updateField("author", event.target.value)}
                className={inputClass}
              />
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-[#555555]">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField("featured", event.target.checked)
                }
                className="h-4 w-4 accent-[#2852A0]"
              />
              <Star size={15} className="text-amber-500" />
              Featured post
            </label>
          </section>

          {/* Organization */}
          <section className="rounded-xl border border-[#EEEEEE] bg-white p-4">
            <h2 className="text-base font-semibold text-[#081828]">
              Organization
            </h2>

            <div className="mt-4">
              <label htmlFor="blog-category" className={labelClass}>
                Category *
              </label>

              <select
                id="blog-category"
                required
                value={form.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
                className={inputClass}
              >
                <option value="">Select category</option>

                {availableCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                    {category.status === "inactive" ? " (Inactive)" : ""}
                  </option>
                ))}

                {existingCategoryMissing && (
                  <option value={form.category}>
                    {form.category} (Existing post)
                  </option>
                )}
              </select>

              {availableCategories.length === 0 && !form.category && (
                <p className="mt-2 text-xs leading-5 text-[#888888]">
                  No active blog categories available. Add one from Admin →
                  Categories.
                </p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="blog-tags" className={labelClass}>
                Tags
              </label>

              <div className="mt-1.5 flex gap-2">
                <input
                  id="blog-tags"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add a tag"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-[#EEEEEE] px-3 text-sm outline-none focus:border-[#2852A0]"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="h-10 rounded-lg border border-[#EEEEEE] px-3 text-sm font-medium text-[#2852A0] hover:bg-blue-50"
                >
                  Add
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      updateField(
                        "tags",
                        form.tags.filter((item) => item !== tag),
                      )
                    }
                    title={`Remove ${tag}`}
                    className="rounded-md bg-[#F4F6FA] px-2.5 py-1.5 text-xs text-[#555F70] hover:bg-red-50 hover:text-red-600"
                  >
                    {tag} ×
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section className="rounded-xl border border-[#EEEEEE] bg-white p-4">
            <h2 className="text-base font-semibold text-[#081828]">
              Featured Image
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="featured-image-upload" className={labelClass}>
                  Upload from device
                </label>

                <input
                  ref={fileInputRef}
                  id="featured-image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFeaturedImageUpload}
                  className="sr-only"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1.5 flex min-h-28 w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#D6DCE8] bg-[#FAFBFD] px-3 py-4 text-center transition hover:border-[#2852A0] hover:bg-blue-50"
                >
                  {form.featuredImage.src ? (
                    <>
                      <ImageIcon size={23} className="text-[#2852A0]" />
                      <span className="mt-2 text-sm font-medium text-[#2852A0]">
                        Choose a different image
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload size={23} className="text-[#2852A0]" />
                      <span className="mt-2 text-sm font-medium text-[#2852A0]">
                        Click to upload image
                      </span>
                      <span className="mt-1 text-xs text-[#888888]">
                        JPG, PNG, WebP or GIF · Max 2 MB
                      </span>
                    </>
                  )}
                </button>
              </div>

              {form.featuredImage.src && (
                <div className="overflow-hidden rounded-lg border border-[#EEEEEE]">
                  <div className="relative">
                    <img
                      src={form.featuredImage.src}
                      alt={form.featuredImage.alt || "Featured image preview"}
                      className="aspect-video w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      aria-label="Remove featured image"
                      title="Remove image"
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

              <div>
                <label htmlFor="image-src" className={labelClass}>
                  Or use an Image URL
                </label>
                <input
                  id="image-src"
                  type="url"
                  value={
                    form.featuredImage.src.startsWith("data:")
                      ? ""
                      : form.featuredImage.src
                  }
                  onChange={(event) => {
                    updateImage("src", event.target.value);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="image-alt" className={labelClass}>
                  Image Alt Text
                </label>
                <input
                  id="image-alt"
                  value={form.featuredImage.alt}
                  onChange={(event) => updateImage("alt", event.target.value)}
                  placeholder="Describe the image"
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs leading-5 text-[#888888]">
                  Describe the image for accessibility and search engines.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </form>
  );
}
