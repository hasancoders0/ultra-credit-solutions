import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mb-6 flex items-center gap-2 text-sm text-[#888888]">
          <Link href="/" className="transition hover:text-[#2852A0]">
            Home
          </Link>

          <ChevronRight size={15} />

          <span className="text-[#2852A0]">Blog</span>
        </div>

        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-[#2852A0]/10 px-4 py-2 text-sm font-semibold text-[#2852A0]">
            Credit Education & Resources
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#081828] sm:text-5xl lg:text-6xl">
            Knowledge to Help You Understand Your Credit
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#666666] sm:text-lg">
            Explore helpful articles about credit reports, credit scores,
            credit reporting, and financial habits. Our goal is to help you
            understand your credit information and make informed decisions.
          </p>
        </div>
      </div>
    </section>
  );
}