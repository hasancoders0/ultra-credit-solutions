"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Save,
  Send,
  X,
} from "lucide-react";

import BlogEditor from "@/components/admin/blog/BlogEditor";
import BlogSEO from "@/components/admin/blog/BlogSEO";

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const inputClass =
  "w-full rounded-xl border border-[#EEEEEE] px-4 py-3 text-sm text-[#081828] outline-none transition placeholder:text-[#AAAAAA] focus:border-[#2852A0]";

export default function BlogForm({ initialBlog = null }) {
  const [title, setTitle] = useState(initialBlog?.title || "");
  const [slug, setSlug] = useState(initialBlog?.slug || "");
  const [excerpt, setExcerpt] = useState(initialBlog?.excerpt || "");

  const [content, setContent] = useState(() => {
    if (!initialBlog?.content) return "";

    if (typeof initialBlog.content === "string") {
      return initialBlog.content;
    }

    return initialBlog.content
      .map((section) => {
        const heading = section.heading
          ? `<h2>${section.heading}</h2>`
          : "";

        const paragraphs = (section.paragraphs || [])
          .map((paragraph) => `<p>${paragraph}</p>`)
          .join("");

        return `${heading}${paragraphs}`;
      })
      .join("");
  });

  const [category, setCategory] = useState(
    initialBlog?.category || ""
  );

  const [author, setAuthor] = useState(
    initialBlog?.author || "Administrator"
  );

  const [tags, setTags] = useState(
    (initialBlog?.tags || []).join(", ")
  );

  const [featured, setFeatured] = useState(
    initialBlog?.featured || false
  );

  const [seoTitle, setSeoTitle] = useState(
    initialBlog?.seo?.title || ""
  );

  const [seoDescription, setSeoDescription] = useState(
    initialBlog?.seo?.description || ""
  );

  const [imageUrl, setImageUrl] = useState(
    initialBlog?.featuredImage?.src || ""
  );

  const [imageAlt, setImageAlt] = useState(
    initialBlog?.featuredImage?.alt || ""
  );

  const [message, setMessage] = useState("");

  const isEditing = Boolean(initialBlog);

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
      setMessage("Please select a valid image file.");
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

  function handleSubmit(event, nextStatus) {
    event.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter an article title.");
      return;
    }

    if (!slug.trim()) {
      setMessage("Please enter a URL slug.");
      return;
    }

    if (!category) {
      setMessage("Please select a category.");
      return;
    }

    if (!content.trim()) {
      setMessage("Please write your article content.");
      return;
    }

    const demoPost = {
      id: initialBlog?.id,
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      featured,
      featuredImage: {
        src: imageUrl,
        alt: imageAlt,
      },
      status: nextStatus,
      seo: {
        title: seoTitle,
        description: seoDescription,
      },
    };

    console.log(
      isEditing ? "Demo updated blog:" : "Demo blog post:",
      demoPost
    );

    setMessage(
      `Demo ${nextStatus} action completed. Changes are not saved permanently because the database is not connected.`
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 xl:p-8">
        <div className="mb-6">
          <Link
            href="/admin/blog"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#888888] transition hover:text-[#2852A0]"
          >
            <ArrowLeft size={16} />
            Back to Blog Posts
          </Link>

          <h1 className="text-2xl font-bold text-[#081828] sm:text-3xl">
            {isEditing ? "Edit Blog Post" : "Create New Post"}
          </h1>

          <p className="mt-1 text-sm text-[#888888]">
            {isEditing
              ? "Update your article information."
              : "Write and prepare an article for your website."}
          </p>
        </div>

        <form
          onSubmit={(event) =>
            handleSubmit(event, "published")
          }
        >
          <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-[#081828]">
                  Article Details
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="blog-title"
                      className="mb-2 block text-sm font-medium text-[#081828]"
                    >
                      Article Title *
                    </label>

                    <input
                      id="blog-title"
                      value={title}
                      onChange={(event) =>
                        handleTitleChange(event.target.value)
                      }
                      placeholder="Enter your article title"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="blog-slug"
                      className="mb-2 block text-sm font-medium text-[#081828]"
                    >
                      URL Slug *
                    </label>

                    <input
                      id="blog-slug"
                      value={slug}
                      onChange={(event) =>
                        setSlug(createSlug(event.target.value))
                      }
                      placeholder="your-article-slug"
                      className={inputClass}
                      required
                    />

                    <p className="mt-2 break-all text-xs text-[#888888]">
                      /blog/{slug || "your-article-slug"}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="blog-excerpt"
                      className="mb-2 block text-sm font-medium text-[#081828]"
                    >
                      Excerpt
                    </label>

                    <textarea
                      id="blog-excerpt"
                      rows={3}
                      value={excerpt}
                      onChange={(event) =>
                        setExcerpt(event.target.value)
                      }
                      placeholder="Write a short summary..."
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="blog-author"
                      className="mb-2 block text-sm font-medium text-[#081828]"
                    >
                      Author
                    </label>

                    <input
                      id="blog-author"
                      value={author}
                      onChange={(event) =>
                        setAuthor(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <h2 className="mb-5 text-lg font-semibold text-[#081828]">
                  Article Content
                </h2>

                <BlogEditor
                  value={content}
                  onChange={setContent}
                />
              </section>

              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <BlogSEO
                  seoTitle={seoTitle}
                  setSeoTitle={setSeoTitle}
                  seoDescription={seoDescription}
                  setSeoDescription={setSeoDescription}
                  slug={slug}
                  setSlug={setSlug}
                />
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5">
                <h2 className="text-base font-semibold text-[#081828]">
                  Publish
                </h2>

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
                    {isEditing ? "Update Article" : "Publish Article"}
                  </button>

                  <Link
                    href="/admin/blog"
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
                <h2 className="text-base font-semibold text-[#081828]">
                  Category
                </h2>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className={`${inputClass} mt-4`}
                  required
                >
                  <option value="">Choose category</option>
                  <option value="Credit Education">
                    Credit Education
                  </option>
                  <option value="Credit Reports">
                    Credit Reports
                  </option>
                  <option value="Credit Scores">
                    Credit Scores
                  </option>
                  <option value="Credit Repair">
                    Credit Repair
                  </option>
                  <option value="Financial Tips">
                    Financial Tips
                  </option>
                </select>
              </section>

              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5">
                <h2 className="text-base font-semibold text-[#081828]">
                  Featured Image
                </h2>

                <label
                  htmlFor="featured-image"
                  className="mt-4 flex min-h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#D5D5D5] bg-[#F9F9F9] p-4 transition hover:border-[#2852A0]"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={imageAlt || "Featured image preview"}
                      className="max-h-56 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <ImagePlus
                        size={30}
                        className="mx-auto text-[#888888]"
                      />

                      <p className="mt-3 text-sm font-medium text-[#081828]">
                        Click to upload image
                      </p>

                      <p className="mt-1 text-xs text-[#888888]">
                        Images only · Maximum 5 MB
                      </p>
                    </div>
                  )}
                </label>

                <input
                  id="featured-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />

                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="mt-3 text-sm text-red-600"
                  >
                    Remove Image
                  </button>
                )}

                <label
                  htmlFor="image-alt"
                  className="mb-2 mt-4 block text-sm font-medium text-[#081828]"
                >
                  Image Alt Text
                </label>

                <input
                  id="image-alt"
                  value={imageAlt}
                  onChange={(event) =>
                    setImageAlt(event.target.value)
                  }
                  placeholder="Describe the image"
                  className={inputClass}
                />
              </section>

              <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5">
                <h2 className="text-base font-semibold text-[#081828]">
                  Tags
                </h2>

                <input
                  value={tags}
                  onChange={(event) =>
                    setTags(event.target.value)
                  }
                  placeholder="credit score, credit report"
                  className={`${inputClass} mt-4`}
                />

                <p className="mt-2 text-xs text-[#888888]">
                  Separate tags with commas.
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
                      Featured Article
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-[#888888]">
                      Highlight this article on the blog page.
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