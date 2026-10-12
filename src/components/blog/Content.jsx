import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Content({ blog }) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
        <article className="min-w-0">
          <div className="mb-10 border-b border-[#EEEEEE] pb-8">
            <p className="text-base leading-8 text-[#666666]">
              {blog.excerpt}
            </p>
          </div>

          <div className="space-y-10">
            {blog.content.map((section, index) => (
              <section key={`${section.heading}-${index}`}>
                <h2 className="text-2xl font-bold leading-snug text-[#081828] sm:text-3xl">
                  {section.heading}
                </h2>

                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${index}-${paragraphIndex}`}
                      className="text-base leading-8 text-[#666666]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {blog.tags?.length > 0 && (
            <div className="mt-12 border-t border-[#EEEEEE] pt-7">
              <h3 className="text-sm font-bold text-[#081828]">
                Related Topics
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#F9F9F9] px-3 py-2 text-sm text-[#666666]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 rounded-xl border border-[#EEEEEE] bg-[#F9F9F9] p-5 sm:p-7">
            <p className="text-sm leading-7 text-[#666666]">
              This article is provided for general educational purposes and
              is not legal, financial, or credit advice. Individual
              circumstances and outcomes vary.
            </p>
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
            Explore your options and learn more about reviewing your credit
            information.
          </p>

          <Link
            href="/get-started"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-5 py-3.5 font-semibold !text-white transition hover:bg-[#1e417f]"
          >
            Get Started
            <ArrowUpRight size={18} className="text-white" />
          </Link>

          <Link
            href="/contact"
            className="mt-3 flex w-full items-center justify-center rounded-lg border border-[#EEEEEE] px-5 py-3.5 font-semibold text-[#081828] transition hover:border-[#2852A0] hover:text-[#2852A0]"
          >
            Contact Us
          </Link>
        </aside>
      </div>
    </section>
  );
}