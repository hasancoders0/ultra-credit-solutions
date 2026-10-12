import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-5 pb-16 sm:pb-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#2852A0] px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/5" />

        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#FF6B81]/10 blur-2xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
              <MessageCircle size={18} />
              HAVE QUESTIONS?
            </div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              Want to Talk Before Getting Started?
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
              If you have questions about our services or pricing, contact our
              team to learn more.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-7 py-4 text-sm font-semibold text-[#2852A0] transition hover:bg-[#F9F9F9]"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}