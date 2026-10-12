import {
  Users,
  CalendarDays,
  EyeOff,
} from "lucide-react";

export const services = [
  {
    id: 1,
    slug: "how-it-works",
    title: "How It Works",

    description:
      "Understand the credit repair process and learn how to review your credit reports.",

    href: "/services/how-it-works",

    icon: Users,
    number: "01",
    featured: true,

    image: {
      src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85",
      alt: "Person reviewing financial documents and planning finances",
    },

    content: {
      introduction:
        "Understanding the credit repair process can help you make informed decisions about your credit-report concerns. By reviewing your credit reports and understanding the information they contain, you can better identify questions or potential inaccuracies that may need attention.",

      sections: [
        {
          title: "Understand Your Credit Report",

          description:
            "Your credit report contains information about your credit accounts, payment history, balances, and personal details. Reviewing this information carefully can help you understand what is being reported and identify details that may need further review.",
        },

        {
          title: "Identify Potential Errors",

          description:
            "Look for information that may be inaccurate, incomplete, outdated, or inconsistent with your records. Examples may include incorrect account details, unfamiliar accounts, or payment information that does not match your documentation.",
        },

        {
          title: "Review Supporting Information",

          description:
            "Gather relevant account statements, payment records, correspondence, or other documents that may help you understand a potential reporting issue. Keep copies of your records for reference.",
        },

        {
          title: "Explore Appropriate Next Steps",

          description:
            "Information you believe is inaccurate or incomplete may be disputed with the relevant credit reporting agency or the company that supplied the information. The appropriate next steps depend on the specific circumstances and applicable requirements.",
        },
      ],
    },
  },

  {
    id: 2,
    slug: "what-to-expect",
    title: "What to Expect",

    description:
      "Learn what to expect during the credit repair process and how to prepare for the next steps.",

    href: "/services/what-to-expect",

    icon: CalendarDays,
    number: "02",
    featured: true,

    image: {
      src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
      alt: "Person writing notes and organizing information at a desk",
    },

    content: {
      introduction:
        "Every credit situation is different. Understanding the general process can help you prepare for a review of your credit-related concerns. The information required and the appropriate next steps will depend on your individual circumstances.",

      sections: [
        {
          title: "An Initial Discussion",

          description:
            "Start by explaining your concerns and identifying which parts of your credit report you would like to understand better. Sharing relevant information can help establish the scope of your questions and the areas that may require further review.",
        },

        {
          title: "Review Relevant Information",

          description:
            "Relevant account details, credit report entries, and supporting records may help identify information that requires further attention. Carefully reviewing available information can help distinguish questions that need clarification from potential reporting errors.",
        },

        {
          title: "Understand the Available Options",

          description:
            "Depending on the circumstances, you may consider reviewing the information directly, contacting the relevant company, or disputing information you believe is inaccurate or incomplete with the appropriate credit reporting agency.",
        },

        {
          title: "Follow the Appropriate Process",

          description:
            "Keep records of communications, supporting documents, and any responses you receive. The time required and the outcome will vary depending on the nature of the issue and the parties involved.",
        },
      ],
    },
  },

  {
    id: 3,
    slug: "what-is-credit-score",
    title: "What Is a Credit Score?",

    description:
      "Discover what a credit score represents and why it can matter when managing your finances.",

    href: "/services/what-is-credit-score",

    icon: EyeOff,
    number: "03",
    featured: true,

    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
      alt: "Financial data and charts displayed on a computer screen",
    },

    content: {
      introduction:
        "A credit score is a numerical representation of information in a credit history. Lenders and other organizations may use credit scores when evaluating applications. Different scoring models can evaluate credit information differently, so a score may vary depending on the model and the information used.",

      sections: [
        {
          title: "Payment History",

          description:
            "Payment history is an important factor in many credit scoring models. Reviewing your account information can help you understand how payments are reported and identify details that may need clarification.",
        },

        {
          title: "Credit Utilization",

          description:
            "Credit utilization describes the amount of revolving credit being used compared with the available credit limits. For many scoring models, the balances reported on revolving accounts can influence the resulting score.",
        },

        {
          title: "Credit History and Accounts",

          description:
            "The age of accounts, the types of credit accounts you have, and their reported status may contribute to a credit score. The importance of each factor depends on the scoring model being used.",
        },

        {
          title: "New Credit and Credit Inquiries",

          description:
            "Applications for new credit and certain credit inquiries may influence some credit scoring models. Reviewing your credit report can help you understand which inquiries and accounts appear in your credit history.",
        },

        {
          title: "Why Accurate Credit Reporting Matters",

          description:
            "Credit reports provide information that may be used in calculating credit scores. Reviewing your reports and addressing information you believe is inaccurate can help ensure that reported information receives appropriate attention. No particular score increase or outcome is guaranteed.",
        },
      ],
    },
  },
];