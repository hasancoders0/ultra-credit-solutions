"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";

import FormSidebar, {
  SidebarCard,
  SidebarField,
  SidebarInput,
  SidebarSelect,
  SidebarTextarea,
  SidebarCheckbox,
  FormActions,
} from "@/components/admin/shared/FormSidebar";

import ImagePicker from "@/components/admin/media/ImagePicker";
import RichTextEditor from "@/components/admin/shared/RichTextEditor";

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

// RichTextEditor stores formatted HTML. Convert it to plain text only for
// required-field validation; keep the original HTML when saving the post.
function richTextToPlainText(value = "") {
  return String(value)
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<\/(p|div|h[1-6]|li|ul|ol|blockquote)>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export default function BlogPostForm({ postId = null }) {
  const router = useRouter();
  const isEditing = postId !== null;

  const [form, setForm] = useState(emptyPost);
  const [tagInput, setTagInput] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const refreshCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/categories", {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Could not load categories.");
      const result = await response.json();
      const categories = Array.isArray(result)
        ? result
        : Array.isArray(result.categories)
          ? result.categories
          : [];
      setCategoryOptions(categories.filter((category) => category.type === "blog" || category.type === "both"));
    } catch (error) {
      console.error("Category loading error:", error);
      toast.error("Could not load blog categories.");
    }
  }, []);

  useEffect(() => {
    refreshCategories();
    const handleFocus = () => refreshCategories();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refreshCategories]);

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      setLoading(true);
      try {
        if (!isEditing) {
          if (!cancelled) {
            setForm(emptyPost);
            setSlugEdited(false);
          }
          return;
        }

        const response = await fetch("/api/admin/blog", { cache: "no-store" });
        if (!response.ok) throw new Error("Could not load blog posts.");
        const result = await response.json();
        const posts = Array.isArray(result)
          ? result
          : Array.isArray(result.posts)
            ? result.posts
            : [];
        const post = posts.find((item) => String(item.id ?? item._id) === String(postId));

        if (!post) {
          if (!cancelled) {
            toast.error("Blog post not found.");
            router.replace("/admin/blog");
          }
          return;
        }
        if (cancelled) return;

        setForm({
          ...emptyPost,
          ...post,
          id: post.id ?? post._id,
          featuredImage: { ...emptyPost.featuredImage, ...(post.featuredImage || {}) },
          seo: { ...emptyPost.seo, ...(post.seo || {}) },
          tags: Array.isArray(post.tags) ? post.tags : [],
          content: Array.isArray(post.content) && post.content.length
            ? post.content.map((section) => ({
                heading: section.heading || "",
                paragraphs: Array.isArray(section.paragraphs) && section.paragraphs.length
                  ? section.paragraphs
                  : [""],
              }))
            : [{ heading: "", paragraphs: [""] }],
        });
        setSlugEdited(true);
      } catch (error) {
        console.error("Blog loading error:", error);
        if (!cancelled) toast.error("Could not load the blog post.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPost();
    return () => { cancelled = true; };
  }, [isEditing, postId, router]);

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const updateSeo = (field, value) => {
    setForm((previous) => ({ ...previous, seo: { ...previous.seo, [field]: value } }));
  };

  const updateImage = (field, value) => {
    setForm((previous) => ({
      ...previous,
      featuredImage: { ...previous.featuredImage, [field]: value },
    }));
  };

  const updateSection = (index, field, value) => {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) => i === index ? { ...section, [field]: value } : section),
    }));
  };

  const updateParagraph = (sectionIndex, paragraphIndex, value) => {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) => i === sectionIndex
        ? { ...section, paragraphs: section.paragraphs.map((paragraph, j) => j === paragraphIndex ? value : paragraph) }
        : section),
    }));
  };

  const addSection = () => {
    setForm((previous) => ({ ...previous, content: [...previous.content, { heading: "", paragraphs: [""] }] }));
  };

  const removeSection = (index) => {
    setForm((previous) => ({ ...previous, content: previous.content.filter((_, i) => i !== index) }));
  };

  const addParagraph = (sectionIndex) => {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) => i === sectionIndex
        ? { ...section, paragraphs: [...section.paragraphs, ""] }
        : section),
    }));
  };

  const removeParagraph = (sectionIndex, paragraphIndex) => {
    setForm((previous) => ({
      ...previous,
      content: previous.content.map((section, i) => i === sectionIndex
        ? { ...section, paragraphs: section.paragraphs.length > 1 ? section.paragraphs.filter((_, j) => j !== paragraphIndex) : [""] }
        : section),
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

  const savePost = async (event, requestedStatus) => {
    event?.preventDefault();
    if (saving) return;

    const status = requestedStatus || form.status;
    const slug = createSlug(form.slug || form.title);
    if (!form.title.trim() || !slug || !form.category) {
      toast.error("Title, slug and category are required.");
      return;
    }

    if (
      status === "published" &&
      (
        !richTextToPlainText(form.excerpt) ||
        !form.content.some(
          (section) =>
            section.heading.trim() &&
            section.paragraphs.some((paragraph) => richTextToPlainText(paragraph))
        )
      )
    ) {
      toast.error("Add an excerpt and at least one complete content section.");
      return;
    }

    const now = new Date().toISOString().slice(0, 10);
    const nextPost = {
      ...form,
      slug,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      category: form.category,
      tags: form.tags,
      featuredImage: { src: form.featuredImage.src.trim(), alt: form.featuredImage.alt.trim() },
      author: form.author.trim() || "Ultra Credit Solutions Team",
      status,
      featured: Boolean(form.featured),
      publishedAt: status === "published" ? form.publishedAt || now : status === "scheduled" ? form.publishedAt : null,
      updatedAt: now,
      seo: {
        title: form.seo.title.trim() || form.title.trim(),
        description: form.seo.description.trim() || form.excerpt.trim(),
      },
      content: form.content.map((section) => ({
        heading: section.heading.trim(),
        paragraphs: section.paragraphs
          .map((paragraph) => paragraph.trim())
          .filter((paragraph) => richTextToPlainText(paragraph)),
      })).filter((section) => section.heading || section.paragraphs.length),
    };

    setSaving(true);
    try {
      const endpoint = isEditing
        ? `/api/admin/blog/${encodeURIComponent(postId)}`
        : "/api/admin/blog";
      const response = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextPost),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || result.error || "Could not save the blog post.");
      toast.success(status === "published" ? "Post saved as published" : "Blog post saved");
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error("Blog save error:", error);
      toast.error(error.message || "Could not save this blog post.");
    } finally {
      setSaving(false);
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

  // Keep existing categories selectable for old posts,
  // even if a category is inactive or has been deleted.
  const availableCategories = categoryOptions.filter(
    (category) =>
      category.status === "active" ||
      category.name === form.category
  );

  const existingCategoryMissing =
    form.category &&
    !availableCategories.some(
      (category) => category.name === form.category
    );

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => savePost(event)}
    >
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

        <FormActions
          onSaveDraft={(event) => savePost(event, "draft")}
          onPublish={(event) => savePost(event, "published")}
          saving={saving}
          publishLabel="Publish"
        />
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
                      slug: slugEdited
                        ? previous.slug
                        : createSlug(title),
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
                      updateField(
                        "slug",
                        createSlug(event.target.value)
                      );
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
                <RichTextEditor
                  value={form.excerpt}
                  onChange={(html) => updateField("excerpt", html)}
                  placeholder="Short summary of the article..."
                  minHeight={140}
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
                          event.target.value
                        )
                      }
                      placeholder="Section heading"
                      className={inputClass}
                    />
                  </div>

                  {section.paragraphs.map(
                    (paragraph, paragraphIndex) => (
                      <div
                        key={`paragraph-${sectionIndex}-${paragraphIndex}`}
                      >
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
                              removeParagraph(
                                sectionIndex,
                                paragraphIndex
                              )
                            }
                            className="text-xs text-[#888888] hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                        <RichTextEditor
                          value={paragraph}
                          onChange={(html) =>
                            updateParagraph(sectionIndex, paragraphIndex, html)
                          }
                          placeholder="Write this paragraph..."
                          minHeight={220}
                        />
                      </div>
                    )
                  )}

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
                  onChange={(event) =>
                    updateSeo("title", event.target.value)
                  }
                  placeholder="Search engine title"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="seo-description"
                  className={labelClass}
                >
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

        {/* Shared Form Sidebar */}
        <FormSidebar
          status={form.status}
          onStatusChange={(value) => updateField("status", value)}
          statuses={[
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
            { value: "scheduled", label: "Scheduled" },
          ]}
          featured={form.featured}
          onFeaturedChange={(value) => updateField("featured", value)}
          featuredLabel="Featured post"
        >
          {form.status === "scheduled" && (
            <SidebarCard title="Schedule Publication">
              <SidebarField label="Publication Date" htmlFor="scheduled-date">
                <SidebarInput
                  id="scheduled-date"
                  type="date"
                  value={form.publishedAt || ""}
                  onChange={(event) => updateField("publishedAt", event.target.value || null)}
                />
              </SidebarField>
            </SidebarCard>
          )}

          <SidebarCard title="Author">
            <SidebarField label="Author Name" htmlFor="blog-author">
              <SidebarInput
                id="blog-author"
                value={form.author}
                onChange={(event) => updateField("author", event.target.value)}
                placeholder="Author name"
              />
            </SidebarField>
          </SidebarCard>

          <SidebarCard title="Organization">
            <SidebarField label="Category *" htmlFor="blog-category">
              <SidebarSelect
                id="blog-category"
                required
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
              >
                <option value="">Select category</option>
                {availableCategories.map((category) => (
                  <option key={category.id ?? category._id ?? category.name} value={category.name}>
                    {category.name}{category.status === "inactive" ? " (Inactive)" : ""}
                  </option>
                ))}
                {existingCategoryMissing && (
                  <option value={form.category}>{form.category} (Existing post)</option>
                )}
              </SidebarSelect>
            </SidebarField>

            {availableCategories.length === 0 && !form.category && (
              <p className="mt-2 text-xs leading-5 text-[#888888]">
                No active blog categories available. Add one from Admin → Categories.
              </p>
            )}

            <div className="mt-4">
              <SidebarField label="Tags" htmlFor="blog-tags">
                <div className="flex gap-2">
                  <SidebarInput
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
                    className="min-w-0 flex-1"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="h-11 shrink-0 rounded-lg border border-[#EEEEEE] px-3 text-sm font-medium text-[#2852A0] hover:bg-blue-50"
                  >
                    Add
                  </button>
                </div>
              </SidebarField>

              <div className="mt-3 flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => updateField("tags", form.tags.filter((item) => item !== tag))}
                    title={`Remove ${tag}`}
                    className="rounded-md bg-[#F4F6FA] px-2.5 py-1.5 text-xs text-[#555F70] hover:bg-red-50 hover:text-red-600"
                  >
                    {tag} ×
                  </button>
                ))}
              </div>
            </div>
          </SidebarCard>

          <SidebarCard title="Featured Image">
            <ImagePicker
              value={form.featuredImage.src}
              onChange={(value) => updateImage("src", value)}
              alt={form.featuredImage.alt}
              onAltChange={(value) => updateImage("alt", value)}
            />
          </SidebarCard>

          {isEditing && (
            <Link
              href={`/blog/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#EEEEEE] bg-white text-sm font-medium text-[#555555] hover:bg-gray-50"
            >
              <Eye size={16} />
              Preview Post
            </Link>
          )}
        </FormSidebar>
      </div>
    </form>
  );
}
