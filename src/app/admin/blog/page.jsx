"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FileText } from "lucide-react";

import BlogStats from "@/components/admin/blog/BlogStats";
import BlogToolbar from "@/components/admin/blog/BlogToolbar";
import BlogTable from "@/components/admin/blog/BlogTable";
import BlogDeleteDialog from "@/components/admin/blog/BlogDeleteDialog";
import DataPagination from "@/components/admin/shared/DataPagination";

export default function BlogManagementPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [postToDelete, setPostToDelete] = useState(null);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [updatingPostId, setUpdatingPostId] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/blog", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load blog posts.");
      }

      setPosts(Array.isArray(data.posts) ? data.posts : []);
    } catch (error) {
      toast.error(error.message || "Could not load blog posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const stats = useMemo(
    () => ({
      total: posts.length,
      published: posts.filter((post) => post.status === "published").length,
      drafts: posts.filter((post) => post.status === "draft").length,
      featured: posts.filter((post) => post.featured).length,
    }),
    [posts],
  );

  const categories = useMemo(
    () =>
      [...new Set(posts.map((post) => post.category).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const tags = Array.isArray(post.tags) ? post.tags : [];

      const matchesSearch =
        !query ||
        String(post.title || "")
          .toLowerCase()
          .includes(query) ||
        String(post.slug || "")
          .toLowerCase()
          .includes(query) ||
        String(post.excerpt || "")
          .toLowerCase()
          .includes(query) ||
        String(post.author || "")
          .toLowerCase()
          .includes(query) ||
        tags.some((tag) => String(tag).toLowerCase().includes(query));

      const matchesCategory = category === "All" || post.category === category;

      const matchesStatus = status === "All" || post.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, search, category, status]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;

    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, safeCurrentPage, pageSize]);

  const startRecord =
    filteredPosts.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;

  const endRecord = Math.min(safeCurrentPage * pageSize, filteredPosts.length);

  const handleTogglePublish = async (post) => {
    if (updatingPostId !== null) return;

    const postId = post.id ?? post._id;

    if (!postId) {
      toast.error("Could not identify this blog post.");
      return;
    }

    const nextStatus = post.status === "published" ? "draft" : "published";

    const previousPost = post;

    setUpdatingPostId(String(postId));

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...previousPost,
          status: nextStatus,
          publishedAt:
            nextStatus === "published"
              ? previousPost.publishedAt ||
                new Date().toISOString().slice(0, 10)
              : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update blog post.");
      }

      if (!data.post) {
        throw new Error("The server did not return the updated post.");
      }

      setPosts((currentPosts) =>
        currentPosts.map((item) =>
          String(item.id ?? item._id) === String(postId) ? data.post : item,
        ),
      );

      toast.success(
        nextStatus === "published"
          ? "Post marked as published."
          : "Post moved to drafts.",
      );
    } catch (error) {
      toast.error(error.message || "Could not update blog post.");
    } finally {
      setUpdatingPostId(null);
    }
  };

  const handleDelete = async () => {
    if (!postToDelete || deleting) return;

    const postId = postToDelete.id ?? postToDelete._id;

    if (!postId) {
      toast.error("Could not identify this blog post.");
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete blog post.");
      }

      setPosts((currentPosts) =>
        currentPosts.filter(
          (post) => String(post.id ?? post._id) !== String(postId),
        ),
      );

      setPostToDelete(null);

      toast.success("Blog post deleted successfully.");
    } catch (error) {
      toast.error(error.message || "Could not delete blog post.");
    } finally {
      setDeleting(false);
    }
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

          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <p className="text-sm text-[#888888]">Loading blog posts...</p>
            </div>
          ) : (
            <>
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
                  setPageSize(Number(value));
                  setCurrentPage(1);
                }}
              />
            </>
          )}
        </div>

        {!loading && (
          <p className="flex items-center gap-2 text-xs text-[#999999]">
            <FileText size={14} />
            Blog posts are managed through the database.
          </p>
        )}
      </div>

      <BlogDeleteDialog
        post={postToDelete}
        onCancel={() => {
          if (!deleting) setPostToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}
