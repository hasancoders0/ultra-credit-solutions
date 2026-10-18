
import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";
import GoBackButton from "@/components/shared/GoBackButton";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-1 items-center justify-center bg-white px-5 py-16">
      <div className="mx-auto w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF3FC] text-[#2852A0]">
          <Search size={30} strokeWidth={1.7} />
        </div>

        {/* Error code */}
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B81]">
          Error 404
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#081828] sm:text-5xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#5F6B7A]">
          Sorry, we couldn’t find the page you’re looking for. The link may be
          outdated, or the page may have been moved.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1F417F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2852A0]"
          >
            <Home size={17} />
            Back to Home
            <ArrowRight size={16} />
          </Link>

          <GoBackButton />
        </div>

        {/* Helpful links */}
        <p className="mt-10 text-sm leading-6 text-[#8994A5]">
          Need help with your credit journey? Explore our services or contact
          our team.
        </p>

        <nav
          aria-label="Helpful links"
          className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-medium"
        >
          <Link
            href="/services"
            className="text-[#2852A0] underline-offset-4 hover:underline"
          >
            Our Services
          </Link>

          <Link
            href="/contact"
            className="text-[#2852A0] underline-offset-4 hover:underline"
          >
            Contact Us
          </Link>

          <Link
            href="/blog"
            className="text-[#2852A0] underline-offset-4 hover:underline"
          >
            Credit Education Blog
          </Link>
        </nav>
      </div>
    </main>
  );
}
