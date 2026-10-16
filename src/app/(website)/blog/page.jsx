
import Link from "next/link";
import Hero from "@/components/blog/Hero";
import BlogCard from "@/components/blog/Card";
import CTA from "@/components/blog/CTA";
import Pagination from "@/components/shared/Pagination";
import blogs from "@/data/blog";

export const metadata = {
  title: "Credit Education Blog | Ultra Credit Solutions USA",
  description:
    "Explore practical credit education articles about credit scores, credit reports, credit repair, and healthier financial habits.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Credit Education Blog | Ultra Credit Solutions USA",
    description:
      "Learn about credit reports, credit scores, credit repair, and healthy credit habits.",
    url: "/blog",
    type: "website",
  },
};

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const publishedBlogs = blogs
    .filter((post) => post.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );

  const featuredPost =
    publishedBlogs.find((post) => post.featured) || publishedBlogs[0];

  const remainingPosts = publishedBlogs.filter(
    (post) => post.slug !== featuredPost?.slug
  );

  return (
    <main className="bg-white">
      <Hero />

      <div className="mx-auto w-full max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-8">
        {/* Featured Article */}
        {featuredPost && (
          <section
            aria-label="Featured article"
            className="mb-10 mt-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FF6B81]" />

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
                Featured Article
              </p>
            </div>

            <article className="grid min-w-0 overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white md:grid-cols-2">
              <Link
                href={`/blog/${featuredPost.slug}`}
                aria-label={`Read ${featuredPost.title}`}
                className="group block min-h-[210px] overflow-hidden bg-[#F9F9F9] md:min-h-[290px]"
              >
                {featuredPost.featuredImage?.src ? (
                  <img
                    src={featuredPost.featuredImage.src}
                    alt={
                      featuredPost.featuredImage.alt ||
                      featuredPost.title
                    }
                    fetchPriority="high"
                    className="h-full min-h-[210px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:min-h-[290px]"
                  />
                ) : (
                  <div className="flex h-full min-h-[210px] items-center justify-center text-[#888888] md:min-h-[290px]">
                    <span className="text-sm">Credit Education</span>
                  </div>
                )}
              </Link>

              <div className="flex min-w-0 flex-col justify-center p-5 sm:p-7 lg:p-9">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[#888888]">
                  <span className="rounded-full bg-[#EEF3FC] px-3 py-1 font-semibold text-[#2852A0]">
                    {featuredPost.category}
                  </span>

                  <time dateTime={featuredPost.publishedAt}>
                    {formatDate(featuredPost.publishedAt)}
                  </time>
                </div>

                <h2 className="text-xl font-bold leading-snug tracking-tight text-[#081828] sm:text-2xl lg:text-3xl">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="transition-colors hover:text-[#2852A0]"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                {featuredPost.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#666666] sm:text-base">
                    {featuredPost.excerpt}
                  </p>
                )}

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#2852A0] transition-colors hover:text-[#FF6B81]"
                >
                  Read Full Article
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </section>
        )}

        {/* Latest Articles with reusable pagination */}
        {remainingPosts.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#2852A0]">
                  Explore Our Resources
                </p>

                <h2 className="text-xl font-bold tracking-tight text-[#081828] sm:text-2xl">
                  Latest Articles
                </h2>
              </div>

              <p className="shrink-0 text-xs text-[#888888] sm:text-sm">
                {remainingPosts.length}{" "}
                {remainingPosts.length === 1 ? "article" : "articles"}
              </p>
            </div>

            <Pagination
              pageSize={12}
              gridClassName="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {remainingPosts.map((post) => (
                <BlogCard
                  key={post.id ?? post.slug}
                  post={post}
                />
              ))}
            </Pagination>
          </section>
        )}

        {/* Empty state */}
        {publishedBlogs.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#EEEEEE] px-5 py-12 text-center">
            <h2 className="text-lg font-semibold text-[#081828]">
              Articles Coming Soon
            </h2>

            <p className="mt-2 text-sm text-[#888888]">
              We are preparing helpful resources about credit education
              and healthy financial habits.
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-10">
          <CTA />
        </div>
      </div>
    </main>
  );
}
