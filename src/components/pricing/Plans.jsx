import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { pricing } from "@/data/pricing";

function PlanCard({ plan }) {
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
        plan.featured
          ? "border-[#2852A0] shadow-[0_6px_24px_rgba(40,82,160,0.08)]"
          : "border-[#E5EAF2] hover:border-[#CBD7E9] hover:shadow-[0_6px_24px_rgba(8,24,40,0.04)]"
      }`}
    >
      {plan.featured && (
        <div className="flex items-center justify-center gap-1.5 bg-[#2852A0] px-4 py-2 text-xs font-semibold text-white">
          <Sparkles className="h-3.5 w-3.5" />
          Premium Plan
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[#081828] sm:text-xl">
              {plan.name}
            </h2>

            <p className="mt-1.5 text-sm leading-5 text-[#667085]">
              {plan.description}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              plan.featured
                ? "bg-[#EAF0FC] text-[#2852A0]"
                : "bg-[#FFF0F3] text-[#FF6B81]"
            }`}
          >
            <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-5 border-b border-[#EDF0F6] pb-5">
          <div className="flex items-end gap-1">
            <span className="mb-1 text-base font-semibold text-[#081828]">
              $
            </span>

            <span className="text-4xl font-bold tracking-tight text-[#081828] sm:text-[42px]">
              {plan.price}
            </span>

            <span className="mb-1.5 text-sm text-[#667085]">
              {plan.billingLabel || "/mo"}
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-[#7A8596]">
            {plan.note}
          </p>

          <Link
            href={plan.href}
            className={`mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              plan.featured
                ? "bg-[#2852A0] !text-white hover:bg-[#1E417F] focus-visible:outline-[#2852A0]"
                : "bg-[#081828] !text-white hover:bg-[#17365C] focus-visible:outline-[#081828]"
            }`}
          >
            {plan.buttonLabel}

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="flex-1 px-5 pb-5 sm:px-6 sm:pb-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#667085]">
          What&apos;s Included
        </h3>

        <ul className="mt-4 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <CheckCircle2
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  plan.featured ? "text-[#2852A0]" : "text-[#FF6B81]"
                }`}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span className="text-[13px] leading-5 text-[#475467] sm:text-sm">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Plans() {
  return (
    <section
      id="plans"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#081828] sm:text-3xl lg:text-[38px]">
            Choose Your Pricing Plan
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base sm:leading-8">
            Compare the available options and review each plan&apos;s
            features and associated fees.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 items-stretch gap-5 sm:mt-12 md:grid-cols-2 md:gap-6">
          {pricing.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-6 text-[#667085]">
          Review all applicable fees and service terms before enrolling.
          The services available to you may depend on your circumstances
          and the applicable agreement.
        </p>
      </div>
    </section>
  );
}