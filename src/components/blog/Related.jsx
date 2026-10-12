import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Card from "@/components/blog/Card";

export default function Related({ blogs, currentBlog }) {
  const otherBlogs = blogs.filter(
    (blog) => blog.slug !== currentBlog.slug
  );

  const sameCategory = otherBlogs.filter(
    (blog) => blog.category === currentBlog.category
  );

  const otherCategories = otherBlogs.filter(
    (blog) => blog.category !== currentBlog.category
  );

  const relatedBlogs = [...sameCategory, ...otherCategories].slice(0, 3);

  if (relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F9F9F9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#2852A0]">
              Keep Learning
            </span>

            <h2 className="mt-2 text-3xl font-bold text-[#081828] sm:text-4xl">
              Related Articles
            </h2>

            <p className="mt-3 text-[#666666]">
              Explore more helpful credit education resources.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-[#2852A0] transition hover:text-[#FF6B81]"
          >
            View All Articles
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {relatedBlogs.map((blog) => (
            <Card key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}