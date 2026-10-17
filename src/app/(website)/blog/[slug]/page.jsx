import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/mongodb";

import ArticleContent from "@/components/blog/ArticleContent";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ArticleNavigation from "@/components/blog/ArticleNavigation";
import ArticleShare from "@/components/blog/ArticleShare";

export const dynamic = "force-dynamic";

const SITE_NAME = "Ultra Credit Solutions USA";

function toIsoString(value) {
  if (!value) return "";

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function formatDate(value) {
  const isoDate = toIsoString(value);

  if (!isoDate) return "";

  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getPlainText(content) {
  if (typeof content === "string") {
    return content
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") return item;

        if (item && typeof item === "object") {
          return item.text || item.content || item.heading || item.title || "";
        }

        return "";
      })
      .join(" ")
      .trim();
  }

  if (content && typeof content === "object") {
    return [content.intro, content.text, content.body, content.content]
      .filter((item) => typeof item === "string")
      .join(" ")
      .trim();
  }

  return "";
}

function getExcerpt(post) {
  if (typeof post.excerpt === "string" && post.excerpt.trim()) {
    return getPlainText(post.excerpt);
  }

  const plainText = getPlainText(post.content);

  if (!plainText) return "";

  return plainText.length > 180
    ? `${plainText.slice(0, 177).trim()}...`
    : plainText;
}
function getFeaturedImage(post) {
  const image = post.featuredImage;

  if (image && typeof image === "object") {
    return {
      src: image.src || image.url || "",
      alt: image.alt || post.title || "",
    };
  }

  if (typeof image === "string") {
    return {
      src: image,
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
  return {
    id: post._id.toString(),
    title: post.title || "Untitled Article",
    slug: post.slug || "",
    excerpt: getExcerpt(post),
    content: post.content ?? [],
    category: post.category || "Credit Education",
    author: post.author || SITE_NAME,
    status: post.status,
    featured: Boolean(post.featured),
    featuredImage: getFeaturedImage(post),
    publishedAt: toIsoString(post.publishedAt),
    updatedAt: toIsoString(post.updatedAt),
    tags: Array.isArray(post.tags) ? post.tags : [],
    seo: {
      title: post.seo?.title || post.metaTitle || "",
      description: post.seo?.description || post.metaDescription || "",
    },
  };
}

async function getPublishedPost(slug) {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  const db = await getDb();

  const post = await db.collection("blogs").findOne({
    slug,
    status: "published",
  });

  return post ? serializePost(post) : null;
}

async function getRelatedPosts(currentPost, limit = 4) {
  const db = await getDb();

  const documents = await db
    .collection("blogs")
    .find({
      status: "published",
      slug: {
        $type: "string",
        $ne: "",
        $nin: [currentPost.slug],
      },
    })
    .sort({
      publishedAt: -1,
      createdAt: -1,
    })
    .limit(50)
    .toArray();

  const posts = documents.map(serializePost);

  const sameCategoryPosts = posts.filter(
    (post) => post.category === currentPost.category,
  );

  const otherCategoryPosts = posts.filter(
    (post) => post.category !== currentPost.category,
  );

  return [...sameCategoryPosts, ...otherCategoryPosts].slice(0, limit);
}

async function getArticleNavigation(currentPost) {
  const db = await getDb();

  const documents = await db
    .collection("blogs")
    .find({
      status: "published",
      slug: {
        $type: "string",
        $ne: "",
      },
    })
    .sort({
      publishedAt: 1,
      createdAt: 1,
      _id: 1,
    })
    .toArray();

  const posts = documents.map(serializePost);

  const currentIndex = posts.findIndex(
    (post) => post.slug === currentPost.slug,
  );

  return {
    previousPost: currentIndex > 0 ? posts[currentIndex - 1] : null,

    nextPost:
      currentIndex >= 0 && currentIndex < posts.length - 1
        ? posts[currentIndex + 1]
        : null,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let post;

  try {
    post = await getPublishedPost(slug);
  } catch (error) {
    console.error("Blog metadata loading failed:", error);

    return {
      title: "Credit Education Blog",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  if (!post) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.seo.title || post.title;

  const description =
    post.seo.description ||
    post.excerpt ||
    `Read ${post.title} from ${SITE_NAME}.`;

  const image = post.featuredImage?.src || "";

  const canonical = `/blog/${post.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: post.featuredImage?.alt || post.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function SingleBlogPage({ params }) {
  const { slug } = await params;

  let post;

  try {
    post = await getPublishedPost(slug);
  } catch (error) {
    console.error("Blog article loading failed:", error);

    throw error;
  }

  if (!post) {
    notFound();
  }

  let relatedPosts = [];
  let previousPost = null;
  let nextPost = null;

  try {
    [relatedPosts, { previousPost, nextPost }] = await Promise.all([
      getRelatedPosts(post, 4),
      getArticleNavigation(post),
    ]);
  } catch (error) {
    console.error("Related articles or navigation loading failed:", error);
  }

  const formattedDate = formatDate(post.publishedAt);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#EEEEEE]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2 px-4 py-3 text-xs text-[#888888] sm:px-6 lg:px-8"
        >
          <Link href="/" className="transition-colors hover:text-[#2852A0]">
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <Link href="/blog" className="transition-colors hover:text-[#2852A0]">
            Blog
          </Link>

          <span aria-hidden="true">/</span>

          <span
            aria-current="page"
            className="max-w-[220px] truncate text-[#2852A0]"
          >
            {post.title}
          </span>
        </nav>
      </div>

      {/* Article Header */}
      <header className="border-b border-[#EEEEEE] bg-[#FAFBFD]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-12">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
              {SITE_NAME}
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[#777777] sm:text-sm">
              <span className="rounded-full bg-[#EAF0FC] px-3 py-1 font-semibold text-[#2852A0]">
                {post.category}
              </span>

              {formattedDate && (
                <time dateTime={post.publishedAt}>{formattedDate}</time>
              )}
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-[42px]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 max-w-xl text-base leading-7 text-[#626B78] sm:text-lg">
                {post.excerpt}
              </p>
            )}

            <p className="mt-5 text-sm text-[#777777]">
              Written by{" "}
              <span className="font-semibold text-[#081828]">
                {post.author}
              </span>
            </p>

            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <p className="mt-2 text-xs text-[#888888]">
                Updated {formatDate(post.updatedAt)}
              </p>
            )}
          </div>

          {post.featuredImage?.src && (
            <figure className="min-w-0 overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white shadow-sm">
              <img
                src={post.featuredImage.src}
                alt={post.featuredImage.alt || post.title}
                fetchPriority="high"
                className="aspect-[4/3] max-h-[420px] w-full object-cover"
              />
            </figure>
          )}
        </div>
      </header>

      {/* Article and Sidebar */}
      <div className="mx-auto max-w-[1200px] px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,790px)_320px]">
          {/* Article Content */}
          <article className="min-w-0">
            <ArticleContent sections={post.content || []} />

            {/* Share Buttons */}
            <ArticleShare title={post.title} />

            {/* Article Tags */}
            {post.tags.length > 0 && (
              <div className="mt-7 border-t border-[#EEEEEE] pt-5">
                <p className="mb-3 text-sm font-bold text-[#081828]">
                  Article Topics
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="rounded-full border border-[#E5E7EB] bg-[#FAFBFD] px-3 py-1.5 text-xs text-[#626B78]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Previous / Next Navigation */}
            <ArticleNavigation
              previousPost={previousPost}
              nextPost={nextPost}
            />

            {/* Related Articles on Mobile */}
            {relatedPosts.length > 0 && (
              <div className="mt-10 border-t border-[#EEEEEE] pt-8 lg:hidden">
                <RelatedArticles posts={relatedPosts} />
              </div>
            )}
          </article>

          {/* Desktop Sidebar */}
          <aside className="hidden min-w-0 self-stretch lg:block">
            <div className="sticky top-24 space-y-6">
              {relatedPosts.length > 0 && (
                <RelatedArticles posts={relatedPosts} />
              )}

              <section className="rounded-2xl bg-[#2852A0] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl text-white">
                  <span aria-hidden="true">?</span>
                </div>

                <h2 className="text-lg font-bold leading-snug text-white">
                  Have Questions About Your Credit?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  Contact our team to learn more about our services and discuss
                  your questions.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#FF6B81] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2852A0]"
                >
                  Contact Our Team
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              </section>
            </div>
          </aside>
        </div>
      </div>

      {/* More Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[#EEEEEE] bg-[#F9F9F9] py-10 sm:py-12">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#2852A0]">
                  Keep Learning
                </p>

                <h2 className="text-2xl font-bold text-[#081828]">
                  More Credit Resources
                </h2>
              </div>

              <Link
                href="/blog"
                className="shrink-0 text-sm font-semibold text-[#2852A0] transition-colors hover:text-[#FF6B81]"
              >
                All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <Link
                  key={relatedPost.id || relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex min-w-0 items-start gap-4 rounded-xl border border-[#EEEEEE] bg-white p-3 transition-shadow hover:shadow-md"
                >
                  {relatedPost.featuredImage?.src ? (
                    <img
                      src={relatedPost.featuredImage.src}
                      alt={relatedPost.featuredImage.alt || relatedPost.title}
                      loading="lazy"
                      className="h-20 w-24 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FC] text-xs font-semibold text-[#2852A0]">
                      Article
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-semibold text-[#2852A0]">
                      {relatedPost.category}
                    </p>

                    <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#081828] transition-colors group-hover:text-[#2852A0]">
                      {relatedPost.title}
                    </h3>

                    <span className="mt-2 inline-block text-xs font-semibold text-[#2852A0]">
                      Read article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
