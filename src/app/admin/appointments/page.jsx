"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AppointmentStats from "@/components/admin/appointments/AppointmentStats";
import AppointmentFilters from "@/components/admin/appointments/AppointmentFilters";
import AppointmentsTable from "@/components/admin/appointments/AppointmentsTable";
import AppointmentDetails from "@/components/admin/appointments/AppointmentDetails";
import DataPagination from "@/components/admin/shared/DataPagination";

function normalizeStatus(status) {
  const statuses = {
    pending: "New",
    new: "New",
    reviewed: "Reviewed",
    contacted: "Contacted",
    closed: "Closed",
  };

  return statuses[String(status || "").toLowerCase()] || "New";
}

export default function AppointmentRequestsPage() {
  const router = useRouter();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        router.replace(
          `/admin/login?next=${encodeURIComponent("/admin/appointments")}`,
        );
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load appointment requests.");
      }

      const records = Array.isArray(data.appointments) ? data.appointments : [];

      setAppointments(
        records.map((appointment) => ({
          ...appointment,
          id: appointment.id || appointment._id?.toString(),
          status: normalizeStatus(appointment.status),
          adminNotes: appointment.adminNotes || "",
          submittedAt: appointment.submittedAt || appointment.createdAt || null,
        })),
      );
    } catch (error) {
      console.error("Loading appointments failed:", error);
      setLoadError(
        error.message ||
          "Unable to load appointment requests. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const selectedAppointment =
    appointments.find(
      (appointment) => appointment.id === selectedAppointmentId,
    ) || null;

  const stats = useMemo(
    () => ({
      total: appointments.length,
      new: appointments.filter((item) => item.status === "New").length,
      contacted: appointments.filter((item) => item.status === "Contacted")
        .length,
      closed: appointments.filter((item) => item.status === "Closed").length,
    }),
    [appointments],
  );

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesSearch =
        !query ||
        (appointment.fullName || "").toLowerCase().includes(query) ||
        (appointment.email || "").toLowerCase().includes(query) ||
        (appointment.service || "").toLowerCase().includes(query) ||
        (appointment.concerns || "").toLowerCase().includes(query) ||
        (appointment.adminNotes || "").toLowerCase().includes(query);

      const matchesService =
        serviceFilter === "All" || appointment.service === serviceFilter;

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      return matchesSearch && matchesService && matchesStatus;
    });
  }, [appointments, search, serviceFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAppointments.length / pageSize),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedAppointments = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredAppointments.slice(start, start + pageSize);
  }, [filteredAppointments, safeCurrentPage, pageSize]);

  const startRecord =
    filteredAppointments.length === 0
      ? 0
      : (safeCurrentPage - 1) * pageSize + 1;

  const endRecord = Math.min(
    safeCurrentPage * pageSize,
    filteredAppointments.length,
  );

  const handleUpdateAppointment = async (appointmentId, changes) => {
    const currentAppointment = appointments.find(
      (appointment) => appointment.id === appointmentId,
    );

    if (!currentAppointment) {
      throw new Error("Appointment not found in the current list.");
    }

    const status = normalizeStatus(changes.status);
    const adminNotes = changes.adminNotes;

    if (typeof adminNotes !== "string" || adminNotes.length > 5000) {
      throw new Error("Internal notes must be 5,000 characters or fewer.");
    }

    const response = await fetch("/api/appointments", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        id: appointmentId,
        status,
        adminNotes,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 401) {
      router.replace(
        `/admin/login?next=${encodeURIComponent("/admin/appointments")}`,
      );
      throw new Error("Your admin session has expired. Please sign in again.");
    }

    if (!response.ok || !data.success || !data.appointment) {
      throw new Error(data.message || "Unable to save appointment changes.");
    }

    const updatedAppointment = {
      ...data.appointment,
      status: normalizeStatus(data.appointment.status),
      adminNotes: data.appointment.adminNotes || "",
    };

    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, ...updatedAppointment }
          : appointment,
      ),
    );

    return updatedAppointment;
  };

  const resetPage = () => setCurrentPage(1);

  return (
    <>
      <div className="space-y-4">
        <AppointmentStats stats={stats} />

        <div className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
          <AppointmentFilters
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              resetPage();
            }}
            serviceFilter={serviceFilter}
            onServiceFilterChange={(value) => {
              setServiceFilter(value);
              resetPage();
            }}
            statusFilter={statusFilter}
            onStatusFilterChange={(value) => {
              setStatusFilter(value);
              resetPage();
            }}
          />

          {loading ? (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#2852A0] border-t-transparent" />
              <p className="mt-3 text-sm text-[#888888]">
                Loading appointment requests...
              </p>
            </div>
          ) : loadError ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm font-medium text-red-600">{loadError}</p>
              <button
                type="button"
                onClick={loadAppointments}
                className="mt-4 rounded-lg bg-[#2852A0] px-4 py-2 text-sm font-medium text-white hover:bg-[#21458A]"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <AppointmentsTable
                appointments={paginatedAppointments}
                onView={(appointment) =>
                  setSelectedAppointmentId(appointment.id)
                }
              />

              <DataPagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                totalRecords={filteredAppointments.length}
                startRecord={startRecord}
                endRecord={endRecord}
                onPageChange={setCurrentPage}
                itemLabel="requests"
                pageSize={pageSize}
                onPageSizeChange={(value) => {
                  setPageSize(value);
                  resetPage();
                }}
              />
            </>
          )}
        </div>
      </div>

      <AppointmentDetails
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointmentId(null)}
        onUpdate={handleUpdateAppointment}
      />
    </>
  );
}
