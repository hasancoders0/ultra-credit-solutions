"use client";

import { useMemo, useState } from "react";
import { mockContacts } from "@/data/mockContacts";

import ContactStats from "@/components/admin/contacts/ContactStats";
import ContactFilters from "@/components/admin/contacts/ContactFilters";
import ContactsTable from "@/components/admin/contacts/ContactsTable";
import ContactDetails from "@/components/admin/contacts/ContactDetails";
import DataPagination from "@/components/admin/shared/DataPagination";

export default function ContactsPage() {
  const [contacts, setContacts] = useState(mockContacts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const selectedContact =
    contacts.find((contact) => contact.id === selectedContactId) || null;

  const stats = useMemo(
    () => ({
      total: contacts.length,
      new: contacts.filter((contact) => contact.status === "New").length,
      awaitingReply: contacts.filter((contact) => contact.status !== "Replied")
        .length,
    }),
    [contacts],
  );

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return contacts.filter((contact) => {
      const matchesSearch =
        !query ||
        contact.fullName.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.message.toLowerCase().includes(query) ||
        (contact.replies || []).some((reply) =>
          reply.message.toLowerCase().includes(query),
        );

      const matchesStatus =
        statusFilter === "All" || contact.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / pageSize));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedContacts = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;

    return filteredContacts.slice(start, start + pageSize);
  }, [filteredContacts, safeCurrentPage, pageSize]);

  const updateStatus = (contactId, status) => {
    setContacts((previous) =>
      previous.map((contact) =>
        contact.id === contactId ? { ...contact, status } : contact,
      ),
    );
  };

  const handleViewContact = (contact) => {
    setSelectedContactId(contact.id);

    if (contact.status === "New") {
      updateStatus(contact.id, "Read");
    }
  };

  const startRecord =
    filteredContacts.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;

  const endRecord = Math.min(
    safeCurrentPage * pageSize,
    filteredContacts.length,
  );

  return (
    <>
      <div className="space-y-4">
        <ContactStats stats={stats} />

        <div className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
          <ContactFilters
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            statusFilter={statusFilter}
            onStatusFilterChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          />

          <ContactsTable
            contacts={paginatedContacts}
            onView={handleViewContact}
          />

          <DataPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalRecords={filteredContacts.length}
            startRecord={startRecord}
            endRecord={endRecord}
            onPageChange={setCurrentPage}
            itemLabel="contacts"
            pageSize={pageSize}
            onPageSizeChange={(value) => {
              setPageSize(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <ContactDetails
        contact={selectedContact}
        onClose={() => setSelectedContactId(null)}
        onStatusChange={updateStatus}
      />
    </>
  );
}
