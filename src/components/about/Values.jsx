import {
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const values = [
  {
    icon: MessageCircle,
    title: "Clear Communication",
    description:
      "We value understandable information and open communication throughout the process.",
  },
  {
    icon: HeartHandshake,
    title: "Individual Attention",
    description:
      "Every customer has different concerns, so understanding your situation matters.",
  },
  {
    icon: ShieldCheck,
    title: "Accuracy Matters",
    description:
      "Credit report information should be reviewed carefully, and concerns should be addressed appropriately.",
  },
];

export default function Values() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-[#FF6B81]" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
                Our Values
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#081828] sm:text-3xl lg:text-[38px]">
            An Approach Built Around Your Concerns
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
            Credit-related questions can feel complicated. Clear information
            and thoughtful communication can make the process easier to
            understand.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="rounded-2xl bg-[#F9F9F9] p-7 sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#2852A0] shadow-sm">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#081828]">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#666666]">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}