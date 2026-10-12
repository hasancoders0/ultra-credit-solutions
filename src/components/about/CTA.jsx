import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-[#2852A0] px-6 py-12 text-center sm:px-12 sm:py-16 lg:px-20 lg:py-20">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />

        <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full border-[40px] border-white/5" />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
            <ShieldCheck size={15} />
            Start With Your Questions
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Take the Next Step?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Tell us about your credit-related concerns so our team can
            better understand your needs and discuss appropriate next steps.
          </p>

          <Link
            href="/get-started"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B81] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff526d] focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}