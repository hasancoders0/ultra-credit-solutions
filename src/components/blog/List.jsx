
import BlogCard from "@/components/blog/Card";

export default function BlogList({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="latest-articles-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#2852A0]">
            Explore Our Resources
          </p>

          <h2
            id="latest-articles-heading"
            className="text-xl font-bold tracking-tight text-[#081828] sm:text-2xl"
          >
            Latest Articles
          </h2>
        </div>

        <span className="shrink-0 text-xs text-[#888888] sm:text-sm">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id ?? post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
