
import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";

export default function Hero({ name = "", email = "" }) {
  const safeName = typeof name === "string" ? name.trim().slice(0, 120) : "";
  const safeEmail =
    typeof email === "string" ? email.trim().slice(0, 254) : "";

  const firstName = safeName ? safeName.split(/\s+/)[0] : "";

  return (
    <main className="flex flex-1 items-center justify-center bg-[#F7F9FC] px-5 py-16 sm:py-24">
      <section className="w-full max-w-2xl rounded-3xl border border-[#E8EDF5] bg-white px-6 py-10 text-center shadow-sm sm:px-12 sm:py-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
          <CheckCircle2 size={36} strokeWidth={1.7} />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#2852A0]">
          Request Received
        </p>

        <h1
          className="mt-3 text-3xl font-bold tracking-tight text-[#081828] sm:text-4xl"
          style={{
            fontFamily: "var(--font-plus-jakarta), Arial, sans-serif",
          }}
        >
          {firstName ? `Thank You, ${firstName}!` : "Thank You!"}
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#5F6B7A]">
          Your appointment request has been submitted successfully. Our team
          will review your inquiry and follow up with you.
        </p>

        {safeEmail && (
          <div className="mx-auto mt-7 flex max-w-md items-start gap-3 rounded-xl border border-[#E8EDF5] bg-[#F7F9FC] p-4 text-left">
            <Mail
              size={20}
              className="mt-0.5 shrink-0 text-[#2852A0]"
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#081828]">
                Confirmation contact
              </p>

              <p className="mt-1 break-all text-sm text-[#5F6B7A]">
                {safeEmail}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#7B8494]">
                Please keep an eye on your inbox for any follow-up from our
                team.
              </p>
            </div>
          </div>
        )}

        <p className="mx-auto mt-7 max-w-lg text-sm leading-6 text-[#7B8494]">
          Thank you for contacting Ultra Credit Solutions USA. We appreciate
          the opportunity to assist you with your credit-related questions.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#2852A0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1F417F]"
          >
            Back to Home
            <ArrowRight size={17} />
          </Link>

          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#E2E7EF] px-6 py-3 text-sm font-semibold text-[#2852A0] transition-colors hover:bg-[#F7F9FC]"
          >
            Explore Our Services
          </Link>
        </div>
      </section>
    </main>
  );
}
