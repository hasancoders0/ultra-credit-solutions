import LocationCard from "@/components/locations/LocationCard";

export default function LocationList({ locations }) {
  if (!locations.length) {
    return (
      <div className="rounded-2xl border border-[#EEEEEE] bg-white px-6 py-16 text-center">
        <h2 className="text-xl font-semibold text-[#081828]">
          Location Pages Coming Soon
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#666666]">
          Please explore our services or contact us to learn more
          about our available assistance.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
        />
      ))}
    </div>
  );
}