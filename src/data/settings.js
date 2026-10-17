
export const defaultAccountSettings = {
  email: "hasan@gmail.com",
  password: "12345",
};

// Available integration providers for the Admin Settings UI
export const integrationProviders = [
  {
    id: "development-test",
    name: "Development Test Integration",
    description: "Test integration placement and code loading.",
    category: "Development",
    icon: "code",
    fields: ["code", "placement"],
    connectionMethod: "custom-code",
  },
  {
    id: "google-search-console",
    name: "Google Search Console",
    description: "Add a Google site verification meta tag.",
    category: "SEO",
    icon: "search",
    fields: ["code", "placement"],
    connectionMethod: "custom-code",
  },
  {
    id: "google-analytics",
    name: "Google Analytics 4",
    description: "Add your Google Analytics tracking snippet.",
    category: "Analytics",
    icon: "chart",
    fields: ["code", "placement"],
    connectionMethod: "custom-code",
  },
  {
    id: "google-tag-manager",
    name: "Google Tag Manager",
    description: "Add your Google Tag Manager snippet.",
    category: "Analytics",
    icon: "tags",
    fields: ["code", "placement"],
    connectionMethod: "custom-code",
  },
  {
    id: "meta-pixel",
    name: "Meta Pixel",
    description: "Add your Meta Pixel tracking snippet.",
    category: "Advertising",
    icon: "target",
    fields: ["code", "placement"],
    connectionMethod: "custom-code",
  },
  {
    id: "custom-code",
    name: "Custom HTML / Script / iframe",
    description: "Add a trusted third-party integration snippet.",
    category: "Custom",
    icon: "code",
    fields: ["code", "placement"],
    connectionMethod: "custom-code",
  },
];

// Example integration settings
export const defaultIntegrationSettings = [
  {
    providerId: "development-test",
    name: "Development Test Integration",
    enabled: true,
    status: "connected",
    configuration: {
      placement: "head",
      codeType: "html",
      code: `<meta name="ucs-integration-test" content="head-loaded" />`,
    },
    createdAt: null,
    updatedAt: null,
  },
  {
    providerId: "google-search-console",
    name: "Google Search Console",
    enabled: false,
    status: "not-connected",
    configuration: {
      placement: "head",
      codeType: "html",
      code: "",
    },
    createdAt: null,
    updatedAt: null,
  },
  {
    providerId: "google-analytics",
    name: "Google Analytics 4",
    enabled: false,
    status: "not-connected",
    configuration: {
      placement: "head",
      codeType: "html",
      code: "",
    },
    createdAt: null,
    updatedAt: null,
  },
  {
    providerId: "google-tag-manager",
    name: "Google Tag Manager",
    enabled: false,
    status: "not-connected",
    configuration: {
      placement: "head",
      codeType: "html",
      code: "",
    },
    createdAt: null,
    updatedAt: null,
  },
  {
    providerId: "meta-pixel",
    name: "Meta Pixel",
    enabled: false,
    status: "not-connected",
    configuration: {
      placement: "head",
      codeType: "html",
      code: "",
    },
    createdAt: null,
    updatedAt: null,
  },
  {
    providerId: "custom-code",
    name: "Custom HTML / Script / iframe",
    enabled: false,
    status: "not-connected",
    configuration: {
      placement: "body-end",
      codeType: "html",
      code: "",
    },
    createdAt: null,
    updatedAt: null,
  },
];
