"use client";

import { useState } from "react";
import Link from "next/link";

import {
  MoreHorizontal,
  Pencil,
  Eye,
  Image as ImageIcon,
  ArrowUpRight,
} from "lucide-react";

function StatusBadge({ status }) {
  const isActive = status === "active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-gray-400"
        }`}
      />

      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function ServiceActions({ service }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        onClick={() =>
          setOpen((previous) => !previous)
        }
        aria-label={`Actions for ${service.title}`}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#888888] transition hover:bg-[#F9F9F9] hover:text-[#081828]"
      >
        <MoreHorizontal size={20} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close actions menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-[#EEEEEE] bg-white p-1.5 shadow-xl">
            <Link
              href={`/admin/services/${service.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#666666] transition hover:bg-[#F9F9F9] hover:text-[#2852A0]"
            >
              <Pencil size={16} />
              Edit Service
            </Link>

            <Link
              href={`/services/${service.slug}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#666666] transition hover:bg-[#F9F9F9] hover:text-[#2852A0]"
            >
              <Eye size={16} />
              View Service
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function ServiceTable({ services }) {
  if (!services.length) {
    return (
      <div className="rounded-2xl border border-[#EEEEEE] bg-white px-5 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2852A0]/10 text-[#2852A0]">
          <ImageIcon size={25} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-[#081828]">
          No services found
        </h3>

        <p className="mt-2 text-sm text-[#888888]">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#EEEEEE] bg-[#F9F9F9]">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Service
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Slug
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Featured
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EEEEEE]">
            {services.map((service) => {
              const image =
                typeof service.image === "string"
                  ? service.image
                  : service.image?.src;

              const imageAlt =
                typeof service.image === "object"
                  ? service.image?.alt
                  : service.title;

              return (
                <tr
                  key={service.id || service.slug}
                  className="transition hover:bg-[#F9F9F9]/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex min-w-[300px] items-center gap-3">
                      <div className="h-[58px] w-[76px] shrink-0 overflow-hidden rounded-lg bg-[#F9F9F9]">
                        {image ? (
                          <img
                            src={image}
                            alt={imageAlt || service.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#888888]">
                            <ImageIcon size={22} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#081828]">
                          {service.title}
                        </p>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#888888]">
                          {service.description ||
                            service.content?.introduction ||
                            "No description available."}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-[#F9F9F9] px-3 py-1.5 text-xs text-[#666666]">
                      /{service.slug}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={
                        service.status === "inactive"
                          ? "inactive"
                          : "active"
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    {service.featured ? (
                      <span className="text-xs font-medium text-amber-600">
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-[#888888]">
                        Standard
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <ServiceActions service={service} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#EEEEEE] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#888888]">
          Showing {services.length}{" "}
          {services.length === 1 ? "service" : "services"}
        </p>

        <p className="text-xs text-[#999999]">
          Demo data · Database not connected
        </p>
      </div>
    </div>
  );
}