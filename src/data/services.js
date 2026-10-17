import {
  FileSearch,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  ClipboardCheck,
  GraduationCap,
} from "lucide-react";

export const services = [
  {
    id: 1,
    slug: "credit-report-review",
    title: "Credit Report Review",
    category: "credit-report-review",
    description:
      "<p>Understand your credit reports, review account information, and identify items that may need further attention.</p>",
    href: "/services/credit-report-review",
    featured: true,
    status: "published",
    icon: FileSearch,
    image: {
      src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
      alt: "Financial documents and credit report review",
    },
    content: {
      introduction:
        "<p>Understanding your credit reports is an important step toward making informed financial decisions. Our credit report review service helps you examine the information in your reports and better understand how account details may affect your credit profile.</p>",
      sections: [
        {
          title: "Review Your Credit Report Information",
          description:
            "<p>Learn how to review account details, payment history, balances, and other information included in your credit reports.</p>",
        },
        {
          title: "Identify Information That Needs Attention",
          description:
            "<p>Understand how to spot information that appears incomplete, unfamiliar, or potentially inaccurate and determine what may need further investigation.</p>",
        },
        {
          title: "Understand Your Next Steps",
          description:
            "<p>Get a clearer understanding of your report and learn which questions or concerns you may want to address next.</p>",
        },
      ],
    },
    seo: {
      title: "Credit Report Review Services | Ultra Credit Solutions",
      description:
        "Understand your credit reports, review account information, and learn how to identify potentially inaccurate credit report entries.",
    },
  },

  {
    id: 2,
    slug: "credit-dispute-assistance",
    title: "Credit Dispute Assistance",
    category: "credit-dispute-assistance",
    description:
      "<p>Learn how to identify potentially inaccurate credit report information and understand the process for submitting a dispute.</p>",
    href: "/services/credit-dispute-assistance",
    featured: true,
    status: "published",
    icon: ShieldCheck,
    image: {
      src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
      alt: "Reviewing financial documents and dispute paperwork",
    },
    content: {
      introduction:
        "<p>If you believe information on your credit report is inaccurate or incomplete, understanding the dispute process can help you take informed action. This service explains the steps involved in reviewing concerns and preparing relevant supporting information.</p>",
      sections: [
        {
          title: "Identify Potential Inaccuracies",
          description:
            "<p>Review unfamiliar accounts, incorrect balances, payment history concerns, and other entries that may warrant further investigation.</p>",
        },
        {
          title: "Understand the Dispute Process",
          description:
            "<p>Learn how disputes are generally submitted to the relevant credit reporting agency or information provider and what information may be useful to include.</p>",
        },
        {
          title: "Keep Records of Your Dispute",
          description:
            "<p>Understand why retaining copies of correspondence, supporting documents, and responses can help you track the progress of your dispute.</p>",
        },
      ],
    },
    seo: {
      title: "Credit Dispute Assistance | Ultra Credit Solutions USA",
      description:
        "Learn about credit report disputes, potentially inaccurate entries, supporting documentation, and the steps involved in seeking corrections.",
    },
  },

  {
    id: 3,
    slug: "credit-education",
    title: "Credit Education",
    category: "credit-education",
    description:
      "<p>Build your understanding of credit reports, credit scores, payment history, and responsible credit management.</p>",
    href: "/services/credit-education",
    featured: false,
    status: "published",
    icon: BookOpen,
    image: {
      src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=900&q=80",
      alt: "Educational materials and financial learning",
    },
    content: {
      introduction:
        "<p>Credit education helps you understand how credit works and how everyday financial decisions may influence your credit profile. Learning the basics can help you make more informed decisions about borrowing and managing accounts.</p>",
      sections: [
        {
          title: "Understand Credit Reports and Scores",
          description:
            "<p>Learn the difference between a credit report and a credit score, what information credit reports contain, and why scores can vary.</p>",
        },
        {
          title: "Learn About Payment History",
          description:
            "<p>Understand why payment history matters and how consistently meeting payment obligations can support responsible credit management.</p>",
        },
        {
          title: "Develop Better Credit Habits",
          description:
            "<p>Explore practical habits such as monitoring account information, reviewing statements, and keeping track of payment due dates.</p>",
        },
      ],
    },
    seo: {
      title: "Credit Education Services | Learn About Your Credit",
      description:
        "Learn about credit reports, credit scores, payment history, and practical habits for more informed credit management.",
    },
  },

  {
    id: 4,
    slug: "credit-score-guidance",
    title: "Credit Score Guidance",
    category: "credit-score-guidance",
    description:
      "<p>Understand common factors that influence credit scores and explore ways to manage your credit profile responsibly.</p>",
    href: "/services/credit-score-guidance",
    featured: true,
    status: "published",
    icon: TrendingUp,
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      alt: "Financial data analysis and credit score guidance",
    },
    content: {
      introduction:
        "<p>Your credit score can play a role in financial decisions, but understanding what influences it is not always straightforward. Credit score guidance explains common scoring factors and helps you understand how your credit information is evaluated.</p>",
      sections: [
        {
          title: "Understand Common Scoring Factors",
          description:
            "<p>Learn about payment history, credit utilization, length of credit history, new credit inquiries, and credit mix.</p>",
        },
        {
          title: "Review Your Credit Utilization",
          description:
            "<p>Understand how balances compared with available revolving credit may affect certain credit scores and why monitoring balances can be useful.</p>",
        },
        {
          title: "Set Realistic Credit Goals",
          description:
            "<p>Learn to monitor changes in your credit information and develop realistic goals without relying on guaranteed score increases or specific timelines.</p>",
        },
      ],
    },
    seo: {
      title: "Credit Score Guidance | Ultra Credit Solutions USA",
      description:
        "Understand credit score factors, credit utilization, payment history, and responsible ways to monitor your credit profile.",
    },
  },

  {
    id: 5,
    slug: "credit-building-guidance",
    title: "Credit Building Guidance",
    category: "credit-building",
    description:
      "<p>Explore responsible credit-building habits and learn how to establish and manage credit over time.</p>",
    href: "/services/credit-building-guidance",
    featured: false,
    status: "published",
    icon: ClipboardCheck,
    image: {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
      alt: "Financial planning and responsible money management",
    },
    content: {
      introduction:
        "<p>Building a strong credit history takes time, consistent habits, and an understanding of how credit accounts work. Credit-building guidance introduces common approaches to establishing and maintaining a responsible credit profile.</p>",
      sections: [
        {
          title: "Understand Your Starting Point",
          description:
            "<p>Review your available credit information and identify whether you are establishing credit for the first time or working to strengthen an existing credit history.</p>",
        },
        {
          title: "Explore Responsible Credit Habits",
          description:
            "<p>Learn about making payments on time, managing balances, reviewing account statements, and understanding the terms of credit products.</p>",
        },
        {
          title: "Monitor Your Progress",
          description:
            "<p>Regularly review your credit reports and account information to understand changes and identify issues that may need attention.</p>",
        },
      ],
    },
    seo: {
      title: "Credit Building Guidance | Ultra Credit Solutions USA",
      description:
        "Explore credit-building fundamentals, responsible account management, payment habits, and ways to monitor your credit history.",
    },
  },

  {
    id: 6,
    slug: "personalized-credit-guidance",
    title: "Personalized Credit Guidance",
    category: "personalized-credit-guidance",
    description:
      "<p>Get guidance on understanding your credit concerns, organizing your priorities, and identifying practical next steps.</p>",
    href: "/services/personalized-credit-guidance",
    featured: false,
    status: "published",
    icon: GraduationCap,
image: {
  src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  alt: "Personalized financial consultation and guidance",
},
    content: {
      introduction:
        "<p>Everyone's credit history and financial circumstances are different. Personalized credit guidance focuses on helping you understand your current concerns, organize relevant information, and identify practical steps based on your situation.</p>",
      sections: [
        {
          title: "Discuss Your Credit Concerns",
          description:
            "<p>Identify the credit report questions or account-related concerns you want to understand and organize the information relevant to those concerns.</p>",
        },
        {
          title: "Prioritize Your Next Steps",
          description:
            "<p>Learn how to prioritize reviewing credit reports, checking account details, and addressing information that may require further investigation.</p>",
        },
        {
          title: "Build an Ongoing Review Routine",
          description:
            "<p>Develop a practical routine for monitoring credit information, maintaining financial records, and reviewing changes over time.</p>",
        },
      ],
    },
    seo: {
      title: "Personalized Credit Guidance | Ultra Credit Solutions",
      description:
        "Understand your credit concerns, organize your priorities, and explore practical next steps for managing your credit information.",
    },
  },
];
