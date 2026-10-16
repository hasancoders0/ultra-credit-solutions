"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FileText } from "lucide-react";

import blogs from "@/data/blog";
import BlogStats from "@/components/admin/blog/BlogStats";
import BlogToolbar from "@/components/admin/blog/BlogToolbar";
import BlogTable from "@/components/admin/blog/BlogTable";
import BlogDeleteDialog from "@/components/admin/blog/BlogDeleteDialog";
import DataPagination from "@/components/admin/shared/DataPagination";

const STORAGE_KEY = "ucs-admin-blog-posts";

export default function BlogManagementPage() {
  const [posts, setPosts] = useState(blogs);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [postToDelete, setPostToDelete] = useState(null);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setPosts(parsed);
      }
    } catch {
      toast.error("Could not load saved blog changes.");
    } finally {
      setStorageReady(true);
    }
  }, []);

  const persistPosts = (nextPosts) => {
    setPosts(nextPosts);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts));
    } catch {
      toast.error("Could not save changes in this browser.");
    }
  };

  const stats = useMemo(
    () => ({
      total: posts.length,
      published: posts.filter((post) => post.status === "published").length,
      drafts: posts.filter((post) => post.status === "draft").length,
      featured: posts.filter((post) => post.featured).length,
    }),
    [posts]
  );

  const categories = useMemo(
    () =>
      [...new Set(posts.map((post) => post.category).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b)
      ),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        (post.title || "").toLowerCase().includes(query) ||
        (post.slug || "").toLowerCase().includes(query) ||
        (post.excerpt || "").toLowerCase().includes(query) ||
        (post.author || "").toLowerCase().includes(query) ||
        (post.tags || []).some((tag) =>
          tag.toLowerCase().includes(query)
        );

      const matchesCategory =
        category === "All" || post.category === category;

      const matchesStatus = status === "All" || post.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, search, category, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / pageSize)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, safeCurrentPage, pageSize]);

  const startRecord =
    filteredPosts.length === 0
      ? 0
      : (safeCurrentPage - 1) * pageSize + 1;

  const endRecord = Math.min(
    safeCurrentPage * pageSize,
    filteredPosts.length
  );

  const handleTogglePublish = (post) => {
    const nextStatus =
      post.status === "published" ? "draft" : "published";

    const now = new Date().toISOString().slice(0, 10);

    const updated = posts.map((item) =>
      item.id === post.id
        ? {
            ...item,
            status: nextStatus,
            publishedAt:
              nextStatus === "published"
                ? item.publishedAt || now
                : null,
            updatedAt: now,
          }
        : item
    );

    persistPosts(updated);

    toast.success(
      nextStatus === "published" ? "Post marked as published" : "Post moved to drafts",
      {
        description:
          "This updates the admin demo data only; it does not publish to the public website.",
      }
    );
  };

  const handleDelete = () => {
    if (!postToDelete) return;

    persistPosts(posts.filter((post) => post.id !== postToDelete.id));
    setPostToDelete(null);

    toast.success("Blog post deleted", {
      description: "Removed from this browser's saved blog data.",
    });
  };

  return (
    <>
      <div className="space-y-4">
        <BlogStats stats={stats} />

        <div className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
          <BlogToolbar
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            category={category}
            onCategoryChange={(value) => {
              setCategory(value);
              setCurrentPage(1);
            }}
            status={status}
            onStatusChange={(value) => {
              setStatus(value);
              setCurrentPage(1);
            }}
            categories={categories}
          />

          <BlogTable
            posts={paginatedPosts}
            onTogglePublish={handleTogglePublish}
            onDelete={setPostToDelete}
          />

          <DataPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalRecords={filteredPosts.length}
            startRecord={startRecord}
            endRecord={endRecord}
            onPageChange={setCurrentPage}
            itemLabel="posts"
            pageSize={pageSize}
            onPageSizeChange={(value) => {
              setPageSize(value);
              setCurrentPage(1);
            }}
          />
        </div>

        {storageReady && (
          <p className="flex items-center gap-2 text-xs text-[#999999]">
            <FileText size={14} />
            Demo mode · Changes are saved in this browser only.
          </p>
        )}
      </div>

      <BlogDeleteDialog
        post={postToDelete}
        onCancel={() => setPostToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}