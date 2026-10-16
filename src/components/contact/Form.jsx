
"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { siteInfo } from "@/data/site";

const initialForm = {
  fullName: "",
  email: "",
  message: "",
};

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
        body: JSON.stringify({
          ...form,
          // Compatibility with an API that still expects firstName/lastName.
          firstName: form.fullName.trim(),
          lastName: "",
        }),
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
    "w-full rounded-lg border border-[#EEEEEE] bg-[#F9F9F9] px-4 py-3 text-sm text-[#081828] outline-none transition placeholder:text-[#888888] focus:border-[#2852A0] focus:bg-white focus:ring-2 focus:ring-[#2852A0]/10";

  return (
    <section className="px-5 py-10 sm:py-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
        {/* Contact Information */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2852A0]/10 px-3 py-1.5 text-xs font-semibold text-[#2852A0] sm:text-sm">
            <MessageCircle size={15} />
            Contact Our Team
          </span>

          <h2 className="mt-4 text-2xl font-bold leading-tight text-[#081828] sm:text-3xl">
            How Can We Help You?
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#666666] sm:text-base">
            Have a question about our services? Send us a message, and our team
            will review your inquiry and get back to you.
          </p>

          <div className="mt-6 space-y-4">
            {/* Email */}
            <a
              href={`mailto:${siteInfo.email}`}
              className="group flex items-start gap-3 rounded-xl border border-[#EEEEEE] p-4 transition hover:border-[#2852A0]/30 hover:bg-[#F9F9F9]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF6B81]/10 text-[#FF6B81]">
                <Mail size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-[#081828]">
                  Email Us
                </h3>
                <p className="mt-1 break-all text-sm text-[#666666]">
                  {siteInfo.email}
                </p>
              </div>

              <ArrowRight
                size={17}
                className="mt-1 shrink-0 text-[#888888] transition group-hover:text-[#2852A0]"
              />
            </a>

            {/* Office Address */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                siteInfo.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-[#EEEEEE] p-4 transition hover:border-[#2852A0]/30 hover:bg-[#F9F9F9]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2852A0]/10 text-[#2852A0]">
                <MapPin size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-[#081828]">
                  Our Office
                </h3>
                <p className="mt-1 text-sm leading-5 text-[#666666]">
                  {siteInfo.address}
                </p>
              </div>

              <ArrowRight
                size={17}
                className="mt-1 shrink-0 text-[#888888] transition group-hover:text-[#2852A0]"
              />
            </a>
          </div>

          <div className="mt-5">
            <a
              href="/appointment"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2852A0] transition hover:text-[#FF6B81]"
            >
              Make an Appointment
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        {/* Compact Contact Form */}
        <div className="rounded-2xl border border-[#EEEEEE] bg-white p-5 shadow-[0_4px_24px_rgba(8,24,40,0.05)] sm:p-7">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#081828] sm:text-2xl">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#666666]">
              Fill out the form below, and our team will be in touch.
            </p>
          </div>

          {status === "success" ? (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 px-5 py-8 text-center"
            >
              <CheckCircle2
                size={40}
                className="mx-auto text-green-600"
              />

              <h3 className="mt-3 text-lg font-semibold text-[#081828]">
                Message Submitted!
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#666666]">
                Thank you for contacting us. Your message has been submitted
                successfully.
              </p>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 text-sm font-semibold text-[#2852A0] hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-sm font-medium text-[#081828]"
                >
                  Full Name <span className="text-[#FF6B81]">*</span>
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  minLength={2}
                  maxLength={160}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-[#081828]"
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
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-[#081828]"
                >
                  Your Message <span className="text-[#FF6B81]">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="How can we help you?"
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
                or complete credit report in your message.
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF6B81] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f55770] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Message
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
