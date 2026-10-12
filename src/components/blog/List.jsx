"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import Card from "@/components/blog/Card";

export default function List({ blogs }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => ["All", ...new Set(blogs.map((blog) => blog.category))],
    [blogs]
  );

  const featuredBlog = blogs.find((blog) => blog.featured);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;

      const searchableText = [
        blog.title,
        blog.excerpt,
        blog.category,
        ...(blog.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [blogs, activeCategory, search]);

  const displayedBlogs = filteredBlogs.filter(
    (blog) => blog.id !== featuredBlog?.id
  );

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {featuredBlog && activeCategory === "All" && !search.trim() && (
          <div className="mb-16">
            <div className="mb-6">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#2852A0]">
                Featured Article
              </span>

              <h2 className="mt-2 text-2xl font-bold text-[#081828] sm:text-3xl">
                Editor&apos;s Pick
              </h2>
            </div>

            <article className="grid overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white lg:grid-cols-2">
              <a
                href={`/blog/${featuredBlog.slug}`}
                className="block min-h-[260px] overflow-hidden lg:min-h-[380px]"
              >
                <img
                  src={featuredBlog.featuredImage.src}
                  alt={featuredBlog.featuredImage.alt}
                  className="h-full min-h-[260px] w-full object-cover transition duration-500 hover:scale-105 lg:min-h-[380px]"
                />
              </a>

              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                <span className="w-fit rounded-full bg-[#2852A0]/10 px-3 py-1.5 text-xs font-semibold text-[#2852A0]">
                  {featuredBlog.category}
                </span>

                <h3 className="mt-5 text-2xl font-bold leading-snug text-[#081828] sm:text-3xl">
                  <a
                    href={`/blog/${featuredBlog.slug}`}
                    className="transition hover:text-[#2852A0]"
                  >
                    {featuredBlog.title}
                  </a>
                </h3>

                <p className="mt-4 leading-8 text-[#666666]">
                  {featuredBlog.excerpt}
                </p>

                <a
                  href={`/blog/${featuredBlog.slug}`}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-[#2852A0] px-6 py-3.5 font-semibold !text-white transition hover:bg-[#1e417f]"
                >
                  Read Featured Article
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </div>
        )}

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#2852A0]">
              Explore Our Articles
            </span>

            <h2 className="mt-2 text-3xl font-bold text-[#081828] sm:text-4xl">
              Latest Articles
            </h2>

            <p className="mt-3 text-[#666666]">
              Practical information to help you understand your credit.
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles..."
              aria-label="Search blog articles"
              className="w-full rounded-xl border border-[#EEEEEE] bg-white py-3.5 pl-11 pr-4 text-sm text-[#081828] outline-none transition placeholder:text-[#888888] focus:border-[#2852A0]"
            />
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                activeCategory === category
                  ? "border-[#2852A0] bg-[#2852A0] !text-white"
                  : "border-[#EEEEEE] bg-white text-[#666666] hover:border-[#2852A0] hover:text-[#2852A0]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {displayedBlogs.length > 0 ? (
          <>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {displayedBlogs.map((blog) => (
                <Card key={blog.id} blog={blog} />
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-[#888888]">
              Showing {displayedBlogs.length}{" "}
              {displayedBlogs.length === 1 ? "article" : "articles"}
            </p>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#EEEEEE] px-6 py-16 text-center">
            <h3 className="text-xl font-bold text-[#081828]">
              No Articles Found
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#666666]">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-lg bg-[#2852A0] px-5 py-3 font-semibold !text-white transition hover:bg-[#1e417f]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}