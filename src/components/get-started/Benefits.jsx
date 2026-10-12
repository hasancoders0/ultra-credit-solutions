import {
  MessageCircle,
  UserRound,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    title: "Personalized Attention",
    description:
      "Share your concerns so your inquiry can be reviewed in the context of your needs.",
    icon: UserRound,
  },
  {
    title: "Clear Communication",
    description:
      "Ask questions about services, pricing, and the process before deciding on next steps.",
    icon: MessageCircle,
  },
  {
    title: "A Clear Starting Point",
    description:
      "Provide the basic details our team needs to understand your inquiry.",
    icon: ClipboardCheck,
  },
  {
    title: "Respect for Your Information",
    description:
      "Our form is designed to collect basic contact information rather than sensitive financial documents.",
    icon: ShieldCheck,
  },
];

export default function Benefits() {
  return (
    <section className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2852A0]">
              Our Approach
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#081828] sm:text-4xl">
              Start With a Conversation About Your Needs
            </h2>

            <p className="mt-5 text-base leading-7 text-[#666666]">
              Understanding your questions is an important first step. Our
              inquiry process gives you a way to explain your concerns and ask
              about the services available to you.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#666666]">
              You can review the available information and discuss your options
              before deciding whether to proceed.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-xl border border-[#EEEEEE] bg-white p-6 transition duration-300 hover:border-[#2852A0]/20 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FF6B81]/10 text-[#FF6B81]">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-[#081828]">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#666666]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}