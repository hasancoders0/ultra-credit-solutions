import {
  FileSearch,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid min-h-[380px] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[3px] w-8 rounded-full bg-[#FF6B81]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
              About Us
            </span>
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#081828] sm:text-5xl lg:text-[56px]">
            Helping You Better Understand Your Credit
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
            Ultra Credit Solutions Inc. is a credit repair solutions
            company focused on helping customers understand concerns
            related to their credit reports. We value clear communication
            and customer service throughout the process.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[470px]">
          <div className="absolute inset-8 rounded-full bg-[#F0F5FF] blur-3xl" />

          <div className="relative rounded-[28px] border border-[#EEEEEE] bg-[#F9F9F9] p-5 shadow-[0_20px_70px_rgba(8,24,40,0.06)] sm:p-8">
            <div className="flex items-center justify-between border-b border-[#E8EDF5] pb-5">
              <div>
                <p className="text-sm font-semibold text-[#081828]">
                  Your Credit Journey
                </p>
                <p className="mt-1 text-xs text-[#888888]">
                  Understand. Review. Take the next step.
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2852A0] text-white">
                <ShieldCheck size={25} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#E8EDF5] bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF3FF] text-[#2852A0]">
                    <FileSearch size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#081828]">
                      Credit Report Review
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-[#888888]">
                      Understand the information in your credit report.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E8EDF5] bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#FF6B81]">
                    <MessageCircle size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#081828]">
                      Discuss Your Concerns
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-[#888888]">
                      Learn about possible next steps for your situation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[#2852A0] p-4 text-white">
                <ShieldCheck size={22} />
                <p className="text-sm font-medium">
                  Clear information for informed decisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}