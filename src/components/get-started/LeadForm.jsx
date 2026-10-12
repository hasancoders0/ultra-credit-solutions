"use client";

import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import AppointmentForm from "@/components/forms/AppointmentForm";

export default function LeadForm() {
  return (
    <section
      id="get-started-form"
      className="scroll-mt-24 px-5 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Left Content - Unchanged */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2852A0]">
            Your First Step
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#081828] sm:text-4xl">
            Tell Us How We Can Help
          </h2>

          <p className="mt-5 text-base leading-7 text-[#666666]">
            Share a few details about your concerns. Our team can review your
            inquiry and contact you using your preferred method.
          </p>

          {/* Information Points */}
          <div className="mt-8 space-y-5">
            {/* Share Your Concerns */}
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-[#081828]">
                  Share Your Concerns
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#666666]">
                  Tell us what type of assistance you are looking for.
                </p>
              </div>
            </div>

            {/* Protect Your Information */}
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6B81]/10 text-[#FF6B81]">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-[#081828]">
                  Protect Your Information
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#666666]">
                  Only provide the information requested in this form. Do not
                  submit sensitive financial information.
                </p>
              </div>
            </div>

            {/* Discuss the Next Steps */}
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
                <ArrowRight size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-[#081828]">
                  Discuss the Next Steps
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#666666]">
                  Our team can review your inquiry and follow up with you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reusable Appointment Form */}
        <div className="min-w-0">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}