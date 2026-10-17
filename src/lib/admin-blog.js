
import blogsData from "@/data/blog";

export const BLOG_UPDATED_EVENT = "ucs-blog-updated";

// Temporary in-memory data store.
// Initial data comes directly from src/data/blog.js.
// No localStorage or database is used.

function cloneBlog(blog) {
  return {
    ...blog,
    categories: Array.isArray(blog.categories)
      ? [...blog.categories]
      : blog.categories,
    tags: Array.isArray(blog.tags) ? [...blog.tags] : [],
    image: blog.image ? { ...blog.image } : blog.image,
    seo: blog.seo ? { ...blog.seo } : blog.seo,
    author: blog.author ? { ...blog.author } : blog.author,
  };
}

function getInitialBlogs() {
  const initialBlogs = Array.isArray(blogsData)
    ? blogsData
    : blogsData?.blogs || [];

  return initialBlogs.map(cloneBlog);
}

let blogsStore = getInitialBlogs();

function notifyBlogsUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(BLOG_UPDATED_EVENT));
  }
}

function getNextId(blogs) {
  return (
    Math.max(0, ...blogs.map((blog) => Number(blog.id) || 0)) + 1
  );
}

/**
 * Create a URL-friendly slug.
 */
export function createSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Normalize a blog post while preserving its existing fields.
 */
function normalizeBlog(blog, index = 0) {
  const title = blog.title || "";

  return {
    ...blog,
    id: blog.id ?? index + 1,
    title,
    slug: blog.slug || createSlug(title),
    description: blog.description || blog.excerpt || "",
    excerpt: blog.excerpt || blog.description || "",
    content: blog.content || "",
    status: blog.status || "draft",
    featured: Boolean(blog.featured),
    tags: Array.isArray(blog.tags) ? [...blog.tags] : [],
    categories: Array.isArray(blog.categories)
      ? [...blog.categories]
      : blog.categories,
    seo: {
      title,
      description: blog.description || blog.excerpt || "",
      ...(blog.seo || {}),
    },
  };
}

/**
 * Get all blog posts.
 */
export function getAdminBlogs() {
  return blogsStore.map((blog, index) =>
    cloneBlog(normalizeBlog(blog, index))
  );
}

/**
 * Get a blog post by ID.
 */
export function getAdminBlogById(id) {
  const blog = blogsStore.find(
    (item) => String(item.id) === String(id)
  );

  return blog ? cloneBlog(blog) : null;
}

/**
 * Replace the entire blog collection.
 */
export function saveAdminBlogs(items) {
  if (!Array.isArray(items)) {
    throw new Error("Blog posts must be provided as an array.");
  }

  blogsStore = items.map((blog, index) =>
    normalizeBlog(blog, index)
  );

  notifyBlogsUpdated();

  return getAdminBlogs();
}

/**
 * Create a new blog post or update an existing one.
 */
export function saveAdminBlog(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Valid blog post data is required.");
  }

  const current = getAdminBlogs();
  const existing = current.find(
    (blog) => String(blog.id) === String(data.id)
  );

  const title = String(data.title || "").trim();
  const slug = createSlug(data.slug || title);

  if (!title || !slug) {
    throw new Error("Blog title and URL slug are required.");
  }

  const duplicateSlug = current.some(
    (blog) =>
      blog.slug === slug &&
      String(blog.id) !== String(existing?.id ?? "")
  );

  if (duplicateSlug) {
    throw new Error("This blog URL slug is already in use.");
  }

  const now = new Date().toISOString();
  const id = existing?.id ?? getNextId(current);

  const savedBlog = normalizeBlog(
    {
      ...existing,
      ...data,
      id,
      title,
      slug,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    },
    current.length
  );

  blogsStore = existing
    ? current.map((blog) =>
        String(blog.id) === String(id) ? savedBlog : blog
      )
    : [...current, savedBlog];

  notifyBlogsUpdated();

  return getAdminBlogById(id);
}

/**
 * Delete a blog post by ID.
 */
export function deleteAdminBlog(id) {
  blogsStore = blogsStore.filter(
    (blog) => String(blog.id) !== String(id)
  );

  notifyBlogsUpdated();

  return getAdminBlogs();
}

/**
 * Restore the original data from src/data/blog.js.
 */
export function resetAdminBlogs() {
  blogsStore = getInitialBlogs();

  notifyBlogsUpdated();

  return getAdminBlogs();
}
