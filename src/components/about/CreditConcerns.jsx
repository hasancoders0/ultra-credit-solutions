import {
  BadgeCheck,
  BookOpenCheck,
  ClipboardCheck,
  FileSearch,
} from "lucide-react";

const concerns = [
  {
    title: "Late Payments",
    description:
      "Review payment history for information that may be inaccurate or incorrectly reported.",
    icon: ClipboardCheck,
  },
  {
    title: "Charge-Offs",
    description:
      "Understand how charge-offs appear on credit reports and review potentially inaccurate details.",
    icon: FileSearch,
  },
  {
    title: "Bankruptcy",
    description:
      "Review bankruptcy-related reporting for possible inaccuracies or inconsistencies.",
    icon: BadgeCheck,
  },
  {
    title: "Credit Inquiries",
    description:
      "Review credit inquiries and identify entries that may need further investigation.",
    icon: BookOpenCheck,
  },
  {
    title: "Foreclosures",
    description:
      "Examine foreclosure-related information for possible reporting errors.",
    icon: FileSearch,
  },
  {
    title: "Tax Liens",
    description:
      "Review reported public-record information for accuracy and completeness.",
    icon: ClipboardCheck,
  },
  {
    title: "Student Loans",
    description:
      "Understand how student loan information appears on your credit report.",
    icon: BookOpenCheck,
  },
  {
    title: "Credit Report Errors",
    description:
      "Identify potentially inaccurate personal details, account information, or other reporting errors.",
    icon: BadgeCheck,
  },
];

export default function CreditConcerns() {
  return (
    <section className="bg-[#F9F9F9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-[#FF6B81]" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
                Credit Report Concerns
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#081828] sm:text-3xl lg:text-[38px]">
            What We Help You Understand
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
            Credit reports can include different types of account and
            public-record information. Reviewing the details carefully can
            help identify items that may require further attention.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {concerns.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-[#EEEEEE] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D5E1F7] hover:shadow-[0_16px_40px_rgba(40,82,160,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF3FF] text-[#2852A0] transition-colors group-hover:bg-[#2852A0] group-hover:text-white">
                  <Icon size={23} strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-base font-bold text-[#081828]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#666666]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-6 text-[#888888]">
          The presence of an item on a credit report does not automatically
          mean it can be removed. Any dispute or correction depends on the
          accuracy of the information and applicable law.
        </p>
      </div>
    </section>
  );
}