import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function SingleHero({ service }) {
  return (
    <section className="overflow-hidden bg-[#F9F9F9]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="mb-10 flex flex-wrap items-center gap-2 text-sm text-[#888888]">
          <Link href="/" className="transition hover:text-[#2852A0]">
            Home
          </Link>

          <ChevronRight size={15} />

          <Link
            href="/services"
            className="transition hover:text-[#2852A0]"
          >
            Services
          </Link>

          <ChevronRight size={15} />

          <span className="text-[#2852A0]">{service.title}</span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex rounded-full bg-[#2852A0]/10 px-4 py-2 text-sm font-semibold text-[#2852A0]">
              Service Guide {service.number}
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#081828] sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#666666] sm:text-lg">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FF6B81] px-6 py-3.5 font-semibold text-white transition hover:bg-[#f45570]"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-[#EEEEEE] bg-white px-6 py-3.5 font-semibold text-[#081828] transition hover:border-[#2852A0] hover:text-[#2852A0]"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={service.image.src}
                alt={service.image.alt}
                className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[460px]"
                fetchPriority="high"
              />
            </div>

            <div className="absolute -bottom-5 left-5 right-5 rounded-xl border border-[#EEEEEE] bg-white p-5 shadow-lg sm:left-8 sm:right-8">
              <p className="text-sm font-semibold text-[#2852A0]">
                ULTRA CREDIT SOLUTIONS
              </p>

              <p className="mt-2 text-sm leading-6 text-[#666666]">
                Understand your credit information and explore the options
                available for your circumstances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}