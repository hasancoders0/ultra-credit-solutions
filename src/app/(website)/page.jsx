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
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Customer Testimonials */}
        <TestimonialsSection />

        {/* 3. About Us */}
        <AboutSection />

        {/* 4. Why Choose Us */}
        <TrustSection />

        {/* 5. Our Services */}
        <ServicesSection />

        {/* 6. Pricing Plans */}
        <PricingSection />

        {/* 7. Frequently Asked Questions */}
        <FAQSection />
      </main>
    </>
  );
}