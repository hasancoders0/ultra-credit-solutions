import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Users,
  FileSearch,
  TrendingUp,
} from "lucide-react";
/* =========================================================
   VISUAL: ACCA MEMBERSHIP BADGE
========================================================= */

function MembershipBadge() {
  return (
    <div className="relative mx-auto flex w-full max-w-[420px] flex-col items-center justify-center">
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="absolute h-[280px] w-[280px] rounded-full bg-[#EEF3FC] sm:h-[340px] sm:w-[340px]"
      />

      <div
        aria-hidden="true"
        className="absolute h-[230px] w-[230px] rounded-full border border-dashed border-[#C8D7F0] sm:h-[290px] sm:w-[290px]"
      />

      {/* Membership Badge */}
      <div className="relative z-10 w-full max-w-[290px] sm:max-w-[330px]">
        <Image
          src="/images/acca.png"
          alt="American Consumer Credit Advocates membership badge, Member Since 2026"
          width={600}
          height={600}
          className="h-auto w-full object-contain drop-shadow-[0_12px_24px_rgba(8,24,40,0.12)]"
          priority
        />
      </div>

      {/* Membership Caption */}
      <div className="relative z-10 mt-4 max-w-[340px] text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE6F6] bg-white px-4 py-2 shadow-sm">
          <ShieldCheck
            size={16}
            className="shrink-0 text-[#2852A0]"
            aria-hidden="true"
          />

          <span className="text-xs font-semibold text-[#2852A0]">
            Membership Recognition
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#667085]">
          Committed to transparency, clear communication, and
          responsible consumer support.
        </p>
      </div>

      {/* Decorative Accents */}
      <span
        aria-hidden="true"
        className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-[#FF8294]"
      />

      <span
        aria-hidden="true"
        className="absolute right-[9%] top-[28%] h-3 w-3 rounded-full bg-[#2852A0]"
      />

      <span
        aria-hidden="true"
        className="absolute bottom-[18%] right-[14%] h-2.5 w-2.5 rounded-full bg-[#35C9B5]"
      />
    </div>
  );
}

/* =========================================================
   ABOUT SECTION
========================================================= */

export default function AboutSection() {
  const trustPoints = [
    {
      icon: MessageCircle,
      title: "Transparent Communication",
      description:
        "Clear information about our process and what you can expect.",
    },
    {
      icon: Users,
      title: "Personalized Guidance",
      description:
        "Support based on your individual credit concerns and questions.",
    },
    {
      icon: ShieldCheck,
      title: "Consumer-Focused Approach",
      description:
        "Helping you understand your credit report and available options.",
    },
  ];

  return (
    <section
      id="about"
      className="overflow-hidden bg-white py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* TRUST & TRANSPARENCY */}
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">

          {/* Left Content */}
          <div className="min-w-0">
            {/* Section Label */}
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-8 shrink-0 rounded-full bg-[#FF6B81]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2852A0] sm:text-xs">
                Trust & Transparency
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-3 max-w-[600px] text-[27px] font-bold leading-tight tracking-tight text-[#081828] sm:text-3xl lg:text-[34px]">
              Your Credit Journey Deserves a Trusted Partner
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-[650px] text-sm leading-7 text-[#667085] sm:text-[15px] sm:leading-7">
              Navigating credit challenges can be confusing. At Ultra
              Credit Solutions, we believe in clear communication, a
              transparent process, and helping you understand your credit
              report. Our goal is to help you identify potentially
              inaccurate or incomplete information and understand the
              appropriate steps you can take toward a healthier credit
              profile.
            </p>

            {/* Trust Points */}
            <div className="mt-6 space-y-4">
              {trustPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.title}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FC]">
                      <Icon
                        size={19}
                        strokeWidth={1.8}
                        className="text-[#2852A0]"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-sm font-bold text-[#081828] sm:text-[15px]">
                        {point.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[#667085]">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-7">
              <Link
                href="/services/how-it-works"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-5 py-3 text-sm font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-[#1E417F] hover:shadow-md hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2852A0]"
              >
                Learn About Our Process

                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Membership Badge */}
          <div className="min-w-0 lg:pl-3">
            <MembershipBadge />
          </div>
        </div>

        {/* CREDIT REPAIR AND MISSION - EXISTING SECTION */}
        <div className="mt-10 border-t border-[#E8EDF5] pt-10 sm:mt-14 sm:pt-12 lg:mt-16 lg:pt-14">
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">

            {/* Visual on the LEFT */}
            <div className="order-2 min-w-0 lg:order-1 lg:pr-3">
              <CreditRepairIllustration />
            </div>

            {/* Content on the RIGHT */}
            <div className="order-1 min-w-0 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="h-[3px] w-8 shrink-0 rounded-full bg-[#FF6B81]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2852A0] sm:text-xs">
                  Credit Repair
                </span>
              </div>

              <h2 className="mt-3 text-xl font-bold leading-[1.4] tracking-tight text-[#081828] sm:text-2xl lg:text-[27px]">
                Credit Repair in Queens – Road to Success
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#667085] sm:text-[15px] sm:leading-7">
                Credit Repair in Queens is our main service. Through the
                credit repair process legally we repair your credit.
                There will be no annoying unwanted creditors call.Your
                credit score will be higher again. You will be very happy
                and hassle free peaceful life..
              </p>

              <h2 className="mt-7 text-xl font-bold leading-[1.4] tracking-tight text-[#081828] sm:text-2xl lg:text-[27px]">
                Credit Repair in Queens – About Our Mission
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#667085] sm:text-[15px] sm:leading-7">
                Our mission is to repair your credit, re-build your credit
                and get your higher credit score
              </p>

              <div className="mt-5">
                <Link
                  href="/about"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-5 py-3 text-sm font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-[#1E417F] hover:shadow-md hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2852A0]"
                >
                  View More

                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   CREDIT REPAIR ILLUSTRATION
========================================================= */

function CreditRepairIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-[28px] bg-[#F2F5FC] sm:inset-4 sm:rounded-[32px]"
      />

      <svg
        viewBox="0 0 460 360"
        className="relative z-10 block h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration of credit report document review"
      >
        <defs>
          <filter
            id="reportShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="150%"
          >
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="12"
              floodColor="#17396F"
              floodOpacity="0.09"
            />
          </filter>
        </defs>

        {/* Back Document */}
        <g transform="rotate(-7 180 175)">
          <rect
            x="78"
            y="54"
            width="230"
            height="280"
            rx="18"
            fill="#E3EBF9"
          />

          <rect
            x="94"
            y="72"
            width="198"
            height="246"
            rx="10"
            fill="#F8FAFF"
          />

          <rect x="111" y="91" width="88" height="7" rx="3.5" fill="#CBD8EE" />
          <rect x="111" y="107" width="145" height="5" rx="2.5" fill="#E1E8F4" />
          <rect x="111" y="119" width="126" height="5" rx="2.5" fill="#E1E8F4" />

          <rect x="111" y="147" width="164" height="48" rx="8" fill="#EDF2FB" />
          <rect x="125" y="160" width="80" height="5" rx="2.5" fill="#C3D3ED" />
          <rect x="125" y="172" width="120" height="5" rx="2.5" fill="#D8E2F2" />

          <rect x="111" y="208" width="164" height="48" rx="8" fill="#EDF2FB" />
          <rect x="125" y="221" width="92" height="5" rx="2.5" fill="#C3D3ED" />
          <rect x="125" y="233" width="112" height="5" rx="2.5" fill="#D8E2F2" />
        </g>

        {/* Main Document */}
        <g filter="url(#reportShadow)">
          <rect
            x="140"
            y="35"
            width="230"
            height="294"
            rx="20"
            fill="#FFFFFF"
            stroke="#E1E8F3"
            strokeWidth="1.5"
          />
        </g>

        {/* Document Header */}
        <rect x="160" y="56" width="190" height="56" rx="12" fill="#EEF3FC" />
        <rect x="174" y="68" width="32" height="32" rx="9" fill="#FFFFFF" />

        <FileSearch
          x="181"
          y="75"
          width="18"
          height="18"
          stroke="#2852A0"
          strokeWidth="1.8"
        />

        <rect x="216" y="71" width="105" height="6" rx="3" fill="#2852A0" opacity="0.8" />
        <rect x="216" y="84" width="76" height="5" rx="2.5" fill="#C8D7EE" />

        {/* Document Item 1 */}
        <rect
          x="160"
          y="128"
          width="190"
          height="49"
          rx="10"
          fill="#F8FAFD"
          stroke="#E7EDF5"
        />

        <circle cx="177" cy="152" r="7" fill="#E7F6F2" />

        <CheckCircle2
          x="169"
          y="144"
          width="16"
          height="16"
          stroke="#159B88"
          strokeWidth="1.8"
        />

        <rect x="192" y="143" width="92" height="5" rx="2.5" fill="#C2D0E5" />
        <rect x="192" y="154" width="66" height="5" rx="2.5" fill="#E0E7F1" />

        {/* Document Item 2 */}
        <rect
          x="160"
          y="187"
          width="190"
          height="49"
          rx="10"
          fill="#FFF7F8"
          stroke="#F6DCE2"
        />

        <circle cx="177" cy="211" r="7" fill="#FFE6EB" />

        <path
          d="M177 207V212M177 216V216.5"
          stroke="#D94F6A"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <rect x="192" y="202" width="106" height="5" rx="2.5" fill="#E7C4CC" />
        <rect x="192" y="213" width="76" height="5" rx="2.5" fill="#F0DDE2" />

        {/* Document Item 3 */}
        <rect
          x="160"
          y="246"
          width="190"
          height="49"
          rx="10"
          fill="#F8FAFD"
          stroke="#E7EDF5"
        />

        <circle cx="177" cy="270" r="7" fill="#E7F6F2" />

        <CheckCircle2
          x="169"
          y="262"
          width="16"
          height="16"
          stroke="#159B88"
          strokeWidth="1.8"
        />

        <rect x="192" y="261" width="82" height="5" rx="2.5" fill="#C2D0E5" />
        <rect x="192" y="272" width="115" height="5" rx="2.5" fill="#E0E7F1" />

        {/* Shield Decoration */}
        <rect
          x="58"
          y="145"
          width="66"
          height="66"
          rx="19"
          fill="#FFFFFF"
          stroke="#E3EAF5"
          strokeWidth="1.5"
        />

        <ShieldCheck
          x="78"
          y="165"
          width="26"
          height="26"
          stroke="#2852A0"
          strokeWidth="1.8"
        />

        {/* Growth Decoration */}
        <rect
          x="338"
          y="246"
          width="70"
          height="70"
          rx="20"
          fill="#FFFFFF"
          stroke="#E3EAF5"
          strokeWidth="1.5"
        />

        <TrendingUp
          x="360"
          y="268"
          width="27"
          height="27"
          stroke="#159B88"
          strokeWidth="1.8"
        />

        {/* Decorative Accents */}
        <circle cx="390" cy="78" r="6" fill="#FF8294" />
        <circle cx="97" cy="283" r="5" fill="#A7C4F7" />
        <circle cx="390" cy="329" r="4" fill="#FF8294" />
      </svg>
    </div>
  );
}