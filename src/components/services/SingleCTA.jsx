
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SingleCTA({ service }) {
  return (
    <section className="bg-white px-5 pb-16 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24">
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[24px] bg-[#2852A0] px-6 py-10 sm:px-12 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Take the Next Step
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
              Have questions about {service?.title || "your credit"}?
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
              Contact our team to discuss your concerns and learn about
              possible next steps for your situation.
            </p>
          </div>

          <Link
            href="/appointment"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF6B81] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#ff526d]"
          >
            Make an Appointment
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
