import { HeartHandshake } from "lucide-react";

export default function WhoWeAre() {
  return (
    <section className="bg-[#F9F9F9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-16">
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#E8EFFF]" />

          <div className="relative rounded-[28px] border border-[#EEEEEE] bg-white p-7 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDF3FF] text-[#2852A0]">
              <HeartHandshake size={30} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#081828] sm:text-2xl">
              Customer-Focused Credit Support
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#666666]">
              We believe customers should have clear information about their
              credit-report concerns and understand the options available
              for addressing potentially inaccurate information.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[3px] w-8 rounded-full bg-[#FF6B81]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
              Who We Are
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl">
            Get to Know Ultra Credit Solutions
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
            <p>
              Ultra Credit Solutions Inc. is a credit repair solutions
              company focused on helping customers understand concerns
              related to their credit reports.
            </p>

            <p>
              Credit reports contain information about credit accounts and
              payment history. Reviewing this information can help
              individuals identify details that may be inaccurate,
              incomplete, or require further attention.
            </p>

            <p>
              Our approach emphasizes customer service, clear communication,
              and helping people understand the process relevant to their
              individual concerns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}