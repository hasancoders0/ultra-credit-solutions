"use client";

import { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

import { leads as initialLeads } from "@/data/leads";
import LeadFilters from "@/components/admin/leads/LeadFilters";
import LeadTable from "@/components/admin/leads/LeadTable";
import LeadDetails from "@/components/admin/leads/LeadDetails";

const cards = [
  {
    title: "Total Leads",
    status: "all",
    icon: Users,
    iconClass: "bg-blue-50 text-[#2852A0]",
  },
  {
    title: "New Leads",
    status: "new",
    icon: UserPlus,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    title: "Contacted",
    status: "contacted",
    icon: PhoneCall,
    iconClass: "bg-purple-50 text-purple-600",
  },
  {
    title: "Qualified",
    status: "qualified",
    icon: CheckCircle2,
    iconClass: "bg-green-50 text-green-600",
  },
];

export default function LeadManagement() {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredLeads = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchText) ||
        lead.email.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "all" || lead.status === status;

      const matchesSource =
        source === "all" || lead.source === source;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, search, status, source]);

  function showNotice(message) {
    setNotice(message);

    window.setTimeout(() => {
      setNotice("");
    }, 3000);
  }

  function handleView(lead) {
    setSelectedLead(lead);
  }

  function handleSave(updatedLead) {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === updatedLead.id ? updatedLead : lead
      )
    );

    setSelectedLead(updatedLead);
    showNotice("Lead updated successfully.");
  }

  function handleDelete(lead) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the lead "${lead.name}"?`
    );

    if (!confirmed) return;

    setLeads((prev) =>
      prev.filter((item) => item.id !== lead.id)
    );

    if (selectedLead?.id === lead.id) {
      setSelectedLead(null);
    }

    showNotice("Lead deleted successfully.");
  }

  function getCount(statusValue) {
    if (statusValue === "all") {
      return leads.length;
    }

    return leads.filter(
      (lead) => lead.status === statusValue
    ).length;
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#081828] sm:text-3xl">
          Lead Management
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#888888]">
          Review customer inquiries, manage follow-ups, and track lead progress.
        </p>
      </div>

      {notice && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {notice}
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-[#EEEEEE] bg-white p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[#888888]">
                    {card.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-[#081828]">
                    {getCount(card.status)}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${card.iconClass}`}>
                  <Icon size={23} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <LeadFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
      />

      {/* Leads Table */}
      <LeadTable
        leads={filteredLeads}
        onView={handleView}
        onDelete={handleDelete}
      />

      {/* Lead Details */}
      {selectedLead && (
        <LeadDetails
          key={selectedLead.id}
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}