export default function Hero() {
  return (
    <section className="bg-[#F7F9FC] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E5EAF2] bg-white px-3.5 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#FF6B81]" />

          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2852A0]">
            Our Pricing
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-[48px]">
          Transparent Pricing for Your
          <span className="mt-1 block text-[#2852A0]">
            Credit Repair Journey
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base sm:leading-8">
          Explore our available plans, review the included services, and
          learn about the fees associated with each option before taking
          the next step.
        </p>
      </div>
    </section>
  );
}