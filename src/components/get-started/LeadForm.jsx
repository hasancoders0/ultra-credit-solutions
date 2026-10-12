"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  zipCode: "",
  helpCategory: "",
  preferredContact: "email",
  phone: "",
  bestTime: "",
  message: "",
};

const helpOptions = [
  {
    value: "credit-report-concerns",
    label: "Credit Report Concerns",
  },
  {
    value: "collections-negative-items",
    label: "Collections or Negative Items",
  },
  {
    value: "credit-inquiries",
    label: "Credit Inquiries",
  },
  {
    value: "credit-repair-information",
    label: "Questions About Credit Repair",
  },
  {
    value: "pricing-information",
    label: "Pricing and Service Information",
  },
  {
    value: "other",
    label: "Other",
  },
];

const timeOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "anytime", label: "Anytime" },
];

const inputClass =
  "w-full rounded-lg border border-[#EEEEEE] bg-white px-4 py-3.5 text-sm text-[#081828] outline-none transition placeholder:text-[#888888] focus:border-[#2852A0] focus:ring-2 focus:ring-[#2852A0]/10";

export default function LeadForm({ selectedPlan = "" }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const normalizedPlan = ["basic", "gold"].includes(
    selectedPlan.toLowerCase()
  )
    ? selectedPlan.toLowerCase()
    : "";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("loading");
    setError("");

    const payload = {
      ...form,
      plan: normalizedPlan || null,
      source: "get-started",
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "We couldn't submit your inquiry. Please try again."
        );
      }

      setForm(initialForm);
      setStatus("success");
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again in a moment."
      );

      setStatus("error");
    }
  }

  return (
    <section
      id="get-started-form"
      className="scroll-mt-24 px-5 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Left Content */}

        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2852A0]">
            Your First Step
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#081828] sm:text-4xl">
            Tell Us How We Can Help
          </h2>

          <p className="mt-5 text-base leading-7 text-[#666666]">
            Share a few details about your concerns. Our team can review your
            inquiry and contact you using your preferred method.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-[#081828]">
                  Share Your Concerns
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#666666]">
                  Tell us what type of assistance you are looking for.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6B81]/10 text-[#FF6B81]">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-[#081828]">
                  Protect Your Information
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#666666]">
                  Only provide the information requested in this form. Do not
                  submit sensitive financial information.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
                <ArrowRight size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-[#081828]">
                  Discuss the Next Steps
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#666666]">
                  Our team can review your inquiry and follow up with you.
                </p>
              </div>
            </div>
          </div>

          {normalizedPlan && (
            <div className="mt-8 rounded-xl border border-[#2852A0]/15 bg-[#F7F9FC] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
                Your Selected Plan
              </p>

              <p className="mt-2 text-xl font-bold capitalize text-[#2852A0]">
                {normalizedPlan} Plan
              </p>

              <p className="mt-2 text-sm leading-6 text-[#666666]">
                You can submit an inquiry about this plan. This does not
                complete a purchase or enroll you in a service.
              </p>
            </div>
          )}
        </div>

        {/* Form Card */}

        <div className="rounded-2xl border border-[#EEEEEE] bg-white p-5 shadow-[0_8px_40px_rgba(8,24,40,0.06)] sm:p-8 lg:p-10">
          {status === "success" ? (
            <div
              role="status"
              className="py-10 text-center sm:py-16"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 size={34} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#081828]">
                Thank You for Reaching Out!
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#666666]">
                Your inquiry has been submitted successfully. Our team can
                review your information and follow up with you.
              </p>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-7 inline-flex items-center gap-2 rounded-lg border border-[#EEEEEE] px-5 py-3 text-sm font-semibold text-[#2852A0] transition hover:bg-[#F9F9F9]"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#081828]">
                  Get Started Today
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#666666]">
                  Complete the form below. Fields marked with an asterisk are
                  required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-[#081828]"
                    >
                      First Name <span className="text-[#FF6B81]">*</span>
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Enter your first name"
                      value={form.firstName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={80}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-[#081828]"
                    >
                      Last Name <span className="text-[#FF6B81]">*</span>
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Enter your last name"
                      value={form.lastName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={80}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[#081828]"
                    >
                      Email Address{" "}
                      <span className="text-[#FF6B81]">*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={254}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="mb-2 block text-sm font-medium text-[#081828]"
                    >
                      ZIP Code <span className="text-[#FF6B81]">*</span>
                    </label>

                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      placeholder="Enter your ZIP code"
                      value={form.zipCode}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={10}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="helpCategory"
                    className="mb-2 block text-sm font-medium text-[#081828]"
                  >
                    What Can We Help You With?{" "}
                    <span className="text-[#FF6B81]">*</span>
                  </label>

                  <select
                    id="helpCategory"
                    name="helpCategory"
                    value={form.helpCategory}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      !form.helpCategory ? "text-[#888888]" : ""
                    }`}
                    required
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>

                    {helpOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="preferredContact"
                    className="mb-2 block text-sm font-medium text-[#081828]"
                  >
                    Preferred Contact Method{" "}
                    <span className="text-[#FF6B81]">*</span>
                  </label>

                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={form.preferredContact}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>

                {form.preferredContact === "phone" && (
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-[#081828]"
                    >
                      Phone Number{" "}
                      <span className="text-[#FF6B81]">*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={30}
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="bestTime"
                    className="mb-2 block text-sm font-medium text-[#081828]"
                  >
                    Best Time to Contact You
                  </label>

                  <select
                    id="bestTime"
                    name="bestTime"
                    value={form.bestTime}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      !form.bestTime ? "text-[#888888]" : ""
                    }`}
                  >
                    <option value="">Select a preferred time</option>

                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[#081828]"
                  >
                    Tell Us About Your Concerns
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Briefly describe how we may be able to help..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-y`}
                    maxLength={3000}
                  />
                </div>

                <div className="rounded-lg bg-[#F9F9F9] p-4">
                  <p className="text-xs leading-6 text-[#666666]">
                    Please do not include your Social Security number,
                    passwords, bank account details, or a complete credit
                    report. Only provide the information requested in this
                    form.
                  </p>
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF6B81] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#f55770] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Submitting Your Inquiry...
                    </>
                  ) : (
                    <>
                      Submit Your Inquiry
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-[#888888]">
                  Submitting this form does not enroll you in a service or
                  guarantee a particular credit outcome.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}