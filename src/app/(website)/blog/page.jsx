import Hero from "@/components/blog/Hero";
import List from "@/components/blog/List";

import blogs from "@/data/blog";

export const metadata = {
  title: "Credit Education Blog | Ultra Credit Solutions",
  description:
    "Explore educational articles about credit reports, credit scores, credit reporting, and financial habits from Ultra Credit Solutions.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const publishedBlogs = blogs
    .filter((blog) => blog.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );

  return (
    <>
      <Hero />
      <List blogs={publishedBlogs} />
    </>
  );
}