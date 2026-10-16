import Hero from "@/components/get-started/Hero";
import AppointmentsForm from "@/components/get-started/appointmentsForm";
import Process from "@/components/get-started/Process";
import Benefits from "@/components/get-started/Benefits";

export const metadata = {
  title: "Make an Appointment | Ultra Credit Solutions Inc.",
  description:
    "Contact Ultra Credit Solutions to discuss your credit repair questions, learn about available services, and explore the next steps.",
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