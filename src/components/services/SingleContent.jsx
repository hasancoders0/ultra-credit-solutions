
import { CheckCircle2 } from "lucide-react";

function HtmlContent({ html }) {
  if (!html) return null;

  return (
    <div
      className="prose prose-slate max-w-none text-[#667085] prose-p:leading-8 prose-headings:text-[#081828] prose-a:text-[#2852A0]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function SingleContent({ service }) {
  if (!service) return null;

  const introduction = service.content?.introduction;
  const sections = service.content?.sections || [];

  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
        <article className="min-w-0">
          {introduction && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2852A0]">
                Service Overview
              </span>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#081828] sm:text-3xl">
                Understanding {service.title}
              </h2>

              <div className="mt-5">
                <HtmlContent html={introduction} />
              </div>
            </div>
          )}

          {sections.length > 0 && (
            <div className="mt-10 space-y-8">
              {sections.map((section, index) => (
                <section
                  key={`${section.title}-${index}`}
                  className="border-b border-[#EDF0F6] pb-8 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F1F5FD] text-sm font-semibold text-[#2852A0]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      {section.title && (
                        <h3 className="text-xl font-semibold leading-snug text-[#081828]">
                          {section.title}
                        </h3>
                      )}

                      {section.description && (
                        <div className="mt-3">
                          <HtmlContent html={section.description} />
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          )}
        </article>

        <aside className="h-fit rounded-2xl border border-[#E5EAF3] bg-[#F9FAFC] p-5 sm:p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-semibold text-[#081828]">
            Have Questions?
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#667085]">
            Talk with our team about your credit-related questions and learn
            about possible next steps for your situation.
          </p>

          <ul className="mt-5 space-y-3">
            {[
              "Understand your options",
              "Discuss your concerns",
              "Explore possible next steps",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-6 text-[#555555]"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-[#2852A0]"
                />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="/appointment"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#2852A0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#204483]"
          >
            Make an Appointment
          </a>
        </aside>
      </div>
    </section>
  );
}
