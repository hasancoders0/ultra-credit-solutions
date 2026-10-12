import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
} from "lucide-react";

import LocationCTA from "@/components/locations/LocationCTA";

export default function LocationDetails({ location }) {
  const content = location.content;

  return (
    <>
      <section className="bg-[#F9F9F9]">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2852A0] transition hover:gap-3"
          >
            <ArrowLeft size={16} />
            All Locations
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2852A0]/15 bg-white px-4 py-2 text-sm font-medium text-[#2852A0]">
              <MapPin size={16} />

              {[location.city, location.state]
                .filter(Boolean)
                .join(", ")}
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#081828] sm:text-5xl">
              {location.title}
            </h1>

            {location.description && (
              <p className="mt-6 text-base leading-8 text-[#666666] sm:text-lg">
                {location.description}
              </p>
            )}

            <div className="mt-8">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2852A0] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1f4388]"
              >
                Get Started
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[850px] px-5 sm:px-8">
          {content ? (
            <div className="whitespace-pre-line text-base leading-8 text-[#666666]">
              {content}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-[#081828]">
                Credit Information for {location.city || location.state}
              </h2>

              <p className="mt-5 text-base leading-8 text-[#666666]">
                Learn about credit reports, credit scores, and the
                process of reviewing potentially inaccurate or
                unverifiable information. Contact our team to confirm
                which services are available for your location.
              </p>
            </div>
          )}
        </div>
      </section>

      <LocationCTA />
    </>
  );
}