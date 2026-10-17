
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function SingleHero({ service }) {
  if (!service) return null;

  return (
    <section className="bg-[#F9F9F9] px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-[#888888]"
        >
          <Link href="/" className="hover:text-[#2852A0]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/services" className="hover:text-[#2852A0]">
            Services
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-[#2852A0]">
            {service.title}
          </span>
        </nav>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#2852A0] hover:underline"
            >
              <ArrowLeft size={16} />
              All Services
            </Link>

            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-5xl">
              {service.title}
            </h1>

            <p className="mt-5 text-base leading-8 text-[#667085]">
              {stripHtml(service.description)}
            </p>

            <Link
              href="/appointment"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#2852A0] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#204483]"
            >
              Discuss Your Needs
              <ArrowRight size={18} />
            </Link>
          </div>

          {service.image?.src && (
            <img
              src={service.image.src}
              alt={service.image.alt || service.title}
              className="aspect-[5/4] w-full rounded-[24px] object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
