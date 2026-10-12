"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function FinancialVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] px-3 py-12 sm:px-6 sm:py-14 lg:px-5 lg:py-16">
      {/* Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5D8FE8]/20 blur-[70px] sm:h-[360px] sm:w-[360px]"
      />

      {/* Decorative Outer Ring */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08] sm:h-[350px] sm:w-[350px]"
      />

      {/* Decorative Inner Ring */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.10] sm:h-[290px] sm:w-[290px]"
      />

      {/* Main Illustration */}
      <svg
        viewBox="0 0 540 440"
        className="relative z-10 block h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration of financial documents, home ownership, and vehicle financing"
      >
        {/* Main Background Shape */}
        <path
          d="M115 94C153 51 214 54 257 75C304 97 344 66 386 89C435 116 453 166 444 214C436 260 464 293 431 336C397 379 344 370 297 361C246 350 211 390 162 365C111 339 103 291 94 246C83 198 80 133 115 94Z"
          fill="#DCE9FF"
        />

        {/* Decorative Dots */}
        <circle cx="130" cy="119" r="10" fill="#FF8294" />
        <circle cx="410" cy="137" r="7" fill="#2852A0" />
        <circle cx="422" cy="314" r="5" fill="#FF8294" />
        <circle cx="112" cy="298" r="6" fill="#83B3FF" />
        <circle cx="174" cy="85" r="4" fill="#FFFFFF" />
        <circle cx="369" cy="349" r="4" fill="#FFFFFF" />

        {/* Financial Document */}
        <rect
          x="174"
          y="102"
          width="190"
          height="238"
          rx="24"
          fill="#FFFFFF"
          stroke="#D9E4F5"
          strokeWidth="2"
        />

        {/* Document Icon Background */}
        <rect x="242" y="124" width="54" height="54" rx="16" fill="#EAF1FF" />

        {/* Document Icon */}
        <rect
          x="257"
          y="137"
          width="24"
          height="29"
          rx="4"
          stroke="#2852A0"
          strokeWidth="2.5"
        />

        <path
          d="M263 145H275M263 151H275M263 157H271"
          stroke="#2852A0"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Document Details */}
        <rect x="201" y="199" width="86" height="8" rx="4" fill="#DCE4F0" />

        <rect x="201" y="216" width="136" height="8" rx="4" fill="#EEF2F8" />

        <rect x="201" y="242" width="104" height="8" rx="4" fill="#DCE4F0" />

        <rect x="201" y="259" width="120" height="8" rx="4" fill="#DCEAFF" />

        {/* Financial Chart */}
        <rect x="198" y="282" width="142" height="39" rx="10" fill="#F4F7FC" />

        <path
          d="M210 309L232 301L251 305L271 292L291 298L326 286"
          stroke="#2852A0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="326" cy="286" r="4" fill="#FF6B81" />

        {/* Home Icon */}
        <g transform="rotate(-8 125 210)">
          <rect x="80" y="174" width="90" height="90" rx="22" fill="#2852A0" />

          <path
            d="M101 213L125 193L149 213"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M107 211V239H143V211"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <rect x="120" y="222" width="12" height="17" rx="2" fill="#FF8294" />
        </g>

        {/* Vehicle Icon */}
        <g transform="rotate(7 397 250)">
          <rect x="357" y="211" width="94" height="82" rx="22" fill="#FF8294" />

          <path
            d="M374 250L381 232C382 229 385 227 389 227H418C422 227 425 229 426 232L433 250"
            stroke="#102C5C"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M371 250H436V267H371V250Z"
            fill="#FFFFFF"
            stroke="#102C5C"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <circle cx="385" cy="269" r="6" fill="#102C5C" />
          <circle cx="421" cy="269" r="6" fill="#102C5C" />
        </g>

        {/* Connecting Lines */}
        <path
          d="M151 300C168 315 171 325 184 333"
          stroke="#7EA8E8"
          strokeWidth="2"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />

        <path
          d="M363 166C384 171 395 185 400 201"
          stroke="#7EA8E8"
          strokeWidth="2"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
      </svg>

      {/* Floating Security Card */}
      <div className="absolute bottom-3 left-0 z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-[#17396F]/90 px-2.5 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:bottom-5 sm:left-1 sm:gap-3 sm:px-4 sm:py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 sm:h-10 sm:w-10">
          <ShieldCheck className="h-4 w-4 text-[#FF9AA9] sm:h-5 sm:w-5" />
        </div>

        <div>
          <p className="text-[11px] font-semibold text-white sm:text-sm">
            Secure & Private
          </p>

          <p className="mt-0.5 text-[9px] text-blue-100/75 sm:text-xs">
            Your information matters
          </p>
        </div>
      </div>

      {/* Floating Document Card */}
      <div className="absolute right-0 top-3 z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.09] px-2.5 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:right-1 sm:top-5 sm:gap-3 sm:px-4 sm:py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 sm:h-10 sm:w-10">
          <FileCheck2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        </div>

        <div>
          <p className="text-[11px] font-semibold text-white sm:text-sm">
            Credit Solutions
          </p>

          <p className="mt-0.5 text-[9px] text-blue-100/75 sm:text-xs">
            Explore your options
          </p>
        </div>
      </div>

      {/* Decorative Sparkle */}
      <div
        aria-hidden="true"
        className="absolute right-[7%] top-[25%] z-20 hidden h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-md sm:flex"
      >
        <Sparkles className="h-4 w-4 text-[#FF9AA9]" />
      </div>
    </div>
  );
}

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
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-5 py-14 sm:gap-10 sm:px-8 sm:py-16 md:py-20 lg:min-h-[720px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-12 lg:py-20 xl:min-h-[760px] xl:gap-14 xl:px-16 xl:py-24">
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
              fontFamily: "var(--font-plus-jakarta), Arial, sans-serif",
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
            {/* Primary CTA */}
            <Link
              href="/pricing"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#FF6B81] bg-[#FF6B81] px-6 py-3.5 text-sm font-semibold text-[#102C5C] shadow-[0_8px_24px_rgba(255,107,129,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF8294] hover:bg-[#FF8294] hover:shadow-[0_12px_30px_rgba(255,107,129,0.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              <CreditCard className="h-[18px] w-[18px] shrink-0" />

              <span>See Price Quote</span>

              <ArrowRight className="ml-0.5 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/services"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold !text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              <span>Explore Services</span>

              <ArrowUpRight className="h-4 w-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Supporting Information */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-5 sm:mt-9 sm:gap-x-7 sm:pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF9AA9]" />

              <span className="text-xs font-medium text-blue-50/90 sm:text-sm">
                Explore Your Options
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#FF9AA9]" />

              <span className="text-xs font-medium text-blue-50/90 sm:text-sm">
                Informed Financial Decisions
              </span>
            </div>
          </div>
        </div>

        {/* Right-Side Financial Visual */}
        <div className="relative z-10 flex w-full min-w-0 items-center justify-center lg:pl-2 xl:pl-4">
          <div className="w-full max-w-[380px] sm:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px]">
            <FinancialVisual />
          </div>
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
