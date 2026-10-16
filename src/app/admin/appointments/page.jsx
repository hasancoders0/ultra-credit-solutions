"use client";

import { useMemo, useState } from "react";
import { mockAppointments } from "@/data/mockAppointments";

import AppointmentStats from "@/components/admin/appointments/AppointmentStats";
import AppointmentFilters from "@/components/admin/appointments/AppointmentFilters";
import AppointmentsTable from "@/components/admin/appointments/AppointmentsTable";
import AppointmentDetails from "@/components/admin/appointments/AppointmentDetails";
import DataPagination from "@/components/admin/shared/DataPagination";

export default function AppointmentRequestsPage() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const selectedAppointment =
    appointments.find(
      (appointment) => appointment.id === selectedAppointmentId
    ) || null;

  const stats = useMemo(
    () => ({
      total: appointments.length,
      new: appointments.filter((item) => item.status === "New").length,
      contacted: appointments.filter(
        (item) => item.status === "Contacted"
      ).length,
      closed: appointments.filter((item) => item.status === "Closed").length,
    }),
    [appointments]
  );

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesSearch =
        !query ||
        appointment.fullName.toLowerCase().includes(query) ||
        appointment.email.toLowerCase().includes(query) ||
        appointment.service.toLowerCase().includes(query) ||
        (appointment.concerns || "").toLowerCase().includes(query) ||
        (appointment.adminNotes || "").toLowerCase().includes(query);

      const matchesService =
        serviceFilter === "All" ||
        appointment.service === serviceFilter;

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      return matchesSearch && matchesService && matchesStatus;
    });
  }, [appointments, search, serviceFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAppointments.length / pageSize)
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
    filteredAppointments.length
  );

  const handleUpdateAppointment = (appointmentId, changes) => {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, ...changes }
          : appointment
      )
    );
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