import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  ShieldCheck,
  Users,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

/* =========================================================
   VISUAL 1: ABOUT US
   Abstract collaboration and customer connection
========================================================= */

function TeamIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <svg
        viewBox="0 0 460 350"
        className="block h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration representing company collaboration and customer connection"
      >
        <defs>
          <linearGradient id="aboutVisualBg" x1="50" y1="30" x2="410" y2="320">
            <stop offset="0%" stopColor="#EFF4FD" />
            <stop offset="100%" stopColor="#FAF3F6" />
          </linearGradient>

          <linearGradient
            id="aboutVisualBlue"
            x1="185"
            y1="125"
            x2="275"
            y2="210"
          >
            <stop offset="0%" stopColor="#3D68B4" />
            <stop offset="100%" stopColor="#2852A0" />
          </linearGradient>
        </defs>

        {/* Background */}
        <path
          d="M93 58C137 24 184 48 226 52C277 57 315 25 359 53C405 82 426 130 410 177C394 222 416 258 384 294C351 330 302 319 257 303C209 286 171 322 127 298C85 276 64 237 70 192C76 144 59 91 93 58Z"
          fill="url(#aboutVisualBg)"
        />

        {/* Decorative Dots */}
        <circle cx="95" cy="90" r="5" fill="#FF8294" />
        <circle cx="375" cy="93" r="5" fill="#2852A0" />
        <circle cx="386" cy="280" r="5" fill="#35C9B5" />
        <circle cx="93" cy="267" r="4" fill="#A7C4F7" />

        {/* Connection Lines */}
        <path
          d="M145 133C177 105 199 108 229 139"
          stroke="#A9BFE8"
          strokeWidth="2"
          strokeDasharray="5 7"
        />

        <path
          d="M229 139C264 104 296 111 325 143"
          stroke="#A9BFE8"
          strokeWidth="2"
          strokeDasharray="5 7"
        />

        <path
          d="M145 133C130 174 159 215 200 224"
          stroke="#A9BFE8"
          strokeWidth="2"
          strokeDasharray="5 7"
        />

        <path
          d="M325 143C342 181 309 215 269 224"
          stroke="#A9BFE8"
          strokeWidth="2"
          strokeDasharray="5 7"
        />

        {/* Central Collaboration Symbol */}
        <circle cx="230" cy="166" r="77" fill="#FFFFFF" opacity="0.75" />
        <circle cx="230" cy="166" r="61" fill="#E4ECFA" />

        <circle
          cx="230"
          cy="166"
          r="43"
          fill="url(#aboutVisualBlue)"
        />

        <path
          d="M211 166L224 179L250 152"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Customer Connection */}
        <circle
          cx="145"
          cy="133"
          r="29"
          fill="#FFFFFF"
          stroke="#DCE6F6"
          strokeWidth="1.5"
        />

        <circle cx="145" cy="133" r="20" fill="#EEF3FC" />

        <path
          d="M137 128C137 124 140 121 145 121C150 121 153 124 153 128C153 132 150 135 145 135V139"
          stroke="#2852A0"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="145" cy="144" r="1.5" fill="#2852A0" />

        {/* Communication */}
        <circle
          cx="325"
          cy="143"
          r="29"
          fill="#FFFFFF"
          stroke="#DCE6F6"
          strokeWidth="1.5"
        />

        <circle cx="325" cy="143" r="20" fill="#FFF0F3" />

        <path
          d="M316 136H334V148H326L321 153V148H316V136Z"
          stroke="#FF6B81"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Support */}
        <circle
          cx="200"
          cy="224"
          r="25"
          fill="#FFFFFF"
          stroke="#DCE6F6"
          strokeWidth="1.5"
        />

        <circle cx="200" cy="224" r="17" fill="#EAF8F5" />

        <path
          d="M192 225L198 231L208 218"
          stroke="#159B88"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Document */}
        <circle
          cx="269"
          cy="224"
          r="25"
          fill="#FFFFFF"
          stroke="#DCE6F6"
          strokeWidth="1.5"
        />

        <circle cx="269" cy="224" r="17" fill="#EEF3FC" />

        <path
          d="M261 218H277M261 224H277M261 230H272"
          stroke="#2852A0"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Floating Decorative Elements */}
        <rect
          x="55"
          y="158"
          width="48"
          height="48"
          rx="15"
          fill="#FFFFFF"
          stroke="#E2E9F5"
          strokeWidth="1.5"
        />

        <circle cx="79" cy="182" r="10" fill="#FFE8ED" />

        <path
          d="M74 182H84M79 177V187"
          stroke="#FF6B81"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <rect
          x="356"
          y="178"
          width="49"
          height="49"
          rx="15"
          fill="#FFFFFF"
          stroke="#E2E9F5"
          strokeWidth="1.5"
        />

        <path
          d="M369 202L377 194L384 200L394 188"
          stroke="#2852A0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom Accent */}
        <path
          d="M164 278C204 298 256 298 296 278"
          stroke="#C8D7F0"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="230" cy="290" r="4" fill="#FF8294" />
      </svg>
    </div>
  );
}

/* =========================================================
   VISUAL 2: CREDIT REPAIR
   Credit report review and document checking
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

/* =========================================================
   ABOUT SECTION
========================================================= */

export default function AboutSection() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-white py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* ABOUT US */}
        <div className="grid grid-cols-1 items-center gap-7 sm:gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-8 shrink-0 rounded-full bg-[#FF6B81]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2852A0] sm:text-xs">
                About Us
              </span>
            </div>

            <h2 className="mt-3 text-[27px] font-bold leading-tight tracking-tight text-[#081828] sm:text-3xl lg:text-[34px]">
              About Us
            </h2>

            <p className="mt-4 max-w-[650px] text-sm leading-7 text-[#667085] sm:text-[15px] sm:leading-7">
              Ultra Credit Solutions (Credit Repair in Queens)is a young,
              energetic team made up of people from all walks of life. We are
              your local credit repair solutions company who is ready to meet
              you one on one in any of our current locations. Our goal is to
              deliver GREAT CUSTOMER SERVICE so our customers can always STAY
              CONNECTED with us.
            </p>
          </div>

          <div className="min-w-0 lg:pl-3">
            <TeamIllustration />
          </div>
        </div>

        {/* CREDIT REPAIR AND MISSION */}
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
                Credit Repair in Queens is our main service. Through the credit
                repair process legally we repair your credit. There will be no
                annoying unwanted creditors call.Your credit score will be
                higher again. You will be very happy and hassle free peaceful
                life..
              </p>

              <h2 className="mt-7 text-xl font-bold leading-[1.4] tracking-tight text-[#081828] sm:text-2xl lg:text-[27px]">
                Credit Repair in Queens – About Our Mission
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#667085] sm:text-[15px] sm:leading-7">
                Our mission is to repair your credit, re-build your credit and
                get your higher credit score
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