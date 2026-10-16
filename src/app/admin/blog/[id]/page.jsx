import BlogPostForm from "@/components/admin/blog/BlogPostForm";

export const metadata = {
  title: "Edit Blog Post | Ultra Credit Solutions",
};

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;

  return <BlogPostForm postId={id} />;
}