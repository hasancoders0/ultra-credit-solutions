import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <TrustSection/>
        <ServicesSection/>
        <PricingSection/>
        <TestimonialsSection/>
        <FAQSection/>
        


      </main>

      <Footer />
    </>
  );
}