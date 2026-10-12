import { notFound } from "next/navigation";

import { services } from "@/data/services";
import ServiceForm from "@/components/admin/services/ServiceForm";

export const metadata = {
  title: "Edit Service | Ultra Credit Solutions",
  description: "Edit a website service.",
};

export default async function EditServicePage({ params }) {
  const { id } = await params;

  const service = services.find(
    (item) =>
      String(item.id) === String(id) ||
      item.slug === id
  );

  if (!service) {
    notFound();
  }

  const serviceData = {
    ...service,
    icon: undefined,
  };

  return <ServiceForm initialService={serviceData} />;
}