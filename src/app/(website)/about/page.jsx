
import Hero from "@/components/about/Hero";
import WhoWeAre from "@/components/about/WhoWeAre";
import Mission from "@/components/about/Mission";
import CreditConcerns from "@/components/about/CreditConcerns";
import CreditEducation from "@/components/about/CreditEducation";
import Process from "@/components/about/Process";
import Values from "@/components/about/Values";
import ImportantInfo from "@/components/about/ImportantInfo";
import CTA from "@/components/about/CTA";

export const metadata = {
  title: "About Us | Ultra Credit Solutions USA",
  description:
    "Learn about Ultra Credit Solutions USA, our mission, our approach to credit-report concerns, and the educational support we provide.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Ultra Credit Solutions USA",
    description:
      "Discover Ultra Credit Solutions USA, our mission, our values, and our approach to credit education and credit-report concerns.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      <Hero />
      <WhoWeAre />
      <Mission />
      <CreditConcerns />
      <CreditEducation />
      <Process />
      <Values />
      <ImportantInfo />
      <CTA />
    </main>
  );
}
