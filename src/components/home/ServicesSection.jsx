import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { services } from "@/data/services";

export default function Services() {
  const featuredServices = services.filter(
    (service) => service.featured
  );

  return (
    <section
      id="services"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE6F8] bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#FF6B81]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2852A0] sm:text-xs">
              Our Services
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-[42px]">
            Your Credit Journey,
            <span className="mt-1 block text-[#2852A0]">
              Made Easier to Understand
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base sm:leading-8">
            Explore our credit education resources to understand the
            process, know what to expect, and learn more about credit scores.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featuredServices.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E5EAF3] bg-white p-6 shadow-[0_8px_30px_rgba(22,49,91,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#CAD8F1] hover:shadow-[0_18px_45px_rgba(22,49,91,0.09)] sm:p-7 lg:p-8"
              >
                {/* Top Accent */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-1 w-0 bg-[#FF6B81] transition-all duration-300 group-hover:w-full"
                />

                {/* Decorative Corner */}
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F1F5FD] transition-colors duration-300 group-hover:bg-[#E8EFFD]"
                />

                {/* Icon and Number */}
                <div className="relative flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0F3] transition-colors duration-300 group-hover:bg-[#FFE3E9]">
                    <Icon
                      className="h-6 w-6 text-[#FF6B81]"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-sm font-semibold tracking-wider text-[#C5CFDF]">
                    {service.number}
                  </span>
                </div>

                {/* Card Content */}
                <div className="relative mt-7 flex flex-1 flex-col">
                  <h3 className="text-xl font-bold tracking-tight text-[#081828] transition-colors duration-200 group-hover:text-[#2852A0] sm:text-[22px]">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-[#667085]">
                    {service.description}
                  </p>

                  {/* Service Link */}
                  <div className="mt-7 border-t border-[#EDF0F6] pt-5">
                    <Link
                      href={service.href}
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
          })}
        </div>

        {/* Supporting Information */}
        <div className="mt-9 flex items-center justify-center gap-2 text-center">
          <ShieldCheck
            className="h-5 w-5 shrink-0 text-[#2852A0]"
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <p className="text-xs leading-6 text-[#667085] sm:text-sm">
            Every credit situation is different. Explore the resources that
            help you understand your options.
          </p>
        </div>
      </div>
    </section>
  );
}