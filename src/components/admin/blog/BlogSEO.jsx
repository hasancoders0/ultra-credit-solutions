"use client";

import { Search, Globe } from "lucide-react";

export default function BlogSEO({
  seoTitle,
  setSeoTitle,
  seoDescription,
  setSeoDescription,
  slug,
  setSlug,
}) {
  const previewTitle = seoTitle || "Your article title";
  const previewDescription =
    seoDescription ||
    "Your article meta description will appear here.";

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold text-[#081828]">
          Search Engine Optimization
        </h3>

        <p className="mt-1 text-sm text-[#888888]">
          Customize how your article may appear in search results.
        </p>
      </div>

      {/* URL Slug */}
      <div>
        <label
          htmlFor="blog-slug"
          className="mb-2 block text-sm font-medium text-[#081828]"
        >
          URL Slug
        </label>

        <div className="flex items-center overflow-hidden rounded-xl border border-[#EEEEEE] focus-within:border-[#2852A0]">
          <span className="bg-[#F9F9F9] px-3 py-3 text-sm text-[#888888]">
            /blog/
          </span>

          <input
            id="blog-slug"
            value={slug}
            onChange={(event) =>
              setSlug(event.target.value)
            }
            placeholder="your-article-slug"
            className="min-w-0 flex-1 px-3 py-3 text-sm text-[#081828] outline-none"
          />
        </div>
      </div>

      {/* SEO Title */}
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="seo-title"
            className="text-sm font-medium text-[#081828]"
          >
            SEO Title
          </label>

          <span className="text-xs text-[#888888]">
            {seoTitle.length}/60
          </span>
        </div>

        <input
          id="seo-title"
          value={seoTitle}
          maxLength={60}
          onChange={(event) =>
            setSeoTitle(event.target.value)
          }
          placeholder="Enter SEO title"
          className="w-full rounded-xl border border-[#EEEEEE] px-4 py-3 text-sm outline-none transition focus:border-[#2852A0]"
        />
      </div>

      {/* Meta Description */}
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="seo-description"
            className="text-sm font-medium text-[#081828]"
          >
            Meta Description
          </label>

          <span className="text-xs text-[#888888]">
            {seoDescription.length}/160
          </span>
        </div>

        <textarea
          id="seo-description"
          value={seoDescription}
          maxLength={160}
          rows={4}
          onChange={(event) =>
            setSeoDescription(event.target.value)
          }
          placeholder="Write a concise description of your article."
          className="w-full resize-y rounded-xl border border-[#EEEEEE] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#2852A0]"
        />
      </div>

      {/* Search Preview */}
      <div className="rounded-xl border border-[#EEEEEE] bg-[#F9F9F9] p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#888888]">
          <Search size={15} />
          Search Preview
        </div>

        <div className="rounded-lg bg-white p-4">
          <div className="flex items-center gap-2 text-xs text-[#666666]">
            <Globe size={14} />
            ultracreditsolutions.net
          </div>

          <h4 className="mt-2 line-clamp-2 text-lg font-medium text-[#2852A0]">
            {previewTitle}
          </h4>

          <p className="mt-1 break-all text-xs text-emerald-700">
            ultracreditsolutions.net/blog/{slug || "your-article-slug"}
          </p>

          <p className="mt-2 text-sm leading-6 text-[#666666]">
            {previewDescription}
          </p>
        </div>
      </div>
    </div>
  );
}