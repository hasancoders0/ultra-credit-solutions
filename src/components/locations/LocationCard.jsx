import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";

export default function LocationCard({ location }) {
  return (
    <article className="group rounded-2xl border border-[#EEEEEE] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#2852A0]/30 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
        <MapPin size={22} />
      </div>

      <h2 className="mt-5 text-xl font-semibold leading-snug text-[#081828]">
        {location.title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-[#666666]">
        {location.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[#888888]">
        {location.city && <span>{location.city}</span>}

        {location.city && location.state && (
          <span aria-hidden="true">·</span>
        )}

        {location.state && <span>{location.state}</span>}
      </div>

      <Link
        href={`/locations/${location.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2852A0] transition group-hover:gap-3"
      >
        Explore Location
        <ArrowUpRight size={17} />
      </Link>
    </article>
  );
}