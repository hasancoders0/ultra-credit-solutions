import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function SingleContent({ service }) {
  const content = service.content;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <article className="min-w-0">
            <div className="border-b border-[#EEEEEE] pb-10">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#2852A0]">
                Overview
              </span>

              <h2 className="mt-3 text-2xl font-bold leading-snug text-[#081828] sm:text-3xl">
                Understanding {service.title}
              </h2>

              <p className="mt-5 text-base leading-8 text-[#666666]">
                {content.introduction}
              </p>
            </div>

            <div className="space-y-10 pt-10">
              {content.sections.map((section, index) => (
                <section key={section.title} id={`section-${index + 1}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2852A0]/10 text-sm font-bold text-[#2852A0]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold leading-snug text-[#081828] sm:text-2xl">
                        {section.title}
                      </h3>

                      <p className="mt-4 text-base leading-8 text-[#666666]">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-[#EEEEEE] bg-[#F9F9F9] p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={23}
                  className="mt-1 shrink-0 text-[#2852A0]"
                />

                <div>
                  <h3 className="text-lg font-bold text-[#081828]">
                    Make Informed Decisions
                  </h3>

                  <p className="mt-2 leading-7 text-[#666666]">
                    Understanding your credit information can help you identify
                    questions, review relevant records, and explore appropriate
                    next steps for your circumstances.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <aside className="h-fit rounded-2xl border border-[#EEEEEE] p-6 sm:p-8 lg:sticky lg:top-28">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#2852A0]">
              Need Assistance?
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-snug text-[#081828]">
              Have Questions About Your Credit?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#666666]">
              Discuss your concerns with our team and learn about the options
              available for your situation.
            </p>

            <Link
              href="/get-started"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-5 py-3.5 !text-white font-semibold transition hover:bg-[#1e417f]"
            >
              Get Started
              <ArrowUpRight size={18} className="text-white" />
            </Link>

            <Link
              href="/contact"
              className="mt-3 flex w-full items-center justify-center rounded-lg border border-[#EEEEEE] px-5 py-3.5 font-semibold text-[#081828] transition hover:border-[#2852A0] hover:text-[#2852A0]"
            >
              Contact Our Team
            </Link>

            <p className="mt-5 text-xs leading-6 text-[#888888]">
              Individual results vary. No particular credit score improvement or
              removal of information is guaranteed.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
