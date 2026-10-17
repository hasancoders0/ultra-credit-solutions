
import Hero from "@/components/contact/Hero";
import Form from "@/components/contact/Form";
import Map from "@/components/contact/Map";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Ultra Credit Solutions USA with questions about our services, pricing, or appointment options. Get in touch to discuss your credit-report concerns.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Ultra Credit Solutions USA",
    description:
      "Get in touch with Ultra Credit Solutions USA about our services, pricing, and appointment options.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Ultra Credit Solutions USA",
    description:
      "Contact our team with questions about services, pricing, or appointments.",
  },
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
