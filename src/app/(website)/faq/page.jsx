import { faqPageCategories } from "@/data/faqPage";
import FAQAccordion from "@/components/faq/FAQAccordion";

export const metadata = {
  title: "Frequently Asked Questions | Ultra Credit Solutions",
  description:
    "Find answers to common questions about credit repair, credit reports, credit scores, dispute processes, service pricing, and Ultra Credit Solutions.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  return (
    <main className="bg-[#F7F9FC]">
      {/* Page Header */}
      <section className="border-b border-[#E8EDF5] bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-[900px] px-5 text-center sm:px-8">
          <span className="inline-flex items-center rounded-full border border-[#DCE6F6] bg-[#F7F9FC] px-4 py-1.5 text-xs font-semibold tracking-wide text-[#2852A0]">
            HAVE QUESTIONS?
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#081828] sm:text-4xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
            Find clear answers to common questions about credit repair,
            credit reports, credit scores, pricing, and our services.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <div className="mx-auto max-w-[900px] space-y-9 px-5 py-10 sm:px-8 sm:py-12 lg:space-y-10">
        {faqPageCategories.map((category, index) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
          >
            {/* Category Heading */}
            <div className="mb-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-7 w-1 shrink-0 rounded-full bg-[#FF6B81]" />

                <div>
                  <h2
                    id={`${category.id}-heading`}
                    className="text-xl font-bold tracking-tight text-[#081828] sm:text-2xl"
                  >
                    {category.title}
                  </h2>

                  <p className="mt-1.5 text-sm leading-6 text-[#667085]">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Category Questions */}
            <FAQAccordion faqs={category.faqs} />
          </section>
        ))}
      </div>
    </main>
  );
}