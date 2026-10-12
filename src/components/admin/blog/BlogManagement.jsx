"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  FileText,
} from "lucide-react";

import BlogToolbar from "@/components/admin/blog/BlogToolbar";
import BlogTable from "@/components/admin/blog/BlogTable";

export default function BlogManagement({
  initialBlogs = [],
}) {
  const [blogs] = useState(initialBlogs);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const categories = useMemo(() => {
    return [
      ...new Set(
        blogs
          .map((blog) => blog.category)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs
      .filter((blog) => {
        const searchableText = [
          blog.title,
          blog.excerpt,
          blog.author,
          blog.category,
          ...(blog.tags || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !query || searchableText.includes(query);

        const matchesCategory =
          category === "all" ||
          blog.category === category;

        const matchesStatus =
          status === "all" ||
          blog.status === status;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        const dateA = new Date(
          a.updatedAt || a.publishedAt || 0
        ).getTime();

        const dateB = new Date(
          b.updatedAt || b.publishedAt || 0
        ).getTime();

        return dateB - dateA;
      });
  }, [blogs, search, category, status]);

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setStatus("all");
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 xl:p-8">
        {/* Page Header */}
        <div>
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#888888] transition hover:text-[#2852A0]"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
              <FileText size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl">
                Blog Posts
              </h1>

              <p className="mt-1 text-sm text-[#888888]">
                Create and manage your website articles.
              </p>
            </div>
          </div>
        </div>

        {/* Search, Filters and Create Button */}
        <BlogToolbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          categories={categories}
          onReset={resetFilters}
        />

        {/* Blog Table */}
        <BlogTable blogs={filteredBlogs} />
      </div>
    </div>
  );
}