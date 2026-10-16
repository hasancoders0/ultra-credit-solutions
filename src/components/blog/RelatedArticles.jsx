
import Link from "next/link";

export default function RelatedArticles({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E8EBF0] bg-white shadow-sm">
      <div className="border-b border-[#EEEEEE] px-5 py-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#2852A0]">
          Explore More
        </p>
        <h2 className="text-lg font-bold text-[#081828]">
          Related Articles
        </h2>
      </div>

      <div className="divide-y divide-[#EEEEEE]">
        {posts.map((post) => (
          <Link
            key={post.id ?? post.slug}
            href={`/blog/${post.slug}`}
            className="group flex min-w-0 gap-3 p-4 transition-colors hover:bg-[#F9FAFC]"
          >
            {post.featuredImage?.src && (
              <img
                src={post.featuredImage.src}
                alt={post.featuredImage.alt || post.title}
                loading="lazy"
                className="h-[76px] w-[88px] shrink-0 rounded-lg object-cover"
              />
            )}

            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[11px] font-semibold text-[#2852A0]">
                {post.category}
              </p>

              <h3 className="line-clamp-3 text-sm font-semibold leading-5 text-[#081828] transition-colors group-hover:text-[#2852A0]">
                {post.title}
              </h3>

              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#888888] group-hover:text-[#2852A0]">
                Read article <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="border-t border-[#EEEEEE] bg-[#FAFBFD] p-4">
        <Link
          href="/blog"
          className="flex items-center justify-center rounded-lg border border-[#DCE4F4] px-4 py-2.5 text-sm font-semibold text-[#2852A0] transition-colors hover:bg-[#EEF3FC]"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
}
