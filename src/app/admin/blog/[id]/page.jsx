import { notFound } from "next/navigation";

import blogs from "@/data/blog";
import BlogForm from "@/components/admin/blog/BlogForm";

export default async function EditBlogPage({ params }) {
  const { id } = await params;

  const blog = blogs.find(
    (item) => String(item.id) === String(id)
  );

  if (!blog) {
    notFound();
  }

  return <BlogForm initialBlog={blog} />;
}