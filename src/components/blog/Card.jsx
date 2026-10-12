import Link from "next/link";
import { ArrowUpRight, CalendarDays, UserRound } from "lucide-react";

export default function Card({ blog }) {
  const date = new Date(`${blog.publishedAt}T12:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/blog/${blog.slug}`}
        className="block overflow-hidden"
        aria-label={`Read ${blog.title}`}
      >
        <img
          src={blog.featuredImage.src}
          alt={blog.featuredImage.alt}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-6 sm:p-7">
        <span className="inline-flex rounded-full bg-[#2852A0]/10 px-3 py-1.5 text-xs font-semibold text-[#2852A0]">
          {blog.category}
        </span>

        <h2 className="mt-4 text-xl font-bold leading-snug text-[#081828] transition group-hover:text-[#2852A0] sm:text-2xl">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#666666]">
          {blog.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EEEEEE] pt-4 text-xs text-[#888888]">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={15} />
            {date}
          </span>

          <span className="flex items-center gap-1.5">
            <UserRound size={15} />
            {blog.author}
          </span>
        </div>

        <Link
          href={`/blog/${blog.slug}`}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-[#2852A0] transition hover:text-[#FF6B81]"
        >
          Read Article
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}