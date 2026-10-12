import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-5 pb-16 sm:pb-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#F7F9FC] px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#2852A0]/5" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2852A0]">
              <ShieldCheck size={19} />
              TAKE THE NEXT STEP
            </div>

            <h2 className="text-2xl font-bold leading-tight text-[#081828] sm:text-3xl lg:text-4xl">
              Ready to Get Started?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#666666] sm:text-base">
              Tell us a little about your needs, and our team can follow up to
              discuss the next steps.
            </p>
          </div>

          <Link
            href="/get-started"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#FF6B81] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#f55770]"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}