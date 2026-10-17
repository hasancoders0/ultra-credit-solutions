
import Hero from "@/components/pricing/Hero";
import Plans from "@/components/pricing/Plans";
import Compare from "@/components/pricing/Compare";
import Fees from "@/components/pricing/Fees";
import FAQ from "@/components/pricing/FAQ";
import CTA from "@/components/pricing/CTA";

export const metadata = {
  title: "Pricing Plans",
  description:
    "Explore Ultra Credit Solutions USA pricing plans, compare listed features, review additional fees, and learn how to request an appointment.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing Plans | Ultra Credit Solutions USA",
    description:
      "Compare pricing plans, review listed features and fees, and explore appointment options with Ultra Credit Solutions USA.",
    url: "/pricing",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pricing Plans | Ultra Credit Solutions USA",
    description:
      "Explore pricing plans, compare features, and review additional fees.",
  },
};

export default function PricingPage() {
  return (
    <main>
      <Hero />
      <Plans />
      <Compare />
      <Fees />
      <FAQ />
      <CTA />
    </main>
  );
}
