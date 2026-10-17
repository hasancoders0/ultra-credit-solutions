
import { services } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";

export default function List() {
  const publishedServices = services.filter(
    (service) => service.status !== "draft"
  );

  return (
    <section
      id="our-services"
      className="bg-[#F9F9F9] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24"
    >
      <div className="mx-auto max-w-[1440px]">

        {publishedServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {publishedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E5EAF3] bg-white px-6 py-14 text-center">
            <h3 className="text-lg font-semibold text-[#081828]">
              Services coming soon
            </h3>

            <p className="mt-2 text-sm leading-7 text-[#667085]">
              Please check back soon to explore our available services.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
