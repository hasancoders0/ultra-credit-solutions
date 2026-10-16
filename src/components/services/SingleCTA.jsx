import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SingleCTA() {
  return (
    <section className="bg-[#2852A0] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
          Take the Next Step
        </span>

        <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Ready to Understand Your Credit Options?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/80">
          Start a conversation with our team to discuss your concerns and
          explore the next steps that may be appropriate for you.
        </p>

        <Link
          href="/appointment"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#FF6B81] px-7 py-4 font-semibold text-white transition hover:bg-[#f45570]"
        >
          Make an Appointment Today
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}