import Link from "next/link";
import { ArrowRight, Mail, MapPin, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Ultra Credit Solutions Inc.",
  description:
    "Read the Privacy Policy of Ultra Credit Solutions Inc. to learn how information may be collected, used, and protected when you visit our website.",
};

const personalData = [
  "Name",
  "Email address",
  "Phone number",
  "Mailing address",
];

const usageData = [
  "Your computer's Internet Protocol address (e.g., IP address)",
  "Browser type and browser version",
  "The pages of our Site that you visit",
  "The time and date of your visit",
  "The time spent on those pages",
  "Other diagnostic data",
];

const informationUses = [
  "Provide, operate, and maintain our Site",
  "Improve, personalize, and expand our Site",
  "Understand and analyze how you use our Site",
  "Develop new products, services, features, and functionality",
  "Communicate with you directly or through service providers",
  "Provide customer support and respond to inquiries",
  "Process transactions and send transaction-related communications",
  "Find and prevent fraud or misuse",
];

const dataProtectionRights = [
  "The right to access information we hold about you",
  "The right to request correction of inaccurate information",
  "The right to request deletion of your information, where applicable",
  "The right to object to certain processing activities",
  "The right to request restriction of processing, where applicable",
  "The right to data portability, where applicable",
  "The right to withdraw consent when processing is based on consent",
];

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>
          We may collect information about you in a variety of ways when you
          visit our website or communicate with us.
        </p>

        <h3 className="mt-5 font-semibold text-[#081828]">
          1. Personal Data
        </h3>

        <p className="mt-2">
          While using our Site, we may ask you to provide certain personal
          information that can be used to contact or identify you. This may
          include, but is not limited to:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          {personalData.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="mt-6 font-semibold text-[#081828]">
          2. Usage Data
        </h3>

        <p className="mt-2">
          We may also collect information about how the Site is accessed and
          used. This usage data may include:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          {usageData.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p>
          We may use the information we collect for purposes such as:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          {informationUses.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "sms-privacy",
    title: "SMS Consent and Phone Number Privacy",
    content: (
      <>
        <p>
          SMS opt-in information and phone numbers collected for SMS
          communications will not be shared with third parties or affiliates
          for their own marketing or promotional purposes.
        </p>

        <p className="mt-3">
          If you choose to receive text messages from Ultra Credit Solutions
          Inc., your phone number and consent information may be used to
          deliver the messages you have agreed to receive.
        </p>

        <p className="mt-3">
          You can learn more about our messaging practices on our{" "}
          <Link
            href="/sms-terms"
            className="font-medium text-[#2852A0] underline decoration-[#2852A0]/30 underline-offset-4 transition hover:text-[#FF6B81]"
          >
            SMS Terms &amp; Conditions
          </Link>{" "}
          page.
        </p>
      </>
    ),
  },
  {
    id: "disclosure",
    title: "Disclosure of Your Information",
    content: (
      <>
        <p>
          We may disclose information in limited circumstances, such as when
          required by law, when necessary to respond to legal proceedings, to
          protect our rights, or to help prevent fraud or security issues.
        </p>

        <p className="mt-3">
          We may also use service providers to help operate our website and
          provide services. Information shared with service providers should
          be limited to what is appropriate for the services they perform and
          subject to applicable privacy requirements.
        </p>
      </>
    ),
  },
  {
    id: "information-security",
    title: "Security of Your Information",
    content: (
      <p>
        We take reasonable measures designed to protect personal information
        against unauthorized access, use, alteration, or disclosure. However,
        no method of transmission over the Internet or electronic storage is
        completely secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "data-protection-rights",
    title: "Your Data Protection Rights",
    content: (
      <>
        <p>
          Depending on your location and applicable law, you may have certain
          rights regarding your personal information, including:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          {dataProtectionRights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mt-4">
          To make a privacy-related request, please contact us using the
          information provided below. We may need to verify your identity
          before responding.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    content: (
      <p>
        Our website may use cookies or similar technologies to support website
        functionality, understand visitor activity, and improve the user
        experience. You may be able to manage cookies through your browser
        settings. Available controls may vary depending on your browser and
        the technologies used by the Site.
      </p>
    ),
  },
  {
    id: "third-party-websites",
    title: "Third-Party Websites",
    content: (
      <p>
        Our website may contain links to third-party websites or services. We
        do not control the privacy practices of those third parties. We
        encourage you to review their privacy policies before providing
        information to them.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: (
      <p>
        Our website is not intended to knowingly collect personal information
        from children who are not permitted to use the services under
        applicable law. If you believe a child has provided personal
        information through our Site, please contact us so the matter can be
        reviewed.
      </p>
    ),
  },
  {
    id: "policy-changes",
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. When changes are
        made, we will update the policy on this page. We encourage you to
        review this page periodically to stay informed about our privacy
        practices. Changes will take effect when the updated policy is
        published, unless otherwise stated.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-[#F9F9F9] px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2852A0]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2852A0]">
            <ShieldCheck size={15} />
            Legal Information
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#081828] sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#666666] sm:text-lg sm:leading-8">
            Learn how Ultra Credit Solutions Inc. may collect, use, and
            protect information when you visit our website or contact our
            team.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="px-5 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Introduction */}
          <section className="border-b border-[#EEEEEE] pb-8">
            <h2 className="text-xl font-bold text-[#081828] sm:text-2xl">
              Introduction
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
              <p>
                Welcome to{" "}
                <strong className="font-semibold text-[#081828]">
                  Ultra Credit Solutions Inc.
                </strong>{" "}
                Your privacy is important to us. This Privacy Policy explains
                how we collect, use, disclose, and safeguard information when
                you visit our website.
              </p>

              <p>
                Please read this policy carefully. By using our website, you
                acknowledge that you have read this Privacy Policy.
              </p>
            </div>
          </section>

          {/* Policy Sections */}
          <div>
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-24 border-b border-[#EEEEEE] py-8 ${
                  index === sections.length - 1 ? "border-b-0" : ""
                }`}
              >
                <h2 className="text-xl font-bold leading-snug text-[#2852A0] sm:text-2xl">
                  {section.title}
                </h2>

                <div className="mt-4 space-y-3 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Information */}
          <section
            id="contact-us"
            className="border-t border-[#EEEEEE] py-8"
          >
            <h2 className="text-xl font-bold text-[#2852A0] sm:text-2xl">
              Contact Us
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
              If you have questions or concerns about this Privacy Policy or
              our privacy practices, please contact us using the information
              below.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2852A0]/10 text-[#2852A0]">
                  <MapPin size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#081828]">
                    Office Address
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#666666]">
                    3716 73rd Street, Suite 302B, Jackson Heights, NY 11372
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF6B81]/10 text-[#FF6B81]">
                  <Mail size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#081828]">
                    Email Address
                  </h3>

                  <a
                    href="mailto:jibon.c@ultracreditsolutions.net"
                    className="mt-1 inline-block break-all text-sm leading-6 text-[#2852A0] transition hover:text-[#FF6B81]"
                  >
                    jibon.c@ultracreditsolutions.net
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Last Updated */}
          <div className="mt-4 rounded-xl bg-[#F9F9F9] p-5 sm:p-6">
            <p className="text-sm leading-6 text-[#666666]">
              <strong className="text-[#081828]">Last Updated:</strong>{" "}
              [Add Last Updated Date]
            </p>

            <p className="mt-2 text-xs leading-6 text-[#888888]">
              Please review and customize this example policy to reflect your
              actual data collection practices, website technologies, service
              providers, and applicable legal obligations before publishing.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-[#F7F9FC] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-lg font-bold text-[#081828] sm:text-xl">
                Have Questions About Your Privacy?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#666666]">
                Contact our team if you need more information about our
                privacy practices.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-6 py-3.5 text-sm font-semibold !text-white transition hover:bg-[#204483]"
            >
              Contact Us
              <ArrowRight size={17} className="text-white" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}