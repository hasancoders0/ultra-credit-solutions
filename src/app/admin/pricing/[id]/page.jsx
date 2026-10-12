import { notFound } from "next/navigation";

import { pricing } from "@/data/pricing";
import PricingForm from "@/components/admin/pricing/PricingForm";

export const metadata = {
  title: "Edit Pricing Plan | Ultra Credit Solutions",
};

export default async function EditPricingPage({ params }) {
  const { id } = await params;

  const plan = pricing.find(
    (item) =>
      String(item.id) === String(id) ||
      item.slug === id
  );

  if (!plan) {
    notFound();
  }

  return <PricingForm initialPlan={plan} />;
}