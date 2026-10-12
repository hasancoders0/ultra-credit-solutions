import Hero from "@/components/get-started/Hero";
import LeadForm from "@/components/get-started/LeadForm";
import Process from "@/components/get-started/Process";
import Benefits from "@/components/get-started/Benefits";
import CTA from "@/components/get-started/CTA";
import FAQSection from "@/components/home/FAQSection";

export const metadata = {
  title: "Get Started | Ultra Credit Solutions Inc.",
  description:
    "Contact Ultra Credit Solutions to discuss your credit repair questions, learn about available services, and explore the next steps.",
};

export default async function GetStartedPage({ searchParams }) {
  const params = await searchParams;

  const requestedPlan =
    typeof params?.plan === "string" ? params.plan.toLowerCase() : "";

  const selectedPlan = ["basic", "gold"].includes(requestedPlan)
    ? requestedPlan
    : "";

  return (
    <main>
      <Hero />

      <LeadForm selectedPlan={selectedPlan} />

      <Process />

      <Benefits />

      <FAQSection />

      <CTA />
    </main>
  );
}