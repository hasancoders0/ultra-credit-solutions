
import Link from "next/link";

export default function CTA() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-[#2852A0] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
      <div className="max-w-xl">
        <h2 className="text-lg font-bold text-white sm:text-xl">
          Have Questions About Your Credit?
        </h2>

        <p className="mt-1 text-sm leading-5 text-white/80">
          Contact our team to discuss your questions and learn about our
          services.
        </p>
      </div>

      <Link
        href="/contact"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#FF6B81] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2852A0]"
      >
        Contact Us <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
