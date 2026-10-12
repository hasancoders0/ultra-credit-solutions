"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MessageCircle,
} from "lucide-react";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const subjects = [
  "Credit Repair Services",
  "Questions About Pricing",
  "Existing Customer Support",
  "General Inquiry",
  "Other",
];

export default function Form() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit your message. Please try again."
        );
      }

      setForm(initialForm);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err.message ||
          "Something went wrong. Please try again in a moment."
      );
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[#EEEEEE] bg-[#F9F9F9] px-4 py-3.5 text-sm text-[#081828] outline-none transition placeholder:text-[#888888] focus:border-[#2852A0] focus:bg-white focus:ring-2 focus:ring-[#2852A0]/10";

  return (
    <section className="relative overflow-hidden bg-[#2852A0]">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-[#FF6B81]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
            <MessageCircle size={16} />
            Contact Our Team
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
            Have a Question?
            <br />
            We're Here to Help.
          </h2>

          <p className="mt-5 max-w-lg text-base leading-7 text-white/80">
            Send us your questions or concerns. Share a little information
            about what you need, and our team can follow up with you.
          </p>

          <div className="mt-9 flex items-start gap-4 rounded-xl border border-white/15 bg-white/10 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#2852A0]">
              <Mail size={21} />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold">Prefer Email?</h3>

              <p className="mt-1 text-sm text-white/75">
                You can also reach us directly at:
              </p>

              <a
                href="mailto:jibon.c@ultracreditsolutions.net"
                className="mt-2 inline-block break-all text-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
              >
                jibon.c@ultracreditsolutions.net
              </a>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-white">
              Ready to take the next step?
            </p>

            <a
              href="/get-started"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-white/80"
            >
              Get Started with Our Services
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-2xl shadow-black/10 sm:p-8 lg:p-10">
          <div className="mb-7">
            <h3 className="text-2xl font-bold text-[#081828]">
              Send Us a Message
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#666666]">
              Complete the form below, and we'll have your message to review.
            </p>
          </div>

          {status === "success" ? (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 px-6 py-10 text-center"
            >
              <CheckCircle2
                size={44}
                className="mx-auto text-green-600"
              />

              <h4 className="mt-4 text-xl font-semibold text-[#081828]">
                Message Submitted!
              </h4>

              <p className="mt-2 text-sm leading-6 text-[#666666]">
                Thank you for contacting us. Your message has been submitted
                successfully.
              </p>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-5 text-sm font-semibold text-[#2852A0] hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
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
                    placeholder="Your first name"
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
                    placeholder="Your last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                    maxLength={80}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#081828]"
                >
                  Email Address <span className="text-[#FF6B81]">*</span>
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
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-[#081828]"
                >
                  What Can We Help You With?{" "}
                  <span className="text-[#FF6B81]">*</span>
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`${inputClass} ${
                    !form.subject ? "text-[#888888]" : ""
                  }`}
                  required
                >
                  <option value="" disabled>
                    Select a topic
                  </option>

                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[#081828]"
                >
                  Your Message <span className="text-[#FF6B81]">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-y`}
                  required
                  minLength={10}
                  maxLength={3000}
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <p className="text-xs leading-5 text-[#888888]">
                Please do not include your Social Security number, passwords,
                or complete credit report in this message.
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF6B81] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#f55770] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Message
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}