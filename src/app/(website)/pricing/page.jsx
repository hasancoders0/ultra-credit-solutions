import Hero from "@/components/pricing/Hero";
import Plans from "@/components/pricing/Plans";
import Compare from "@/components/pricing/Compare";
import Fees from "@/components/pricing/Fees";
import FAQ from "@/components/pricing/FAQ";
import CTA from "@/components/pricing/CTA";

export const metadata = {
  title: "Pricing Plans | Ultra Credit Solutions Inc.",
  description:
    "Explore Ultra Credit Solutions Inc. pricing plans, compare listed features, understand additional fees, and learn how to Make an Appointment.",
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