import { Info, ReceiptText } from "lucide-react";

import { pricing } from "@/data/pricing";

const feeDetails = [
  {
    id: "personal-info",
    title: "Personal Information",
    description: "Personal Info",
    price: "$10",
  },
  {
    id: "inquiries",
    title: "Inquiries",
    description: "Credit inquiries",
    price: "$50",
  },
  {
    id: "collections",
    title: "Collections",
    description: "Collection-related items",
    price: "$75",
  },
  {
    id: "public-records",
    title: "Public Records",
    description: "Public-record-related items",
    price: "$150",
  },
  {
    id: "debt-settlement",
    title: "Debt Settlement",
    description: "Based on saved amounts",
    price: "15%",
  },
];

export default function Fees() {
  const basic = pricing.find((plan) => plan.id === "basic");

  if (!basic) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#FF6B81]">
              <ReceiptText size={24} />
            </div>

            <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-[#081828] sm:text-3xl lg:text-[36px]">
              Understanding Additional Fees
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#667085] sm:text-base sm:leading-8">
              The listed monthly plan prices are separate from the
              additional fees shown in the existing plan information.
              Review the applicable terms before choosing a plan.
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#DCE6F8] bg-[#F7F9FC] p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#2852A0]" />

              <p className="text-xs leading-6 text-[#667085]">
                The exact conditions and timing for these fees must be
                confirmed in the current service agreement.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#E5EAF2] bg-white">
            <div className="border-b border-[#EDF0F6] bg-[#F7F9FC] px-5 py-4 sm:px-6">
              <h3 className="text-sm font-bold text-[#081828]">
                Listed Additional Fees
              </h3>

              <p className="mt-1 text-xs text-[#667085]">
                Based on the current pricing data
              </p>
            </div>

            <div className="divide-y divide-[#EDF0F6]">
              {feeDetails.map((fee) => (
                <div
                  key={fee.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-[#081828]">
                      {fee.title}
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-[#667085]">
                      {fee.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-bold text-[#2852A0]">
                    {fee.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#EDF0F6] bg-[#FCFCFD] px-5 py-4 sm:px-6">
              <p className="text-xs leading-6 text-[#667085]">
                {basic.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}