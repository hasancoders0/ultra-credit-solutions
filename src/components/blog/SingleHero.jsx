import Link from "next/link";
import { CalendarDays, ChevronRight, UserRound } from "lucide-react";

export default function SingleHero({ blog }) {
  const date = new Date(`${blog.publishedAt}T12:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <section className="bg-[#F9F9F9]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#888888]">
          <Link href="/" className="transition hover:text-[#2852A0]">
            Home
          </Link>

          <ChevronRight size={15} />

          <Link href="/blog" className="transition hover:text-[#2852A0]">
            Blog
          </Link>

          <ChevronRight size={15} />

          <span className="max-w-[220px] truncate text-[#2852A0] sm:max-w-sm">
            {blog.title}
          </span>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <Link
            href={`/blog?category=${encodeURIComponent(blog.category)}`}
            className="inline-flex rounded-full bg-[#2852A0]/10 px-4 py-2 text-sm font-semibold text-[#2852A0]"
          >
            {blog.category}
          </Link>

          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#666666] sm:text-lg">
            {blog.excerpt}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#888888]">
            <span className="flex items-center gap-2">
              <UserRound size={17} className="text-[#2852A0]" />
              {blog.author}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays size={17} className="text-[#2852A0]" />
              {date}
            </span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl">
          <img
            src={blog.featuredImage.src}
            alt={blog.featuredImage.alt}
            fetchPriority="high"
            className="max-h-[560px] min-h-[250px] w-full object-cover sm:min-h-[350px]"
          />
        </div>
      </div>
    </section>
  );
}