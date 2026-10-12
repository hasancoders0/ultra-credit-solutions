"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQAccordion({ faqs }) {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  return (
    <div className="overflow-hidden rounded-xl border border-[#E5EAF2] bg-white px-4 shadow-[0_6px_24px_rgba(22,49,91,0.04)] sm:px-6">
      {faqs.map((faq, index) => {
        const isOpen = openId === faq.id;

        return (
          <div
            key={faq.id}
            className={
              index !== faqs.length - 1
                ? "border-b border-[#EEF1F6]"
                : ""
            }
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span
                className={`text-sm font-semibold leading-6 transition-colors ${
                  isOpen ? "text-[#2852A0]" : "text-[#081828]"
                }`}
              >
                {faq.question}
              </span>

              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isOpen
                    ? "border-[#DCE6F6] bg-[#EDF3FF] text-[#2852A0]"
                    : "border-[#E8ECF3] bg-white text-[#888888]"
                }`}
              >
                {isOpen ? <Minus size={15} /> : <Plus size={15} />}
              </span>
            </button>

            {isOpen && (
              <div className="pb-4 pr-2 sm:pr-8">
                <p className="text-sm leading-7 text-[#667085]">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}