import Hero from "@/components/contact/Hero";
import Info from "@/components/contact/Info";
import Form from "@/components/contact/Form";
import Map from "@/components/contact/Map";
import CTA from "@/components/contact/CTA";

export const metadata = {
  title: "Contact Us | Ultra Credit Solutions Inc.",
  description:
    "Contact Ultra Credit Solutions Inc. with questions about our credit repair services, pricing, or how to get started.",
};

export default function ContactPage() {
  return (
    <main>
      <Hero />
      <Info />
      <Form />
      <Map />
      <CTA />
    </main>
  );
}