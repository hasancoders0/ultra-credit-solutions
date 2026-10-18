import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IntegrationLoader from "@/components/integrations/IntegrationLoader";

export const metadata = {
  title: {
    default: "Ultra Credit Solutions USA",
    template: "%s | Ultra Credit Solutions USA",
  },
  description:
    "Explore credit solutions, services, educational resources, and support options from Ultra Credit Solutions USA.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "Ultra Credit Solutions USA",
    locale: "en_US",
    type: "website",
  },
};

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />

      <IntegrationLoader />
    </>
  );
}
