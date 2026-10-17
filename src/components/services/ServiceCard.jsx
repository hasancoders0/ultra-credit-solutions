
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function ServiceCard({ service }) {
  const Icon = service.icon || BriefcaseBusiness;
  const description = stripHtml(service.description || "");
  const href = service.href || `/services/${service.slug}`;

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E5EAF3] bg-white p-6 shadow-[0_8px_30px_rgba(22,49,91,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#CAD8F1] hover:shadow-[0_18px_45px_rgba(22,49,91,0.09)] sm:p-7 lg:p-8">
      {/* Top hover accent */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-1 w-0 bg-[#FF6B81] transition-all duration-300 group-hover:w-full"
      />

      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F1F5FD] transition-colors duration-300 group-hover:bg-[#E8EFFD]"
      />

      <div className="relative flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0F3] transition-colors duration-300 group-hover:bg-[#FFE3E9]">
          <Icon
            className="h-6 w-6 text-[#FF6B81]"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        {service.number && (
          <span className="text-sm font-semibold tracking-wider text-[#C5CFDF]">
            {service.number}
          </span>
        )}
      </div>

      <div className="relative mt-7 flex flex-1 flex-col">
        <h2 className="text-xl font-bold tracking-tight text-[#081828] transition-colors duration-200 group-hover:text-[#2852A0] sm:text-[22px]">
          <Link
            href={href}
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2852A0]"
          >
            {service.title}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-sm leading-7 text-[#667085]">
          {description}
        </p>

        <div className="mt-7 border-t border-[#EDF0F6] pt-5">
          <Link
            href={href}
            className="group/link inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#2852A0] transition-colors duration-200 hover:text-[#FF6B81] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2852A0]"
          >
            Explore Service
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
