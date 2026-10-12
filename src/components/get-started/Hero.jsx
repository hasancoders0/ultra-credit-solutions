import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FC] px-5 py-16 sm:py-20 lg:py-24">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#2852A0]/5 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#FF6B81]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center rounded-full border border-[#2852A0]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2852A0]">
          Get Started
        </span>

        <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-5xl">
          Let's Take the First Step Toward Your Credit Goals
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#666666] sm:text-lg sm:leading-8">
          Every financial situation is different. Tell us a little about your
          concerns, and our team can review your inquiry and discuss the next
          steps with you.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {[
            "Personalized Assistance",
            "A Simple Getting-Started Process",
            "Follow-Up From Our Team",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm text-[#666666]"
            >
              <CheckCircle2 size={17} className="shrink-0 text-[#2852A0]" />

              <span>{item}</span>
            </div>
          ))}
        </div>

        <Link
          href="#get-started-form"
          className="mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2852A0] !text-white px-7 py-4 text-sm font-semibold transition hover:bg-[#204483]"
        >
          Complete Your Inquiry
          <ArrowRight size={18} className="text-white" />
        </Link>
      </div>
    </section>
  );
}
