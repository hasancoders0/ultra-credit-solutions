import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function LocationHero() {
  return (
    <section className="relative overflow-hidden bg-[#F9F9F9]">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2852A0]/15 bg-white px-4 py-2 text-sm font-medium text-[#2852A0]">
            <MapPin size={16} />
            Our Service Areas
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#081828] sm:text-5xl lg:text-6xl">
            Credit Support for Your
            <span className="text-[#2852A0]"> Location</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#666666] sm:text-lg">
            Explore our location pages to learn about credit report
            review and dispute assistance, available services, and
            helpful information relevant to your area.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2852A0] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1f4388]"
            >
              Make an Appointment
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-[#EEEEEE] bg-white px-6 py-3.5 text-sm font-semibold text-[#081828] transition hover:border-[#2852A0] hover:text-[#2852A0]"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}