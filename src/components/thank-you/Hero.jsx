import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  House,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] overflow-hidden bg-[#F7F9FC] px-5 py-16 sm:py-20 lg:py-24">
      {/* Background Decorations */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#2852A0]/5 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#FF6B81]/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Success Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/60 sm:h-24 sm:w-24">
          <CheckCircle2
            size={48}
            strokeWidth={1.7}
            className="text-green-600 sm:h-14 sm:w-14"
          />
        </div>

        {/* Heading */}
        <span className="mt-8 inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
          Submission Successful
        </span>

        <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-5xl">
          Thank You for Reaching Out!
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-[#666666] sm:text-lg sm:leading-8">
          Your inquiry has been submitted successfully. We appreciate your
          interest in Ultra Credit Solutions, and our team can review your
          information and follow up with you.
        </p>

        {/* Information Card */}
        <div className="mt-10 w-full rounded-2xl border border-[#EEEEEE] bg-white p-6 text-left shadow-[0_8px_40px_rgba(8,24,40,0.04)] sm:p-8">
          <h2 className="text-xl font-bold text-[#081828]">
            What Happens Next?
          </h2>

          <div className="mt-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-[#081828]">
                  We Review Your Inquiry
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#666666]">
                  Our team can review the information you submitted to better
                  understand your questions and concerns.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6B81]/10 text-[#FF6B81]">
                <Mail size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-[#081828]">
                  We May Contact You
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#666666]">
                  If follow-up is appropriate, our team can contact you using
                  the contact method you selected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-7 py-4 text-sm font-semibold !text-white transition hover:bg-[#204483]"
          >
            <House size={18} className="text-white" />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#EEEEEE] bg-white px-7 py-4 text-sm font-semibold text-[#2852A0] transition hover:border-[#2852A0] hover:bg-[#F9F9F9]"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Footer Note */}
        <p className="mt-8 max-w-xl text-xs leading-6 text-[#888888]">
          Submitting an inquiry does not enroll you in a service or guarantee a
          particular credit outcome.
        </p>
      </div>
    </section>
  );
}