import { pricing } from "@/data/pricing";
import PricingManagement from "@/components/admin/pricing/PricingManagement";

export const metadata = {
  title: "Pricing Management | Ultra Credit Solutions",
  description: "Manage existing pricing plans.",
};

export default function AdminPricingPage() {
  return <PricingManagement initialPlans={pricing} />;
}