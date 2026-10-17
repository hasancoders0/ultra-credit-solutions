import Link from "next/link";
import {
  Mail,
  Megaphone,
  CalendarDays,
  MessageSquare,
  CreditCard,
  PartyPopper,
  CheckCircle2,
  XCircle,
  FileText,
  Phone,
  AlertTriangle,
  Banknote,
  ShieldCheck,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";


export const metadata = {
  title: "SMS Terms & Conditions",
  description:
    "Review Ultra Credit Solutions USA's SMS messaging terms, including consent, message frequency, messaging fees, opt-out instructions, and support.",
  alternates: {
    canonical: "/sms-terms",
  },
  openGraph: {
    title: "SMS Terms & Conditions | Ultra Credit Solutions USA",
    description:
      "Learn about SMS consent, message frequency, carrier fees, STOP and HELP instructions, and messaging support.",
    url: "/sms-terms",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SMS Terms & Conditions | Ultra Credit Solutions USA",
    description:
      "Review our SMS messaging terms, consent requirements, opt-out instructions, and support options.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


const sections = [
  {
    id: 1,
    title: "SMS Consent Communication",
    icon: Mail,
    content: (
      <p>
        The information (phone numbers) obtained as part of the SMS consent
        process will not be shared with third parties for marketing purposes.
      </p>
    ),
  },
  {
    id: 2,
    title: "Types of SMS Communications",
    icon: Megaphone,
    content: (
      <>
        <p>
          If you have consented to receive text messages from{" "}
          <strong>Ultra Credit Solutions Inc.</strong>, you may receive messages
          related to:
        </p>

        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <CalendarDays
              size={18}
              className="mt-0.5 shrink-0 text-[#2852A0]"
            />
            <span>Appointment reminders</span>
          </li>

          <li className="flex items-start gap-3">
            <MessageSquare
              size={18}
              className="mt-0.5 shrink-0 text-[#2852A0]"
            />
            <span>Follow-up messages</span>
          </li>

          <li className="flex items-start gap-3">
            <CreditCard
              size={18}
              className="mt-0.5 shrink-0 text-[#2852A0]"
            />
            <span>Billing inquiries</span>
          </li>

          <li className="flex items-start gap-3">
            <PartyPopper
              size={18}
              className="mt-0.5 shrink-0 text-[#2852A0]"
            />
            <span>Promotions or offers, if applicable</span>
          </li>
        </ul>

        <div className="mt-5 rounded-lg border-l-4 border-[#2852A0] bg-[#F0F4FA] p-4 italic">
          <p>
            Example: "Hello, this is a friendly reminder of your upcoming
            appointment with [Name] at [Location] on [Date] at [Time]. Reply
            STOP to opt out."
          </p>
        </div>
      </>
    ),
  },
  {
    id: 3,
    title: "Message Frequency",
    icon: CalendarDays,
    content: (
      <>
        <p>
          Message frequency may vary depending on the type of communication.
          For example, you may receive up to{" "}
          <strong>3 SMS messages per week.</strong>
        </p>

        <div className="mt-4 rounded-lg border-l-4 border-[#2852A0] bg-[#F0F4FA] p-4 italic">
          <p>
            Example: "Message frequency may vary. You may receive up to 2 SMS
            messages per week regarding your appointments or account status."
          </p>
        </div>
      </>
    ),
  },
  {
    id: 4,
    title: "Potential Fees for SMS Messaging",
    icon: Banknote,
    content: (
      <p>
        Please note that standard message and data rates may apply, depending
        on your carrier's pricing plan. These fees may vary if the message is
        sent domestically or internationally.
      </p>
    ),
  },
  {
    id: 5,
    title: "Opt-In Method",
    icon: CheckCircle2,
    content: (
      <>
        <p>
          You may opt in to receive SMS messages from{" "}
          <strong>Ultra Credit Solutions Inc.</strong> through the following
          methods:
        </p>

        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <Phone
              size={18}
              className="mt-0.5 shrink-0 text-[#2852A0]"
            />
            <span>Verbally, during a conversation</span>
          </li>

          <li className="flex items-start gap-3">
            <FileText
              size={18}
              className="mt-0.5 shrink-0 text-[#2852A0]"
            />
            <span>By submitting an online form with SMS consent</span>
          </li>

          <li className="flex items-start gap-3">
            <FileText
              size={18}
              className="mt-0.5 shrink-0 text-[#2852A0]"
            />
            <span>By filling out a paper form</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 6,
    title: "Opt-Out Method",
    icon: XCircle,
    content: (
      <p>
        You can opt out of receiving SMS messages at any time. To do so,
        simply reply <strong>"STOP"</strong> to any SMS message you receive.
        Alternatively, you can contact us directly to request removal from our
        messaging list.
      </p>
    ),
  },
  {
    id: 7,
    title: "Help",
    icon: MessageSquare,
    content: (
      <>
        <p>
          If you are experiencing any issues, you can reply with the keyword{" "}
          <strong>HELP</strong> to any SMS message you receive.
        </p>

        <p className="mt-3">
          You can also contact us by email at{" "}
          <a
            href="mailto:jibon.c@ultracreditsolutions.net"
            className="font-medium text-[#2852A0] underline underline-offset-4 hover:text-[#FF6B81]"
          >
            jibon.c@ultracreditsolutions.net
          </a>
          .
        </p>

        <div className="mt-4">
          <p className="font-semibold text-[#081828]">
            Additional Options
          </p>

          <p className="mt-2">
            If you do not wish to receive SMS messages, you can choose not to
            check the SMS consent box on our forms.
          </p>
        </div>
      </>
    ),
  },
];

export default function SmsTermsPage() {
  return (
    <main className="bg-[#F9F9F9] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#2852A0]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2852A0]">
            Legal Information
          </span>

          <h1 className="mt-5 flex flex-wrap items-center justify-center gap-3 text-2xl font-bold text-[#2852A0] sm:text-3xl">
            <Mail size={30} className="text-[#FF6B81]" />
            SMS Terms &amp; Conditions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666666] sm:text-base">
            Please review the terms governing SMS communications from Ultra
            Credit Solutions Inc.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-5">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.id}
                className="rounded-xl border border-[#EEEEEE] border-l-4 border-l-[#2852A0] bg-white p-5 shadow-[0_3px_14px_rgba(8,24,40,0.04)] transition-shadow hover:shadow-md sm:p-6"
              >
                <h2 className="flex items-start gap-3 text-base font-bold leading-7 text-[#2852A0] sm:text-lg">
                  <Icon
                    size={21}
                    className="mt-0.5 shrink-0 text-[#FF6B81]"
                  />

                  <span>
                    {section.id}. {section.title}
                  </span>
                </h2>

                <div className="mt-3 text-sm leading-7 text-[#666666] sm:text-base">
                  {section.content}
                </div>
              </section>
            );
          })}

          {/* Standard Messaging Disclosures */}
          <section className="rounded-xl border border-amber-200 border-l-4 border-l-amber-400 bg-amber-50 p-5 sm:p-6">
            <h2 className="flex items-start gap-3 text-base font-bold leading-7 text-[#2852A0] sm:text-lg">
              <AlertTriangle
                size={21}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <span>8. Standard Messaging Disclosures</span>
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#666666] sm:text-base">
              <li className="flex items-start gap-3">
                <Banknote
                  size={18}
                  className="mt-1 shrink-0 text-[#FF6B81]"
                />

                <span>Message and data rates may apply.</span>
              </li>

              <li className="flex items-start gap-3">
                <XCircle
                  size={18}
                  className="mt-1 shrink-0 text-[#FF6B81]"
                />

                <span>
                  You can opt out at any time by texting{" "}
                  <strong>"STOP"</strong>.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MessageSquare
                  size={18}
                  className="mt-1 shrink-0 text-[#FF6B81]"
                />

                <span>
                  For assistance, text <strong>"HELP"</strong> or contact us.
                  Please review our{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-medium text-[#2852A0] underline underline-offset-4 hover:text-[#FF6B81]"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="font-medium text-[#2852A0] underline underline-offset-4 hover:text-[#FF6B81]"
                  >
                    Terms and Conditions
                  </Link>
                  .
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Lightbulb
                  size={18}
                  className="mt-1 shrink-0 text-[#FF6B81]"
                />

                <span>Message frequency may vary.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="mt-10 rounded-xl border border-[#EEEEEE] bg-white p-6 text-center sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2852A0]/10 text-[#2852A0]">
            <ShieldCheck size={24} />
          </div>

          <h2 className="mt-4 text-xl font-bold text-[#081828]">
            Have Questions About Our SMS Terms?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#666666]">
            If you have questions about our messaging practices or need
            assistance, please contact our team.
          </p>

          <a
            href="mailto:jibon.c@ultracreditsolutions.net"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-6 py-3.5 text-sm font-semibold !text-white transition hover:bg-[#204483]"
          >
            Contact Us
            <Mail size={17} className="text-white" />
          </a>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] transition hover:text-[#2852A0]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}