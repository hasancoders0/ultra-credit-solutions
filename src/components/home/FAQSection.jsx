"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { homeFaqs } from "@/data/faq";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#F7F9FC] py-14 sm:py-18 lg:py-20"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <span className="inline-flex items-center rounded-full border border-[#DCE6F6] bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-[#2852A0]">
            HAVE QUESTIONS?
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#081828] sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666666] sm:text-base">
            Find answers to common questions about credit repair
            and our services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="overflow-hidden rounded-2xl border border-[#E5EAF2] bg-white px-5 shadow-[0_8px_30px_rgba(22,49,91,0.04)] sm:px-8">
          {homeFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className={
                  index !== homeFaqs.length - 1
                    ? "border-b border-[#EEF1F6]"
                    : ""
                }
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                >
                  <span
                    className={`text-sm font-semibold leading-6 transition-colors duration-200 sm:text-base ${
                      isOpen
                        ? "text-[#2852A0]"
                        : "text-[#081828]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                      isOpen
                        ? "border-[#DCE6F6] bg-[#EDF3FF] text-[#2852A0]"
                        : "border-[#E8ECF3] bg-white text-[#888888]"
                    }`}
                  >
                    {isOpen ? (
                      <Minus size={17} />
                    ) : (
                      <Plus size={17} />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="max-w-3xl pb-6 pr-8 sm:pb-7">
                    <p className="text-sm leading-7 text-[#666666]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}