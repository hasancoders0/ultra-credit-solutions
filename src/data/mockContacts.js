export const mockContacts = [
  {
    id: "contact-001",
    fullName: "Michael Anderson",
    email: "michael.anderson@example.com",
    message:
      "I would like to learn more about your credit repair services and how your process works.",
    createdAt: "2026-10-15T09:30:00",
    status: "New",
    replies: [],
  },
  {
    id: "contact-002",
    fullName: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    message:
      "Could you explain your service pricing and the steps involved in getting started?",
    createdAt: "2026-10-14T15:45:00",
    status: "New",
    replies: [],
  },
  {
    id: "contact-003",
    fullName: "David Wilson",
    email: "david.wilson@example.com",
    message:
      "I have questions about how your team handles inaccurate information on credit reports.",
    createdAt: "2026-10-14T11:20:00",
    status: "Read",
    replies: [],
  },
  {
    id: "contact-004",
    fullName: "Jessica Brown",
    email: "jessica.brown@example.com",
    message:
      "I would like to discuss my situation and learn more about your available services.",
    createdAt: "2026-10-13T13:10:00",
    status: "Replied",
    replies: [
      {
        id: "reply-004-001",
        message:
          "Thank you for contacting Ultra Credit Solutions. We would be happy to discuss our services and answer your questions.",
        createdAt: "2026-10-13T14:20:00",
        direction: "outgoing",
        deliveryStatus: "sent",
      },
    ],
  },
  {
    id: "contact-005",
    fullName: "Robert Taylor",
    email: "robert.taylor@example.com",
    message:
      "I found your website through Google and would like to know more about your office in Queens.",
    createdAt: "2026-10-12T10:05:00",
    status: "New",
    replies: [],
  },
];