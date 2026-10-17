
import Hero from "@/components/get-started/Hero";
import AppointmentsForm from "@/components/get-started/appointmentsForm";
import Process from "@/components/get-started/Process";
import Benefits from "@/components/get-started/Benefits";

export const metadata = {
  title: "Make an Appointment",
  description:
    "Request an appointment with Ultra Credit Solutions USA to discuss your credit-report concerns, learn about available services, and explore the next steps.",
  alternates: {
    canonical: "/appointment",
  },
  openGraph: {
    title: "Make an Appointment | Ultra Credit Solutions USA",
    description:
      "Request an appointment to discuss your credit-report concerns and learn about available support options.",
    url: "/appointment",
    type: "website",
  },
};

export default function GetStartedPage() {
  return (
    <main>
      <Hero />
      <AppointmentsForm />
      <Process />
      <Benefits />
    </main>
  );
}
