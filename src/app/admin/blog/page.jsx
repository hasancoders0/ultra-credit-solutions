import blogs from "@/data/blog";

import BlogManagement from "@/components/admin/blog/BlogManagement";

export const metadata = {
  title: "Blog Posts | Ultra Credit Solutions",
  description: "Manage blog articles for Ultra Credit Solutions.",
};

export default function AdminBlogPage() {
  const blogPosts = blogs.filter(
    (blog) =>
      blog.status === "published" ||
      blog.status === "draft"
  );

  return (
    <BlogManagement initialBlogs={blogPosts} />
  );
}