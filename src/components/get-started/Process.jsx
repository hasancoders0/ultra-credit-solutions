import { ClipboardList, MessageCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Concerns",
    description:
      "Complete the form and share the type of assistance you are looking for.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "We Review Your Inquiry",
    description:
      "Our team can review the information you provide to understand your inquiry.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Discuss the Next Steps",
    description:
      "We can follow up with you to discuss your questions and any appropriate next steps.",
    icon: ArrowRight,
  },
];

export default function Process() {
  return (
    <section className="bg-[#F9F9F9] px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2852A0]">
            How It Works
          </span>

          <h2 className="mt-4 text-3xl font-bold text-[#081828] sm:text-4xl">
            What Happens Next?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#666666]">
            Getting in touch is simple. Here is what you can expect after
            submitting your inquiry.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="rounded-2xl border border-[#EEEEEE] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
                    <Icon size={23} />
                  </div>

                  <span className="text-3xl font-bold text-[#2852A0]/10">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#081828]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#666666]">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}