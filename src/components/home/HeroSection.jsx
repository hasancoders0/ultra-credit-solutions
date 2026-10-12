"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Sparkles,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

import AppointmentForm from "@/components/forms/AppointmentForm";

const stats = [
  {
    value: "96%",
    label: "Customer Satisfaction",
    icon: Star,
  },
  {
    value: "100+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    value: "1000+",
    label: "People Reached",
    icon: TrendingUp,
  },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#17396F]">
      {/* Premium Gradient Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse at 10% 15%,
              rgba(96, 145, 230, 0.22) 0%,
              transparent 42%
            ),
            radial-gradient(
              ellipse at 88% 78%,
              rgba(255, 107, 129, 0.10) 0%,
              transparent 34%
            ),
            linear-gradient(
              135deg,
              #10274D 0%,
              #17396F 42%,
              #214C91 72%,
              #142F5B 100%
            )
          `,
        }}
      />

      {/* Subtle Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255, 255, 255, 0.3) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.3) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Ambient Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[15%] -z-10 h-[300px] w-[300px] rounded-full bg-[#2852A0]/20 blur-[100px] sm:h-[450px] sm:w-[450px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 -z-10 h-[280px] w-[280px] rounded-full bg-[#FF6B81]/[0.06] blur-[100px] sm:h-[400px] sm:w-[400px]"
      />

      {/* Main Container */}
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-12 sm:gap-12 sm:px-8 sm:py-16 md:py-20 lg:min-h-[720px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-12 lg:py-16 xl:min-h-[760px] xl:gap-14 xl:px-16 xl:py-20">
        {/* Left Content */}
        <div className="relative z-10 mx-auto w-full max-w-[650px] lg:mx-0">
          {/* Eyebrow Label */}
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 backdrop-blur-md sm:mb-6 sm:px-4">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF6B81]/15">
              <Sparkles className="h-3 w-3 text-[#FF9AA9]" />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-50 sm:text-xs sm:tracking-[0.16em]">
              Your Journey to Credit Solutions
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="max-w-[650px] text-[clamp(2.4rem,7vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.045em] text-white sm:text-5xl sm:leading-[1.12] lg:text-[58px] xl:text-[68px]"
            style={{
              fontFamily:
                "var(--font-plus-jakarta), Arial, sans-serif",
            }}
          >
            Credit Repair.
            <span className="mt-1 block bg-gradient-to-r from-white via-blue-100 to-[#FFB1BC] bg-clip-text text-transparent">
              Credit Solutions.
            </span>
          </h1>

          {/* Description */}
          <p
            className="mt-5 max-w-[550px] text-sm leading-7 text-[#DCE7FA] sm:mt-6 sm:text-base sm:leading-8 lg:text-[17px]"
            style={{
              fontFamily: "var(--font-inter), Arial, sans-serif",
            }}
          >
            Navigating credit challenges can feel overwhelming. Explore credit
            repair information and discover solutions that help you make more
            informed financial decisions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3.5">
            <Link
              href="/pricing"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#FF6B81] bg-[#FF6B81] px-6 py-3.5 text-sm font-semibold text-[#102C5C] shadow-[0_8px_24px_rgba(255,107,129,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF8294] hover:bg-[#FF8294] hover:shadow-[0_12px_30px_rgba(255,107,129,0.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              <CreditCard className="h-[18px] w-[18px] shrink-0" />

              <span>See Price Quote</span>

              <ArrowRight className="ml-0.5 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/services"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold !text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              <span>Explore Services</span>

              <ArrowUpRight className="h-4 w-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Customer Statistics */}
          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 sm:mt-9 sm:gap-5 sm:pt-6">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Icon
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-[#FF9AA9] sm:h-4 sm:w-4"
                    />

                    <span className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                      {stat.value}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[9px] leading-4 text-blue-50/85 sm:text-xs sm:leading-5">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Appointment Form */}
        <div className="relative z-10 flex w-full min-w-0 items-center justify-center lg:pl-2 xl:pl-4">
          <AppointmentForm />
        </div>
      </div>

      {/* Bottom Accent */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </section>
  );
}