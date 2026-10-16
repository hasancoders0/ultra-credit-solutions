"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import LocationForm from "@/components/admin/locations/LocationForm";
import { getAdminLocationById } from "@/lib/admin-locations";

export default function EditLocationPage() {
  const params = useParams();
  const router = useRouter();

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = getAdminLocationById(params.id);

    if (!result) {
      toast.error("Location not found.");
      router.replace("/admin/locations");
      return;
    }

    setLocation(result);
    setLoading(false);
  }, [params.id, router]);

  if (loading || !location) {
    return (
      <div className="rounded-xl border border-[#EEEEEE] bg-white p-8 text-sm text-[#888888]">
        Loading location...
      </div>
    );
  }

  return <LocationForm key={location.id} initialLocation={location} />;
}