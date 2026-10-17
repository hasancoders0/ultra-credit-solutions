"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import LocationForm from "@/components/admin/locations/LocationForm";
import { getAdminLocationById } from "@/lib/admin-locations";

export default function EditLocationPage() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadLocation = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const result = await getAdminLocationById(id);

      if (!result) {
        toast.error("Location not found.");
        router.replace("/admin/locations");
        return;
      }

      setLocation(result);
    } catch (error) {
      console.error("Failed to load location:", error);
      toast.error(error?.message || "Unable to load location.");
      router.replace("/admin/locations");
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    loadLocation();
  }, [loadLocation]);

  if (loading) {
    return (
      <div className="rounded-xl border border-[#EEEEEE] bg-white p-8 text-sm text-[#888888]">
        Loading location...
      </div>
    );
  }

  if (!location) {
    return null;
  }

  return <LocationForm key={location.id} initialLocation={location} />;
}
