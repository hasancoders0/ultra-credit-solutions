import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LocationCTA() {
  return (
    <section className="bg-[#2852A0]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between lg:py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Have Questions About Your Credit Report?
          </h2>

          <p className="mt-4 text-base leading-7 text-white/80">
            Submit your information to learn more about the services
            available to you.
          </p>
        </div>

        <Link
          href="/get-started"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF6B81] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f25570]"
        >
          Get Started
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}