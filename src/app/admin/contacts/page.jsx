
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";

import ContactStats from "@/components/admin/contacts/ContactStats";
import ContactFilters from "@/components/admin/contacts/ContactFilters";
import ContactsTable from "@/components/admin/contacts/ContactsTable";
import ContactDetails from "@/components/admin/contacts/ContactDetails";
import DataPagination from "@/components/admin/shared/DataPagination";

export default function ContactsPage() {
  const router = useRouter();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [updatingIds, setUpdatingIds] = useState([]);

  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const response = await fetch("/api/contact", {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        router.replace(
          `/admin/login?next=${encodeURIComponent("/admin/contacts")}`,
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load your contact submissions.",
        );
      }

      setContacts(Array.isArray(result.contacts) ? result.contacts : []);
    } catch (error) {
      console.error("Failed to load contacts:", error);
      setLoadError(
        error.message || "Something went wrong while loading contacts.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const selectedContact =
    contacts.find((contact) => contact.id === selectedContactId) || null;

  const stats = useMemo(
    () => ({
      total: contacts.length,
      new: contacts.filter((contact) => contact.status === "New").length,
      awaitingReply: contacts.filter(
        (contact) => contact.status !== "Replied",
      ).length,
    }),
    [contacts],
  );

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return contacts.filter((contact) => {
      const replies = Array.isArray(contact.replies) ? contact.replies : [];

      const matchesSearch =
        !query ||
        (contact.fullName || "").toLowerCase().includes(query) ||
        (contact.email || "").toLowerCase().includes(query) ||
        (contact.message || "").toLowerCase().includes(query) ||
        replies.some((reply) =>
          (reply.message || "").toLowerCase().includes(query),
        );

      const matchesStatus =
        statusFilter === "All" || contact.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / pageSize),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedContacts = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredContacts.slice(start, start + pageSize);
  }, [filteredContacts, safeCurrentPage, pageSize]);

  const updateStatus = async (contactId, status) => {
    const contact = contacts.find((item) => item.id === contactId);

    if (!contact || contact.status === status) {
      return;
    }

    const previousStatus = contact.status;

    setUpdatingIds((previous) =>
      previous.includes(contactId) ? previous : [...previous, contactId],
    );

    // Update immediately so the dashboard feels responsive.
    setContacts((previous) =>
      previous.map((item) =>
        item.id === contactId ? { ...item, status } : item,
      ),
    );

    try {
      const response = await fetch("/api/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: contactId,
          status,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        router.replace(
          `/admin/login?next=${encodeURIComponent("/admin/contacts")}`,
        );
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Unable to update contact status.");
      }

      setLoadError("");
    } catch (error) {
      console.error("Failed to update contact status:", error);

      // Restore the previous status if MongoDB could not be updated.
      setContacts((previous) =>
        previous.map((item) =>
          item.id === contactId
            ? { ...item, status: previousStatus }
            : item,
        ),
      );

      setLoadError(
        `${error.message || "Unable to update contact status."} The previous status has been restored.`,
      );
    } finally {
      setUpdatingIds((previous) =>
        previous.filter((id) => id !== contactId),
      );
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContactId(contact.id);

    if (contact.status === "New") {
      updateStatus(contact.id, "Read");
    }
  };

  const startRecord =
    filteredContacts.length === 0
      ? 0
      : (safeCurrentPage - 1) * pageSize + 1;

  const endRecord = Math.min(
    safeCurrentPage * pageSize,
    filteredContacts.length,
  );

  return (
    <>
      <div className="space-y-4">
        <ContactStats stats={stats} />

        {loadError && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-2 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{loadError}</p>
            </div>

            <button
              type="button"
              onClick={loadContacts}
              disabled={isLoading}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-60"
            >
              <RefreshCw
                size={15}
                className={isLoading ? "animate-spin" : ""}
              />
              Try Again
            </button>
          </div>
        )}

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

          {isLoading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-5 py-12 text-center">
              <LoaderCircle
                size={28}
                className="animate-spin text-[#2852A0]"
              />
              <p className="text-sm font-medium text-[#081828]">
                Loading contacts...
              </p>
              <p className="text-sm text-[#888888]">
                Fetching your saved contact submissions.
              </p>
            </div>
          ) : loadError && contacts.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center px-5 py-12 text-center">
              <AlertCircle size={28} className="text-red-500" />
              <p className="mt-3 text-sm font-semibold text-[#081828]">
                Contacts could not be loaded
              </p>
              <p className="mt-1 max-w-md text-sm text-[#666666]">
                Check your connection and admin session, then try again.
              </p>
              <button
                type="button"
                onClick={loadContacts}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2852A0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#214482]"
              >
                <RefreshCw size={16} />
                Reload Contacts
              </button>
            </div>
          ) : (
            <>
              <ContactsTable
                contacts={paginatedContacts}
                onView={handleViewContact}
              />

              {updatingIds.length > 0 && (
                <div className="flex items-center gap-2 border-t border-[#EEEEEE] px-4 py-2 text-xs text-[#666666]">
                  <LoaderCircle
                    size={14}
                    className="animate-spin text-[#2852A0]"
                  />
                  Saving contact changes...
                </div>
              )}

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
            </>
          )}
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
