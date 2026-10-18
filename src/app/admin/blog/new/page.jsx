import { Suspense } from "react";
import BlogPostForm from "@/components/admin/blog/BlogPostForm";

export const metadata = {
  title: "Create Blog Post | Ultra Credit Solutions",
};

function BlogPostFormFallback() {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <p className="text-sm text-gray-500">Loading blog editor...</p>
    </div>
  );
}

export default function NewBlogPostPage() {
  return (
    <Suspense fallback={<BlogPostFormFallback />}>
      <BlogPostForm />
    </Suspense>
  );
}