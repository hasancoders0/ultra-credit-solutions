"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { pricing } from "@/data/pricing";

const questions = [
  {
    question: "What pricing plans are available?",
    answer: `The currently listed plans are ${pricing
      .map((plan) => `${plan.name} ($${plan.price}${plan.billingLabel || "/mo"})`)
      .join(" and ")}. Review each plan's features and associated fees before making a decision.`,
  },
  {
    question: "Are there additional fees?",
    answer:
      "The listed plan prices mention additional per-deletion fees. Other fees may also be listed for specific services. Review the current service agreement for the applicable conditions.",
  },
  {
    question: "What is the difference between Basic and Gold?",
    answer:
      "The plans have different monthly prices and listed features. The Gold Plan includes free setup and states that it includes the Basic Plan features. Review the comparison above for more details.",
  },
  {
    question: "How can I get started?",
    answer:
      "Choose your preferred plan and select its button to open the Get Started form. You can submit your contact information and describe your credit-related concerns.",
  },
  {
    question: "Does credit repair guarantee a specific credit score?",
    answer:
      "No specific credit score increase or removal of accurate negative information is guaranteed. Outcomes depend on individual circumstances and the accuracy of the information being reviewed.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#F7F9FC] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
            Pricing FAQ
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl lg:text-[38px]">
            Questions About Our Pricing
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#667085] sm:text-base sm:leading-8">
            Find answers to common questions about plans, fees, and
            getting started.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                className={`overflow-hidden rounded-xl border bg-white transition-colors ${
                  isOpen
                    ? "border-[#CAD8F1]"
                    : "border-[#E5EAF2]"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-sm font-semibold leading-6 text-[#081828] sm:text-base">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#2852A0] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6">
                    <p className="border-t border-[#EDF0F6] pt-4 text-sm leading-7 text-[#667085]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}