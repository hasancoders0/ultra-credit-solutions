export default function Mission() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-8 rounded-[28px] border border-[#E8EDF5] p-7 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:p-14">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-[#FF6B81]" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2852A0]">
                Our Mission
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl">
              Supporting a Clearer Understanding of Credit
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
            <p>
              Our mission is to help customers understand their credit
              concerns, identify potentially inaccurate reporting, and learn
              about appropriate ways to address those concerns.
            </p>

            <p>
              We recognize that every credit situation is different.
              Providing clear information and understanding each customer's
              needs are important parts of the process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}