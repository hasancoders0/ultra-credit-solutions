import Hero from "@/components/services/Hero";
import List from "@/components/services/List";
import CTA from "@/components/services/CTA";

export const metadata = {
  title: "Credit Repair Services | Ultra Credit Solutions Inc.",
  description:
    "Learn how credit repair works, what to expect, and what a credit score means with Ultra Credit Solutions Inc.",
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