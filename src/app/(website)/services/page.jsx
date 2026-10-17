
import Hero from "@/components/services/Hero";
import List from "@/components/services/List";
import CTA from "@/components/services/CTA";

export const metadata = {
  title: "Our Services",
  description:
    "Explore credit report review, credit dispute assistance, credit education, and credit guidance services from Ultra Credit Solutions USA.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services | Ultra Credit Solutions USA",
    description:
      "Learn about credit report review, dispute assistance, credit education, and available support services.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Our Services | Ultra Credit Solutions USA",
    description:
      "Explore our credit report review, dispute assistance, and credit education services.",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <Hero />
      <List />
      <CTA />
    </main>
  );
}
