const information = [
  {
    title: "Accurate Information",
    description:
      "Accurate and current negative information generally cannot be removed simply because it is unfavorable.",
  },
  {
    title: "Disputing Errors",
    description:
      "You can dispute information you believe is inaccurate or incomplete with the relevant credit reporting agency or information provider.",
  },
  {
    title: "No Guaranteed Score Increase",
    description:
      "Credit repair does not guarantee a particular credit score increase or the removal of accurate information.",
  },
  {
    title: "Protect Your Personal Information",
    description:
      "Use secure channels when sharing sensitive financial information. Avoid submitting Social Security numbers or account credentials through a general inquiry form.",
  },
];

export default function ImportantInfo() {
  return (
    <section className="bg-[#F9F9F9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-16">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[3px] w-8 rounded-full bg-[#FF6B81]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
              Important Information
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl">
            Know Your Rights and Responsibilities
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
            Understanding what credit repair can and cannot do helps you
            make informed decisions about your financial future.
          </p>
        </div>

        <div className="space-y-4">
          {information.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-[#EEEEEE] bg-white p-5 sm:p-6"
            >
              <h3 className="font-bold text-[#081828]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#666666]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}