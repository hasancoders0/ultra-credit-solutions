import Link from "next/link";

import {
  FileText,
  BriefcaseBusiness,
  Users,
  MapPin,
  ArrowUpRight,
  Plus,
  Eye,
} from "lucide-react";

import blogs from "@/data/blog";
import { services } from "@/data/services";

const stats = [
  {
    label: "Total Leads",
    value: "—",
    note: "Connect the database to view leads",
    icon: Users,
    color: "bg-blue-50 text-[#2852A0]",
    href: "/admin/leads",
  },
  {
    label: "New Leads",
    value: "—",
    note: "Live lead data not connected",
    icon: ArrowUpRight,
    color: "bg-pink-50 text-[#FF6B81]",
    href: "/admin/leads",
  },
  {
    label: "Published Blogs",
    value: blogs.filter((blog) => blog.status === "published").length,
    note: "From the current sample data",
    icon: FileText,
    color: "bg-indigo-50 text-[#2852A0]",
    href: "/admin/blog",
  },
  {
    label: "Services",
    value: services.length,
    note: "From the current service data",
    icon: BriefcaseBusiness,
    color: "bg-sky-50 text-[#007AFF]",
    href: "/admin/services",
  },
];

const actions = [
  {
    title: "Create Blog Post",
    description: "Prepare a new educational article.",
    href: "/admin/blog/new",
    icon: FileText,
  },
  {
    title: "Manage Services",
    description: "Review your service information.",
    href: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "View Leads",
    description: "Open the lead management section.",
    href: "/admin/leads",
    icon: Users,
  },
  {
    title: "Manage Locations",
    description: "Review service-area pages.",
    href: "/admin/locations",
    icon: MapPin,
  },
];

export default function AdminPage() {
  const publishedBlogs = blogs
    .filter((blog) => blog.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#2852A0]">
            Overview
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#666666] sm:text-base">
            Welcome to your Ultra Credit Solutions admin panel.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2852A0] px-5 py-3.5 text-sm font-semibold !text-white transition hover:bg-[#1e417f]"
        >
          <Plus size={18} />
          Create Blog Post
        </Link>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              href={stat.href}
              key={stat.label}
              className="group rounded-2xl border border-[#EEEEEE] bg-white p-6 transition hover:border-[#2852A0]/30 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#666666]">
                    {stat.label}
                  </p>

                  <p className="mt-4 text-3xl font-bold text-[#081828]">
                    {stat.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-[#888888]">
                {stat.note}
              </p>

              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#2852A0]">
                View Details
                <ArrowUpRight
                  size={16}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          );
        })}
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-[#081828]">
            Quick Actions
          </h2>

          <p className="mt-2 text-sm text-[#666666]">
            Quickly access the main areas of your admin panel.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                href={action.href}
                key={action.title}
                className="group rounded-2xl border border-[#EEEEEE] bg-white p-6 transition hover:-translate-y-1 hover:border-[#2852A0]/30 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 font-bold text-[#081828]">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#666666]">
                  {action.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2852A0]">
                  Open Section
                  <ArrowUpRight
                    size={16}
                    className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white">
        <div className="flex flex-col gap-4 border-b border-[#EEEEEE] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-xl font-bold text-[#081828]">
              Recent Blog Posts
            </h2>

            <p className="mt-2 text-sm text-[#666666]">
              Published articles from your current blog data.
            </p>
          </div>

          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2852A0] hover:text-[#FF6B81]"
          >
            View All Blogs
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {publishedBlogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-[#F9F9F9]">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888] sm:px-8">
                    Article
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                    Published
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#888888] sm:px-8">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EEEEEE]">
                {publishedBlogs.map((blog) => (
                  <tr key={blog.id} className="transition hover:bg-[#F9F9F9]">
                    <td className="px-6 py-5 sm:px-8">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.featuredImage.src}
                          alt=""
                          className="h-12 w-14 rounded-lg object-cover"
                        />

                        <div className="max-w-sm">
                          <p className="line-clamp-2 text-sm font-semibold text-[#081828]">
                            {blog.title}
                          </p>

                          <p className="mt-1 text-xs text-[#888888]">
                            {blog.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-[#2852A0]/10 px-3 py-1.5 text-xs font-medium text-[#2852A0]">
                        {blog.category}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#666666]">
                      {new Date(
                        `${blog.publishedAt}T12:00:00`
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </td>

                    <td className="px-6 py-5 text-right sm:px-8">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${blog.title}`}
                        className="inline-flex rounded-lg border border-[#EEEEEE] p-2 text-[#666666] transition hover:border-[#2852A0] hover:text-[#2852A0]"
                      >
                        <Eye size={17} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-8 text-sm text-[#666666]">
            No published blog posts are available.
          </p>
        )}
      </section>
    </div>
  );
}