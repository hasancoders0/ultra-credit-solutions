
import Link from "next/link";

export default function BlogCard({ post }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#EEEEEE] bg-white transition-shadow duration-300 hover:shadow-md">
      <Link
        href={`/blog/${post.slug}`}
        className="block aspect-[16/9] overflow-hidden bg-[#F9F9F9]"
        aria-label={`Read ${post.title}`}
      >
        {post.featuredImage?.src ? (
          <img
            src={post.featuredImage.src}
            alt={post.featuredImage.alt || post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#888888]">
            Credit Education
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span className="font-semibold text-[#2852A0]">
            {post.category}
          </span>
          <span className="text-[#CCCCCC]">•</span>
          <time dateTime={post.publishedAt} className="text-[#888888]">
            {formattedDate}
          </time>
        </div>

        <h3 className="text-base font-bold leading-snug text-[#081828]">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-[#2852A0]"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#777777]">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2852A0] hover:text-[#FF6B81]"
        >
          Read Article <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
