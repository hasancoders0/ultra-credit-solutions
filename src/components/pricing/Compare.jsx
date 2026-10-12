import { Check, Minus } from "lucide-react";

import { pricing } from "@/data/pricing";

export default function Compare() {
  const basic = pricing.find((plan) => plan.id === "basic");
  const gold = pricing.find((plan) => plan.id === "gold");

  if (!basic || !gold) {
    return null;
  }

  const rows = [
    {
      id: "price",
      label: "Monthly Plan Price",
      basic: `$${basic.price}${basic.billingLabel || "/mo"}`,
      gold: `$${gold.price}${gold.billingLabel || "/mo"}`,
    },
    {
      id: "setup",
      label: "Setup",
      basic: "Check plan terms",
      gold: "Free Setup",
    },
    {
      id: "access",
      label: "Online Account Access",
      basic: "24/7 Access",
      gold: "24/7 Access",
    },
    {
      id: "spouse",
      label: "Spouse Offer",
      basic: "$150",
      gold: "$229",
    },
    {
      id: "bureau",
      label: "Bureau Disputes",
      basic: true,
      gold: true,
    },
    {
      id: "creditor",
      label: "Creditor Disputes",
      basic: true,
      gold: true,
    },
    {
      id: "collections",
      label: "Collection Disputes",
      basic: true,
      gold: true,
    },
    {
      id: "owner",
      label: "File Handled Directly by Owner",
      basic: false,
      gold: true,
    },
  ];

  function Value({ value }) {
    if (value === true) {
      return (
        <Check
          className="mx-auto h-5 w-5 text-[#2852A0]"
          aria-label="Included"
        />
      );
    }

    if (value === false) {
      return (
        <Minus
          className="mx-auto h-5 w-5 text-[#B0B8C5]"
          aria-label="Not listed"
        />
      );
    }

    return (
      <span className="text-sm font-medium text-[#475467]">
        {value}
      </span>
    );
  }

  return (
    <section className="bg-[#F7F9FC] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
            Compare Plans
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl lg:text-[38px]">
            Find the Right Plan for Your Needs
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#667085] sm:text-base sm:leading-8">
            Review the listed features and pricing details side by side.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#E5EAF2] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className="bg-[#F7F9FC]">
                  <th
                    scope="col"
                    className="w-[44%] px-5 py-5 text-sm font-semibold text-[#081828] sm:px-7"
                  >
                    Plan Features
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-5 text-center text-sm font-bold text-[#081828]"
                  >
                    {basic.name}
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-5 text-center text-sm font-bold text-[#2852A0]"
                  >
                    {gold.name}
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={
                      index % 2 === 0
                        ? "border-t border-[#EDF0F6] bg-white"
                        : "border-t border-[#EDF0F6] bg-[#FCFCFD]"
                    }
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-sm font-medium text-[#475467] sm:px-7"
                    >
                      {row.label}
                    </th>

                    <td className="px-5 py-4 text-center">
                      <Value value={row.basic} />
                    </td>

                    <td className="px-5 py-4 text-center">
                      <Value value={row.gold} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs leading-6 text-[#667085]">
          Confirm the current plan terms and applicable fees before
          enrolling. A feature not listed in this comparison should not
          be interpreted as a guarantee that it is unavailable.
        </p>
      </div>
    </section>
  );
}