
import Link from "next/link";
import { notFound } from "next/navigation";
import blogs from "@/data/blog";
import ArticleContent from "@/components/blog/ArticleContent";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ArticleNavigation from "@/components/blog/ArticleNavigation";
import ArticleShare from "@/components/blog/ArticleShare";

function getPublishedPost(slug) {
  return blogs.find(
    (post) => post.slug === slug && post.status === "published"
  );
}

function getChronologicalPosts() {
  return blogs
    .filter((post) => post.status === "published")
    .sort(
      (a, b) =>
        new Date(a.publishedAt).getTime() -
        new Date(b.publishedAt).getTime()
    );
}

function getRelatedPosts(currentPost, limit = 4) {
  const publishedPosts = blogs
    .filter(
      (post) =>
        post.status === "published" &&
        post.slug !== currentPost.slug
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );

  const sameCategoryPosts = publishedPosts.filter(
    (post) => post.category === currentPost.category
  );

  const otherCategoryPosts = publishedPosts.filter(
    (post) => post.category !== currentPost.category
  );

  return [...sameCategoryPosts, ...otherCategoryPosts].slice(0, limit);
}

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function generateStaticParams() {
  return blogs
    .filter((post) => post.status === "published")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPublishedPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | Ultra Credit Solutions USA",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: post.featuredImage?.src
        ? [post.featuredImage.src]
        : [],
    },
  };
}

export default async function SingleBlogPage({ params }) {
  const { slug } = await params;
  const post = getPublishedPost(slug);

  if (!post) notFound();

  const chronologicalPosts = getChronologicalPosts();

  const currentIndex = chronologicalPosts.findIndex(
    (item) => item.slug === post.slug
  );

  const previousPost =
    currentIndex > 0
      ? chronologicalPosts[currentIndex - 1]
      : null;

  const nextPost =
    currentIndex >= 0 &&
    currentIndex < chronologicalPosts.length - 1
      ? chronologicalPosts[currentIndex + 1]
      : null;

  const relatedPosts = getRelatedPosts(post, 4);
  const formattedDate = formatDate(post.publishedAt);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#EEEEEE]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2 px-4 py-3 text-xs text-[#888888] sm:px-6 lg:px-8"
        >
          <Link
            href="/"
            className="transition-colors hover:text-[#2852A0]"
          >
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            href="/blog"
            className="transition-colors hover:text-[#2852A0]"
          >
            Blog
          </Link>

          <span aria-hidden="true">/</span>

          <span className="max-w-[220px] truncate text-[#2852A0]">
            {post.category}
          </span>
        </nav>
      </div>

      {/* Article hero */}
      <header className="border-b border-[#EEEEEE] bg-[#FAFBFD]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-12">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
              Ultra Credit Solutions USA
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[#777777] sm:text-sm">
              <span className="rounded-full bg-[#EAF0FC] px-3 py-1 font-semibold text-[#2852A0]">
                {post.category}
              </span>

              <time dateTime={post.publishedAt}>
                {formattedDate}
              </time>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-[42px]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 max-w-xl text-base leading-7 text-[#626B78] sm:text-lg">
                {post.excerpt}
              </p>
            )}

            {post.author && (
              <p className="mt-5 text-sm text-[#777777]">
                Written by{" "}
                <span className="font-semibold text-[#081828]">
                  {post.author}
                </span>
              </p>
            )}

            {post.updatedAt &&
              post.updatedAt !== post.publishedAt && (
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

      {/* Main article and sidebar */}
      <div className="mx-auto max-w-[1200px] px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,790px)_320px]">
          {/* Article content */}
          <article className="min-w-0">
            <ArticleContent sections={post.content || []} />

            {/* Share buttons */}
            <ArticleShare title={post.title} />

            {/* Article tags */}
            {post.tags?.length > 0 && (
              <div className="mt-7 border-t border-[#EEEEEE] pt-5">
                <p className="mb-3 text-sm font-bold text-[#081828]">
                  Article Topics
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#E5E7EB] bg-[#FAFBFD] px-3 py-1.5 text-xs text-[#626B78]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Previous and next article navigation */}
            <ArticleNavigation
              previousPost={previousPost}
              nextPost={nextPost}
            />

            {/* Related articles on mobile */}
            {relatedPosts.length > 0 && (
              <div className="mt-10 border-t border-[#EEEEEE] pt-8 lg:hidden">
                <RelatedArticles posts={relatedPosts} />
              </div>
            )}
          </article>

          {/* Sticky desktop sidebar */}
          <aside className="hidden min-w-0 self-stretch lg:block">
            <div className="sticky top-24 space-y-6">
              <RelatedArticles posts={relatedPosts} />

              {/* Contact CTA */}
              <section className="rounded-2xl bg-[#2852A0] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl text-white">
                  <span aria-hidden="true">?</span>
                </div>

                <h2 className="text-lg font-bold leading-snug text-white">
                  Have Questions About Your Credit?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  Contact our team to learn more about our services
                  and discuss your questions.
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

      {/* More articles */}
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
                  key={relatedPost.id ?? relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex min-w-0 items-start gap-4 rounded-xl border border-[#EEEEEE] bg-white p-3 transition-shadow hover:shadow-md"
                >
                  {relatedPost.featuredImage?.src ? (
                    <img
                      src={relatedPost.featuredImage.src}
                      alt={
                        relatedPost.featuredImage.alt ||
                        relatedPost.title
                      }
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
