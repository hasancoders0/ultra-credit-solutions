"use client";

import { useEffect, useRef, useState } from "react";
import { HeartHandshake, Users, ShieldCheck } from "lucide-react";

const trustStats = [
  {
    id: 1,
    value: 96,
    suffix: "%",
    label: "Customer Satisfaction",
    description: "Focused on a positive customer experience",
    icon: HeartHandshake,
    iconColor: "#FF6B81",
    iconBg: "#FFF0F3",
    duration: 1800,
  },
  {
    id: 2,
    value: 100,
    suffix: "+",
    label: "Happy Clients",
    description: "People who have connected with our team",
    icon: Users,
    iconColor: "#2852A0",
    iconBg: "#EAF0FC",
    duration: 1800,
  },
  {
    id: 3,
    value: 1000,
    suffix: "+",
    label: "People Reached",
    description: "Individuals exploring their credit options",
    icon: ShieldCheck,
    iconColor: "#159B88",
    iconBg: "#E8F8F4",
    duration: 2200,
  },
];

/* =========================================================
   ANIMATED COUNTER
========================================================= */

function AnimatedCounter({ value, suffix, duration, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrame;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out animation for a smooth finish.
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easedProgress * value);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    setCount(0);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, isVisible]);

  return (
    <span>
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* =========================================================
   TRUST SECTION
========================================================= */

export default function TrustSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    // Fallback for browsers without IntersectionObserver.
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#F7F9FC] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE6F8] bg-white/80 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#FF6B81]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2852A0] sm:text-xs">
              Trust & Commitment
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#081828] sm:text-4xl lg:text-[42px]">
            Trusted People.
            <span className="mt-1 block text-[#2852A0]">
              Focused on Your Credit Journey.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base sm:leading-8">
            Our focus is on clear communication, helpful guidance, and helping
            you understand your credit repair options.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {trustStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.id}
                className="group relative isolate min-w-0 overflow-hidden rounded-2xl border border-[#E5EBF5] bg-white p-6 shadow-[0_8px_30px_rgba(22,49,91,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4E0F5] hover:shadow-[0_16px_40px_rgba(22,49,91,0.09)] sm:p-7"
              >
                {/* Decorative Corner */}
                <div
                  aria-hidden="true"
                  className="absolute -right-1 -top-1 -z-10 h-24 w-24 rounded-bl-full opacity-50 transition-opacity duration-300 group-hover:opacity-80"
                  style={{ backgroundColor: stat.iconBg }}
                />

                {/* Icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: stat.iconBg }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: stat.iconColor }}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                {/* Animated Number */}
                <div className="mt-7">
                  <p
                    className="text-4xl font-bold tracking-tight text-[#081828] sm:text-[42px]"
                    aria-label={`${stat.value}${stat.suffix}`}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={stat.duration}
                      isVisible={isVisible}
                    />
                  </p>

                  <h3 className="mt-2 text-base font-semibold text-[#081828] sm:text-lg">
                    {stat.label}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#667085]">
                    {stat.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}