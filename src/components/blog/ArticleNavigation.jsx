
import Link from "next/link";

export default function ArticleNavigation({
  previousPost,
  nextPost,
}) {
  if (!previousPost && !nextPost) return null;

  return (
    <nav
      aria-label="Article navigation"
      className="mt-10 grid grid-cols-1 gap-4 border-t border-[#EEEEEE] pt-6 sm:grid-cols-2"
    >
      {previousPost ? (
        <Link
          href={`/blog/${previousPost.slug}`}
          className="group flex min-w-0 flex-col rounded-xl border border-[#E8EBF0] p-4 transition-all hover:border-[#2852A0] hover:bg-[#FAFBFD] sm:p-5"
        >
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-[#777777]">
            <span aria-hidden="true">←</span>
            Previous Article
          </span>

          <span className="line-clamp-2 text-sm font-bold leading-5 text-[#081828] transition-colors group-hover:text-[#2852A0]">
            {previousPost.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex min-w-0 flex-col items-start rounded-xl border border-[#E8EBF0] p-4 transition-all hover:border-[#2852A0] hover:bg-[#FAFBFD] sm:items-end sm:p-5 sm:text-right"
        >
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-[#777777]">
            Next Article
            <span aria-hidden="true">→</span>
          </span>

          <span className="line-clamp-2 text-left text-sm font-bold leading-5 text-[#081828] transition-colors group-hover:text-[#2852A0] sm:text-right">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}
