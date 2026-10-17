
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

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      <IntegrationLoader />
    </>
  );
}
