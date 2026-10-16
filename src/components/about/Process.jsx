const steps = [
  {
    number: "01",
    title: "Tell Us Your Concerns",
    description:
      "Share your credit-related concerns through our Make an Appointment form so we can better understand your needs.",
  },
  {
    number: "02",
    title: "Review Your Situation",
    description:
      "Relevant information can be reviewed to identify potential inaccuracies or areas that may need attention.",
  },
  {
    number: "03",
    title: "Understand Your Options",
    description:
      "Learn about appropriate next steps based on your circumstances and the information available.",
  },
  {
    number: "04",
    title: "Stay Connected",
    description:
      "Discuss follow-up questions and the next steps with our team as your matter progresses.",
  },
];

export default function Process() {
  return (
    <section className="bg-[#F9F9F9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-[#FF6B81]" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
                Our Approach
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#081828] sm:text-3xl lg:text-[38px]">
            A Clearer Path to Your Next Step
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
            Understanding your concerns is a useful starting point. The
            appropriate process depends on your individual circumstances and
            the information available.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-[#EEEEEE] bg-white p-6 sm:p-7"
            >
              <span className="text-3xl font-bold tracking-tight text-[#2852A0]/25">
                {step.number}
              </span>

              <h3 className="mt-5 text-lg font-bold text-[#081828]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#666666]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}