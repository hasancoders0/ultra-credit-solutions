
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ServiceForm from "@/components/admin/services/ServiceForm";
import { getAdminServices, saveAdminService } from "@/lib/admin-services";

export default function NewServicePage() {
  const router = useRouter();
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(getAdminServices());
  }, []);

  async function handleSave(formData) {
    try {
      const saved = saveAdminService(formData);
      toast.success("Service created successfully.");
      router.push(`/admin/services/${saved.id}`);
    } catch (error) {
      toast.error("Unable to create the service.");
      throw error;
    }
  }

  return (
    <ServiceForm
      key="new-service"
      initialService={null}
      services={services}
      onSave={handleSave}
      isEditing={false}
    />
  );
}
