import {
  BookOpenCheck,
  ClipboardCheck,
  FileSearch,
} from "lucide-react";

const items = [
  {
    title: "Review the Details",
    description:
      "Check account details, payment history, personal information, and other reported items for possible errors.",
    icon: FileSearch,
    iconClass: "bg-[#EDF3FF] text-[#2852A0]",
  },
  {
    title: "Understand Your Options",
    description:
      "If you find information you believe is incorrect, gather the relevant details and learn how to submit an appropriate dispute.",
    icon: ClipboardCheck,
    iconClass: "bg-[#FFF0F2] text-[#FF6B81]",
  },
  {
    title: "Stay Informed",
    description:
      "Keep records of your communications and review updates related to your dispute or credit-report concerns.",
    icon: BookOpenCheck,
    iconClass: "bg-[#E8F8F2] text-[#159B88]",
  },
];

export default function CreditEducation() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-16">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[3px] w-8 rounded-full bg-[#FF6B81]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
              Understanding Credit Repair
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl">
            Why Your Credit Report Deserves Attention
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
            A credit report contains information about your credit accounts
            and payment history. Lenders and other authorized parties may use
            credit-report information when evaluating certain applications.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
            Reviewing your reports can help you understand the information
            being reported and spot details that may be inaccurate or
            incomplete. When an error is identified, you can explore the
            appropriate dispute process with the relevant credit reporting
            agency or information provider.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-[#EEEEEE] p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconClass}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#081828]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#666666]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}