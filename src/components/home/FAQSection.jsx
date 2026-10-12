"use client";

import { useState } from "react";
import { Plus, Minus, MapPin, ExternalLink } from "lucide-react";
import { homeFaqs } from "@/data/faq";

const mapUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12090.486540960594!2d-73.8926325!3d40.7483504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25fa92fb9c7a3%3A0x88c1ec8c56457a1b!2sULTRA%20CREDIT%20SOLUTIONS-CREDIT%20REPAIR%20AND%20DEBT%20SETTLEMENT!5e0!3m2!1sen!2sbd!4v1791828077465!5m2!1sen!2sbd";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#F7F9FC] py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <span className="inline-flex items-center rounded-full border border-[#DCE6F6] bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[#2852A0]">
            HAVE QUESTIONS?
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#666666]">
            Find answers to common questions about credit repair and our services.
          </p>
        </div>

        {/* FAQ + Google Maps */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.35fr_0.85fr] lg:gap-8 xl:gap-10">
          {/* FAQ Accordion */}
          <div className="min-w-0 overflow-hidden rounded-xl border border-[#E5EAF2] bg-white px-4 shadow-[0_6px_24px_rgba(22,49,91,0.04)] sm:px-6">
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
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span
                      className={`text-sm font-semibold leading-5 transition-colors duration-200 ${
                        isOpen ? "text-[#2852A0]" : "text-[#081828]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                        isOpen
                          ? "border-[#DCE6F6] bg-[#EDF3FF] text-[#2852A0]"
                          : "border-[#E8ECF3] bg-white text-[#888888]"
                      }`}
                    >
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="max-w-3xl pb-4 pr-2 sm:pr-8">
                      <p className="text-[13px] leading-6 text-[#666666]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Google Maps Card */}
          <div className="min-w-0 overflow-hidden rounded-xl border border-[#E5EAF2] bg-white shadow-[0_6px_24px_rgba(22,49,91,0.04)]">
            {/* Map Heading */}
            <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FC] text-[#2852A0]">
                <MapPin size={20} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#081828]">
                  Find Our Office
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Ultra Credit Solutions
                </p>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="px-3 pb-3 sm:px-4 sm:pb-4">
              <div className="overflow-hidden rounded-lg border border-[#E8EDF5]">
                <iframe
                  src={mapUrl}
                  title="Ultra Credit Solutions office location on Google Maps"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="block w-full"
                />
              </div>

              {/* Address */}
              <p className="mt-3 text-xs leading-5 text-[#667085]">
                3716 73rd Street, Suite 302B, Jackson Heights, NY 11372
              </p>

              {/* Directions Link */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=ULTRA+CREDIT+SOLUTIONS+CREDIT+REPAIR+AND+DEBT+SETTLEMENT"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#2852A0] transition-colors hover:text-[#FF6B81]"
              >
                Get Directions
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}