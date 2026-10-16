
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import ServiceForm from "@/components/admin/services/ServiceForm";
import {
  getAdminServices,
  getAdminServiceById,
  saveAdminService,
  SERVICE_UPDATED_EVENT,
} from "@/lib/admin-services";

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadService = useCallback(() => {
    const allServices = getAdminServices();
    const currentService = getAdminServiceById(id);

    setServices(allServices);
    setService(currentService);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadService();

    window.addEventListener(SERVICE_UPDATED_EVENT, loadService);

    return () => {
      window.removeEventListener(SERVICE_UPDATED_EVENT, loadService);
    };
  }, [loadService]);

  async function handleSave(formData) {
    try {
      const saved = saveAdminService({
        ...formData,
        id: service.id,
      });

      setService(saved);
      setServices(getAdminServices());

      toast.success("Service updated successfully.");
    } catch (error) {
      toast.error("Unable to update the service.");
      throw error;
    }
  }

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-[#888888]">
        Loading service...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="rounded-xl border border-[#EEEEEE] bg-white p-8 text-center">
        <h1 className="text-xl font-semibold text-[#081828]">
          Service not found
        </h1>
        <p className="mt-2 text-sm text-[#888888]">
          This service may have been deleted or the URL may be incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="mt-5 rounded-lg bg-[#2852A0] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1F4386]"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <ServiceForm
      key={service.id}
      initialService={service}
      services={services}
      onSave={handleSave}
      isEditing
    />
  );
}
