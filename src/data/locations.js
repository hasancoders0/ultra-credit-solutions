const locations = [
  {
    id: 1,
    title: "Credit Repair Services in New York",
    slug: "new-york",
    state: "New York",
    city: "New York City",
    description:
      "Learn about credit report reviews, credit education, and dispute assistance options for New York residents.",
    introduction:
      "Learn how to review your credit reports, identify possible inaccuracies, and understand options for addressing credit reporting concerns.",
    serviceAreas: ["New York City", "Brooklyn", "Queens"],
    image: { src: "", alt: "" },
    content: [
      {
        heading: "Understanding Credit Reports",
        paragraphs: [
          "A credit report contains information about credit accounts, payment history, and other details used in credit evaluations.",
          "Reviewing your reports can help you identify unfamiliar accounts or information that may be inaccurate.",
        ],
      },
      {
        heading: "Reviewing Potential Errors",
        paragraphs: [
          "Identify the specific entry you believe is incorrect and collect supporting documentation before submitting a dispute.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I dispute inaccurate credit report information?",
        answer:
          "Consumers can dispute information they believe is inaccurate or incomplete through the appropriate credit bureau or information provider.",
      },
    ],
    internalLinks: [
      { label: "Our Services", href: "/services" },
      { label: "Contact Us", href: "/contact" },
    ],
    status: "published",
    featured: true,
    order: 1,
    seo: {
      title: "Credit Repair Services in New York | Ultra Credit Solutions",
      description:
        "Learn about credit report reviews and credit education options for New York residents.",
      canonical: "",
      ogImage: "",
      robots: "index,follow",
    },
  },
  {
    id: 2,
    title: "Credit Repair Services in California",
    slug: "california",
    state: "California",
    city: "Los Angeles",
    description:
      "Explore credit report review and credit education information for California consumers.",
    introduction:
      "Understand credit report reviews, common reporting concerns, and practical credit education for California consumers.",
    serviceAreas: ["Los Angeles", "San Diego", "San Jose"],
    image: { src: "", alt: "" },
    content: [
      {
        heading: "Why Credit Report Reviews Matter",
        paragraphs: [
          "Reviewing credit reports can help consumers notice unfamiliar accounts, incorrect balances, and other discrepancies.",
        ],
      },
      {
        heading: "Preparing to Dispute Information",
        paragraphs: [
          "Identify the information you believe is incorrect and gather relevant records to explain your concern.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can every negative item be removed?",
        answer:
          "No. Accurate and verifiable information generally cannot be removed simply because it is negative.",
      },
    ],
    internalLinks: [
      { label: "Our Services", href: "/services" },
      { label: "Contact Us", href: "/contact" },
    ],
    status: "published",
    featured: true,
    order: 2,
    seo: {
      title: "Credit Repair Services in California | Ultra Credit Solutions",
      description:
        "Explore credit report reviews and credit education information for California consumers.",
      canonical: "",
      ogImage: "",
      robots: "index,follow",
    },
  },
  {
    id: 3,
    title: "Credit Repair Services in Florida",
    slug: "florida",
    state: "Florida",
    city: "Orlando",
    description:
      "Learn about credit reports, possible reporting errors, and credit education resources for Florida residents.",
    introduction: "",
    serviceAreas: [],
    image: { src: "", alt: "" },
    content: [],
    faqs: [],
    internalLinks: [],
    status: "draft",
    featured: false,
    order: 3,
    seo: {
      title: "Credit Repair Services in Florida | Ultra Credit Solutions",
      description:
        "Credit report review and credit education information for Florida consumers.",
      canonical: "",
      ogImage: "",
      robots: "noindex,follow",
    },
  },
];

export const emptyLocation = {
  id: null,
  title: "",
  slug: "",
  state: "",
  city: "",
  description: "",
  introduction: "",
  serviceAreas: [],
  image: { src: "", alt: "" },
  content: [],
  faqs: [],
  internalLinks: [],
  status: "draft",
  featured: false,
  order: 1,
  seo: {
    title: "",
    description: "",
    canonical: "",
    ogImage: "",
    robots: "noindex,follow",
  },
};

export { locations };
export default locations;