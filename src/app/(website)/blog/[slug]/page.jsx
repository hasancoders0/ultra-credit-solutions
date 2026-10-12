import { notFound } from "next/navigation";

import blogs from "@/data/blog";

import SingleHero from "@/components/blog/SingleHero";
import Content from "@/components/blog/Content";
import Related from "@/components/blog/Related";
import CTA from "@/components/blog/CTA";

const publishedBlogs = blogs.filter(
  (blog) => blog.status === "published"
);

export function generateStaticParams() {
  return publishedBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = publishedBlogs.find((item) => item.slug === slug);

  if (!blog) {
    return {
      title: "Article Not Found | Ultra Credit Solutions",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const canonical = `/blog/${blog.slug}`;

  return {
    title: blog.seo?.title || blog.title,

    description: blog.seo?.description || blog.excerpt,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "article",
      title: blog.seo?.title || blog.title,
      description: blog.seo?.description || blog.excerpt,
      url: canonical,
      publishedTime: new Date(
        `${blog.publishedAt}T12:00:00Z`
      ).toISOString(),
      modifiedTime: new Date(
        `${blog.updatedAt || blog.publishedAt}T12:00:00Z`
      ).toISOString(),
      authors: [blog.author],
      images: [
        {
          url: blog.featuredImage.src,
          alt: blog.featuredImage.alt,
        },
      ],
    },
  };
}

export default async function SingleBlogPage({ params }) {
  const { slug } = await params;

  const blog = publishedBlogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <SingleHero blog={blog} />

      <Content blog={blog} />

      <Related blogs={publishedBlogs} currentBlog={blog} />

      <CTA />
    </>
  );
}