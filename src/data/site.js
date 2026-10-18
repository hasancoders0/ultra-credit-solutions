/* =========================================================
   SITE INFORMATION
========================================================= */

export const siteInfo = {
  name: "Ultra Credit Solutions Inc.",
  shortName: "Ultra Credit Solutions",

  description:
    "We will help you by disputing inaccurate & unverifiable items on your credit reports.",

  email: "jibon.c@ultracreditsolutions.net",

  phone: "",

  address:
    "3716 73rd Street, Suite 302B, Jackson Heights, NY 11372",

  socialLinks: {
    facebook: "https://www.facebook.com/Ultracreditsolutionsinc",
    instagram: "https://www.instagram.com/ultracreditsolutionsl/",
    linkedin: "https://www.linkedin.com/company/ultra-credit-solutions",
  },
};

/* =========================================================
   SITE SETTINGS
========================================================= */

export const siteSettings = {
  logo: "/logo/logo-black.png",
  footerLogo: "/logo/white-logo.png",
  favicon: "/favicon.png",

  primaryColor: "#2852A0",
  ctaColor: "#FF6B81",
  accentColor: "#007AFF",

  backgroundColor: "#F9F9F9",
  headingColor: "#081828",
  bodyColor: "#666666",
};

/* =========================================================
   FOOTER CONTENT
========================================================= */

export const footerContent = {
  description: siteInfo.description,

  /* Footer Navigation */
  columns: [
    {
      title: "Explore",

      links: [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "About Us",
          href: "/about",
        },
        {
          label: "Blog",
          href: "/blog",
        },
        {
          label: "Services",
          href: "/services",
        },
        {
          label: "Pricing",
          href: "/pricing",
        },
      ],
    },

    {
      title: "Support",

      links: [
        {
          label: "FAQ",
          href: "/faq",
        },
        {
          label: "Contact Us",
          href: "/contact",
        },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: "SMS Terms & Conditions",
          href: "/sms-terms",
        },
      ],
    },
  ],

  /* Contact Information */
  contact: {
    title: "Get In Touch",

    address: siteInfo.address,

    email: siteInfo.email,

    phone: siteInfo.phone,
  },

  /* Copyright */
  copyright: `© ${new Date().getFullYear()} ${siteInfo.name}. All rights reserved.`,
};