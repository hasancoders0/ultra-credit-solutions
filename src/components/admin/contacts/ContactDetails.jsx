"use client";

import { useEffect } from "react";
import {
  X,
  Mail,
  CalendarDays,
  UserRound,
  MessageSquare,
  Clock3,
} from "lucide-react";
import ContactReplyForm from "./ContactReplyForm";

const statusStyles = {
  New: "bg-pink-50 text-[#D94868]",
  Read: "bg-blue-50 text-[#2852A0]",
  "Reply Drafted": "bg-amber-50 text-amber-700",
  Replied: "bg-green-50 text-green-700",
};

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function ContactDetails({
  contact,
  onClose,
  onStatusChange,
}) {
  useEffect(() => {
    if (!contact) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [contact, onClose]);

  if (!contact) return null;

  const markAsRead = () => {
    if (contact.status === "New") {
      onStatusChange(contact.id, "Read");
    }
  };

  const conversation = [
    {
      id: "original-message",
      message: contact.message,
      createdAt: contact.createdAt,
      direction: "incoming",
      deliveryStatus: "received",
    },
    ...(contact.replies || []),
  ].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close contact details"
        className="absolute inset-0 cursor-default bg-[#081828]/40 backdrop-blur-[2px]"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-drawer-title"
        className="relative flex h-full w-full max-w-[600px] flex-col bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#EEEEEE] px-5 py-4 sm:px-6">
          <div>
            <h2
              id="contact-drawer-title"
              className="text-lg font-semibold text-[#081828]"
            >
              Contact Conversation
            </h2>
            <p className="mt-1 text-sm text-[#888888]">
              Review the original message and reply history.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#666666] transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-base font-semibold text-[#2852A0]">
                {contact.fullName
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-base font-semibold text-[#081828]">
                  {contact.fullName}
                </h3>

                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 inline-flex max-w-full items-center gap-1.5 break-all text-sm text-[#2852A0] hover:underline"
                >
                  <Mail size={14} className="shrink-0" />
                  {contact.email}
                </a>

                <div className="mt-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusStyles[contact.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-4 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <UserRound size={17} className="mt-0.5 text-[#888888]" />
                <div>
                  <p className="text-xs text-[#888888]">Contact name</p>
                  <p className="mt-1 break-words text-sm font-medium text-[#081828]">
                    {contact.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CalendarDays size={17} className="mt-0.5 text-[#888888]" />
                <div>
                  <p className="text-xs text-[#888888]">Received</p>
                  <p className="mt-1 text-sm font-medium text-[#081828]">
                    {formatDate(contact.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[#081828]">
                <MessageSquare size={17} />
                Conversation
              </h3>
              <span className="text-xs text-[#888888]">
                {(contact.replies || []).length}{" "}
                {(contact.replies || []).length === 1 ? "reply" : "replies"}
              </span>
            </div>

            <div className="space-y-4">
              {conversation.map((item) => {
                const isOutgoing = item.direction === "outgoing";

                return (
                  <div
                    key={item.id}
                    className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`w-full max-w-[92%] rounded-xl border p-4 ${
                        isOutgoing
                          ? "border-blue-100 bg-blue-50/70"
                          : "border-[#EEEEEE] bg-white"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-[#081828]">
                          {isOutgoing ? "Admin Reply" : contact.fullName}
                        </p>
                        <span className="text-[11px] text-[#888888]">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>

                      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-[#555555]">
                        {item.message}
                      </p>

                      {isOutgoing && (
                        <div className="mt-3 border-t border-blue-100 pt-2">
                          {item.deliveryStatus === "sent" ? (
                            <span className="text-xs font-medium text-green-700">
                              Email sent
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-amber-700">
                              Not sent by email
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {contact.status === "New" && (
            <button
              type="button"
              onClick={markAsRead}
              className="inline-flex items-center gap-2 rounded-lg border border-[#EEEEEE] px-3 py-2 text-sm font-medium text-[#2852A0] transition hover:bg-blue-50"
            >
              <Clock3 size={16} />
              Mark as Read
            </button>
          )}

          <ContactReplyForm contact={contact} />
        </div>

        <div className="shrink-0 border-t border-[#EEEEEE] bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="h-11 w-full rounded-lg border border-[#EEEEEE] bg-white text-sm font-medium text-[#081828] transition hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </aside>
    </div>
  );
}