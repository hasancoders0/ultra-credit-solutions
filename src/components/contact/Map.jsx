import { MapPin, ExternalLink } from "lucide-react";

const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.622094322581!2d-73.8927649!3d40.7483403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25fa92fb9c7a3%3A0x88c1ec8c56457a1b!2sULTRA%20CREDIT%20SOLUTIONS-CREDIT%20REPAIR%20AND%20DEBT%20SETTLEMENT!5e0!3m2!1sen!2sbd!4v1791748687780!5m2!1sen!2sbd";

const mapLink = "https://maps.app.goo.gl/Vp1KBhe2SNTAkHra6";

export default function Map() {
  return (
    <section className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2852A0]">
              Find Us
            </span>

            <h2 className="mt-3 text-2xl font-bold text-[#081828] sm:text-3xl">
              Visit Our Office
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#666666] sm:text-base">
              Find Ultra Credit Solutions - Credit Repair and Debt Settlement
              in Jackson Heights, New York.
            </p>
          </div>

          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#EEEEEE] px-5 py-3 text-sm font-semibold text-[#2852A0] transition hover:border-[#2852A0] hover:bg-[#F9F9F9]"
          >
            <MapPin size={17} />
            Get Directions
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#EEEEEE] bg-[#F9F9F9] shadow-sm">
          <iframe
            title="Ultra Credit Solutions Google Maps Location"
            src={mapEmbedUrl}
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}