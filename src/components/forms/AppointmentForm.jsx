"use client";

import { useState } from "react";
import {
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

const services = [
  "Credit Report Review",
  "Credit Repair Services",
  "Credit Score Information",
  "Credit Building Guidance",
  "Other",
];

const initialForm = {
  fullName: "",
  email: "",
  service: "",
  concerns: "",
};

export default function AppointmentForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setIsSubmitting(true);

    try {
      // TODO: Connect the form to the lead API.
      // The form does not save submissions yet.

      setMessage(
        "Appointment requests are not connected yet. Please contact our team directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-[#E2E7EF] bg-white px-4 text-sm text-[#081828] outline-none transition placeholder:text-[#A0A8B5] focus:border-[#2852A0] focus:ring-2 focus:ring-[#2852A0]/10";

  const labelClass =
    "block text-sm font-semibold text-[#081828]";

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Form Background Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[32px] bg-[#5D8FE8]/10 blur-2xl"
      />

      {/* Appointment Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-7 lg:p-8">
        {/* Form Header */}
        <div className="mb-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2852A0]/10 bg-[#2852A0]/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FF6B81]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2852A0]">
              Get Started
            </span>
          </div>

          <h2
            className="text-2xl font-bold leading-tight tracking-[-0.035em] text-[#081828] sm:text-3xl"
            style={{
              fontFamily:
                "var(--font-plus-jakarta), Arial, sans-serif",
            }}
          >
            Get an Appointment
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Tell us about your needs. Our team can help you
            understand the available options.
          </p>
        </div>

        {/* Appointment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="appointment-name"
              className={labelClass}
            >
              Full Name <span className="text-[#FF6B81]">*</span>
            </label>

            <input
              id="appointment-name"
              name="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              maxLength={120}
              required
              className={`${inputClass} h-12`}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="appointment-email"
              className={labelClass}
            >
              Email Address{" "}
              <span className="text-[#FF6B81]">*</span>
            </label>

            <input
              id="appointment-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              maxLength={254}
              required
              className={`${inputClass} h-12`}
            />
          </div>

          {/* Service */}
          <div>
            <label
              htmlFor="appointment-service"
              className={labelClass}
            >
              What Can We Help You With?{" "}
              <span className="text-[#FF6B81]">*</span>
            </label>

            <select
              id="appointment-service"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className={`${inputClass} h-12`}
            >
              <option value="" disabled>
                Select a service
              </option>

              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Concerns */}
          <div>
            <label
              htmlFor="appointment-concerns"
              className={labelClass}
            >
              Tell Us About Your Concerns
            </label>

            <textarea
              id="appointment-concerns"
              name="concerns"
              value={form.concerns}
              onChange={handleChange}
              placeholder="Briefly describe your concerns..."
              rows={3}
              maxLength={2000}
              className={`${inputClass} resize-y py-3 leading-6`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-[#2852A0] bg-[#2852A0] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(40,82,160,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1E417F] hover:bg-[#1E417F] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
                Please wait...
              </>
            ) : (
              <>
                Request an Appointment

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </button>

          {/* Submission Message */}
          {message && (
            <p
              role="status"
              className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800"
            >
              {message}
            </p>
          )}

          {/* Privacy Note */}
          <p className="text-center text-[11px] leading-5 text-[#7B8494]">
            Your information should be handled securely. Submitting
            an inquiry does not guarantee a particular credit outcome.
          </p>
        </form>
      </div>
    </div>
  );
}