import { services } from "@/data/services";
import ServiceManagement from "@/components/admin/services/ServiceManagement";

export const metadata = {
  title: "Services | Ultra Credit Solutions",
  description: "Manage website services.",
};

export default function AdminServicesPage() {
  // Pass only serializable data to the Client Component.
  const serviceData = services.map((service) => ({
    ...service,
    icon: undefined,
  }));

  return (
    <ServiceManagement initialServices={serviceData} />
  );
}