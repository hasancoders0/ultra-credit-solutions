export default function Hero() {
  return (
    <section className="bg-[#F9F9F9] px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE6F8] bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#FF6B81]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2852A0] sm:text-xs">
              Our Services
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-[48px]">
          Your Credit Journey,
          <span className="mt-1 block text-[#2852A0]">
            Made Easier to Understand
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base sm:leading-8">
          Explore our credit education resources to understand how credit
          repair works, what to expect, and how credit scores are calculated.
          Learn more about these topics and explore possible next steps.
        </p>
      </div>
    </section>
  );
}