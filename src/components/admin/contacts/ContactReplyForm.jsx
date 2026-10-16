"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, RotateCcw, Info } from "lucide-react";

export default function ContactReplyForm({ contact }) {
  const [reply, setReply] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const message = reply.trim();

    if (!message) {
      toast.error("Please write a reply first.");
      return;
    }

    if (!contact?.email) {
      toast.error("This contact does not have an email address.");
      return;
    }

    setIsSending(true);

    try {
      // SMTP/API integration will be added here later.
      // Do not save as sent or mark Replied until delivery is confirmed.
      toast.error("Email sending is not configured yet.", {
        description:
          "Your reply is preserved. Configure Nodemailer and SMTP to send messages from this dashboard.",
        duration: 5000,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = () => {
    setReply("");
    toast.info("Reply text cleared.");
  };

  return (
    <section>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-[#081828]">
          Reply to Customer
        </h3>

        <p className="mt-1 break-all text-xs text-[#888888]">
          To: {contact.email}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white"
      >
        <div className="p-4">
          <label
            htmlFor={`reply-${contact.id}`}
            className="mb-2 block text-sm font-medium text-[#081828]"
          >
            Your message
          </label>

          <textarea
            id={`reply-${contact.id}`}
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            rows={6}
            maxLength={10000}
            required
            placeholder={`Hello ${contact.fullName.split(" ")[0]},\n\nThank you for contacting Ultra Credit Solutions...`}
            className="w-full resize-y rounded-lg border border-[#EEEEEE] bg-white p-3 text-sm leading-6 text-[#081828] outline-none transition placeholder:text-[#AAAAAA] focus:border-[#2852A0] focus:ring-2 focus:ring-blue-100"
          />

          <div className="mt-2 flex justify-end">
            <span className="text-xs text-[#999999]">
              {reply.length}/10000
            </span>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            <Info size={16} className="mt-0.5 shrink-0" />
            <p>
              Email delivery is not configured yet. Your message will not be
              sent until the Nodemailer SMTP integration is connected.
            </p>
          </div>

          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleClear}
              disabled={isSending || !reply}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-[#666666] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw size={15} />
              Clear
            </button>

            <button
              type="submit"
              disabled={isSending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white transition hover:bg-[#1F4386] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={15} />
              {isSending ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}