import Link from "next/link";
import { getDb } from "@/lib/mongodb";

import Hero from "@/components/blog/Hero";
import BlogCard from "@/components/blog/Card";
import CTA from "@/components/blog/CTA";
import Pagination from "@/components/shared/Pagination";

export const dynamic = "force-dynamic";

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
      "Learn about credit reports, credit scores, credit repair, and healthy credit habits from Ultra Credit Solutions USA.",
    url: "/blog",
    type: "website",
  },
};

function formatDate(date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getPlainText(value = "") {
  return String(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (match, code) => {
      const number = Number(code);
      return number > 0 && number <= 0x10ffff
        ? String.fromCodePoint(number)
        : match;
    })
    .replace(/&#x([0-9a-f]+);/gi, (match, code) => {
      const number = Number.parseInt(code, 16);
      return number > 0 && number <= 0x10ffff
        ? String.fromCodePoint(number)
        : match;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function getContentPlainText(content) {
  if (typeof content === "string") {
    return getPlainText(content);
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((section) => {
      if (typeof section === "string") {
        return getPlainText(section);
      }

      if (!section || typeof section !== "object") {
        return "";
      }

      const heading = getPlainText(section.heading || "");
      const paragraphs = Array.isArray(section.paragraphs)
        ? section.paragraphs
            .map((paragraph) => getPlainText(paragraph))
            .filter(Boolean)
            .join(" ")
        : "";

      return [heading, paragraphs].filter(Boolean).join(" ");
    })
    .filter(Boolean)
    .join(" ");
}

function getExcerpt(post) {
  const excerpt = getPlainText(post.excerpt || "");

  if (excerpt) {
    return excerpt;
  }

  const plainText = getContentPlainText(post.content);

  if (!plainText) return "";

  return plainText.length > 180
    ? `${plainText.slice(0, 177).trim()}...`
    : plainText;
}

function getFeaturedImage(post) {
  if (post.featuredImage && typeof post.featuredImage === "object") {
    return {
      src: post.featuredImage.src || "",
      alt: post.featuredImage.alt || post.title || "",
    };
  }

  if (typeof post.featuredImage === "string") {
    return {
      src: post.featuredImage,
      alt: post.title || "",
    };
  }

  if (typeof post.featuredImageUrl === "string") {
    return {
      src: post.featuredImageUrl,
      alt: post.title || "",
    };
  }

  if (typeof post.image === "string") {
    return {
      src: post.image,
      alt: post.title || "",
    };
  }

  return null;
}

function serializePost(post) {
  const publishedAt = post.publishedAt || null;
  const featuredImage = getFeaturedImage(post);

  return {
    id: post._id.toString(),
    title: post.title || "Untitled Article",
    slug: post.slug || "",
    excerpt: getExcerpt(post),
    content: post.content || "",
    category: post.category || "Credit Education",
    author: post.author || "Ultra Credit Solutions USA",
    publishedAt: publishedAt ? new Date(publishedAt).toISOString() : "",
    featuredImage,
    featured: Boolean(post.featured),
    status: post.status,
  };
}

export default async function BlogPage() {
  let publishedBlogs = [];
  let hasError = false;

  try {
    const db = await getDb();

    const posts = await db
      .collection("blogs")
      .find({
        status: "published",
        slug: {
          $type: "string",
          $ne: "",
        },
      })
      .sort({
        publishedAt: -1,
        createdAt: -1,
      })
      .toArray();

    publishedBlogs = posts.map(serializePost);
  } catch (error) {
    console.error("Failed to load public blog posts:", error);
    hasError = true;
  }

  const featuredPost =
    publishedBlogs.find((post) => post.featured) || publishedBlogs[0] || null;

  const remainingPosts = featuredPost
    ? publishedBlogs.filter((post) => post.slug !== featuredPost.slug)
    : [];

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <div className="mx-auto w-full max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-8">
        {/* Database Error */}
        {hasError ? (
          <section
            role="alert"
            className="my-8 rounded-xl border border-red-200 bg-red-50 px-5 py-12 text-center"
          >
            <h2 className="text-lg font-semibold text-[#081828]">
              Unable to load articles
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#666666]">
              We could not load the blog articles right now. Please try again
              later.
            </p>
          </section>
        ) : (
          <>
            {/* Featured Article */}
            {featuredPost && (
              <section aria-label="Featured article" className="mb-10 mt-6">
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
                          featuredPost.featuredImage.alt || featuredPost.title
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

                      {featuredPost.publishedAt && (
                        <time dateTime={featuredPost.publishedAt}>
                          {formatDate(featuredPost.publishedAt)}
                        </time>
                      )}
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

            {/* Latest Articles */}
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
                    <BlogCard key={post.id} post={post} />
                  ))}
                </Pagination>
              </section>
            )}

            {/* Empty State */}
            {publishedBlogs.length === 0 && (
              <section className="rounded-xl border border-dashed border-[#EEEEEE] px-5 py-12 text-center">
                <h2 className="text-lg font-semibold text-[#081828]">
                  Articles Coming Soon
                </h2>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#888888]">
                  We are preparing helpful resources about credit education,
                  credit reports, credit scores, and healthy financial habits.
                </p>
              </section>
            )}
          </>
        )}

        {/* Contact CTA */}
        <div className="mt-10">
          <CTA />
        </div>
      </div>
    </main>
  );
}
