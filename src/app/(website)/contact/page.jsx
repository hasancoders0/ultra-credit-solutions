import Hero from "@/components/contact/Hero";
import Form from "@/components/contact/Form";
import Map from "@/components/contact/Map";

export const metadata = {
  title: "Contact Us | Ultra Credit Solutions Inc.",
  description:
    "Contact Ultra Credit Solutions Inc. with questions about our credit repair services, pricing, or how to Make an Appointment.",
};

export default function ContactPage() {
  return (
    <main>
      <Hero />
      <Form />
      <Map />
    </main>
  );
}